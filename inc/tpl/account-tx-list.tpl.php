<table class="table table-hover table-striped tonopah-bs-table"
		id="tonopah-transaction-list">
	<tr class="table-dark">
		<th scope="col">Time</th>
		<th scope="col">To/From</th>
		<th scope="col">Amount</th>
		<th scope="col">Notice</th>
	</tr>
	<?php foreach ($transactions as $transaction) { ?>
		<tr class="<?php echo esc_attr($transaction["status"]);?> tonopah-tx-closed-row"
				data-tx-id="<?php echo esc_attr($transaction["id"]); ?>">
			<td>
				<a class="text-reset text-decoration-none stretched-link" href="#"
						data-tx-id="<?php echo esc_attr($transaction["id"]); ?>">
					<?php echo esc_html($transaction["stamp"]); ?>
				</a>
			</td>
			<td>
				<?php echo esc_html($transaction["entity"]); ?>
			</td>
			<td>
				<?php echo esc_html($transaction["amount"]); ?>
			</td>
			<td>
				<?php echo esc_html($transaction["notice"]); ?>
			</td>
		</tr>
		<tr style="display: none"></tr>
		<tr class="<?php echo esc_attr($transaction["status"]);?> tonopah-tx-open-row" style="display: none"
				data-tx-id="<?php echo esc_attr($transaction["id"]); ?>">
			<td colspan="4">
				<a class="row text-reset text-decoration-none stretched-link" href="#"
						data-tx-id="<?php echo esc_attr($transaction["id"]); ?>">
					<?php foreach ($transaction["meta"] as $metaLabel=>$meta) { ?>
						<b class="col-3">
							<?php echo esc_html($metaLabel); ?>:
						</b>
						<div class="col-9">
							<?php echo esc_html($meta); ?>
						</div>
					<?php } ?>
				</a>
			</td>
		</tr>
	<?php } ?>
</table>
