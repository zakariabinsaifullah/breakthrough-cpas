<?php
/**
 * Breakthrough CPAs — Shortcodes Reference Page
 *
 * Adds an admin page under Appearance that showcases the shortcodes
 * bundled with this theme, each with a one-click copy button.
 *
 * @package Breakthrough_CPAs
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// ── Register the shortcode catalogue ──────────────────────────────────────────

if ( ! function_exists( 'btcpa_get_shortcodes' ) ) :
	/**
	 * Returns the list of theme shortcodes to display on the reference page.
	 *
	 * Each entry: label, the copy-ready shortcode, a description, and an
	 * optional list of attributes (name => description).
	 */
	function btcpa_get_shortcodes() {
		return array(
			array(
				'label'       => __( 'Posts Grid', 'breakthrough-cpas' ),
				'shortcode'   => '[btcpa_posts_grid]',
				'description' => __( 'A filterable, paginated grid of posts loaded via AJAX. Every attribute is optional.', 'breakthrough-cpas' ),
				'attributes'  => array(
					'per_page'   => __( 'Posts per page (1–50). Default: 6.', 'breakthrough-cpas' ),
					'post_type'  => __( 'Post type to query. Default: post.', 'breakthrough-cpas' ),
					'categories' => __( 'Comma-separated term IDs or slugs to limit the grid. Default: all.', 'breakthrough-cpas' ),
				),
				'example'     => '[btcpa_posts_grid per_page="9" post_type="post" categories="news,updates"]',
			),
		);
	}
endif;

// ── Add page under Appearance ─────────────────────────────────────────────────

add_action( 'admin_menu', 'btcpa_shortcodes_add_menu' );

if ( ! function_exists( 'btcpa_shortcodes_add_menu' ) ) :
	function btcpa_shortcodes_add_menu() {
		add_theme_page(
			__( 'Breakthrough CPAs Shortcodes', 'breakthrough-cpas' ),
			__( 'Breakthrough CPAs', 'breakthrough-cpas' ),
			'edit_theme_options',
			'btcpa-shortcodes',
			'btcpa_shortcodes_render_page'
		);
	}
endif;

// ── Render the page ───────────────────────────────────────────────────────────

