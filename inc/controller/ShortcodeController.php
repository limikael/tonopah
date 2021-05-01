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

	public function tonopah_account_detail($args) {
		$user=wp_get_current_user();
		$currency=TonopahPlugin::instance()->getCurrencyByCode($_REQUEST["currency"]);

		$tabs=array();
		$tabs[]=array(
			"title"=>"History",
			"link"=>sprintf("?currency=%s",esc_attr($currency["code"])),
		);

		if (array_key_exists("account_page_cb",$currency)) {
			$currency["account_page_cb"]();
		}

		if (array_key_exists("account_page_tabs",$currency)) {
			foreach ($currency["account_page_tabs"] as $i=>$tab) {
				$tabs[]=array(
					"title"=>$tab["title"],
					"link"=>sprintf("?currency=%s&tab=%s",
						esc_attr($currency["code"]),
						esc_attr($i+1)
					),
				);
			}
		}

		$vars=array(
			"tabs"=>$tabs,
			"selectedTabIndex"=>0
		);

		if (array_key_exists("tab",$_REQUEST) && $_REQUEST["tab"]) {
			$tabIndex=$_REQUEST["tab"];
			$vars["selectedTabIndex"]=$tabIndex;

			$tabIndex--;
			$tab=$currency["account_page_tabs"][$tabIndex];

			if ($tab["cb"])
				$vars["tabContent"]=$tab["cb"]();
		}

		else {
			$transactions=Transaction::findAllByQuery(
				'SELECT   * ' .
				'FROM     :table ' .
				'WHERE    currency=%s '.
				'AND      ((from_type=%s AND from_id=%s) '.
				'         OR (to_type=%s AND to_id=%s)) '.
				'AND      status<>"ignore" '.
				'ORDER BY stamp DESC',
				$currency["code"],
				"user",$user->ID,
				"user",$user->ID
			);

			$transactionViews=array();
			foreach ($transactions as $transaction) {
				$account=Account::getUserAccount($user->ID,$currency["code"]);
				$other=$transaction->getOtherAccount($account);

				$transactionView=array(
					"stamp"=>$transaction->formatSiteTime(),
					"amount"=>$transaction->getRelativeAmount($account)." ".$transaction->currency,
					"entity"=>"-",
					"notice"=>$transaction->notice,
					"status"=>$transaction->status
				);

				if ($other)
					$transactionView["entity"]=$other->getDisplay();

				$transactionViews[]=$transactionView;
			}

			$vars["transactions"]=$transactionViews;
		}

		$account=Account::getUserAccount($user->ID,$currency["code"]);
		$vars["balanceText"]=$account->getBalance()." ".$currency["code"];

		$t=new Template(__DIR__."/../tpl/account-detail.tpl.php");
		return $t->render($vars);

	}

	public function tonopah_account($args) {
		if (array_key_exists("currency",$_REQUEST))
			return $this->tonopah_account_detail($args);

		$user=wp_get_current_user();
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