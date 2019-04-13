<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://octagonal.io/
 * @since      1.0.0
 *
 * @package    Bbquick_React
 * @subpackage Bbquick_React/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Bbquick_React
 * @subpackage Bbquick_React/admin
 * @author     Dominik Paschke <dominikpaschke@hotmail.com>
 */
class Bbquick_React_Admin {

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
	 * The menu section name for the plugin
	 * 
	 * @since    1.0.0
	 * @access   private
	 * @var      string
	 */
	private $section_name;

	/**
	 * Option name for the WooCommerce Consumer Key
	 * 
	 * @since    1.0.0
	 * @access   private
	 * @var      string
	 */
	private $wc_consumer_key;

	/**
	 * Option name for the WooCommerce Consumer Secret
	 * 
	 * @since    1.0.0
	 * @access   private
	 * @var      string
	 */
	private $wc_consumer_secret;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
		$this->section_name = str_replace('-', '_', $plugin_name);
		$this->wc_consumer_key = "{$this->section_name}_wc_ck";
		$this->wc_consumer_secret = "{$this->section_name}_wc_cs";

	}

	/**
	 * Register the stylesheets for the admin area.
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

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/bbquick-react-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
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

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/bbquick-react-admin.js', array( 'jquery' ), $this->version, false );

	}

	/**
	 * Register the settings for the plugin
	 * 
	 * @since    1.0.0
	 */
	public function register_settings()
	{
		add_settings_section(
			$this->section_name,
			__( 'React Integration', $this->plugin_name),
			[$this, 'section_intro'],
			$this->plugin_name
		);

		add_settings_field(
			$this->wc_consumer_key,
			__( 'WC Consumer Key', $this->plugin_name),
			[$this, 'ck_callback'],
			$this->plugin_name,
			$this->section_name,
			['label_for' => $this->wc_consumer_key]
		);

		add_settings_field(
			$this->wc_consumer_secret,
			__( 'WC Consumer Secret', $this->plugin_name),
			[$this, 'cs_callback'],
			$this->plugin_name,
			$this->section_name,
			['label_for' => $this->wc_consumer_secret]
		);

		register_setting($this->plugin_name, $this->wc_consumer_key, 'string' );
		register_setting($this->plugin_name, $this->wc_consumer_secret, 'string' );
	}

	public function section_intro()
	{
		ob_start();
		?>
		<p>
			Enter the WooCommerce API keys below. These are required
			for React to be able to pull in product data.
		</p>
		<p>
			<em>
				<a href="admin.php?page=wc-settings&tab=advanced&section=keys">Create keys</a> if necessary.
				Only needs read permission.
			</em>
		</p>
		<?php

		echo ob_get_clean();
	}

	public function ck_callback()
	{
		$key = $this->wc_consumer_key;
		$val = get_option($this->wc_consumer_key);
		ob_start();
		?>
			<input type="text" name="<?= $key ?>" id="<?= $key ?>" value="<?= $val ?>" />
		<?php
		echo ob_get_clean();
	}

	public function cs_callback()
	{
		$key = $this->wc_consumer_secret;
		$val = get_option($this->wc_consumer_secret);
		ob_start();
		?>
			<input type="text" name="<?= $key ?>" id="<?= $key ?>" value="<?= $val ?>" />
		<?php
		echo ob_get_clean();
	}

	/**
	 * Create an options page for the plugin in the admin area
	 * 
	 * @since    1.0.0
	 * 
	 */
	public function display_options()
	{
		if( !current_user_can( 'manage_options' ) ) {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		}

		ob_start();
		?>
		<div class="wrap">
			<form action="options.php" method="POST">
				<?php
					settings_fields( $this->plugin_name );
					do_settings_sections( $this->plugin_name );
					submit_button();
				?>
			</form>
		</div>
		<?php
		echo ob_get_clean();
	}

	/**
	 * Create an options page for the plugin in the admin area
	 * 
	 * @since    1.0.0
	 */
	public function admin_menu()
	{
		add_options_page( 
			__( 'React Integration', $this->plugin_name),
			__( 'React Integration', $this->plugin_name),
			'manage_options',
			$this->plugin_name,
			[$this, 'display_options']
		);
	}

}
