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
	 * The rest base for plugin specific routes
	 * 
	 * @since    1.0.0
	 * @access   private
	 * @var      string
	 */
	private $rest_base;

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
		$this->rest_base = "{$this->plugin_name}/v1";

	}

	/**
	 * Check if the current page has either the product or category base
	 * at the **start** of the request.
	 * 
	 * @since    1.0.0
	 * @access   private
	 * 
	 * @return bool
	 */
	private function is_product_or_category_page()
	{
		global $wp;
		$wc_permalinks = get_option( 'woocommerce_permalinks', []);

		// Check if the current request URL starts with either the category
		// base or the product base
		$is_category_page = array_key_exists('category_base', $wc_permalinks)
			? mb_strpos($wp->request, trim($wc_permalinks['category_base'], '/')) === 0
			: false;
		
		$is_product_page = array_key_exists('product_base', $wc_permalinks)
			? mb_strpos($wp->request, trim($wc_permalinks['product_base'], '/')) === 0
			: false;

		return $is_category_page || $is_product_page;
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

		if( file_exists(dirname( __FILE__ ) . '/app/build/static/css/' ) ) {
			$css_dir = '/app/build/static/css/';
			$css_files = scandir( dirname( __FILE__ ) . $css_dir );
			foreach ( $css_files as $key => $filename ) {
				if ( mb_strpos( $filename, '.css' ) && !strpos( $filename, '.css.map') ) {
					$css_file_to_load = plugin_dir_url( __FILE__ ) . $css_dir . $filename;
					wp_enqueue_style( $this->plugin_name . $key, $css_file_to_load, [], $this->version, 'all' );
				}
			}
		}

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		if($this->is_product_or_category_page()) {
			if( ! file_exists( dirname( __FILE__ ) . '/app/build/' ) ) {
				return;
			}
			// Enqueue React app
			if( ! file_exists( dirname( __FILE__ ) . '/app/build/static/js/' ) ) {
				// Static directory exists = build has been run
				$js_files = scandir( dirname( __FILE__ ) . '/app/build/js' );
				$js_directory = 'app/build/js/';
			} else {
				// Static directory doesn't exist = using Watch files
				$js_files = scandir( dirname( __FILE__ ) . '/app/build/static/js' );
				$js_directory = 'app/build/static/js/';
			}
			
			$react_js_to_load = '';
			foreach( $js_files as $key => $filename ) {
				if( mb_strpos( $filename, '.js' ) && !strpos( $filename, '.js.map' ) ) {
					$react_js_to_load = plugin_dir_url( __FILE__ ) . $js_directory . $filename;
					wp_enqueue_script( $this->plugin_name . $key, $react_js_to_load, [], mt_rand( 10, 1000 ), true );
					wp_localize_script( $this->plugin_name . $key, 'bbq_react_data', ['rest_base' => get_rest_url(null, $this->rest_base) ] );
				}
			}
		}
	}

	/**
	 * Mark relevant menu items with IDs to be replaced by React
	 * Router links
	 * 
	 * @param array $atts
	 * @param object $item
	 * @param object $args
	 * 
	 * @since    1.0.0
	 */
	public function mark_menu(array $atts, object $item, object $args)
	{

		$wc_permalinks = get_option('woocommerce_permalinks', []);
		if( ! empty($wc_permalinks) ) {
			$category_base = array_key_exists('category_base', $wc_permalinks)
				? $wc_permalinks['category_base']
				: null;
			
			if ( $category_base && ($cat_start = mb_strpos( $atts['href'], $category_base ) ) !== false ) {
				
				$slug = mb_substr( $atts['href'], $cat_start + mb_strlen( $category_base ));
				$slug = trim($slug, '/');
				
				$atts['id'] = "js-menu-replace-{$slug}";
			}
		}

		return $atts;
	}

	/**
	 * Add the container for the React app if on the category product loop or a single product
	 * page.
	 * 
	 * @since    1.0.0
	 */
	public function add_react_container() 
	{
		if ($this->is_product_or_category_page()) {
			echo '<div id="bbquick-app"></div>';
		} else {
			// Dumping Data for ease of inspection
			// DELETE entire else clause when done
			$categories = get_terms( ['taxonomy' => 'product_cat'] );
			$categories = array_filter( $categories, function( $category ) {
				return $category->slug !== 'uncategorized';
			});
	
			$slugs = [];
			foreach( $categories as $category ) {
				$slugs[] = $category->slug;
			}
	
			$product_args = [
				'posts_per_page' => -1,
				'post_status' => 'publish',
				'category' => $slugs,
			];
			$products = wc_get_products( $product_args );
			d( $products);

			foreach( $products as $product ) {
				if($product->get_data()['slug'] === 'spag-bol') {
					d( $product->get_data());
					// d( $product->get_data()['attributes']['pa_ingredients']->get_data());
					// d( $product->get_data()['attributes']['pa_meal-category']->get_data());
				}
			}
	
			// d( $products );
			// d( $categories );
			// d( $products[0]->get_data() );
			// d( $products[0]->get_data()['name'] );
		}
	}

	private function get_wc_data()
	{
		$categories = get_terms( ['taxonomy' => 'product_cat'] );
		$categories = array_filter( $categories, function( $category ) {
			return $category->slug !== 'uncategorized';
		});

		// Need category slugs for product args
		$slugs = [];
		foreach( $categories as $category ) {
			$slugs[] = $category->slug;
		}

		$product_args = [
			'posts_per_page' => -1,
			'post_status' => 'publish',
			'category' => $slugs,
			'visibility' => 'catalog'
		];
		$raw_products = wc_get_products( $product_args );
		$products = [];

		foreach ($raw_products as $product) {
			// Change product data layout to suit needs
			$category_ids = $product->get_category_ids();
			$product_categories = [];
			foreach ($category_ids as $category_id) {
				$product_categories[] = [
					'id' => $category_id
				];
			}

			$products[] = [
				'id' => $product->id,
				'name' => $product->get_name(),
				'slug' => $product->get_slug(),
				'categories' => $product_categories,
				'images' => [
					$product->get_image(),
					$product->get_gallery_image_ids()
				],
				'price_html' => $product->get_price_html(),
				'rating_html' => $product->get_rating_html($product->get_average_rating())
			];
		}

		return [
			'products' => $products,
			'categories' => $categories
		];
	}

	public function rest_routes()
	{
		register_rest_route($this->rest_base, 'wc-data', [
			'methods' => 'GET',
			'callback' => function() {
				return $this->get_wc_data();
			}
		]);
	}

}
