<?php

namespace tonopah;

require_once __DIR__."/../utils/Template.php";

class UserController extends Singleton {
	protected function __construct() {
		add_action("show_user_profile",array($this,"user_profile"));
		add_action("edit_user_profile",array($this,"user_profile"));
	}

	public function user_profile($user) {
		$tpl=new Template(__DIR__."/../tpl/user-balance-section.tpl.php");
		$currencies=TonopahPlugin::instance()->getCurrencies();

		foreach ($currencies as &$currency) {
			$account=Account::getUserAccount($user->ID,$currency["code"]);
			$currency["balance"]=$account->getBalance();
		}

		$tpl->display(array(
			"currencies"=>$currencies
		));
	}
}