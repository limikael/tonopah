<table class="table table-hover table-striped tonopah-bs-table">
	<tr class="table-primary">
		<th>Cash Game Table</th>
		<th>Blinds</th>
		<th>Players</th>
	</tr>
	<?php foreach ($cashGames as $cashGame) { ?>
		<tr>
			<td>
				<img src="<?php echo esc_attr($cashGame["logo"]); ?>"/>
				<a class="text-reset text-decoration-none stretched-link"
						href="<?php echo esc_attr($cashGame["link"]); ?>">
					<?php echo esc_html($cashGame["name"]); ?>
				</a>
			</td>
			<td>
				<?php echo esc_html($cashGame["blinds"]); ?>
			</td>
			<td>
				<?php echo esc_html($cashGame["players"]); ?>
			</td>
		</tr>
	<?php } ?>
</table>