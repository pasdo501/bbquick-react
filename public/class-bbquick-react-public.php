<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://octagonal.io/
 * @since      1.0.0
 *
 * @package    Bbquick_React
 * @subpackage Bbquick_React/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Bbquick_React
 * @subpackage Bbquick_React/public
 * @author     Dominik Paschke <dominikpaschke@hotmail.com>
 */
class Bbquick_React_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Bbquick_React_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Bbquick_React_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/bbquick-react-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Bbquick_React_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Bbquick_React_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/bbquick-react-public.js', array( 'jquery' ), $this->version, false );

		// Testing enqueue
		if( ! file_exists(dirname(__FILE__) . '/app/build/static/js/' ) ) {
			// Static directory exists = build has been run
			$js_files = scandir(dirname(__FILE__) . '/app/build/js');
			$js_directory = 'app/build/js/';
		} else {
			// Static directory doesn't exist = using Watch files
			$js_files = scandir(dirname(__FILE__) . '/app/build/static/js');
			$js_directory = 'app/build/static/js/';
		}
		
		$react_js_to_load = '';
		foreach($js_files as $key => $filename) {
			if(mb_strpos($filename, '.js') && !strpos($filename, '.js.map')) {
				$react_js_to_load = plugin_dir_url(__FILE__) . $js_directory . $filename;
				wp_enqueue_script($this->plugin_name . $key, $react_js_to_load, [], mt_rand(10, 1000), true);
			}
		}
	}

	public function react_test() {
		?>
			<div id="bbquick-app">
				Test
			</div>
		<?php
	}

}
