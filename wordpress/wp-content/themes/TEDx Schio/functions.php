<?php
/**
 * @description Menus are currently not available in the WP Rest.
 * So what you need to do is register your own custom endpoint and then
 * just call that route from your application that needs it.

 * @see https://wordpress.stackexchange.com/a/274513
*/
function get_menu() {
    # Change 'menu' to your own navigation slug.
    return wp_get_nav_menu_items('main-menu');
}

/**
 * @description
 * We have used ‘wp/v2’ which is a default WP REST API v2 route base.
*/
add_action( 'rest_api_init', function () {
  register_rest_route(
    'wp/v2',
    '/menu',
    array(
      'methods' => 'GET',
      'callback' => 'get_menu',
    )
  );
});

add_filter('upload_mimes', 'add_file_types_to_uploads');
