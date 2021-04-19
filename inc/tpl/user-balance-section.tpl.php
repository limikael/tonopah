<h2>Tonopah Balance</h2>
<table class="form-table">
	<?php foreach ($currencies as $currency) { ?>
		<tr>
			<th>
				<?php echo esc_html($currency["code"]); ?>
			</th>
			<td>
				<?php echo esc_html($currency["balance"]); ?>
			</td>
		</tr>
	<?php } ?>
</table>