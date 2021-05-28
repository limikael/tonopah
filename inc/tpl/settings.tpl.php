<div class="wrap">
	<h2>Tonopah Settings</h2>

	<form method="post" action="options.php">
		<?php settings_fields( 'tonopah' ); ?>
		<?php do_settings_sections( 'tonopah' ); ?>
		<table class="form-table">
			<tr valign="top">
				<th scope="row">Gameplay Server URL</th>
				<td>
					<input type="text" name="tonopah_serverurl" 
						value="<?php echo esc_attr(get_option("tonopah_serverurl")); ?>"
						class="regular-text"/>
					<p class="description">Where is the gameplay server?</p>
				</td>
			</tr>

			<tr valign="top">
				<th scope="row">Key</th>
				<td>
					<input type="text" name="tonopah_key" 
						value="<?php echo esc_attr(get_option("tonopah_key")); ?>"
						class="regular-text"/>
					<p class="description">This key is used to keep server to server communication secure.</p>
				</td>
			</tr>

			<tr valign="top">
				<th scope="row">Howto Page</th>
				<td>
					<select name="tonopah_howto_page_id">
						<?php 
							tonopah\HtmlUtil::displaySelectOptions(
								$pages,
								$tonopah_howto_page_id);
						?>
					</select>
					<p class="description">The page where the user is taken when clicking "how to" in the game.</p>
				</td>
			</tr>

			<tr valign="top">
				<th scope="row">Account Page</th>
				<td>
					<select name="tonopah_account_page_id">
						<?php
							tonopah\HtmlUtil::displaySelectOptions(
								$pages,
								$tonopah_account_page_id);
						?>
					</select>
					<p class="description">Page for account management, should have the [tonopah_account] shortcode.</p>
				</td>
			</tr>

			<tr valign="top">
				<th scope="row">Login Page</th>
				<td>
					<select name="tonopah_login_page_id">
						<?php
							tonopah\HtmlUtil::displaySelectOptions(
								$pages,
								$tonopah_login_page_id);
						?>
					</select>
					<p class="description">The page where the user is taken when trying to sit in without being logged in.</p>
				</td>
			</tr>
		</table>

		<?php submit_button(); ?>
	</form>
</div>