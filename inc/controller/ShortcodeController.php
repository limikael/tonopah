<?php

namespace tonopah;

require_once __DIR__."/../utils/HtmlUtil.php";
require_once __DIR__."/../utils/Template.php";

class ShortcodeController extends Singleton {
	protected function __construct() {
		add_shortcode("tonopah_cashgame_list",array($this,"tonopah_cashgame_list"));
	}

	public function tonopah_cashgame_list($args) {
		$cashGameViews=array();
		foreach (CashGame::findAll() as $cashGame) {
			$stake=$cashGame->getMeta("stake");
			$blinds=($stake/2)."/".$stake." ".$cashGame->getMeta("currency");

			$cashGameViews[]=array(
				"name"=>$cashGame->getName(),
				"blinds"=>$blinds,
				"players"=>$cashGame->getMetaInt("players")
			);
		}

		$vars=array(
			"cashGames"=>$cashGameViews
		);

		$t=new Template(__DIR__."/../tpl/cashgame-list.tpl.php");
		return $t->render($vars);
	}
}