<?php

namespace tonopah;

require_once __DIR__."/../utils/AjaxHandler.php";

class AjaxController extends AjaxHandler {
	protected function __construct() {
		parent::__construct("tonopah-frontend");
	}

	public function getCurrencyTexts($p) {
		$user=wp_get_current_user();
		if (!$user || !$user->id)
			throw new \Exception("Not logged in");

		$account=Account::getUserAccount($user->id,$p["currency"]);
		$currency=$account->getCurrency();
		$currency->processForCurrentUser();
		$reservedAmount=MoneyGame::getTotalBalancesForUser(
			$currency->getId(),
			$user->user_login
		);

		$reservedAmount+=$currency->getReservedForCurrentUser();
		$transactionList=UserController::instance()->renderTransactionTable($user, $currency);

		return array(
			"#tonopah-account-balance"=>$account->formatBalance(),
			"#tonopah-account-reserved"=>$currency->format($reservedAmount,"hyphenated"),
			"#tonopah-transaction-list"=>$transactionList
		);
	}
}