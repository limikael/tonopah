<table class="table table-hover table-striped tonopah-bs-table" style="table-layout: fixed;"
		id="tonopah-transaction-list">
	<tr class="table-dark">
		<th scope="col">Time</th>
		<th scope="col">To/From</th>
		<th scope="col">Amount</th>
		<th scope="col">Notice</th>
	</tr>
	<?php foreach ($transactions as $transaction) { ?>
		<tr class="<?php echo esc_attr($transaction["status"]);?>">
			<td><a class="text-reset text-decoration-none" href="#">
				<?php echo esc_html($transaction["stamp"]); ?>
			</a></td>
			<td><a class="text-reset text-decoration-none" href="#">
				<?php echo esc_html($transaction["entity"]); ?>
			</a></td>
			<td><a class="text-reset text-decoration-none" href="#">
				<?php echo esc_html($transaction["amount"]); ?>
			</a></td>
			<td><a class="text-reset text-decoration-none" href="#">
				<?php echo esc_html($transaction["notice"]); ?>
			</a></td>
		</tr>
	<?php } ?>
</table>
