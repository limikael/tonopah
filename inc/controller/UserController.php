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
		$account=Account::getUserAccount($user->ID,$currency->getId());

		$transactions=$account->getTransactions(array(
			"status!"=>"ignored",
			"order by stamp desc"
		));

		$transactionViews=array();
		foreach ($transactions as $transaction) {
			$other=$transaction->getOtherAccount($account);

			$class="";
			$iconClass="";
			switch ($transaction->getStatus()) {
				case "reserved":
					$class="table-warning";
					$iconClass="bi-hourglass-top";
					break;

				case "failed":
					$class="table-danger";
					$iconClass="bi-x-circle";
					break;
			}

			$transactionView=array(
				"stamp"=>$transaction->formatSiteTime(),
				"amount"=>$transaction->formatRelativeAmount($account),
				"entity"=>"-",
				"notice"=>$transaction->notice,
				"class"=>$class,
				"iconClass"=>$iconClass,
				"id"=>$transaction->id
			);

			$meta=array();
			$meta["Time"]=$transactionView["stamp"];
			$meta["Amount"]=$transactionView["amount"];

			if ($other) {
				$transactionView["entity"]=$other->getDisplay();
				$meta["To/From"]=$other->getDisplay();
			}

			$meta["Notice"]=$transactionView["notice"];

			foreach ($transaction->getMetas() as $key=>$value)
				$meta[ucfirst($key)]=$value;

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