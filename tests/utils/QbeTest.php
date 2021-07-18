<?php
/**
 * Class MoneyGameTest
 *
 * @package Tonopah
 */

require_once __DIR__."/../../inc/utils/Qbe.php";

use tonopah\Qbe;

/**
 * Sample test case.
 */
class QbeTest extends WP_UnitTestCase {
	public function test_getQuery() {
		$qbe=new Qbe(array(
			"test"=>1,
			"test2"=>2,
			array(
				array(
					"a"=>"b",
					array(
						array(
							"o!"=>"z"
						),

						array(
							"oo<"=>"zz"
						),
					)
				),
				array(
					"x"=>130,
					"y"=>100
				),
			),
			"test3"=>123,
		));

		/*print_r($qbe->getClause());
		print_r($qbe->getParams());*/

		$this->assertEquals(8,sizeof($qbe->getParams()));
	}
}
