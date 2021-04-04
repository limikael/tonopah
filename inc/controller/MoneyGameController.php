<?php

namespace tonopah;

require_once __DIR__."/../utils/Template.php";

class MoneyGameController extends Singleton {
	protected function __construct() {
		add_action("init",array($this,"init"));
		add_filter('the_content',array($this,"the_content"),10,1);
		add_filter("template_include",array($this,"template_include"),10,1);
		add_action("pre_get_posts",array($this,"pre_get_posts"));
		add_action("cmb2_admin_init",array($this,"cmb2_admin_init"));
	}

	public function cmb2_admin_init() {
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
			"options"=>array(
				"ply"=>"PLY"
			)
		));

		$cmb->add_field(array(
			"name"=>"Stake",
			"id"=>"stake",
			"type"=>"text_small",
			"description"=>"Same as the big blind.",
			"default"=>2
		));

		$cmb->add_field(array(
			"name"=>"Min Sit In Amount",
			"id"=>"minSitInAmount",
			"type"=>"text_small",
			"description"=>"Minimum amount a player can sit in with.",
			"default"=>10
		));

		$cmb->add_field(array(
			"name"=>"Max Sit In Amount",
			"id"=>"maxSitInAmount",
			"type"=>"text_small",
			"description"=>"Maximum amount a player can sit in with.",
			"default"=>100
		));
	}

	public function init() {
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
			"menu_icon"=>"dashicons-money"
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
			"menu_icon"=>"dashicons-palmtree"
		));
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

				return TableController::instance()->renderTable($params);
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
}