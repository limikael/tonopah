<?php

namespace tonopah;

class CurrencyFormatter {
	private $options;

	public function __construct($options) {
		$this->options=$options;

		if (!array_key_exists("divisorPlaces",$this->options))
			$this->options["divisorPlaces"]=0;
	}

	public function format($amount, $style="standard") {
		$amount=$amount/pow(10,$this->options["divisorPlaces"]);
		$amount=strval($amount);

		if (array_key_exists("symbol",$this->options))
			$amount.=" ".$this->options["symbol"];

		return $amount;
	}
}
