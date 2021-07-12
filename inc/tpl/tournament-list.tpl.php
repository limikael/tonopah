<table class="table table-hover table-striped tonopah-bs-table">
	<tr class="table-primary">
		<th>Tournament</th>
		<th>Starts (<?php echo $tz; ?>)</th>
		<th>Fee</th>
		<th>Registrations</th>
	</tr>
	<?php foreach ($tournaments as $tournament) { ?>
		<tr>
			<td>
				<img src="<?php echo esc_attr($tournament["logo"]); ?>"/>
				<a class="text-reset text-decoration-none stretched-link"
						href="<?php echo esc_attr($tournament["link"]); ?>">
					<?php echo esc_html($tournament["name"]); ?>
				</a>
			</td>
			<td>
				<?php echo esc_html($tournament["starts"]); ?>
			</td>
			<td>
				<?php echo esc_html($tournament["fee"]); ?>
			</td>
			<td>
				<?php echo esc_html($tournament["players"]); ?>
			</td>
		</tr>
	<?php } ?>
</table>