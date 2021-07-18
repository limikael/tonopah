<?php

namespace tonopah;

require_once __DIR__."/../utils/Singleton.php";
require_once __DIR__."/../model/Account.php";
require_once __DIR__."/../model/Currency.php";
require_once __DIR__."/TonopahPlugin.php";

class TonopahApi extends Singleton {
	protected function __construct() {
	}

	public function getUserAccount($userId, $currencyId) {
		return Account::getUserAccount($userId,$currencyId);
	}

	public function accountNotice($message, $class="success") {
		TonopahPlugin::instance()->accountNotice($message,$class);
	}
}