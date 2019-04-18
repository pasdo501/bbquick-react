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
	 * The permalink base for products
	 * 
	 * @since    1.0.0
	 * @access   private
	 * @var      string
	 */
	private $product_base;

	/**
	 * The permalink base for categories
	 * 
	 * @since    1.0.0
	 * @access   private
	 * @var      string
	 */
	private $category_base;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {
		
		$wc_permalinks = get_option('woocommerce_permalinks', []);

		$this->plugin_name = $plugin_name;
		$this->version = $version;
		$this->rest_base = "{$this->plugin_name}/v1";

		if(! empty( $wc_permalinks ) ) {
			
			$this->product_base = array_key_exists('product_base', $wc_permalinks)
				? $wc_permalinks['product_base']
				: null;
			$this->category_base = array_key_exists('category_base', $wc_permalinks)
				? $wc_permalinks['category_base']
				: null;
		}

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
		$is_category_page = mb_strpos($wp->request, trim($this->category_base, '/')) === 0;
		
		$is_product_page = mb_strpos($wp->request, trim($this->product_base, '/')) === 0;

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
				// Static directory exists = using build files
				$js_files = scandir( dirname( __FILE__ ) . '/app/build/static/js' );
				$js_directory = 'app/build/static/js/';
			}
			
			$react_js_to_load = '';
			foreach( $js_files as $key => $filename ) {
				if( mb_strpos( $filename, '.js' ) && !strpos( $filename, '.js.map' ) ) {
					$react_js_to_load = plugin_dir_url( __FILE__ ) . $js_directory . $filename;
					wp_enqueue_script( $this->plugin_name . $key, $react_js_to_load, [], mt_rand( 10, 1000 ), true );
					wp_localize_script( $this->plugin_name . $key, 'bbq_react_data', [
						'rest_base' => get_rest_url(null, $this->rest_base),
						'product_base' => $this->product_base
					] );
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

			
		if ( $this->category_base && ($cat_start = mb_strpos( $atts['href'], $this->category_base ) ) !== false ) {
			
			$slug = mb_substr( $atts['href'], $cat_start + mb_strlen( $this->category_base ));
			$slug = trim($slug, '/');
			
			$atts['id'] = "js-menu-replace-{$slug}";
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
		}
	}

	/**
	 * Get ingredient IDs from WooCommerce products.
	 * 
	 * @param $product A WooCommerce product
	 * @param &$id_array Reference to an array where IDs are stored
	 * 
	 * @return void
	 */
	private function get_product_ingredient_ids($product, &$id_array)
	{
		$attributes = $product->get_attributes();
		if( $attributes && array_key_exists('pa_ingredients', $attributes ) ) {
			$ingredient_ids = $attributes['pa_ingredients']->get_options();
			foreach ($ingredient_ids as $ingredient_id) {
				$id_array[$ingredient_id] = $ingredient_id;
			}
		}
	}

	/**
	 * Get product categories from bundled WooCommerce products.
	 * 
	 * @param $product A bundled WooCommerce product
	 * @param &$product_categories An array of product categories
	 * @param &$categories_added An array keeping track of which categories have been added (easier due to the shape of the other array)
	 * @param &$ingredient_ids An array of ingredient IDs, passed to the product ingredient extraction method
	 * 
	 * @return void
	 */
	private function get_bundled_product_categories($product, &$product_categories, &$categories_added, &$ingredients_ids)
	{
		// For Bundled products, need to drill down into the bundled
		// products to get their categories and potentially add it to the
		// list of category IDs
		$bundled_items = $product->get_bundled_items();
		foreach ($bundled_items as $item) {
			$product = $item->get_product();
			$category_ids = $product->get_category_ids();
			$this->get_product_ingredient_ids($product, $ingredients_ids);
			foreach ($category_ids as $category_id) {
				if ( !in_array($category_id, $categories_added ) ) {
					$product_categories[] = [
						'id' => $category_id
					];
					array_push($categories_added, $category_id);
				}
			}
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
			'visibility' => 'catalog',
			'stock_status' => 'instock',
			'orderby' => 'name',
			'order' => 'ASC'
		];
		$raw_products = wc_get_products( $product_args );
		$products = [];
		$all_ingredient_ids = [];

		foreach ($raw_products as $product) {
			// Change product data layout to suit needs
			$category_ids = $product->get_category_ids();
			$product_categories = [];
			$categories_added = [];

			foreach ($category_ids as $category_id) {
				$product_categories[] = [
					'id' => $category_id
				];
				array_push($categories_added, $category_id);
			}
			unset( $category_ids );
			unset( $category_id );

			$this->get_product_ingredient_ids($product, $all_ingredient_ids);

			if ($product->get_type() === 'bundle') {
				$this->get_bundled_product_categories($product, $product_categories, $categories_added, $all_ingredient_ids);
			}

			$products[] = [
				'id' => $product->id,
				'name' => $product->get_name(),
				'slug' => $product->get_slug(),
				'sku' => $product->get_sku(),
				'categories' => $product_categories,
				'images' => [
					$product->get_image(),
					$product->get_gallery_image_ids()
				],
				'price' => $product->get_price(),
				'price_html' => $product->get_price_html(),
				'rating' => $product->get_average_rating(),
				'rating_html' => $product->get_rating_html($product->get_average_rating()),
				'total_sales' => $product->get_total_sales(),
				'date' => $product->get_date_created()->getTimestamp(),
			];
		}

		$ingredient_terms = get_terms(['include' => $all_ingredient_ids]);
		$ingredients = [];
		foreach ($ingredient_terms as $term) {
			if ($term->count > 0) {
				$ingredients[] = [
					'id' => $term->term_id,
					'name' => $term->name
				];
			}
		}

		return [
			'products' => $products,
			'categories' => $categories,
			'ingredients' => $ingredients
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
