<?php

require_once __DIR__."/../../inc/model/Currency.php";

use tonopah\Currency;

class CurrencyTest extends WP_UnitTestCase {

	public function test_format() {
		$formatter=new Currency(array(
			"id"=>"test-currency",
			"divisorPlaces"=>2,
			"symbol"=>"mBTC"
		));

		$s=$formatter->format(120);
		$this->assertEquals("1.2 mBTC",$s);
	}
}
