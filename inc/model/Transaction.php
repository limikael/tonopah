<?php

namespace tonopah;

require_once __DIR__."/../../ext/wprecord/WpRecord.php";

class Transaction extends \WpRecord {
	public static function initialize() {
		self::field("id","integer not null auto_increment");
		self::field("from_type","varchar(8) null");
		self::field("from_id","integer null");
		self::field("to_type","varchar(8) null");
		self::field("to_id","integer null");
		self::field("currency","varchar(8) null");
		self::field("stamp","integer not null");
		self::field("amount","integer not null");
		self::field("notice","text not null");
	}

	private function getAccount($type, $id) {
		$account=NULL;

		switch ($type) {
			case "post":
				$account=Account::getPostAccount($id);
				break;

			case "user":
				$account=Account::getUserAccount($id,$this->currency);
				break;
		}

		if (!$account || $account->getCurrency()!=$this->currency)
			return NULL;

		return $account;
	}

	public function getFromAccount() {
		return $this->getAccount($this->from_type,$this->from_id);
	}

	public function getToAccount() {
		return $this->getAccount($this->to_type,$this->to_id);
	}
}
