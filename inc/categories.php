<?php
/**
 * Block & Pattern Categories
 *
 * Registers custom block categories and block pattern categories
 * used throughout this theme.
 *
 * @package Breakthrough_CPAs
 */

if ( ! function_exists( 'btcpa_block_categories' ) ) :
	/**
	 * Adds the "Brilliant Blocks" category to the block inserter.
	 *
	 * @param  array                   $block_categories     Existing block categories.
	 * @param  WP_Block_Editor_Context $block_editor_context Current editor context.
	 * @return array
	 */
	function btcpa_block_categories( $block_categories, $block_editor_context ) {
		return array_merge(
			array(
				array(
					'slug'  => 'btcpa',
					'title' => __( 'Breakthrough CPAs', 'breakthrough-cpas' ),
				),
			),
			$block_categories

		);
	}
endif;
add_filter( 'block_categories_all', 'btcpa_block_categories', 10, 2 );


if ( ! function_exists( 'btcpa_pattern_categories' ) ) :
	/**
	 * Registers the "Breakthrough CPAs" block pattern category.
	 */
	function btcpa_pattern_categories() {
		register_block_pattern_category(
			'btcpa',
			array(
				'label'       => __( 'Breakthrough CPAs', 'breakthrough-cpas' ),
				'description' => __( 'A collection of Breakthrough CPAs patterns.', 'breakthrough-cpas' ),
			)
		);
	}
endif;
add_action( 'init', 'btcpa_pattern_categories' );
