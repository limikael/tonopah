<?php

namespace tonopah;

require_once __DIR__."/../utils/Template.php";
require_once __DIR__."/../plugin/TonopahPlugin.php";
require_once __DIR__."/../utils/Singleton.php";

/**
 * Manage the settings page.
 */
class SettingsController extends Singleton {

	/**
	 * Construct.
	 */
	public function __construct() {
		add_action('admin_menu',array($this,'admin_menu'));
		add_action('admin_init',array($this,'admin_init'));			
	}

	/**
	 * Add options page
	 */
	public function admin_menu() {
		add_options_page(
			'Tonopah Settings',
			'Tonopah',
			'manage_options', 
			'tonopah_settings',
			array($this,'create_settings_page')
		);
	}		

	/**
	 * Admin init.
	 */
	public function admin_init() {
		register_setting("tonopah","tonopah_serverurl");
		register_setting("tonopah","tonopah_key");
	}

	/**
	 * Create the settings page.
	 */
	public function create_settings_page() {
		$vars=array();
		//$vars["backendUrl"]=admin_url('admin-ajax.php?action=tonopah');

		$template=new Template(__DIR__."/../tpl/settings.tpl.php");
		$template->display($vars);
	}
}