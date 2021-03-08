<?php

namespace tonopah;

require_once __DIR__."/../utils/Singleton.php";
require_once __DIR__."/../controller/CashGameController.php";
require_once __DIR__."/../controller/TableController.php";
require_once __DIR__."/../controller/SettingsController.php";
require_once __DIR__."/../controller/BackendController.php";
require_once __DIR__."/../controller/UserController.php";
require_once __DIR__."/../controller/ShortcodeController.php";
require_once __DIR__."/../model/Game.php";

class TonopahPlugin extends Singleton {
	protected function __construct() {
		CashGameController::instance();
		TableController::instance();
		BackendController::instance();
		UserController::instance();
		ShortcodeController::instance();

		if (is_admin()) {
			SettingsController::instance();
		}

		add_filter("cmb2_meta_box_url",array($this,"cmb2_meta_box_url"));
		add_action("init",array($this,"init"));
		add_action("wp_enqueue_scripts",array($this,"wp_enqueue_scripts"));
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

	public function cmb2_meta_box_url($url) {
		if (strpos($url,"tonopah"))
			$url=TONOPAH_URL."/ext/CMB2/";

		return $url;
	}

	public function activate() {
		Game::install();
	}

	public function uninstall() {
		Game::uninstall();
	}

	public function serverRequest($method, $params=array()) {
		$curl=curl_init();
		$url=get_option("tonopah_serverurl")."/".$method;
		//$params["key"]=get_option("tonopah_key");
		$url.="?".http_build_query($params);

		curl_setopt($curl,CURLOPT_URL,$url);
		curl_setopt($curl,CURLOPT_RETURNTRANSFER,TRUE);
		//curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,FALSE);
		$res=curl_exec($curl);

		if ($res===FALSE) {
			error_log("backend call failed: ".$method);

			throw new \Exception("Backend call failed: ".curl_error($curl));
			return NULL;
		}

		return json_decode($res,TRUE);
	}

	public function getBalance($currency, $entityType, $entityId) {
		if ($currency!="ply" || $entityType!="user")
			throw new \Exception("only user accounts supported");

		get_user_meta($entityId,"tonopah_ply_balance");
	}
}