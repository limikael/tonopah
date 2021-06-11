<?php

namespace tonopah;

require_once __DIR__."/../utils/Template.php";
require_once __DIR__."/../utils/WpUtil.php";

class MoneyGameController extends Singleton {
	protected function __construct() {
		add_action("init",array($this,"init"));
		add_filter('the_content',array($this,"the_content"),10,1);
		add_filter("template_include",array($this,"template_include"),10,1);
		add_action("pre_get_posts",array($this,"pre_get_posts"));
		add_action("cmb2_admin_init",array($this,"cmb2_admin_init"));
		add_action("save_post",array($this,"save_post"),11,3);
		add_action('post_submitbox_misc_actions',array($this,"post_submitbox_misc_actions"));
	}

	public function registerPostTypes() {
		register_post_type("cashgame",array(
			'labels'=>array(
				'name'=>__( 'Cashgames' ),
				'singular_name'=>__( 'Cashgame' ),
				'not_found'=>__('No Cashgames.'),
				'add_new_item'=>__('Add New Cashgame'),
				'edit_item'=>__('Edit Cashgame')
			),
			'supports'=>array('title'),
			'public'=>true,
			"show_in_menu"=>"tonopah_settings"
		));

		register_post_type("tournament",array(
			'labels'=>array(
				'name'=>__( 'Tournaments' ),
				'singular_name'=>__( 'Tournament' ),
				'not_found'=>__('No Tournaments.'),
				'add_new_item'=>__('Add New Tournament'),
				'edit_item'=>__('Edit Tournament')
			),
			'supports'=>array('title'),
			'public'=>true,
			"show_in_menu"=>"tonopah_settings"
		));
	}

	public function init() {
		$this->registerPostTypes();
	}

	public function post_submitbox_misc_actions() {
		$game=MoneyGame::getCurrent();
		if (!$game)
			return;

		if ($game->getAccount())
			$balance=$game->getAccount()->formatBalance();

		else
			$balance="-";

		$t=new Template(__DIR__."/../tpl/post-box-gamestate.tpl.php");
		$t->display(array(
			"serverState"=>ucfirst($game->getServerState()),
			"balance"=>$balance
		));
	}

	private function getCurrencyOptions() {
		$currencyOptions=array();
		foreach (TonopahPlugin::instance()->getCurrencies() as $currency)
			$currencyOptions[$currency->getId()]=$currency->getId();

		return $currencyOptions;
	}

	public function escape_amount($value, $def) {
		if ($value==="")
			$value=$def["default"];

		$moneyGame=MoneyGame::getCurrent();
		$currency=$moneyGame->getCurrency();

		if ($currency)
			return $currency->format($value,"string");

		else
			return $value;
	}

	public function sanitize_amount($value, $def) {
		$currency=TonopahPlugin::instance()->getCurrencyById($_REQUEST["currency"]);

		if ($currency)
			return $currency->parseInput($value);

		else
			return $value;
	}

	public function escape_timestamp($value, $def) {
		if (!$value)
			$value=$def["default"];

		return ($value+(int)(get_option('gmt_offset')*HOUR_IN_SECONDS));
	}

	public function sanitize_timestamp($value, $def) {
		$value=strtotime($value["date"]." ".$value["time"]);
		return ($value-(int)(get_option('gmt_offset')*HOUR_IN_SECONDS));
	}

	private function initCashGameMetaBox() {
		$cmb=new_cmb2_box(array(
			"id"=>"tonopah_cashgame_settings",
			"title"=>"Game Settings",
			"object_types"=>array("cashgame"),
			"show_names"=>TRUE
		));

		$cmb->add_field(array(
			"name"=>"Currency",
			"id"=>"currency",
			"type"=>"select",
			"description"=>"Which currency should the game use?",
			"options"=>$this->getCurrencyOptions()
		));

		$cmb->add_field(array(
			"name"=>"Stake",
			"id"=>"stake",
			"type"=>"text_small",
			"escape_cb"=>array($this,"escape_amount"),
			"sanitization_cb"=>array($this,"sanitize_amount"),
			"description"=>"Same as the big blind.",
			"default"=>2
		));

		$cmb->add_field(array(
			"name"=>"Rake Percent",
			"id"=>"rakePercent",
			"type"=>"text_small",
			"description"=>"How much rake should we collect?",
			"default"=>5
		));

		$cmb->add_field(array(
			"name"=>"Rake Step",
			"id"=>"rakeStep",
			"type"=>"text_small",
			"description"=>"The steps for the rake, in percentage of stake.",
			"default"=>5
		));
	}

