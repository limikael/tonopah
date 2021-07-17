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
		$currencyViews=array();

		foreach ($currencies as $currency) {
			$account=Account::getUserAccount($user->ID,$currency->getId());
			$currencyViews[]=array(
				"symbol"=>$currency->getSymbol(),
				"balance"=>$account->formatBalance()
			);
		}

		$tpl->display(array(
			"currencies"=>$currencyViews
		));
	}

	public function renderTransactionTable($user, $currency) {
		$transactions=Transaction::findAllByQuery(
			'SELECT   * ' .
			'FROM     :table ' .
			'WHERE    currency=%s '.
			'AND      ((from_type=%s AND from_id=%s) '.
			'         OR (to_type=%s AND to_id=%s)) '.
			'AND      status<>"ignored" '.
			'ORDER BY stamp DESC',
			$currency->getId(),
			"user",$user->ID,
			"user",$user->ID
		);

		$transactionViews=array();
		foreach ($transactions as $transaction) {
			$account=Account::getUserAccount($user->ID,$currency->getId());
			$other=$transaction->getOtherAccount($account);

			$transactionView=array(
				"stamp"=>$transaction->formatSiteTime(),
				"amount"=>$transaction->formatRelativeAmount($account),
				"entity"=>"-",
				"notice"=>$transaction->notice,
				"status"=>$transaction->getStatus(),
				"id"=>$transaction->id
			);

			if ($other)
				$transactionView["entity"]=$other->getDisplay();

			$meta=array();
			$meta["Time"]=$transactionView["stamp"];
			$meta["Amount"]=$transactionView["amount"];
			$meta["To/From"]=$transactionView["entity"];
			$meta["Notice"]=$transactionView["notice"];

			$transactionView["meta"]=$meta;

			$transactionViews[]=$transactionView;
		}

		$vars=array(
			"transactions"=>$transactionViews
		);

		$t=new Template(__DIR__."/../tpl/account-tx-list.tpl.php");
		return $t->render($vars);
	}
}