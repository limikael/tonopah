<?php

namespace tonopah;

require_once __DIR__."/../utils/Singleton.php";
require_once __DIR__."/../model/MoneyGame.php";
require_once __DIR__."/../model/Account.php";

class BackendController extends Singleton {
	protected function __construct() {
		add_action("wp_ajax_tonopah",array($this,"dispatch"));
		add_action("wp_ajax_nopriv_tonopah",array($this,"dispatch"));
	}

	/**
	 * Get game.
	 */
	public function getGame($p) {
		$game=MoneyGame::findOneById($p["id"]);
		if (!$game)
			throw new \Exception("Game doesn't exist");

		// todo...test with aquire....
		if (!$game->getMeta("gameState") && $game->getStatus()!="publish")
			throw new \Exception("Game is not published");

		$res=array(
			"id"=>$game->getId(),
			"name"=>$game->getName(),
			"currency"=>$game->getMeta("currency"),
			"gameState"=>$game->getMeta("gameState"),
			"userBalances"=>$game->getMeta("userBalances"),
			"type"=>$game->getPostType(),
			"status"=>$game->getStatus()
		);

		if ($game->getPostType()=="cashgame") {
			$res["stake"]=$game->getMeta("stake");
			$res["minSitInAmount"]=$game->getMeta("minSitInAmount");
			$res["maxSitInAmount"]=$game->getMeta("maxSitInAmount");
		}

		if ($game->getPostType()=="tournament") {
			$res["startTime"]=$game->getMeta("startTime")*1000;
			$res["fee"]=$game->getMeta("fee");
			$res["startChips"]=$game->getMeta("startChips");
		}

		return $res;
	}

	public function aquireGame($p) {
		$game=$this->getGame($p);
		return $game;
	}

	/**
	 * Save table state.
	 */
	public function syncGame($p) {
		$game=MoneyGame::findOneById($p["id"]);
		if (!$game)
			throw new \Exception("Game doesn't exist");

		if (array_key_exists("userBalancesJson",$p)) {
			$balances=json_decode($p["userBalancesJson"],true);
			$game->updateUserBalances($balances);
		}

		if (array_key_exists("gameStateJson",$p)) {
			$gameState=json_decode($p["gameStateJson"],true);
			$game->setMeta("gameState",$gameState);
		}
	}

	/**
	 * Join cashgame.
	 */
	public function addGameUser($p) {
		$game=MoneyGame::findOneById($p["id"]);
		$game->addUser($p["user"],$p["amount"]);
	}

	/**
	 * Leave cashgame.
	 */
	public function removeGameUser($p) {
		$game=MoneyGame::findOneById($p["id"]);
		$game->removeUser($p["user"]);
	}

	/**
	 * Remove all users.
	 */
	public function removeAllGameUsers($p) {
		$game=MoneyGame::findOneById($p["id"]);
		$game->removeAllUsers();
	}

	/**
	 * Get user info by token
	 */
	public function getUserInfoByToken($p) {
		if (session_id())
			session_commit();

		session_id($p["token"]);
		session_start();

		$user=NULL;

		if (array_key_exists("tonopah_user_id",$_SESSION))
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
	 * Handle call.
	 */
	public function dispatch() {
		$request=array();
		foreach ($_REQUEST as $k=>$v)
			$request[$k]=stripslashes($v);

		//error_log(print_r($_REQUEST,TRUE));

		$method=$request["call"];

		try {
			if (!method_exists($this, $method))
				throw new \Exception("Unknown method: ".$method);

			$key="";
			if (array_key_exists("key",$request))
				$key=$request["key"];

			if ($key!=get_option("tonopah_key"))
				throw new \Exception("Wrong key");

			$res=$this->$method($request);
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