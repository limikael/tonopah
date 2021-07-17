<?php

namespace tonopah;

require_once __DIR__."/../utils/Singleton.php";
require_once __DIR__."/../controller/MoneyGameController.php";
require_once __DIR__."/../controller/SettingsController.php";
require_once __DIR__."/../controller/BackendController.php";
require_once __DIR__."/../controller/UserController.php";
require_once __DIR__."/../controller/ShortcodeController.php";
require_once __DIR__."/../controller/AjaxController.php";
require_once __DIR__."/../controller/UmController.php";
require_once __DIR__."/../model/Transaction.php";
require_once __DIR__."/../model/Currency.php";

class TonopahPlugin extends Singleton {
	private $currenciesById;
	private $data;

	protected function __construct() {
		AjaxController::instance();
		MoneyGameController::instance();
		BackendController::instance();
		UserController::instance();
		ShortcodeController::instance();
		UmController::instance();

		if (is_admin()) {
			SettingsController::instance();
		}

		add_filter("cmb2_meta_box_url",array($this,"cmb2_meta_box_url"));
		add_action("init",array($this,"init"));
		add_action("wp_enqueue_scripts",array($this,"wp_enqueue_scripts"));
		add_action("admin_enqueue_scripts",array($this,"wp_enqueue_scripts"));
		add_action("admin_notices",array($this,"admin_notices"));
		add_action("tonopah_cron",array($this,"cron"));
		add_filter("tonopah_currencies",array($this,"tonopah_currencies"),10,1);

		$this->currenciesById=NULL;
		$this->data=get_file_data(TONOPAH_PATH."/tonopah.php",array(
			'Version' => 'Version',
			'TextDomain' => 'Text Domain'
		));
	}

	private function initCurrencies() {
		$this->currenciesById=array();
		$confs=apply_filters("tonopah_currencies",array());
		foreach ($confs as $conf) {
			$currency=new Currency($conf);
			$this->currenciesById[$currency->getId()]=$currency;
		}
	}

	public function getCurrencies() {
		if ($this->currenciesById===NULL)
			$this->initCurrencies();

		return array_values($this->currenciesById);
	}

	public function getCurrencyById($id) {
		if ($this->currenciesById===NULL)
			$this->initCurrencies();

		if (!array_key_exists($id,$this->currenciesById))
			return NULL;

		return $this->currenciesById[$id];
	}

	public function adminNotice($message, $class="success") {
		if (!array_key_exists("tonopah_notices",$_SESSION))
			$_SESSION["tonopah_notices"]=array();

		$_SESSION["tonopah_notices"][]=array(
			"message"=>$message,
			"class"=>$class
		);
	}

	public function admin_notices() {
		if (!array_key_exists("tonopah_notices",$_SESSION))
			return;

		$notices=$_SESSION["tonopah_notices"];
		if (!$notices)
			$notices=array();

		foreach ($notices as $notice) {
			$t=new Template(__DIR__."/../tpl/admin-notice.tpl.php");
			$t->display($notice);
		}

		unset($_SESSION["tonopah_notices"]);
	}

	public function wp_enqueue_scripts() {
		wp_enqueue_script("tonopahclient",
			TONOPAH_URL."/res/tonopahclient.js",
			array(),$this->data["Version"],true);

		wp_enqueue_script("tonopah",
			TONOPAH_URL."/res/tonopah.js",
			array("jquery"),$this->data["Version"],true);

		wp_localize_script("tonopah","ajaxurl",admin_url('admin-ajax.php'));

		if (isset($_REQUEST["currency"]))
			wp_localize_script("tonopah","tonopahCurrency",$_REQUEST["currency"]);

		wp_enqueue_style("tonopahclient-style",
			TONOPAH_URL."/res/tonopahclient.css",
			array(),$this->data["Version"]);

		wp_enqueue_style("tonopah-style",
			TONOPAH_URL."/res/tonopah.css",
			array(),$this->data["Version"]);
	}

