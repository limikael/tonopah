<?php
/**
 * Class MoneyGameTest
 *
 * @package Tonopah
 */

require_once __DIR__."/../../inc/model/MoneyGame.php";

use tonopah\MoneyGame;
use tonopah\Account;

/**
 * Sample test case.
 */
class MoneyGameTest extends WP_UnitTestCase {

	public function setUp() {
		global $post;

		$postId=wp_insert_post(array(
			"post_type"=>"cashgame",
			"post_status"=>"publish"
		));
		$post=get_post($postId);
	}

	/**
	 * A single example test.
	 */
	public function test_getCurrent() {
		$game=MoneyGame::getCurrent();
		$this->assertNotNull($game);
	}

	public function test_setBalances() {
		$game=MoneyGame::getCurrent();
		$game->setUserBalance("micke",123);
		$this->assertEquals($game->getUserBalance("micke"),123);

		$game->setMeta("userBalances",array(
			"micke"=>456
		));

		$this->assertEquals($game->getUserBalance("micke"),456);
	}

	public function test_addAndRemoveUsers() {
		wp_create_user("testson","123","testson@asdf.com");
		Account::getUserAccount(get_user_by("login","testson")->ID,"ply")->deposit(1000);

		wp_create_user("testson2","456","testson2@asdf.com");
		Account::getUserAccount(get_user_by("login","testson2")->ID,"ply")->deposit(1000);

		$game=MoneyGame::getCurrent();
		$game->setMeta("currency","ply");

		$game->addUser("testson",123);
		$game->addUser("testson2",456);

		$this->assertEquals($game->getUserBalance("testson"),123);
		$this->assertEquals($game->getUserBalance("testson2"),456);
		$this->assertEquals($game->getAccount()->getBalance(),123+456);

		$a=Account::getUserAccount(get_user_by("login","testson")->ID,"ply");
		$this->assertEquals($a->getBalance(),1000-123);

		$game->removeUser("testson");
		$a=Account::getUserAccount(get_user_by("login","testson")->ID,"ply");
		$this->assertEquals($a->getBalance(),1000);

		$this->assertEquals($game->getAccount()->getBalance(),456);
		$this->assertEquals(array_keys($game->getMeta("userBalances")),array("testson2"));
	}

	public function test_updateBalances() {
		wp_create_user("testson","123","testson@asdf.com");
		wp_create_user("testson2","456","testson2@asdf.com");

		$game=MoneyGame::getCurrent();
		$game->setMeta("currency","ply");

		$game->addUser("testson",123);
		$game->addUser("testson2",456);

		$this->assertEquals($game->getUserBalance("testson"),123);
		$this->assertEquals($game->getUserBalance("testson2"),456);
		$this->assertEquals($game->getAccount()->getBalance(),123+456);

		$game->updateUserBalances(array(
			"testson"=>579,
			"testson2"=>0
		));

		/*$this->expectException(Exception::class);
		$game->updateUserBalances(array(
			"testson"=>579
		));*/
	}
}
