<?php

namespace tonopah;

class UmController extends Singleton {
	protected function __construct() {
		add_filter('um_account_page_default_tabs_hook',array($this,'account_hook'), 100 );
		add_action('um_account_tab__balance',array($this,'um_account_tab__balance'));
		add_filter('um_account_content_hook_balance',array($this,'um_account_content_hook_balance'));
	}

	public function account_hook( $tabs ) {
		$tabs[50]['balance']['icon'] = 'um-faicon-money';
		$tabs[50]['balance']['title'] = 'Balance';
//		$tabs[50]['balance']['submit_title'] = 'Refill Play Money';
		$tabs[50]['balance']['custom'] = true;
		return $tabs;
	}

	public function um_account_tab__balance( $info ) {
		global $ultimatemember;
		extract( $info );

		$output = $ultimatemember->account->get_tab_output('balance');
		if ( $output ) { echo $output; }
	}

	function um_account_content_hook_balance( $output ){
		$url=get_post_permalink(get_option("tonopah_account_page_id"));

		$user=wp_get_current_user();
		$currencies=TonopahPlugin::instance()->getCurrencies();
		$currencyViews=array();
		foreach ($currencies as $currency) {
			if ($currency->isAvailableToCurrentUser()) {
				$account=Account::getUserAccount($user->ID,$currency->getId());
				$currencyConf=$currency->getConf();
				$currencyUrl=add_query_arg("currency",$currency->getId(),$url);
				$currencyViews[]=array(
					"balance"=>$account->formatBalance(),
					"symbol"=>$currency->getSymbol(),
					"id"=>$currency->getId(),
					"title"=>$currencyConf["title"],
					"logo"=>$currencyConf["logo"],
					"url"=>$currencyUrl
				);
			}
		}

		$t=new Template(__DIR__."/../tpl/um-account-list.tpl.php");
		return $t->render(array(
			"currencies"=>$currencyViews
		));
	}
}