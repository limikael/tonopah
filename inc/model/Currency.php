<?php

namespace tonopah;

class Currency {
	private $conf;

	public function __construct($conf) {
		if (!$conf["id"])
			throw new \Exception("Currency doesn't have an id");

		$this->conf=$conf;

		if (!array_key_exists("divisorPlaces",$this->conf))
			$this->conf["divisorPlaces"]=0;
	}

	public function getTitle() {
		return $this->conf["title"];
	}

	public function getId() {
		return $this->conf["id"];
	}

	public function getSymbol() {
		return $this->conf["symbol"];
	}

	public function getDivisorPlaces() {
		return $this->conf["divisorPlaces"];
	}

	public function getConf() {
		return $this->conf;
	}

	private static function toString($number) {
		$s=sprintf("%.10f",$number);
		$s=rtrim($s,"0");
		$s=rtrim($s,".");
		return $s;
	}

	public function format($amount, $style="standard") {
		$dividedAmount=$amount/pow(10,$this->conf["divisorPlaces"]);

		switch ($style) {
			case "hyphenated":
				if (!$amount)
					return "-";

				return $this->format($amount,"standard");
				break;

			case "standard":
				$dividedAmount=Currency::toString($dividedAmount);
				if (array_key_exists("symbol",$this->conf))
					$dividedAmount.=" ".$this->conf["symbol"];
				break;

			case "number":
				break;

			case "string":
				return Currency::toString($dividedAmount);
				break;

			default:
				throw new \Exception("Unknown currency format style");
		}

		return $dividedAmount;
	}

	public function parseInput($input) {
		$amount=floatval($input)*pow(10,$this->conf["divisorPlaces"]);

		return $amount;
	}

	public function processForUser($userId) {
		if (!$userId)
			throw new \Exception("No user id.");

		if (array_key_exists("process_cb",$this->conf))
			$this->conf["process_cb"]($this->getId(),$userId);
	}

	public function processForCurrentUser() {
		$u=wp_get_current_user();

		if (!$u || !$u->ID)
			throw new \Exception("No current user");

		$this->processForUser($u->ID);
	}

	public function getReservedForCurrentUser() {
		$u=wp_get_current_user();

		if (!$u || !$u->ID)
			throw new \Exception("No current user");

		$amount=0;
		if (isset($this->conf["reserved_cb"]))
			$amount=$this->conf["reserved_cb"]($this->getId(),$u->ID);

		return $amount;
	}

	public function getRakeAccount() {
		return Account::getRakeAccount($this->getId());
	}

	public function isAvailableToCurrentUser() {
		if (!isset($this->conf["capability"]))
			return TRUE;

		return current_user_can($this->conf["capability"]);
	}
}
