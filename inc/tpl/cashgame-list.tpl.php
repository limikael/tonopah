<table class="tonopah-cashgame-list">
	<tr>
		<th>Cash Game Table</th>
		<th>Blinds</th>
		<th>Players</th>
	</tr>
	<?php foreach ($cashGames as $cashGame) { ?>
		<tr>
			<td>
				<a>
					<?php echo esc_html($cashGame["name"]); ?>
				</a>
			</td>
			<td>
				<a>
					<?php echo esc_html($cashGame["blinds"]); ?>
				</a>
			</td>
			<td>
				<a>
					<?php echo esc_html($cashGame["players"]); ?>
				</a>
			</td>
		</tr>
	<?php } ?>
</table>