<?php

require_once __DIR__."/../../inc/utils/CurrencyFormatter.php";

use tonopah\CurrencyFormatter;

class CurrencyFormatterTest extends WP_UnitTestCase {

	public function test_format() {
		$formatter=new CurrencyFormatter(array(
			"divisorPlaces"=>2,
			"symbol"=>"mBTC"
		));

		$s=$formatter->format(120);
		$this->assertEquals("1.2 mBTC",$s);
	}
}
