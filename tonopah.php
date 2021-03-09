<?php
/**
 * Tonopah
 *
 * Plugin Name:       Tonopah
 * Plugin URI:        https://github.com/limikael/tonopah
 * GitHub Plugin URI: https://github.com/limikael/tonopah
 * Description:       Poker System For WordPress.
 * Version:           0.0.2
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Mikael Lindqvist
 * Text Domain:       tonopah
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

defined( 'ABSPATH' ) || exit;

define('TONOPAH_URL',plugin_dir_url(__FILE__));
define('TONOPAH_PATH',plugin_dir_path(__FILE__));

require_once(__DIR__."/ext/CMB2/init.php");
require_once(__DIR__."/inc/plugin/TonopahPlugin.php");

// Handle plugin activation.
function tonopah_activate() {
	tonopah\TonopahPlugin::instance()->activate();
}
register_activation_hook( __FILE__, 'tonopah_activate' );

// Handle plugin uninstall.
function tonopah_uninstall() {
	tonopah\TonopahPlugin::instance()->uninstall();
}
register_uninstall_hook( __FILE__, 'tonopah_uninstall' );

tonopah\TonopahPlugin::instance();
