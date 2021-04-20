<?php

namespace tonopah;

require_once __DIR__."/../utils/Template.php";
require_once __DIR__."/../plugin/TonopahPlugin.php";
require_once __DIR__."/../utils/Singleton.php";
require_once __DIR__."/../utils/CustomListTable.php";
require_once __DIR__."/../model/Transaction.php";

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
		add_menu_page(
			"Tonopah",
			"Tonopah",
			'manage_options',
			'tonopah_settings',
			NULL,
			"dashicons-money",50
		);

		add_submenu_page(
			'tonopah_settings',
			'Settings',
			'Settings',
			'manage_options',
			'tonopah_settings',
			array($this,'create_settings_page')
		);

		add_submenu_page(
			'tonopah_settings',
			'Accounting',
			'Accounting',
			'manage_options',
			'tonopah_accounting',
			array($this,"accounting_page")
		);
	}		

	/**
	 * Accounting page.
	 */
	public function accounting_page() {
		$table=new CustomListTable();

		$table->set_title("Tonopah Accounting");

		$table->add_column(array(
			"title"=>"Transacted",
			"field"=>"timestamp"
		));

		$table->add_column(array(
			"title"=>"From",
			"field"=>"from"
		));

		$table->add_column(array(
			"title"=>"To",
			"field"=>"to"
		));

		$table->add_column(array(
			"title"=>"Amount",
			"field"=>"amount"
		));

		$table->add_column(array(
			"title"=>"Currency",
			"field"=>"currency"
		));

		$transactons=Transaction::findAll();
		$transactionViews=array();

		foreach ($transactons as $transacton) {
			$localStamp=($transacton->stamp+(int)(get_option('gmt_offset')*HOUR_IN_SECONDS));
			$localDate=gmdate("Y-m-d H:i:s",$localStamp);

			$view=array(
				"timestamp"=>$localDate
			);

			$transactionViews[]=$view;
		}

		$table->set_data($transactionViews);

		$table->display();
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

		if (array_key_exists("settings-updated",$_REQUEST) &&
				$_REQUEST["settings-updated"]) {
			$t=new Template(__DIR__."/../tpl/admin-notice.tpl.php");
			$t->display(array(
				"message"=>"Settings Updated.",
				"class"=>"notice-success"
			));
		}

		$template=new Template(__DIR__."/../tpl/settings.tpl.php");
		$template->display($vars);

		error_log("create settings page..".print_r($_REQUEST,TRUE));
	}
}