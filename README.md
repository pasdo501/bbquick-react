# Plugin Name
Contributors: https://github.com/pasdo501, https://github.com/carlaiau
Donate link: https://octagonal.io/
Tags: react, woocommerce
Requires at least: 3.0.1
Tested up to: 5.1.1
Stable tag: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

React frontend plugin for BBQuick's woocommerce sections.

# Description

This plugin replaces the frontend of BBQuick's WordPress WooCommerce sections with React for a nice shopping
experience.

Currently requires Beans theme to be used.

# Installation

Option A - Build on Server:
1. Upload the plugin to the `/wp-content/plugins/` directory.
1. Cd (relative from the plugin root) to public/app directory.
1. Run yarn && yarn build
1. Activate the plugin through the 'Plugins' menu in WordPress.

Option B - Upload already built version:
1. Locally clone the plugin repository.
1. Cd into public/app (relative to root).
1. Run yarn && yarn build.
1. Remove the src & node_modules folders from the app directory.
1. Upload the remaining theme to the `/wp-contents/plugins/` directory.
1. Activate the plugin through the 'Plugins' menu in WordPress.


# Changelog
### 1.0
* Stable plugin version