	private function initTournamentMetaBox() {
		$cmb=new_cmb2_box(array(
			"id"=>"tonopah_tournament_settings",
			"title"=>"Tournament Settings",
			"object_types"=>array("tournament"),
			"show_names"=>TRUE
		));

		$cmb->add_field(array(
			"name"=>"Currency",
			"id"=>"currency",
			"type"=>"select",
			"description"=>"Which currency should the tournament use?",
			"options"=>$this->getCurrencyOptions()
		));

		$cmb->add_field(array(
			"name"=>"Registration Fee",
			"id"=>"fee",
			"type"=>"text_small",
			"description"=>"The fee players need to pay in order to join the tournament.",
			"escape_cb"=>array($this,"escape_amount"),
			"sanitization_cb"=>array($this,"sanitize_amount"),
			"default"=>"10"
		));

		$tz=WpUtil::getCurrentTimeZoneOffsetString();
		$cmb->add_field(array(
			"name"=>"Start Time",
			"id"=>"startTime",
			"type"=>"text_datetime_timestamp",
			"description"=>"When does the tournament start? ($tz)",
			"escape_cb"=>array($this,"escape_timestamp"),
			"sanitization_cb"=>array($this,"sanitize_timestamp"),
			"default"=>time()+10*60
		));

		$cmb->add_field(array(
			"name"=>"Start Chips",
			"id"=>"startChips",
			"type"=>"text_small",
			"description"=>"How many chips will each player have at the start of the tournament?",
			"default"=>"1000"
		));

		$cmb->add_field(array(
			"name"=>"Initial Stake",
			"id"=>"stake",
			"type"=>"text_small",
			"description"=>"What is the big blind at the start of the tournament?",
			"default"=>"2"
		));

		$cmb->add_field(array(
			"name"=>"Level Duration",
			"id"=>"levelDuration",
			"type"=>"text_small",
			"description"=>"How long is each level in minutes?",
			"default"=>"5"
		));

		$cmb->add_field(array(
			"name"=>"Level Blind Increase",
			"id"=>"levelIncreasePercent",
			"type"=>"text_small",
			"description"=>"How many percent should the blinds increase each level?",
			"default"=>"75"
		));
	}

	public function cmb2_admin_init() {
		$this->initCashGameMetaBox();
		$this->initTournamentMetaBox();
	}

	public function pre_get_posts($query) {
		if ($query->is_singular() && 
				$query->is_main_query() && 
				array_key_exists("post_type", $query->query) &&
				in_array($query->query["post_type"],array("cashgame","tournament")))
			$query->is_page=TRUE;
	}

 	public function the_content($content) {
		if (in_the_loop() && is_main_query()) {
			if (is_singular("cashgame") || is_singular("tournament")) {
				$game=MoneyGame::getCurrent();

				$params=array(
					"gameId"=>$game->getId(),
					"gameType"=>$game->getPostType(),
					"token"=>session_id(),
				);

				$url=get_option("tonopah_serverurl");
				$url=str_replace("http://", "ws://", $url);
				$url=str_replace("https://", "wss://", $url);
				$url=$url."/?".http_build_query($params);

				$howtoLink=get_permalink(get_option("tonopah_howto_page_id"));
				$loginLink=get_permalink(get_option("tonopah_login_page_id"));
				$accountLink=get_permalink(get_option("tonopah_account_page_id"));

				$accountLink=add_query_arg(array(
					"currency"=>$game->getMeta("currency")
				),$accountLink);

				$t=new Template(__DIR__."/../tpl/table.tpl.php");
				return $t->render(array(
					"serverUrl"=>$url,
					"mock"=>"",
					"accountLink"=>$accountLink,
					"howtoLink"=>$howtoLink,
					"loginLink"=>$loginLink
				));
			}
		}

 		return $content;
 	}

 	public function template_include($template) {
 		if (is_main_query()) {
			if (is_singular("cashgame") || is_singular("tournament")) {
				global $post;

				//error_log("ti: ".$template);

				if ($post->post_type=="cashgame") {
					$t=locate_template(array(
						"cashgame.php",
						"moneygame.php",
						"page.php"
					));

					if ($t)
						$template=$t;
				}

				if ($post->post_type=="tournament") {
					$t=locate_template(array(
						"tournament.php",
						"moneygame.php",
						"page.php"
					));

					if ($t)
						$template=$t;
				}
			}
 		}

 		return $template;
 	}

 	public function save_post($id, $post, $update) {
 		if (!$update)
 			return;

 		if (!in_array($post->post_type,array("tournament","cashgame")))
 			return;

		try {
	 		$game=MoneyGame::findOneById($id);
	 		if ($game->getStatus()=="trash")
	 			$game->reset();

 			if (!$game->isAquired())
 				return;

			$game->reloadGameConf();
		}

		catch (\Exception $e) {
			$t="Server error: ".$e->getMessage();
			error_log($t);
			TonopahPlugin::instance()->adminNotice($t,"error");
		}
 	}
}