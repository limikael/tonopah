<?php

class WpdbTableLock {
	private $count;

	public function __construct($fullTableName) {
		$this->count=0;
		$this->fullTableName=$fullTableName;
	}

	public function aquire() {
		global $wpdb;

		if (!$this->count) {
			$q=$wpdb->prepare("LOCK TABLE %s",$this->fullTableName);
			$wpdb->query($q);
			if ($wpdb->last_error)
				throw new Exception($wpdb->last_error);
		}

		$this->count++;
	}

	public function release() {
		global $wpdb;

		$this->count--;

		if (!$this->count) {
			$q=$wpdb->prepare("UNLOCK TABLE %s",$this->fullTableName);
			$wpdb->query($q);
			if ($wpdb->last_error)
				throw new Exception($wpdb->last_error);
		}
	}
}