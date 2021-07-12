<table class="table table-hover table-striped tonopah-bs-table">
	<tr class="table-dark">
		<th>Currency</th>
		<th>Balance</th>
	</tr>
	<?php foreach ($currencies as $currency) { ?>
		<tr>
			<td>
				<img src="<?php echo esc_attr($currency["logo"]); ?>"/>
				<a class="text-reset text-decoration-none stretched-link"
						href="<?php echo esc_attr($currency["url"]); ?>">
					<?php echo esc_html($currency["title"]); ?>
				</a>
			</td>
			<td>
				<?php echo esc_html($currency["balance"]); ?>
			</td>
		</tr>
	<?php } ?>
</table>