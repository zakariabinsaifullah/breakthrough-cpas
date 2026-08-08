<?php
/**
 * Core Block Styles
 *
 * Registers custom style variations for core (and third-party) blocks.
 *
 * @package Breakthrough_CPAs
 */

if ( ! function_exists( 'btcpa_block_styles' ) ) :
	/**
	 * Registers all custom block style variations for the theme.
	 */
	function btcpa_block_styles() {
		register_block_style(
			'core/post-excerpt',
			array(
				'name'  => 'outline-link',
				'label' => __( 'Outline Link', 'breakthrough-cpas' ),
			)
		);

		register_block_style(
			'core/group',
			array(
				'name'  => 'wrap-mobile',
				'label' => __( 'Wrap Mobile', 'breakthrough-cpas' ),
			)
		);


		register_block_style(
			'core/button',
			array(
				'name'  => 'alternative',
				'label' => __( 'Alternative', 'breakthrough-cpas' ),
			)
		);

		register_block_style(
			'core/button',
			array(
				'name'  => 'link',
				'label' => __( 'Link', 'breakthrough-cpas' ),
			)
		);
	}
endif;
add_action( 'init', 'btcpa_block_styles' );
