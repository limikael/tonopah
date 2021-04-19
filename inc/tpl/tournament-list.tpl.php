<table class="tonopah-list-table">
	<tr>
		<th>Tournament</th>
		<th>Starts (<?php echo $tz; ?>)</th>
		<th>Fee</th>
		<th>Registrations</th>
	</tr>
	<?php foreach ($tournaments as $tournament) { ?>
		<tr>
			<td>
				<a href="<?php echo esc_attr($tournament["link"]); ?>">
					<?php echo esc_html($tournament["name"]); ?>
				</a>
			</td>
			<td>
				<a href="<?php echo esc_attr($tournament["link"]); ?>">
					<?php echo esc_html($tournament["starts"]); ?>
				</a>
			</td>
			<td>
				<a href="<?php echo esc_attr($tournament["link"]); ?>">
					<?php echo esc_html($tournament["fee"]); ?>
				</a>
			</td>
			<td>
				<a href="<?php echo esc_attr($tournament["link"]); ?>">
					<?php echo esc_html($tournament["players"]); ?>
				</a>
			</td>
		</tr>
	<?php } ?>
</table>