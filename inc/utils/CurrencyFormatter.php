<?php

namespace tonopah;

class CurrencyFormatter {
	private $options;

	public function __construct($options) {
		$this->options=$options;

		if (!array_key_exists("divisorPlaces",$this->options))
			$this->options["divisorPlaces"]=0;
	}

	private static function toString($number) {
		$s=sprintf("%.10f",$number);
		$s=rtrim($s,"0");
		$s=rtrim($s,".");
		return $s;
	}

	public function format($amount, $style="standard") {
		$amount=$amount/pow(10,$this->options["divisorPlaces"]);

		switch ($style) {
			case "standard":
				$amount=CurrencyFormatter::toString($amount);
				if (array_key_exists("symbol",$this->options))
					$amount.=" ".$this->options["symbol"];
				break;

			case "number":
				break;

			case "string":
				return CurrencyFormatter::toString($amount);
				break;

			default:
				throw new \Exception("Unknown currency format style");
		}

		return $amount;
	}

	public function parseInput($input) {
		$amount=floatval($input)*pow(10,$this->options["divisorPlaces"]);

		return $amount;
	}
}
