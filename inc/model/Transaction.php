<?php

namespace tonopah;

require_once __DIR__."/../../ext/wprecord/WpRecord.php";

/**
 * Statuses:
 *   - unconfirmed
 *   - complete
 *   - ignore
 */
class Transaction extends \WpRecord {
	public static function initialize() {
		self::field("id","integer not null auto_increment");
		self::field("from_type","varchar(8) null");
		self::field("from_id","integer null");
		self::field("to_type","varchar(8) null");
		self::field("to_id","integer null");
		self::field("currency","varchar(32) null");
		self::field("stamp","integer not null");
		self::field("amount","integer not null");
		self::field("notice","text not null");
		self::field("status","varchar(32) not null");
		self::field("meta","text not null");
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

			case "rake":
				$account=Account::getRakeAccount($this->currency);
				break;
		}

		if (!$account || $account->getCurrencyId()!=$this->currency)
			return NULL;

		return $account;
	}

	public function getFromAccount() {
		return $this->getAccount($this->from_type,$this->from_id);
	}

	public function getToAccount() {
		return $this->getAccount($this->to_type,$this->to_id);
	}

	public function getOtherAccount($account) {
		if ($this->getFromAccount() && !$this->getFromAccount()->equals($account))
			return $this->getFromAccount();

		if ($this->getToAccount() && !$this->getToAccount()->equals($account))
			return $this->getToAccount();

		return NULL;
	}

	public function getRelativeAmount($account) {
		if ($account->equals($this->getFromAccount()))
			return -$this->amount;

		if ($account->equals($this->getToAccount()))
			return $this->amount;

		return NULL;
	}

	private function getCurrency() {
		return TonopahPlugin::instance()->getCurrencyById($this->currency);
	}

	public function formatAmount($style="standard") {
		return $this->getCurrency()->format($this->amount,$style);
	}

	public function formatRelativeAmount($account, $style="standard") {
		$relativeAmount=$this->getRelativeAmount($account);
		return $this->getCurrency()->format($relativeAmount,$style);
	}

	public function formatSiteTime() {
		$localStamp=($this->stamp+(int)(get_option('gmt_offset')*HOUR_IN_SECONDS));
		return gmdate("Y-m-d H:i:s",$localStamp);
	}

	public function perform() {
		if (isset($this->status) && $this->status=="complete")
			throw new \Exception("Already completed.");

		$fromAccount=$this->getFromAccount();
		$toAccount=$this->getToAccount();

		if ($this->from_type!="deposit" && !$fromAccount)
			throw new \Exception("Invalid from account.");

		if ($this->to_type!="withdraw" && !$toAccount)
			throw new \Exception("Invalid to account.");

		if ($fromAccount && $fromAccount->getBalance()<$this->amount)
			throw new \Exception("Insufficient funds.");

		/*if (!$this->amount)
			throw new \Exception("No transaction amount.");*/

		if ($toAccount)
			$toAccount->setBalance($toAccount->getBalance()+$this->amount);

		if ($fromAccount)
			$fromAccount->setBalance($fromAccount->getBalance()-$this->amount);

		$this->status="complete";
		$this->save();
	}
}
