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
			"mock"=>"true",
			"accountLink"=>"",
			"loginLink"=>"",
			"resourceUrl"=>TONOPAH_URL."/res"
		));
	}

	public function tonopah_cashgame_list($args) {
		$cashGameViews=array();
		foreach (MoneyGame::findPublishedCashGames() as $cashGame) {
			$currency=$cashGame->getCurrency();
			if ($currency) {
				$currencyConf=$currency->getConf();

				if ($currency->isAvailableToCurrentUser()) {
					$stake=$cashGame->getMeta("stake");
					$blinds=$currency->format($stake/2,"string")." / ".$currency->format($stake);

					$cashGameViews[]=array(
						"name"=>$cashGame->getName(),
						"blinds"=>$blinds,
						"players"=>$cashGame->getNumPlayers(),
						"link"=>get_permalink($cashGame->getId()),
						"logo"=>$currencyConf["logo"],
					);
				}
			}
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
			$currency=$tournament->getCurrency();
			$currencyConf=$currency->getConf();

			if ($currency->isAvailableToCurrentUser()) {
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
					$feeDisplay=
						$currency->format($tournament->getMeta("fee"),"string")." + ".
						$currency->format($tournament->getMeta("rakeFee"));

					$tournamentViews[]=array(
						"name"=>$tournament->getName(),
						"starts"=>$starts,
						"fee"=>$feeDisplay,
						"players"=>$tournament->getNumPlayers(),
						"link"=>get_permalink($tournament->getId()),
						"logo"=>$currencyConf["logo"],
					);
				}
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
		$currency=TonopahPlugin::instance()->getCurrencyById($_REQUEST["currency"]);
		if (!$currency->isAvailableToCurrentUser())
			throw new \Exception("Currency not available");

		$currencyConf=$currency->getConf();
		$currency->processForCurrentUser(array());

		$tabs=array();
		$tabs[]=array(
			"title"=>"History",
			"link"=>sprintf("?currency=%s",esc_attr($currency->getId())),
		);

		if (array_key_exists("account_page_cb",$currencyConf)) {
			$currencyConf["account_page_cb"]($currency->getId());
		}

		if (array_key_exists("account_page_tabs",$currencyConf)) {
			foreach ($currencyConf["account_page_tabs"] as $i=>$tab) {
				$tabs[]=array(
					"title"=>$tab["title"],
					"link"=>sprintf("?currency=%s&tab=%s",
						esc_attr($currency->getId()),
						esc_attr($i+1)
					),
				);
			}
		}

		$vars=array(
			"tabs"=>$tabs,
			"selectedTabIndex"=>0,
			"logo"=>$currencyConf["logo"],
			"title"=>$currencyConf["title"]
		);

		if (array_key_exists("tab",$_REQUEST) && $_REQUEST["tab"]) {
			$tabIndex=$_REQUEST["tab"];
			$vars["selectedTabIndex"]=$tabIndex;

			$tabIndex--;
			$tab=$currencyConf["account_page_tabs"][$tabIndex];

			if ($tab["cb"])
				$vars["tabContent"]=$tab["cb"]($currency->getId());

			else
				$vars["tabContent"]="";
		}

		else {
			$vars["tabContent"]=UserController::instance()->renderTransactionTable($user,$currency);
		}

		$account=Account::getUserAccount($user->ID,$currency->getId());
		$vars["balanceText"]=$account->formatBalance();

		$currency=$account->getCurrency();
		$reservedAmount=MoneyGame::getTotalBalancesForUser(
			$currency->getId(),
			$user->user_login
		);

		$reservedAmount+=$account->getReserved();
		$vars["reservedText"]=$currency->format($reservedAmount,"hyphenated");

		$vars["notices"]=TonopahPlugin::instance()->renderAccountNotices();

		$t=new Template(__DIR__."/../tpl/account-detail.tpl.php");
		return $t->render($vars);

	}

	public function tonopah_account($args) {
		if (array_key_exists("currency",$_REQUEST))
			return $this->tonopah_account_detail($args);

		$url=get_post_permalink(get_option("tonopah_account_page_id"));
		$user=wp_get_current_user();
		$currencies=TonopahPlugin::instance()->getCurrencies();
		$currencyViews=array();
		foreach ($currencies as $currency) {
			if ($currency->isAvailableToCurrentUser()) {
				$account=Account::getUserAccount($user->ID,$currency->getId());
				$currencyConf=$currency->getConf();
				$currencyUrl=add_query_arg("currency",$currency->getId(),$url);
				$currencyViews[]=array(
					"balance"=>$account->formatBalance(),
					"symbol"=>$currency->getSymbol(),
					"id"=>$currency->getId(),
					"title"=>$currencyConf["title"],
					"logo"=>$currencyConf["logo"],
					"url"=>$currencyUrl
				);
			}
		}

		$t=new Template(__DIR__."/../tpl/account-list.tpl.php");
		return $t->render(array(
			"currencies"=>$currencyViews
		));
	}
}