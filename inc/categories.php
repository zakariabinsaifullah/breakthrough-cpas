<?php
/**
 * Block & Pattern Categories
 *
 * Registers custom block categories and block pattern categories
 * used throughout this theme.
 *
 * @package Insignia_Capital_Corp
 */

if ( ! function_exists( 'incc_block_categories' ) ) :
	/**
	 * Adds the "Brilliant Blocks" category to the block inserter.
	 *
	 * @param  array                   $block_categories     Existing block categories.
	 * @param  WP_Block_Editor_Context $block_editor_context Current editor context.
	 * @return array
	 */
	function incc_block_categories( $block_categories, $block_editor_context ) {
		return array_merge(
			array(
				array(
					'slug'  => 'incc',
					'title' => __( 'Insignia Capital Corp', 'insignia-capital-corp' ),
				),
			),
			$block_categories

		);
	}
endif;
add_filter( 'block_categories_all', 'incc_block_categories', 10, 2 );


if ( ! function_exists( 'incc_pattern_categories' ) ) :
	/**
	 * Registers the "Insignia Capital Corp" block pattern category.
	 */
	function incc_pattern_categories() {
		register_block_pattern_category(
			'incc',
			array(
				'label'       => __( 'Insignia Capital Corp', 'insignia-capital-corp' ),
				'description' => __( 'A collection of Insignia Capital Corp patterns.', 'insignia-capital-corp' ),
			)
		);
	}
endif;
add_action( 'init', 'incc_pattern_categories' );
