<table class="tonopah-list-table">
	<tr>
		<th>Currency</th>
		<th>Balance</th>
	</tr>
	<?php foreach ($currencies as $currency) { ?>
		<tr>
			<td>
				<a href="<?php echo esc_attr($currency["url"]); ?>" class="img">
					<img src="<?php echo esc_attr($currency["logo"]); ?>"/>
					<?php echo esc_html($currency["title"]); ?>
				</a>
			</td>
			<td>
				<a href="<?php echo esc_attr($currency["url"]); ?>">
					<?php echo esc_html($currency["balance"]); ?>
				</a>
			</td>
		</tr>
	<?php } ?>
</table>