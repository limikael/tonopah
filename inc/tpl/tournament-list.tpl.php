<table class="tonopah-cashgame-list">
	<tr>
		<th>Tournament</th>
		<th>Starts</th>
		<th>Fee</th>
		<th>Registrations</th>
	</tr>
	<?php foreach ($tournaments as $tournament) { ?>
		<tr>
			<td>
				<a class="btn" href="<?php echo esc_attr($tournament["link"]); ?>">
					<?php echo esc_html($tournament["name"]); ?>
				</a>
			</td>
			<td>
				<a class="btn" href="<?php echo esc_attr($tournament["link"]); ?>">
					<?php echo esc_html($tournament["starts"]); ?>
				</a>
			</td>
			<td>
				<a class="btn" href="<?php echo esc_attr($tournament["link"]); ?>">
					<?php echo esc_html($tournament["fee"]); ?>
				</a>
			</td>
			<td>
				<a class="btn" href="<?php echo esc_attr($tournament["link"]); ?>">
					<?php echo esc_html($tournament["players"]); ?>
				</a>
			</td>
		</tr>
	<?php } ?>
</table>