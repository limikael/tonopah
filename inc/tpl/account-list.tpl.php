<table class="tonopah-list-table">
	<tr>
		<th>Currency</th>
		<th>Balance</th>
	</tr>
	<?php foreach ($currencies as $currency) { ?>
		<tr>
			<td>
				<a href="?currency=<?php echo esc_attr($currency["code"]); ?>">
					<?php echo esc_html($currency["code"]); ?>
				</a>
			</td>
			<td>
				<a href="?currency=<?php echo esc_attr($currency["code"]); ?>">
					<?php echo esc_html($currency["balance"]); ?>
				</a>
			</td>
		</tr>
	<?php } ?>
</table>