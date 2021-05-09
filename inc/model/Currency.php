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

	public function getId() {
		return $this->conf["id"];
	}

	public function getSymbol() {
		return $this->conf["symbol"];
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
		$amount=$amount/pow(10,$this->conf["divisorPlaces"]);

		switch ($style) {
			case "standard":
				$amount=Currency::toString($amount);
				if (array_key_exists("symbol",$this->conf))
					$amount.=" ".$this->conf["symbol"];
				break;

			case "number":
				break;

			case "string":
				return Currency::toString($amount);
				break;

			default:
				throw new \Exception("Unknown currency format style");
		}

		return $amount;
	}

	public function parseInput($input) {
		$amount=floatval($input)*pow(10,$this->conf["divisorPlaces"]);

		return $amount;
	}
}
