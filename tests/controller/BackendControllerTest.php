<?php
/**
 * Class MoneyGameTest
 *
 * @package Tonopah
 */

require_once __DIR__."/../../inc/controller/BackendController.php";

use tonopah\BackendController;
use tonopah\MoneyGame;
use tonopah\Account;

/**
 * Sample test case.
 */
class BackendControllerTest extends WP_UnitTestCase {

	public function setUp() {
		global $post;

		BackendController::instance();

		$postId=wp_insert_post(array(
			"post_type"=>"cashgame"
		));
		$post=get_post($postId);

		$game=MoneyGame::getCurrent();
		$game->setMeta("currency","ply");
	}

	/**
	 * A single example test.
	 */
	public function test_addRemoveGameUser() {
		wp_create_user("testson","123","testson@asdf.com");

		BackendController::instance()->addGameUser(array(
			"id"=>MoneyGame::getCurrent()->getId(),
			"user"=>"testson",
			"amount"=>"100"
		));

		$game=MoneyGame::getCurrent();
		$this->assertEquals($game->getAccount()->getBalance(),100);
		$this->assertEquals($game->getUserBalance("testson"),100);

		$a=Account::getUserPlyAccount(get_user_by("login","testson")->ID);
		$this->assertEquals($a->getBalance(),900);

		BackendController::instance()->removeGameUser(array(
			"id"=>MoneyGame::getCurrent()->getId(),
			"user"=>"testson"
		));

		$a=Account::getUserPlyAccount(get_user_by("login","testson")->ID);
		$this->assertEquals($a->getBalance(),1000);
		$this->assertEquals($game->getAccount()->getBalance(),0);
	}
}