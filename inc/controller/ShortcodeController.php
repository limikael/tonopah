<?php

namespace tonopah;

require_once __DIR__."/../utils/HtmlUtil.php";
require_once __DIR__."/../utils/Template.php";
require_once __DIR__."/../utils/WpUtil.php";

class ShortcodeController extends Singleton {
	protected function __construct() {
		add_shortcode("tonopah_cashgame_list",array($this,"tonopah_cashgame_list"));
		add_shortcode("tonopah_tournament_list",array($this,"tonopah_tournament_list"));
		add_shortcode("tonopah_ply_balance",array($this,"tonopah_ply_balance"));
		add_shortcode("tonopah_ply_topup_button",array($this,"tonopah_ply_topup_button"));
	}

	public function tonopah_cashgame_list($args) {
		$cashGameViews=array();
		foreach (MoneyGame::findPublishedCashGames() as $cashGame) {
			$stake=$cashGame->getMeta("stake");
			$blinds=($stake/2)."/".$stake." ".$cashGame->getMeta("currency");

			$cashGameViews[]=array(
				"name"=>$cashGame->getName(),
				"blinds"=>$blinds,
				"players"=>$cashGame->getNumPlayers(),
				"link"=>get_permalink($cashGame->getId())
			);
		}

		$vars=array(
			"cashGames"=>$cashGameViews
		);

		$t=new Template(__DIR__."/../tpl/cashgame-list.tpl.php");
		return $t->render($vars);
	}

	public function tonopah_tournament_list($args) {
		$time=time();
		$tournamentViews=array();
		foreach (MoneyGame::findPublishedTournaments() as $tournament) {
			$startTime=$tournament->getMeta("startTime");
			if ($startTime<$time)
				$starts="Started";

			else
				$starts=get_date_from_gmt("@".$tournament->getMeta("startTime"),"j M, H:i");

			$tournamentViews[]=array(
				"name"=>$tournament->getName(),
				"starts"=>$starts,
				"fee"=>$tournament->getMeta("fee")." ".$tournament->getMeta("currency"),
				"players"=>$tournament->getNumPlayers(),
				"link"=>get_permalink($tournament->getId())
			);
		}

		$vars=array(
			"tz"=>WpUtil::getCurrentTimeZoneOffsetString(),
			"tournaments"=>$tournamentViews
		);

		$t=new Template(__DIR__."/../tpl/tournament-list.tpl.php");
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