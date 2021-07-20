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
		$response=$currency->processForCurrentUser($p);

		if (!$response)
			$response=array();

		if (!isset($response["text"]))
			$response["text"]=array();

		if (!isset($response["replaceWith"]))
			$response["replaceWith"]=array();

		$reservedAmount=MoneyGame::getTotalBalancesForUser(
			$currency->getId(),
			$user->user_login
		);

		$reservedAmount+=$account->getReserved();

		$response["text"]["#tonopah-account-balance"]=
			$account->formatBalance();

		$response["text"]["#tonopah-account-reserved"]=
			$currency->format($reservedAmount,"hyphenated");

		if (isset($_REQUEST["renderTransactionList"]))
			$response["replaceWith"]["#tonopah-transaction-list"]=
				UserController::instance()->renderTransactionTable($user, $currency);

		return $response;
	}
}