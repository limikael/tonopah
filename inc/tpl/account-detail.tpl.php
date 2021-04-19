<p>
	<b>Current Balance:</b>
	<?php echo esc_html($balanceText); ?>
</p>
<?php echo $extra; ?>
<table class="tonopah-list-table">
	<tr>
		<th>Time</th>
		<th>Amount</th>
		<th>Notice</th>
	</tr>
	<?php foreach ($transactions as $transaction) { ?>
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