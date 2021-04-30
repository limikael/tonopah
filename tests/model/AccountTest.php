<?php
/**
 * Class MoneyGameTest
 *
 * @package Tonopah
 */

require_once __DIR__."/../../inc/model/Account.php";
require_once __DIR__."/../../inc/model/Transaction.php";

use tonopah\Transaction;
use tonopah\Account;

/**
 * Test accounting.
 */
class AccountTest extends WP_UnitTestCase {

	public function setUp() {
		Transaction::uninstall();
		Transaction::install();
	}

	/**
	 * Deposit and withdraw.
	 */
	public function test_getDepositWithdraw() {
		wp_create_user("testson","123","testson@asdf.com");
		$user=get_user_by("login","testson");

		$account=Account::getUserAccount($user->ID,"ply");
		$account->createDepositTransaction(1000)->perform();
		$account->createWithdrawTransaction(500)->perform();

		$this->assertEquals(500,$account->getBalance());

		$transactions=Transaction::findAll();
		$this->assertEquals(2,count($transactions));

		$t=$transactions[0];
		$this->assertEquals(1000,$t->amount);
		$this->assertEquals("ply",$t->currency);
		$this->assertEquals($user->ID,$t->to_id);

		$t=$transactions[1];
		$this->assertEquals(500,$t->amount);
		$this->assertEquals("ply",$t->currency);
		$this->assertEquals($user->ID,$t->from_id);
	}

	/**
	 * Send.
	 */
	public function test_send() {
		wp_create_user("testson2","123","testson2@asdf.com");
		$user=get_user_by("login","testson2");

		$postId=wp_insert_post(array(
			"post_type"=>"page"
		));
		update_post_meta($postId,"currency","ply");

		$userAccount=Account::getUserAccount($user->ID,"ply");
		$postAccount=Account::getPostAccount($postId);

		$userAccount->createDepositTransaction(1000)->perform();
		$this->assertEquals(1000,$userAccount->getBalance());

		$userAccount->createSendTransaction($postAccount,400)->perform();
		$this->assertEquals(600,$userAccount->getBalance());
		$this->assertEquals(400,$postAccount->getBalance());

		$transactions=Transaction::findAll();
		$this->assertEquals(2,count($transactions));

		$t=$transactions[0];
		$this->assertEquals(1000,$t->amount);
		$this->assertEquals("ply",$t->currency);
		$this->assertEquals($user->ID,$t->to_id);

		$t=$transactions[1];
		$this->assertEquals(400,$t->amount);
		$this->assertEquals("ply",$t->currency);
		$this->assertEquals($user->ID,$t->from_id);
		$this->assertEquals($postId,$t->to_id);
	}
}