if ( ! function_exists( 'btcpa_shortcodes_render_page' ) ) :
	function btcpa_shortcodes_render_page() {
		if ( ! current_user_can( 'edit_theme_options' ) ) {
			return;
		}

		$shortcodes = btcpa_get_shortcodes();
		?>
		<div class="wrap btcpa-shortcodes">
			<h1><?php esc_html_e( 'Breakthrough CPAs Shortcodes', 'breakthrough-cpas' ); ?></h1>
			<p class="description" style="font-size: 14px; margin-bottom: 24px;">
				<?php esc_html_e( 'These shortcodes ship with the Breakthrough CPAs theme. Copy a shortcode and paste it into any page, post, or block.', 'breakthrough-cpas' ); ?>
			</p>

			<div class="btcpa-shortcodes__grid">
				<?php foreach ( $shortcodes as $item ) : ?>
					<div class="btcpa-card">
						<h2 class="btcpa-card__title"><?php echo esc_html( $item['label'] ); ?></h2>

						<?php if ( ! empty( $item['description'] ) ) : ?>
							<p class="btcpa-card__desc"><?php echo esc_html( $item['description'] ); ?></p>
						<?php endif; ?>

						<div class="btcpa-copy">
							<code class="btcpa-copy__code"><?php echo esc_html( $item['shortcode'] ); ?></code>
							<button
								type="button"
								class="button button-primary btcpa-copy__btn"
								data-clipboard="<?php echo esc_attr( $item['shortcode'] ); ?>"
							>
								<?php esc_html_e( 'Copy', 'breakthrough-cpas' ); ?>
							</button>
						</div>

						<?php if ( ! empty( $item['attributes'] ) ) : ?>
							<table class="btcpa-attrs widefat striped">
								<thead>
									<tr>
										<th><?php esc_html_e( 'Attribute', 'breakthrough-cpas' ); ?></th>
										<th><?php esc_html_e( 'Description', 'breakthrough-cpas' ); ?></th>
									</tr>
								</thead>
								<tbody>
									<?php foreach ( $item['attributes'] as $attr => $desc ) : ?>
										<tr>
											<td><code><?php echo esc_html( $attr ); ?></code></td>
											<td><?php echo esc_html( $desc ); ?></td>
										</tr>
									<?php endforeach; ?>
								</tbody>
							</table>
						<?php endif; ?>

						<?php if ( ! empty( $item['example'] ) ) : ?>
							<p class="btcpa-card__example-label"><?php esc_html_e( 'Example with attributes:', 'breakthrough-cpas' ); ?></p>
							<div class="btcpa-copy">
								<code class="btcpa-copy__code"><?php echo esc_html( $item['example'] ); ?></code>
								<button
									type="button"
									class="button btcpa-copy__btn"
									data-clipboard="<?php echo esc_attr( $item['example'] ); ?>"
								>
									<?php esc_html_e( 'Copy', 'breakthrough-cpas' ); ?>
								</button>
							</div>
						<?php endif; ?>
					</div>
				<?php endforeach; ?>
			</div>
		</div>

		<style>
			.btcpa-shortcodes__grid {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(640px, 1fr));
				gap: 24px;
				max-width: 1600px;
			}
			.btcpa-card {
				background: #fff;
				border: 1px solid #dcdcde;
				border-radius: 8px;
				padding: 20px 24px;
			}
			.btcpa-card__title {
				margin: 0 0 6px;
				font-size: 18px;
			}
			.btcpa-card__desc {
				margin: 0 0 16px;
				color: #50575e;
			}
			.btcpa-copy {
				display: flex;
				align-items: stretch;
				gap: 8px;
				margin-bottom: 16px;
			}
			.btcpa-copy__code {
				flex: 1;
				display: flex;
				align-items: center;
				background: #1d2327;
				color: #7dd3fc;
				padding: 8px 14px;
				border-radius: 4px;
				font-family: Menlo, Consolas, monospace;
				font-size: 13px;
				overflow-x: auto;
				white-space: nowrap;
			}
			.btcpa-copy__btn {
				display: inline-flex !important;
				align-items: center;
				justify-content: center;
				gap: 6px;
				min-width: 108px;
				height: auto !important;
				padding: 8px 18px !important;
				background: #192643 !important;
				border: 1px solid #192643 !important;
				border-radius: 4px !important;
				color: #fff !important;
				font-weight: 600;
				line-height: 1.2 !important;
				white-space: nowrap;
				box-shadow: none !important;
				transition: background 0.18s ease, transform 0.05s ease;
			}
			.btcpa-copy__btn:hover {
				background: #192643 !important;
				border-color: #192643 !important;
			}
			.btcpa-copy__btn:active {
				transform: translateY(1px);
			}
			.btcpa-copy__btn.is-copied {
				background: #00a32a !important;
				border-color: #00a32a !important;
				color: #fff !important;
			}
			.btcpa-attrs {
				margin: 0 0 16px;
			}
			.btcpa-attrs th {
				font-weight: 600;
			}
			.btcpa-card__example-label {
				margin: 0 0 8px;
				font-weight: 600;
				color: #1d2327;
			}
		</style>

		<script>
			( function () {
				document.querySelectorAll( '.btcpa-copy__btn' ).forEach( function ( btn ) {
					btn.addEventListener( 'click', function () {
						var text = btn.getAttribute( 'data-clipboard' );

						navigator.clipboard.writeText( text ).then( function () {
							var original = btn.textContent;
							btn.classList.add( 'is-copied' );
							btn.textContent = '<?php echo esc_js( __( 'Copied!', 'breakthrough-cpas' ) ); ?>';
							setTimeout( function () {
								btn.classList.remove( 'is-copied' );
								btn.textContent = original;
							}, 2000 );
						} );
					} );
				} );
			}() );
		</script>
		<?php
	}
endif;
