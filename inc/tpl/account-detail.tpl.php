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

<?php echo $tabContent;?>
