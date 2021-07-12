<div class="tonopah-account-header">
	<img src="<?php echo esc_attr($logo); ?>"/>
	<p><b><?php echo esc_html($title); ?></b></p>
	<p>
		<b>Balance:</b>
		<span id="tonopah-account-balance"><?php echo esc_html($balanceText); ?></span>
	</p>
	<p>
		<b>Reserved:</b>
		<span id="tonopah-account-reserved"><?php echo esc_html($reservedText); ?></span>
	</p>
</div>
<ul class="nav nav-tabs mb-3">
	<?php foreach ($tabs as $i=>$tab) { ?>
		<?php
			$class="";
			if ($i==$selectedTabIndex)
				$class="active";
		?>
		<li class="nav-item">
			<a class="nav-link <?php echo esc_attr($class); ?>" href="<?php echo esc_attr($tab["link"]); ?>">
				<?php echo esc_html($tab["title"]); ?>
			</a>
		</li>
	<?php } ?>
</ul>

<?php if (isset($tabContent)) { ?>
	<?php echo $tabContent;?>
<?php } ?>

<?php if (isset($transactions)) { ?>
	<table class="table table-hover table-striped tonopah-bs-table" style="table-layout: fixed;">
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
<?php } ?>
