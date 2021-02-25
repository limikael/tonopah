<?php

namespace tonopah;

require_once __DIR__."/../utils/Singleton.php";
require_once __DIR__."/../model/CashGame.php";
require_once __DIR__."/../model/Account.php";

class BackendController extends Singleton {
	protected function __construct() {
		add_action("wp_ajax_tonopah",array($this,"dispatch"));
		add_action("wp_ajax_nopriv_tonopah",array($this,"dispatch"));
	}

	/**
	 * Get all cash games.
	 */
	public function getCashGames($p) {
		$tableDatas=array();

		foreach (CashGame::findAll() as $cashGame)
			$tableDatas[]=BackendController::getCashGame(array(
				"tableId"=>$cashGame->getId()
			));

		return array(
			"tables"=>$tableDatas
		);
	}

	/**
	 * Get cash game state.
	 */
	public function getCashGame($p) {
		$cashGame=CashGame::findOneById($p["tableId"]);
		if (!$cashGame)
			throw new \Exception("Cash game doesn't exist");

		$res=array(
			"id"=>$cashGame->getId(),
			"name"=>$cashGame->getName(),
			"currency"=>$cashGame->getMeta("currency"),
			"stake"=>$cashGame->getMeta("stake"),
			"minSitInAmount"=>$cashGame->getMeta("minSitInAmount"),
			"maxSitInAmount"=>$cashGame->getMeta("maxSitInAmount"),
			"tableState"=>$cashGame->getMeta("tableState"),
			"runState"=>$cashGame->getMeta("runState")
		);

		return $res;
	}

	/**
	 * Save table state.
	 */
	public function saveCashGameTableState($p) {
		$cashGame=CashGame::findOneById($p["tableId"]);
		if (!$cashGame)
			throw new \Exception("Cash game doesn't exist");

		$cashGame->setMeta("tableState",$p["tableState"]);
		$cashGame->setMeta("runState",$p["runState"]);
	}

	/**
	 * Get user info by token
	 */
	public function getUserInfoByToken($p) {
		if (session_id())
			session_commit();

		session_id($p["token"]);
		session_start();

		$user=get_user_by("id",$_SESSION["tonopah_user_id"]);

		if (!$user)
			return;

		return array(
			"user"=>$user->user_login
		);
	}

	/**
	 * Get user balance.
	 */
	public function getUserBalance($p) {
		$account=Account::getUserPlyAccount($p["userId"]);

		return array(
			"balance"=>$account->getBalance()
		);
	}

	/**
	 * Join cashgame.
	 */
	public function joinCashGame($p) {
		$cashGame=Cashgame::findOneById($p["tableId"]);			
		if (!$cashGame)
			throw new Exception("Can't find game.");

		$cashGameAccount=$cashGame->getAccount();

		$user=get_user_by("login",$p["user"]);
		if (!$user)
			throw new \Exception("Unknown user.");

		$userAccount=new Account($cashGameAccount->getCurrency(),"user",$user->ID);

		Account::transact($userAccount,$cashGameAccount,$p["amount"],"Sit in");
	}

	/**
	 * Leave cashgame.
	 */
	public function leaveCashGame($p) {
		$cashGame=Cashgame::findOneById($p["tableId"]);			
		if (!$cashGame)
			throw new Exception("Can't find game.");

		$cashGameAccount=$cashGame->getAccount();

		$user=get_user_by("login",$p["user"]);
		if (!$user)
			throw new Exception("Unknown user.");

		$userAccount=new Account($cashGameAccount->getCurrency(),"user",$user->ID);

		Account::transact($cashGameAccount,$userAccount,$p["amount"],"Leave");
	}

	/**
	 * Handle call.
	 */
	public function dispatch() {
		//error_log(print_r($_REQUEST,TRUE));

		$method=$_REQUEST["call"];

		try {
			if (!method_exists($this, $method))
				throw new \Exception("Unknown method: ".$method);

			$key="";
			if (array_key_exists("key",$_REQUEST))
				$key=$_REQUEST["key"];

			if ($key!=get_option("tonopah_gameplay_key"))
				throw new \Exception("Wrong key");

			$res=$this->$method($_REQUEST);
		}

		catch (\Exception $e) {
			echo json_encode(array(
				"ok"=>0,
				"message"=>$e->getMessage()
			),JSON_PRETTY_PRINT)."\n";

			wp_die('','',array("response"=>500));
			exit;
		}

		$res["ok"]=1;
		echo json_encode($res,JSON_PRETTY_PRINT)."\n";
		wp_die();
	}
}