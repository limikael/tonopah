<?php

namespace tonopah;

class Account {
	private $currency;
	private $entityType;
	private $entityId;

	private function __construct($currency, $entityType, $entityId) {
		$currencyData=TonopahPlugin::instance()->getCurrencyByCode($currency);
		if (!$currencyData)
			throw new \Exception("Unknown currency: ".$currency);

		$this->currency=$currency;
		$this->entityType=$entityType;
		$this->entityId=$entityId;
	}

	public function getCurrency() {
		return $this->currency;
	}

	public static function getUserAccount($userId, $currency) {
		$currencyData=TonopahPlugin::instance()->getCurrencyByCode($currency);
		if (!$currencyData)
			return NULL;

		return new Account($currency,"user",$userId);
	}

	public static function getPostAccount($postId) {
		$currency=get_post_meta($postId,"currency",TRUE);
		$currencyData=TonopahPlugin::instance()->getCurrencyByCode($currency);
		if (!$currencyData)
			return NULL;

		return new Account($currency,"post",$postId);
	}

	public function getBalance() {
		$metaKey="tonopah_balance_".$this->getCurrency();

		switch ($this->entityType) {
			case "user":
				$balance=get_user_meta($this->entityId,$metaKey,TRUE);
				break;

			case "post":
				$balance=get_post_meta($this->entityId,$metaKey,TRUE);
				break;

			default:
				throw new \Exception("Unknown account entity.");
		}

		$balance=intval($balance);

		return $balance;
	}

	private function saveBalance($balance) {
		$metaKey="tonopah_balance_".$this->getCurrency();
		$balance=intval($balance);

		switch ($this->entityType) {
			case "user":
				$balance=update_user_meta($this->entityId,$metaKey,$balance);
				break;

			case "post":
				$balance=update_post_meta($this->entityId,$metaKey,$balance);
				break;

			default:
				throw new \Exception("Unknown account entity.");
		}
	}

	public static function transact($fromAccount, $toAccount, $amount) {
		$amount=intval($amount);

		if ($fromAccount->getCurrency()!=$toAccount->getCurrency())
			throw new \Exception("Different currency");

		$fromBalance=$fromAccount->getBalance();
		$toBalance=$toAccount->getBalance();

		$fromBalance-=$amount;
		$toBalance+=$amount;

		if ($fromBalance<0)
			throw new \Exception("Insufficient funds");

		$fromAccount->saveBalance($fromBalance);
		$toAccount->saveBalance($toBalance);
	}

	public function deposit($amount, $message=NULL) {
		$amount=intval($amount);

		$balance=$this->getBalance();
		$balance+=$amount;
		$this->saveBalance($balance);
	}
}