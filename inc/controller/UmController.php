<?php

namespace tonopah;

class UmController extends Singleton {
	protected function __construct() {
		add_filter('um_account_page_default_tabs_hook',array($this,'account_hook'), 100 );
		add_action('um_account_tab__ply',array($this,'um_account_tab__ply'));
		add_filter('um_account_content_hook_ply',array($this,'um_account_content_hook_ply'));
		add_action("init",array($this,"init"));
	}

	public function init() {
		if (array_key_exists("um_account_submit",$_REQUEST) &&
				$_REQUEST["um_account_submit"]=="Refill Play Money") {
			$user=wp_get_current_user();
			$account=Account::getUserPlyAccount($user->ID);
			if ($account->getBalance()<1000) {
				$account->saveBalance(1000);
			}
		}
	}

	public function account_hook( $tabs ) {
		$tabs[50]['ply']['icon'] = 'um-faicon-money';
		$tabs[50]['ply']['title'] = 'Play Money';
		$tabs[50]['ply']['submit_title'] = 'Refill Play Money';
		$tabs[50]['ply']['custom'] = true;
		return $tabs;
	}

	public function um_account_tab__ply( $info ) {
		global $ultimatemember;
		extract( $info );

		$output = $ultimatemember->account->get_tab_output('ply');
		if ( $output ) { echo $output; }
	}

	function um_account_content_hook_ply( $output ){
		$user=wp_get_current_user();
		$account=Account::getUserPlyAccount($user->ID);

		$vars=array(
			"balance"=>$account->getBalance()
		);

		$t=new Template(__DIR__."/../tpl/um-account-ply-tab.tpl.php");
		return $t->render($vars);
	}
}
