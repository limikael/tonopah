<?php

namespace tonopah;

/**
 * Simple template renderer.
 */
class WpUtil {

	static function getCurrentTimeZoneOffsetString() {
		$min = 60 * get_option('gmt_offset');
		$sign = $min < 0 ? "-" : "+";
		$absmin = abs($min);
		$tz = sprintf("UTC%s%02d:%02d", $sign, $absmin/60, $absmin%60);		

		return $tz;
	}
}