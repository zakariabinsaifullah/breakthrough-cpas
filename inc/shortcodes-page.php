<?php
/**
 * Insignia Capital — Shortcodes Reference Page
 *
 * Adds an admin page under Appearance that showcases the shortcodes
 * bundled with this theme, each with a one-click copy button.
 *
 * @package Insignia_Capital_Corp
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// ── Register the shortcode catalogue ──────────────────────────────────────────

if ( ! function_exists( 'incc_get_shortcodes' ) ) :
	/**
	 * Returns the list of theme shortcodes to display on the reference page.
	 *
	 * Each entry: label, the copy-ready shortcode, a description, and an
	 * optional list of attributes (name => description).
	 */
	function incc_get_shortcodes() {
		return array(
			array(
				'label'       => __( 'Posts Grid', 'insignia-capital-corp' ),
				'shortcode'   => '[incc_posts_grid]',
				'description' => __( 'A filterable, paginated grid of posts loaded via AJAX. Every attribute is optional.', 'insignia-capital-corp' ),
				'attributes'  => array(
					'per_page'   => __( 'Posts per page (1–50). Default: 6.', 'insignia-capital-corp' ),
					'post_type'  => __( 'Post type to query. Default: post.', 'insignia-capital-corp' ),
					'categories' => __( 'Comma-separated term IDs or slugs to limit the grid. Default: all.', 'insignia-capital-corp' ),
				),
				'example'     => '[incc_posts_grid per_page="9" post_type="post" categories="news,updates"]',
			),
		);
	}
endif;

// ── Add page under Appearance ─────────────────────────────────────────────────

add_action( 'admin_menu', 'incc_shortcodes_add_menu' );

if ( ! function_exists( 'incc_shortcodes_add_menu' ) ) :
	function incc_shortcodes_add_menu() {
		add_theme_page(
			__( 'Insignia Capital Shortcodes', 'insignia-capital-corp' ),
			__( 'Insignia Capital', 'insignia-capital-corp' ),
			'edit_theme_options',
			'incc-shortcodes',
			'incc_shortcodes_render_page'
		);
	}
endif;

// ── Render the page ───────────────────────────────────────────────────────────

if ( ! function_exists( 'incc_shortcodes_render_page' ) ) :
	function incc_shortcodes_render_page() {
		if ( ! current_user_can( 'edit_theme_options' ) ) {
			return;
		}

		$shortcodes = incc_get_shortcodes();
		?>
		<div class="wrap incc-shortcodes">
			<h1><?php esc_html_e( 'Insignia Capital Shortcodes', 'insignia-capital-corp' ); ?></h1>
			<p class="description" style="font-size: 14px; margin-bottom: 24px;">
				<?php esc_html_e( 'These shortcodes ship with the Insignia Capital Corp theme. Copy a shortcode and paste it into any page, post, or block.', 'insignia-capital-corp' ); ?>
			</p>

			<div class="incc-shortcodes__grid">
				<?php foreach ( $shortcodes as $item ) : ?>
					<div class="incc-card">
						<h2 class="incc-card__title"><?php echo esc_html( $item['label'] ); ?></h2>

						<?php if ( ! empty( $item['description'] ) ) : ?>
							<p class="incc-card__desc"><?php echo esc_html( $item['description'] ); ?></p>
						<?php endif; ?>

						<div class="incc-copy">
							<code class="incc-copy__code"><?php echo esc_html( $item['shortcode'] ); ?></code>
							<button
								type="button"
								class="button button-primary incc-copy__btn"
								data-clipboard="<?php echo esc_attr( $item['shortcode'] ); ?>"
							>
								<?php esc_html_e( 'Copy', 'insignia-capital-corp' ); ?>
							</button>
						</div>

						<?php if ( ! empty( $item['attributes'] ) ) : ?>
							<table class="incc-attrs widefat striped">
								<thead>
									<tr>
										<th><?php esc_html_e( 'Attribute', 'insignia-capital-corp' ); ?></th>
										<th><?php esc_html_e( 'Description', 'insignia-capital-corp' ); ?></th>
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
							<p class="incc-card__example-label"><?php esc_html_e( 'Example with attributes:', 'insignia-capital-corp' ); ?></p>
							<div class="incc-copy">
								<code class="incc-copy__code"><?php echo esc_html( $item['example'] ); ?></code>
								<button
									type="button"
									class="button incc-copy__btn"
									data-clipboard="<?php echo esc_attr( $item['example'] ); ?>"
								>
									<?php esc_html_e( 'Copy', 'insignia-capital-corp' ); ?>
								</button>
							</div>
						<?php endif; ?>
					</div>
				<?php endforeach; ?>
			</div>
		</div>

		<style>
			.incc-shortcodes__grid {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(640px, 1fr));
				gap: 24px;
				max-width: 1600px;
			}
			.incc-card {
				background: #fff;
				border: 1px solid #dcdcde;
				border-radius: 8px;
				padding: 20px 24px;
			}
			.incc-card__title {
				margin: 0 0 6px;
				font-size: 18px;
			}
			.incc-card__desc {
				margin: 0 0 16px;
				color: #50575e;
			}
			.incc-copy {
				display: flex;
				align-items: stretch;
				gap: 8px;
				margin-bottom: 16px;
			}
			.incc-copy__code {
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
			.incc-copy__btn {
				display: inline-flex !important;
				align-items: center;
				justify-content: center;
				gap: 6px;
				min-width: 108px;
				height: auto !important;
				padding: 8px 18px !important;
				background: #253959 !important;
				border: 1px solid #253959 !important;
				border-radius: 4px !important;
				color: #fff !important;
				font-weight: 600;
				line-height: 1.2 !important;
				white-space: nowrap;
				box-shadow: none !important;
				transition: background 0.18s ease, transform 0.05s ease;
			}
			.incc-copy__btn:hover {
				background: #253959 !important;
				border-color: #253959 !important;
			}
			.incc-copy__btn:active {
				transform: translateY(1px);
			}
			.incc-copy__btn.is-copied {
				background: #00a32a !important;
				border-color: #00a32a !important;
				color: #fff !important;
			}
			.incc-attrs {
				margin: 0 0 16px;
			}
			.incc-attrs th {
				font-weight: 600;
			}
			.incc-card__example-label {
				margin: 0 0 8px;
				font-weight: 600;
				color: #1d2327;
			}
		</style>

		<script>
			( function () {
				document.querySelectorAll( '.incc-copy__btn' ).forEach( function ( btn ) {
					btn.addEventListener( 'click', function () {
						var text = btn.getAttribute( 'data-clipboard' );

						navigator.clipboard.writeText( text ).then( function () {
							var original = btn.textContent;
							btn.classList.add( 'is-copied' );
							btn.textContent = '<?php echo esc_js( __( 'Copied!', 'insignia-capital-corp' ) ); ?>';
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
