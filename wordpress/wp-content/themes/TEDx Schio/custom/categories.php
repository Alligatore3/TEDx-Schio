<?php

/**
 * Create Custom Category for CPT - SPEAKERS
 * {@link https://wordpress.stackexchange.com/a/168614}
 */
function create_custom_taxonomy() {
	register_taxonomy(
			'team-category',
			'team',
			array(
				'sort' => true,
				'label' => __( 'Category' ),
				'rewrite' => array( 'slug' => 'team-category' ),
				'hierarchical' => true,
				'show_in_rest' => true,
				'show_admin_column' => true
			)
	);

	register_taxonomy(
			'announcers-category',
			'announcers',
			array(
				'sort' => true,
				'label' => __( 'Category' ),
				'rewrite' => array( 'slug' => 'announcers-category' ),
				'hierarchical' => true,
				'show_in_rest' => true,
				'show_admin_column' => true
			)
	);

	register_taxonomy(
			'speakers-category',
			'speakers',
			array(
				'sort' => true,
				'label' => __( 'Category' ),
				'rewrite' => array( 'slug' => 'speakers-category' ),
				'hierarchical' => true,
				'show_in_rest' => true,
				'show_admin_column' => true
			)
	);

	register_taxonomy(
		'partners-category',
		'partners',
		array(
			'sort' => true,
			'label' => __( 'Category' ),
			'rewrite' => array( 'slug' => 'partners-category' ),
			'hierarchical' => true,
			'show_in_rest' => true,
			'show_admin_column' => true
		)
);
}
add_action( 'init', 'create_custom_taxonomy' );