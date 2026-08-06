<?php
/**
 * Core Block Styles
 *
 * Registers custom style variations for core (and third-party) blocks.
 *
 * @package Insignia_Capital_Corp
 */

if ( ! function_exists( 'incc_block_styles' ) ) :
	/**
	 * Registers all custom block style variations for the theme.
	 */
	function incc_block_styles() {
		register_block_style(
			'core/post-excerpt',
			array(
				'name'  => 'outline-link',
				'label' => __( 'Outline Link', 'insignia-capital-corp' ),
			)
		);

		register_block_style(
			'core/group',
			array(
				'name'  => 'wrap-mobile',
				'label' => __( 'Wrap Mobile', 'insignia-capital-corp' ),
			)
		);


		register_block_style(
			'core/button',
			array(
				'name'  => 'alternative',
				'label' => __( 'Alternative', 'insignia-capital-corp' ),
			)
		);

		register_block_style(
			'core/button',
			array(
				'name'  => 'link',
				'label' => __( 'Link', 'insignia-capital-corp' ),
			)
		);
	}
endif;
add_action( 'init', 'incc_block_styles' );