	public function accountNotice($message, $class="success") {
		if ($class=="error")
			$class="danger";

		if (!array_key_exists("tonopah_account_notices",$_SESSION))
			$_SESSION["tonopah_account_notices"]=array();

		$_SESSION["tonopah_account_notices"][]=array(
			"message"=>$message,
			"class"=>$class
		);
	}

	public function renderAccountNotices() {
		if (!array_key_exists("tonopah_account_notices",$_SESSION))
			return;

		$notices=$_SESSION["tonopah_account_notices"];
		if (!$notices)
			$notices=array();

		$res="";
		foreach ($notices as $notice) {
			$t=new Template(__DIR__."/../tpl/account-notice.tpl.php");
			$res.=$t->render($notice);
		}

		unset($_SESSION["tonopah_account_notices"]);
		return $res;
	}

	public function init() {
		if (!session_id())
			session_start();

		$user=wp_get_current_user();
		if ($user) {
			$_SESSION["tonopah_user_id"]=$user->ID;
		}

		if (array_key_exists("do_ply_topup",$_POST)) {
			$user=wp_get_current_user();
			$account=Account::getUserAccount($user->ID,"ply");
			$topupAmount=1000-$account->getBalance();

			if ($topupAmount>0) {
				$t=$account->createDepositTransaction($topupAmount);
				$t->notice="Top up";
				$t->perform();

				$this->accountNotice("Your ply has been topped up!");
				$url=add_query_arg(array(
					"tab"=>NULL,
				),HtmlUtil::getCurrentUrl());

				wp_redirect($url,303);
			}

			else {
				$this->accountNotice("Your ply account is already full!","error");
				wp_redirect(HtmlUtil::getCurrentUrl(),303);
			}

			exit();
		}
	}

	public function ply_topup_tab() {
		$t=new Template(__DIR__."/../tpl/account-ply.tpl.php");
		return $t->render();
	}

	public function tonopah_currencies($currencies) {
		$currencies[]=array(
			"id"=>"ply",
			"symbol"=>"PLY",
			"title"=>"Playmoney",
			"logo"=>TONOPAH_URL."/res/baby.png",
			"account_page_tabs"=>array(
				array(
					"title"=>"Top up",
					"cb"=>array($this,"ply_topup_tab")
				)
			)
		);

		return $currencies;
	}

	public function cmb2_meta_box_url($url) {
		if (strpos($url,"tonopah"))
			$url=TONOPAH_URL."/ext/CMB2/";

		return $url;
	}

	public function activate() {
		Transaction::install();

		MoneyGameController::instance()->registerPostTypes();
		flush_rewrite_rules(false);

		wp_schedule_event(time(),"hourly","tonopah_cron");
	}

	public function deactivate() {
		wp_clear_scheduled_hook("tonopah_cron");
	}

	public function uninstall() {
		Transaction::uninstall();
	}

	public function cron() {
		//error_log("Running cron... This is not an error...");
		$userIds=get_users(array("fields"=>"ID"));
		foreach ($this->getCurrencies() as $currency) {
			foreach ($userIds as $userId) {
				$currency->processForUser($userId);
			}
		}
	}

	public function serverRequest($method, $params=array()) {
		$curl=curl_init();
		$url=get_option("tonopah_serverurl")."/".$method;
		$params["key"]=get_option("tonopah_key");
		$url.="?".http_build_query($params);

		curl_setopt($curl,CURLOPT_URL,$url);
		curl_setopt($curl,CURLOPT_RETURNTRANSFER,TRUE);
		//curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,FALSE);
		$res=curl_exec($curl);

		if ($res===FALSE) {
			error_log("backend call failed: ".$method);

			throw new \Exception("Backend call failed: ".curl_error($curl));
		}

		$decoded=json_decode($res,TRUE);
		if ($decoded===NULL ||
				!is_array($decoded) ||
				!array_key_exists("ok",$decoded) ||
				!$decoded["ok"]) {
			throw new \Exception("Backend call failed: ".$res);
		}

		return $decoded;
	}
}