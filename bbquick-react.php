<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://octagonal.io/
 * @since             1.0.0
 * @package           Bbquick_React
 *
 * @wordpress-plugin
 * Plugin Name:       BBQuick React
 * Plugin URI:        https://github.com/pasdo501/bbquick-react
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Dominik Paschke
 * Author URI:        https://octagonal.io/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       bbquick-react
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'BBQUICK_REACT_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-bbquick-react-activator.php
 */
function activate_bbquick_react() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-bbquick-react-activator.php';
	Bbquick_React_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-bbquick-react-deactivator.php
 */
function deactivate_bbquick_react() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-bbquick-react-deactivator.php';
	Bbquick_React_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_bbquick_react' );
register_deactivation_hook( __FILE__, 'deactivate_bbquick_react' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-bbquick-react.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_bbquick_react() {

	$plugin = new Bbquick_React();
	$plugin->run();

}
run_bbquick_react();
