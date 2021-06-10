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

		$postIds=get_posts(array(
			"post_status"=>"any",
			"fields"=>"ids",
			"post_type"=>array("cashgame","tournament")
		));

		foreach ($postIds as $postId)
			wp_delete_post($postId,TRUE);

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
		$a=Account::getUserAccount(get_user_by("login","testson")->ID,"ply");
		$a->createDepositTransaction(1000)->perform();

		wp_create_user("testson2","456","testson2@asdf.com");
		$a=Account::getUserAccount(get_user_by("login","testson2")->ID,"ply");
		$a->createDepositTransaction(1000)->perform();

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

		$this->assertEquals(123,$game->getUserBalance("testson"));
		$this->assertEquals(456,$game->getUserBalance("testson2"));
		$this->assertEquals(123+456,$game->getAccount()->getBalance());

		$game->updateUserBalances(array(
			"testson"=>579,
			"testson2"=>0
		));

		$game->updateUserBalances(array(
			"testson2"=>0,
			"testson"=>579
		));

		try {
			$game->updateUserBalances(array(
				"testson"=>578,
				"testson2"=>0
			));
			$this->assertNull("Expected exception");
		}

		catch (\Exception $e) {
			$this->assertEquals("Balances don't add up!",$e->getMessage());
		}

		try {
			$game->updateUserBalances(array(
				"testson"=>579
			));
			$this->assertNull("Expected exception");
		}

		catch (\Exception $e) {
			$this->assertEquals("Not all users accounted for when updating balances.",$e->getMessage());
		}
	}

	public function test_getTotalBalances() {
		global $post;

		wp_create_user("testson","123","testson@asdf.com");
		$a=Account::getUserAccount(get_user_by("login","testson")->ID,"ply");
		$a->createDepositTransaction(1000)->perform();

		wp_create_user("testson2","456","testson2@asdf.com");
		$a=Account::getUserAccount(get_user_by("login","testson2")->ID,"ply");
		$a->createDepositTransaction(1000)->perform();

		$game=MoneyGame::getCurrent();
		$game->setMeta("currency","ply");

		$game->addUser("testson",123);
		$game->addUser("testson2",456);

		$postId=wp_insert_post(array(
			"post_type"=>"cashgame",
			"post_status"=>"publish"
		));
		$post=get_post($postId);

		$game2=MoneyGame::getCurrent();
		$game2->setMeta("currency","ply");

		$game2->addUser("testson",100);
		$game2->addUser("testson2",200);

		$total=MoneyGame::getTotalBalancesByUser("ply");
		$this->assertEquals(array(
			"testson2"=>656,
			"testson"=>223
		),$total);
	}
}
