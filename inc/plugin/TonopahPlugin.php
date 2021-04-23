<?php

namespace tonopah;

require_once __DIR__."/../utils/Singleton.php";
require_once __DIR__."/../controller/MoneyGameController.php";
require_once __DIR__."/../controller/SettingsController.php";
require_once __DIR__."/../controller/BackendController.php";
require_once __DIR__."/../controller/UserController.php";
require_once __DIR__."/../controller/ShortcodeController.php";
require_once __DIR__."/../model/Transaction.php";

class TonopahPlugin extends Singleton {
	private $currencies;

	protected function __construct() {
		MoneyGameController::instance();
		BackendController::instance();
		UserController::instance();
		ShortcodeController::instance();

		if (is_admin()) {
			SettingsController::instance();
		}

		add_filter("cmb2_meta_box_url",array($this,"cmb2_meta_box_url"));
		add_action("init",array($this,"init"));
		add_action("wp_enqueue_scripts",array($this,"wp_enqueue_scripts"));
		add_action("admin_enqueue_scripts",array($this,"wp_enqueue_scripts"));
		add_action("admin_notices",array($this,"admin_notices"));
		add_filter("tonopah_currencies",array($this,"tonopah_currencies"),10,1);
	}

	public function getCurrencies() {
		if (!$this->currencies)
			$this->currencies=apply_filters("tonopah_currencies",array());

		return $this->currencies;
	}

	public function getCurrencyByCode($code) {
		$currencies=$this->getCurrencies();
		foreach ($currencies as $currency)
			if ($currency["code"]==$code)
				return $currency;
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
			array(),"1.0.0",true);

		wp_enqueue_style("tonopahclient-style",
			TONOPAH_URL."/res/tonopahclient.css",
			array(),"1.0.0");

		wp_enqueue_style("tonopah-style",
			TONOPAH_URL."/res/tonopah.css",
			array(),"1.0.0");
	}

	public function init() {
		if (!session_id())
			session_start();

		$user=wp_get_current_user();
		if ($user) {
			$_SESSION["tonopah_user_id"]=$user->ID;
		}
	}

	public function ply_topup_tab() {
		$vars=array();

		if (array_key_exists("do_ply_topup",$_REQUEST)) {
			$user=wp_get_current_user();
			$account=Account::getUserAccount($user->ID,"ply");
			$topupAmount=1000-$account->getBalance();

			if ($topupAmount>0)
				$account->deposit($topupAmount,"Top up");

			$vars["notice"]="Your ply has been topped up!";
		}

		$t=new Template(__DIR__."/../tpl/account-ply.tpl.php");
		return $t->render($vars);
	}

	public function tonopah_currencies($currencies) {
		$currencies[]=array(
			"code"=>"ply",
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
	}

	public function uninstall() {
		Transaction::uninstall();
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