<?php

namespace tonopah;

require_once __DIR__."/../utils/HtmlUtil.php";
require_once __DIR__."/../utils/Template.php";
require_once __DIR__."/../utils/WpUtil.php";

class ShortcodeController extends Singleton {
	protected function __construct() {
		add_shortcode("tonopah_cashgame_list",array($this,"tonopah_cashgame_list"));
		add_shortcode("tonopah_tournament_list",array($this,"tonopah_tournament_list"));
		add_shortcode("tonopah_mock_table",array($this,"tonopah_mock_table"));
		add_shortcode("tonopah_account",array($this,"tonopah_account"));
	}

	public function tonopah_mock_table() {
		$t=new Template(__DIR__."/../tpl/table.tpl.php");
		return $t->render(array(
			"serverUrl"=>"",
			"mock"=>"true"
		));
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

			$display=TRUE;
			$gameState=$tournament->getMeta("gameState");
			if ($gameState) {
				if ($gameState["state"]=="canceled" || $gameState["state"]=="finished")
					$display=FALSE;
			}

			if ($display) {
				$tournamentViews[]=array(
					"name"=>$tournament->getName(),
					"starts"=>$starts,
					"fee"=>$tournament->getMeta("fee")." ".$tournament->getMeta("currency"),
					"players"=>$tournament->getNumPlayers(),
					"link"=>get_permalink($tournament->getId())
				);
			}
		}

		$vars=array(
			"tz"=>WpUtil::getCurrentTimeZoneOffsetString(),
			"tournaments"=>$tournamentViews
		);

		$t=new Template(__DIR__."/../tpl/tournament-list.tpl.php");
		return $t->render($vars);
	}

	public function tonopah_account($args) {
		$user=wp_get_current_user();

		if (array_key_exists("currency",$_REQUEST)) {
			$currency=TonopahPlugin::instance()->getCurrencyByCode($_REQUEST["currency"]);
			$vars=array(
				"extra"=>"",
				"transactions"=>array()
			);

			if (array_key_exists("account_page_cb",$currency)) {
				$vars["extra"]=$currency["account_page_cb"]();
			}

			$account=Account::getUserAccount($user->ID,$currency["code"]);
			$vars["balanceText"]=$account->getBalance()." ".$currency["code"];

			$t=new Template(__DIR__."/../tpl/account-detail.tpl.php");
			return $t->render($vars);
		}

		else {
			$currencies=TonopahPlugin::instance()->getCurrencies();
			foreach ($currencies as &$currency) {
				$account=Account::getUserAccount($user->ID,$currency["code"]);
				$currency["balance"]=$account->getBalance();
			}

			$t=new Template(__DIR__."/../tpl/account-list.tpl.php");
			return $t->render(array(
				"currencies"=>$currencies
			));
		}
	}
}