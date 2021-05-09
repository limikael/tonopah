<?php

namespace tonopah;

require_once __DIR__."/Transaction.php";

class Account {
	private $currency;
	private $entityType;
	private $entityId;

	private function __construct($currencyId, $entityType, $entityId) {
		$this->currency=TonopahPlugin::instance()->getCurrencyById($currencyId);
		if (!$this->currency)
			throw new \Exception("No currency for account");

		$this->entityType=$entityType;
		$this->entityId=$entityId;
		if (!$this->entityId)
			throw new \Exception("No entity for account");
	}

	public function getCurrency() {
		return $this->currency;
	}

	public function getCurrencyId() {
		return $this->currency->getId();
	}

	public static function getUserAccount($userId, $currencyId) {
		return new Account($currencyId,"user",$userId);
	}

	public static function getPostAccount($postId) {
		if (!$postId)
			return NULL;

		$currencyId=get_post_meta($postId,"currency",TRUE);
		if (!$currencyId)
			return NULL;

		return new Account($currencyId,"post",$postId);
	}

	public function getBalance() {
		$metaKey="tonopah_balance_".$this->getCurrencyId();

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

	public function setBalance($balance) {
		$metaKey="tonopah_balance_".$this->getCurrencyId();
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

	private function createTransaction($amount) {
		if ($amount<=0)
			throw new \Exception("Amount must be positive!");

		$t=new Transaction();
		$t->stamp=time();
		$t->currency=$this->getCurrencyId();
		$t->amount=intval($amount);

		return $t;
	}

	public function createIgnoreTransaction() {
		$t=new Transaction();
		$t->stamp=time();
		$t->currency=$this->getCurrencyId();
		$t->status="ignore";
		$t->from_type="deposit";
		$t->from_id=NULL;
		$t->to_type=$this->entityType;
		$t->to_id=$this->entityId;

		return $t;
	}

	public function createDepositTransaction($amount) {
		$t=$this->createTransaction($amount);

		$t->from_type="deposit";
		$t->from_id=NULL;
		$t->to_type=$this->entityType;
		$t->to_id=$this->entityId;

		return $t;
	}

	public function createWithdrawTransaction($amount) {
		$t=$this->createTransaction($amount);

		$t->from_type=$this->entityType;
		$t->from_id=$this->entityId;
		$t->to_type="withdraw";
		$t->to_id=NULL;

		return $t;
	}

	public function createSendTransaction($toAccount, $amount) {
		if (!$toAccount)
			throw new \Exception("Target account doesn't exist");

		if ($this->getCurrencyId()!=$toAccount->getCurrencyId())
			throw new \Exception("Different currency");

		$t=$this->createTransaction($amount);

		$t->from_type=$this->entityType;
		$t->from_id=$this->entityId;
		$t->to_type=$toAccount->entityType;
		$t->to_id=$toAccount->entityId;

		return $t;
	}

	public function getDisplay() {
		switch ($this->entityType) {
			case "user":
				$u=get_user_by("ID",$this->entityId);
				return $u->user_login;
				break;

			case "post":
				$post=get_post($this->entityId);
				return $post->post_title;
				break;
		}
	}

	public function equals($account) {
		if (!$account)
			return FALSE;

		return (
			($this->entityType==$account->entityType) &&
			($this->entityId==$account->entityId) &&
			($this->getCurrencyId()==$account->getCurrencyId())
		);
	}

	public function getDepositTransactions($params=array()) {
		$q=array(
			"currency"=>$this->getCurrencyId(),
			"to_type"=>$this->entityType,
			"to_id"=>$this->entityId,
			"from_type"=>"deposit"
		);

		if (isset($params["status"]))
			$q["status"]=$params["status"];

		return Transaction::findAllBy($q);
	}

	public function formatBalance($style="standard") {
		return $this->currency->format($this->getBalance(),$style);
	}
}