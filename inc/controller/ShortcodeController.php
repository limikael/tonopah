<?php

namespace tonopah;

require_once __DIR__."/../utils/HtmlUtil.php";
require_once __DIR__."/../utils/Template.php";

class ShortcodeController extends Singleton {
	protected function __construct() {
		add_shortcode("tonopah_cashgame_list",array($this,"tonopah_cashgame_list"));
		add_shortcode("tonopah_ply_balance",array($this,"tonopah_ply_balance"));
		add_shortcode("tonopah_ply_topup_button",array($this,"tonopah_ply_topup_button"));
	}

	public function tonopah_cashgame_list($args) {
		$cashGameViews=array();
		foreach (CashGame::findAll() as $cashGame) {
			$stake=$cashGame->getMeta("stake");
			$blinds=($stake/2)."/".$stake." ".$cashGame->getMeta("currency");

			$cashGameViews[]=array(
				"name"=>$cashGame->getName(),
				"blinds"=>$blinds,
				"players"=>$cashGame->getMetaInt("numPlayers"),
				"link"=>get_permalink($cashGame->getId())
			);
		}

		$vars=array(
			"cashGames"=>$cashGameViews
		);

		$t=new Template(__DIR__."/../tpl/cashgame-list.tpl.php");
		return $t->render($vars);
	}

	public function tonopah_ply_balance($args) {
		$user=wp_get_current_user();
		$account=Account::getUserPlyAccount($user->ID);

		$vars=array(
			"balance"=>$account->getBalance()
		);

		$t=new Template(__DIR__."/../tpl/ply-balance.tpl.php");
		return $t->render($vars);
	}

	public function tonopah_ply_topup_button($args) {
		$user=wp_get_current_user();
		$account=Account::getUserPlyAccount($user->ID);

		$vars=array(
		);

		$t=new Template(__DIR__."/../tpl/ply-topup.tpl.php");
		return $t->render($vars);
	}
}