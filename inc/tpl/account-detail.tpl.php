<p>
	<b>Balance:</b>
	<?php echo esc_html($balanceText); ?>
</p>
<ul class="tonopah-account-tabs">
	<?php foreach ($tabs as $i=>$tab) { ?>
		<?php
			$class="";
			if ($i==$selectedTabIndex)
				$class="selected";
		?>
		<li class="<?php echo esc_attr($class); ?>">
			<a href="<?php echo esc_attr($tab["link"]); ?>">
				<?php echo esc_html($tab["title"]); ?>
			</a>
		</li>
	<?php } ?>
</ul>

<?php if (isset($tabContent)) { ?>
	<?php echo $tabContent;?>
<?php } ?>

<?php if (isset($transactions)) { ?>
	<table class="tonopah-list-table">
		<tr>
			<th>Time</th>
			<th>To/From</th>
			<th>Amount</th>
			<th>Notice</th>
		</tr>
		<?php foreach ($transactions as $transaction) { ?>
			<tr>
				<td><a href="#">
					<?php echo esc_html($transaction["stamp"]); ?>
				</a></td>
				<td><a href="#">
					<?php echo esc_html($transaction["entity"]); ?>
				</a></td>
				<td><a href="#">
					<?php echo esc_html($transaction["amount"]); ?>
				</a></td>
				<td><a href="#">
					<?php echo esc_html($transaction["notice"]); ?>
				</a></td>
			</tr>
		<?php } ?>
	</table>
<?php } ?>
