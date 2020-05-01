<?php

/**
 * Create Custom Post Type - SPEAKERS
 * {@link https://wpsites.net/web-design/add-custom-post-type/}
 */
add_action( 'init', 'add_custom_post_type' );
function add_custom_post_type() {
	register_post_type( 'team',
		array(
			'labels' => array(
				'name'          => __( 'Team', 'wpsites' ),
				'singular_name' => __( 'Team member', 'wpsites' ),
				'add_new' => 'Aggiungi membro',
				'add_new_item' => 'Aggiungi membro',
				'edit' => 'Modifica membro',
				'edit_item' => 'Modifica membro',
				'new-item' => 'Nuovo membro',
				'view' => 'Vedi membro',
				'view_item' => 'Vedi membro',
				'search_items' => 'Cerca membro',
				'not_found' => 'Nessun membro trovato',
				'not_found_in_trash' => 'Nessun membro trovato nel cestino',
				'parent' => 'Parent Announcer'
			),
			'has_archive'  => true,
			'hierarchical' => true,
			'menu_icon'    => 'dashicons-admin-users',
			'public'       => true,
      'show_in_rest' => true,
			'rewrite'      => array( 'slug' => 'team', 'with_front' => false ),
			'supports'     => array(
				'title',
				'editor',
				'thumbnail',
				'page-attributes'
			),
			'taxonomies'   => array( 'team-category' ),
			'menu_position' => 5,
		)
	);

	register_post_type( 'announcers',
		array(
			'labels' => array(
				'name'          => __( 'Announcers', 'wpsites' ),
				'singular_name' => __( 'Announcer', 'wpsites' ),
				'add_new' => 'Aggiungi presentatore',
				'add_new_item' => 'Aggiungi presentatore',
				'edit' => 'Modifica presentatore',
				'edit_item' => 'Modifica presentatore',
				'new-item' => 'Nuovo presentatore',
				'view' => 'Vedi presentatore',
				'view_item' => 'Vedi presentatore',
				'search_items' => 'Cerca presentatores',
				'not_found' => 'Nessun presentatore trovato',
				'not_found_in_trash' => 'Nessun presentatore trovato nel cestino',
				'parent' => 'Parent Announcer'
			),
			'has_archive'  => true,
			'hierarchical' => true,
			'menu_icon'    => 'dashicons-admin-users',
			'public'       => true,
      'show_in_rest' => true,
			'rewrite'      => array( 'slug' => 'announcers', 'with_front' => false ),
			'supports'     => array(
				'title',
				'editor',
				'thumbnail',
				'page-attributes'
			),
			'taxonomies'   => array( 'announcers-category' ),
			'menu_position' => 5,
		)
	);

	register_post_type( 'speakers',
		array(
			'labels' => array(
				'name'          => __( 'Speakers', 'wpsites' ),
				'singular_name' => __( 'Speaker', 'wpsites' ),
				'add_new' => 'Aggiungi Speaker', 
				'add_new_item' => 'Aggiungi Speaker',
				'edit' => 'Modifica Speakers',
				'edit_item' => 'Modifica Speaker',
				'new-item' => 'Nuovo Speaker',
				'view' => 'Vedi Speaker',
				'view_item' => 'Vedi Speaker',
				'search_items' => 'Cerca Speakers',
				'not_found' => 'Nessun Speakers trovato',
				'not_found_in_trash' => 'Nessun Speakers trovato nel cestino',
				'parent' => 'Parent Speaker'
			),
			'has_archive'  => true,
			'hierarchical' => true,
			'menu_icon'    => 'dashicons-admin-users',
			'public'       => true,
      'show_in_rest' => true,
			'rewrite'      => array( 'slug' => 'speakers', 'with_front' => false ),
			'supports'     => array(
				'title',
				'editor',
				'thumbnail',
				'page-attributes'
			),
			'taxonomies'   => array( 'speakers-category' ),
			'menu_position' => 5,
		)
	);


	register_post_type( 'partners',
		array(
			'labels' => array(
				'name'          => __( 'Partners', 'wpsites' ),
				'singular_name' => __( 'Partner', 'wpsites' ),
				'add_new' => 'Aggiungi Partner', 
				'add_new_item' => 'Aggiungi Partner',
				'edit' => 'Modifica Partner',
				'edit_item' => 'Modifica Partner',
				'new-item' => 'Nuovo Partner',
				'view' => 'Vedi Partner',
				'view_item' => 'Vedi Partner',
				'search_items' => 'Cerca Partner',
				'not_found' => 'Nessun Partner trovato',
				'not_found_in_trash' => 'Nessun Partner trovato nel cestino',
				'parent' => 'Parent Partner'
			),
			'has_archive'  => true,
			'hierarchical' => true,
			'menu_icon'    => 'dashicons-admin-users',
			'public'       => true,
      'show_in_rest' => true,
			'rewrite'      => array( 'slug' => 'partners', 'with_front' => false ),
			'supports'     => array(
				'title',
				'editor',
				'thumbnail',
				'page-attributes'
			),
			'taxonomies'   => array( 'partners-category' ),
			'menu_position' => 5,
		)
	);
}

/**
* @description  Add featured image directly to REST API.
* @see https://medium.com/@dalenguyen/how-to-get-featured-image-from-wordpress-rest-api-5e023b9896c6
*/
add_action('rest_api_init', 'register_rest_images' );
function register_rest_images(){
    register_rest_field(
      array('announcers', 'speakers', 'partners'),
      'image_url',
      array(
          'get_callback'    => 'get_rest_featured_image',
          'update_callback' => null,
          'schema'          => null,
      )
    );
}
function get_rest_featured_image( $object, $field_name, $request ) {
    if( $object['featured_media'] ){
        $img = wp_get_attachment_image_src( $object['featured_media'], 'app-thumb' );
        return $img[0];
    }
    return false;
}