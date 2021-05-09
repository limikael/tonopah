<table class="tonopah-list-table">
	<tr>
		<th>Currency</th>
		<th>Balance</th>
	</tr>
	<?php foreach ($currencies as $currency) { ?>
		<tr>
			<td>
				<a href="?currency=<?php echo esc_attr($currency["id"]); ?>">
					<?php echo esc_html($currency["symbol"]); ?>
				</a>
			</td>
			<td>
				<a href="?currency=<?php echo esc_attr($currency["id"]); ?>">
					<?php echo esc_html($currency["balance"]); ?>
				</a>
			</td>
		</tr>
	<?php } ?>
</table>