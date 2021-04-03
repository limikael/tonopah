<?php

namespace tonopah;

class MoneyGame {
	private $post;

	private function __construct($post) {
		if (!$post || $post->post_type!="cashgame")
			throw new \Exception("not a cashgame");

		$this->post=$post;
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

	public function updateUserBalances($balances) {
		if (!is_array($balances))
			$balances=array();

		$currentBalances=$this->getMeta("userBalances");
		if (!is_array($currentBalances))
			$currentBalances=array();

		if (array_keys($currentBalances)!=array_keys($balances))
			throw new \Exception("Not all users accounted for when updating balances.");

		$this->setMeta("userBalances",$balances);
	}

	public static function getCurrent() {
		global $post;

		if ($post && $post->post_type=="cashgame")
			return new MoneyGame($post);
	}

	public static function findOneById($id) {
		$post=get_post($id);

		//error_log(print_r($post,TRUE));

		return new MoneyGame($post);
	}

	public static function findAll() {
		$posts=get_posts(array(
			"numberposts"=>-1,
			"post_type"=>"cashgame"
		));

		$res=array();
		foreach ($posts as $post)
			$res[]=new MoneyGame($post);

		return $res;
	}

	public function getAccount() {
		return new Account($this->getMeta("currency"),"cashgame",$this->getId());
	}
}