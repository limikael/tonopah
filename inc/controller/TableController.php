<?php

namespace tonopah;

require_once __DIR__."/../utils/HtmlUtil.php";

class TableController extends Singleton {
	protected function __construct() {
		add_shortcode("tonopah_mock_table",array($this,"tonopah_mock_table"));
	}

	public function tonopah_mock_table() {
		$t=new Template(__DIR__."/../tpl/table.tpl.php");
		return $t->render(array(
			"serverUrl"=>"",
			"mock"=>"true"
		));
	}

	public function renderTable($params=array()) {
		$url=get_option("tonopah_serverurl");
		$url=str_replace("http://", "ws://", $url);
		$url=str_replace("https://", "wss://", $url);
		$url=$url."/?".http_build_query($params);

		$t=new Template(__DIR__."/../tpl/table.tpl.php");
		return $t->render(array(
			"serverUrl"=>$url,
			"mock"=>""
		));
	}
}