<table class="tonopah-list-table">
	<tr>
		<th>Cash Game Table</th>
		<th>Blinds</th>
		<th>Players</th>
	</tr>
	<?php foreach ($cashGames as $cashGame) { ?>
		<tr>
			<td>
				<a href="<?php echo esc_attr($cashGame["link"]); ?>">
					<?php echo esc_html($cashGame["name"]); ?>
				</a>
			</td>
			<td>
				<a href="<?php echo esc_attr($cashGame["link"]); ?>">
					<?php echo esc_html($cashGame["blinds"]); ?>
				</a>
			</td>
			<td>
				<a href="<?php echo esc_attr($cashGame["link"]); ?>">
					<?php echo esc_html($cashGame["players"]); ?>
				</a>
			</td>
		</tr>
	<?php } ?>
</table>