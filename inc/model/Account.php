<?php

namespace tonopah;

require_once __DIR__."/Transaction.php";

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
		if (!$userId)
			return NULL;

		$currencyData=TonopahPlugin::instance()->getCurrencyByCode($currency);
		if (!$currencyData)
			return NULL;

		return new Account($currency,"user",$userId);
	}

	public static function getPostAccount($postId) {
		if (!$postId)
			return NULL;

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

	private function setBalance($balance) {
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

	private function createTransaction($amount, $message) {
		$t=new Transaction();
		$t->stamp=time();
		$t->currency=$this->currency;
		$t->amount=$amount;
		$t->notice=$message;

		return $t;
	}

	public function send($toAccount, $amount, $message=NULL) {
		if (!$toAccount)
			throw new \Exception("Target account doesn't exist");

		$amount=intval($amount);

		if ($this->getCurrency()!=$toAccount->getCurrency())
			throw new \Exception("Different currency");

		$fromBalance=$this->getBalance();
		$toBalance=$toAccount->getBalance();

		$fromBalance-=$amount;
		$toBalance+=$amount;

		if ($fromBalance<0)
			throw new \Exception("Insufficient funds");

		$this->setBalance($fromBalance);
		$toAccount->setBalance($toBalance);

		$t=$this->createTransaction($amount,$message);
		$t->from_type=$this->entityType;
		$t->from_id=$this->entityId;
		$t->to_type=$toAccount->entityType;
		$t->to_id=$toAccount->entityId;
		$t->save();
	}

	public function deposit($amount, $message=NULL) {
		$amount=intval($amount);
		if (!$amount)
			throw new \Exception("Can't deposit zero amount");

		$balance=$this->getBalance();
		$balance+=$amount;
		$this->setBalance($balance);

		$t=$this->createTransaction($amount,$message);
		$t->to_type=$this->entityType;
		$t->to_id=$this->entityId;
		$t->save();
	}

	public function withdraw($amount, $message=NULL) {
		$amount=intval($amount);
		if (!$amount)
			throw new \Exception("Can't withdraw zero amount");

		$balance=$this->getBalance();
		$balance-=$amount;
		if ($balance<0)
			throw new \Exception("Insufficient funds");

		$this->setBalance($balance);

		$t=$this->createTransaction($amount,$message);
		$t->from_type=$this->entityType;
		$t->from_id=$this->entityId;
		$t->save();
	}
}