<?php

namespace tonopah;

class MoneyGame {
	private $post;

	private function __construct($post) {
		if (!$post)
			throw new \Exception("not a post");

		if ($post->post_type!="cashgame" && $post->post_type!="tournament")
			throw new \Exception("not a cashgame or tournament");

		$this->post=$post;
	}

	public function getConf() {
		$res=array(
			"id"=>$this->getId(),
			"name"=>$this->getName(),
			"currency"=>$this->getMeta("currency"),
			"gameState"=>$this->getMeta("gameState"),
			"userBalances"=>$this->getMeta("userBalances"),
			"type"=>$this->getPostType(),
			"status"=>$this->getStatus(),
			"aquireCode"=>$this->getMeta("aquireCode")
		);

		if ($this->getPostType()=="cashgame") {
			$res["stake"]=$this->getMeta("stake");
			$res["minSitInAmount"]=$this->getMeta("minSitInAmount");
			$res["maxSitInAmount"]=$this->getMeta("maxSitInAmount");
		}

		if ($this->getPostType()=="tournament") {
			$res["startTime"]=$this->getMeta("startTime")*1000;
			$res["fee"]=$this->getMeta("fee");
			$res["startChips"]=$this->getMeta("startChips");
		}

		return $res;
	}

	public function aquire() {
		if ($this->getMeta("aquireCode")) {
			$this->removeAllUsers();
			$this->setMeta("gameState",NULL);
		}

		if (!$this->getMeta("gameState") && 
				$this->getStatus()!="publish")
			throw new \Exception("Not published");

		$this->setMeta("aquireCode",uniqid());
	}

	public function checkAquire($aquireCode) {
		$currentAquireCode=$this->getMeta("aquireCode");

		if (!$currentAquireCode)
			throw new \Exception("not aquired");

		if (!$aquireCode)
			throw new \Exception("no aquire code");

		if ($currentAquireCode!=$aquireCode)
			throw new \Exception("bad aquire code");
	}

	public function releaseAquire() {
		$this->setMeta("aquireCode",NULL);
	}

	public function isAquired() {
		if ($this->getMeta("aquireCode"))
			return TRUE;

		return FALSE;
	}

	public function getPostType() {
		return $this->post->post_type;
	}

	public function getStatus() {
		return $this->post->post_status;
	}

	public function getId() {
		return $this->post->ID;
	}

	public function getName() {
		return $this->post->post_title;
	}

	public function getMeta($meta) {
		return get_post_meta($this->post->ID,$meta,TRUE);
	}

	public function getMetaInt($meta) {
		return intval(get_post_meta($this->post->ID,$meta,TRUE));
	}

	public function setMeta($meta, $value) {
		update_post_meta($this->getId(),$meta,$value);
	}

	public function getNumPlayers() {
		$balances=$this->getMeta("userBalances");
		if (!$balances)
			$balances=array();

		return count($balances);
	}

	public function getUserBalance($user) {
		$balances=$this->getMeta("userBalances");
		if (!$balances)
			$balances=array();

		if (!array_key_exists($user,$balances))
			return 0;

		return intval($balances[$user]);
	}

	public function setUserBalance($user, $amount) {
		$balances=$this->getMeta("userBalances");
		if (!$balances)
			$balances=array();

		if (!$amount) {
			if (array_key_exists($user,$balances))
				unset($balances[$user]);
		}

		else
			$balances[$user]=$amount;

		$this->setMeta("userBalances",$balances);
	}

	public function addUser($userLogin, $amount) {
		$amount=intval($amount);

		$user=get_user_by("login",$userLogin);
		if (!$user)
			throw new \Exception("Unknown user.");

		$userAccount=new Account($this->getMeta("currency"),"user",$user->ID);
		Account::transact($userAccount,$this->getAccount(),$amount,"Join game");

		$this->setUserBalance($user->user_login,$amount);
	}

	public function removeUser($userLogin) {
		$user=get_user_by("login",$userLogin);
		if (!$user)
			throw new Exception("Unknown user.");

		$amount=$this->getUserBalance($userLogin);

		$userAccount=new Account($this->getMeta("currency"),"user",$user->ID);
		Account::transact($this->getAccount(),$userAccount,$amount,"Leave");

		$this->setUserBalance($user->user_login,0);
	}

	public function removeAllUsers() {
		$balances=$this->getMeta("userBalances");
		if (!$balances)
			$balances=array();

		$users=array_keys($balances);
		foreach ($users as $user)
			$this->removeUser($user);
	}

	public function updateUserBalances($balances) {
		if (!is_array($balances))
			$balances=array();

		$currentBalances=$this->getMeta("userBalances");
		if (!is_array($currentBalances))
			$currentBalances=array();

		/*if (array_keys($currentBalances)!=array_keys($balances)) {
			error_log("current: ".json_encode($currentBalances));
			error_log("new: ".json_encode($balances));
			throw new \Exception("Not all users accounted for when updating balances.");
		}*/

		$this->setMeta("userBalances",$balances);
	}

	public static function getCurrent() {
		global $post;

		if ($post) {
			if ($post->post_type=="cashgame" ||
					$post->post_type=="tournament")
				return new MoneyGame($post);
		}
	}

	public static function findOneById($id) {
		$post=get_post($id);

		//error_log(print_r($post,TRUE));

		return new MoneyGame($post);
	}

	public static function findPublishedCashGames() {
		$posts=get_posts(array(
			"numberposts"=>-1,
			"post_type"=>"cashgame"
		));

		$res=array();
		foreach ($posts as $post)
			$res[]=new MoneyGame($post);

		return $res;
	}

	public static function findPublishedTournaments() {
		$posts=get_posts(array(
			"numberposts"=>-1,
			"post_type"=>"tournament"
		));

		$res=array();
		foreach ($posts as $post)
			$res[]=new MoneyGame($post);

		return $res;
	}

	public function getAccount() {
		return new Account($this->getMeta("currency"),"post",$this->getId());
	}

	public function reset() {
		$this->removeAllUsers();
		$this->setMeta("gameState",NULL);

		if ($this->isAquired()) {
			$this->setMeta("aquireCode",NULL);
			TonopahPlugin::instance()->serverRequest("killGame",array(
				"id"=>$this->getId()
			));
		}
	}

	public function reloadGameConf() {
		TonopahPlugin::instance()->serverRequest("reloadGameConf",array(
			"id"=>$this->getId()
		));
	}

	public function getServerState() {
		if ($this->isAquired())
			return "running";

		if ($this->getMeta("gameState"))
			return "suspended";

		return "none";
	}
}