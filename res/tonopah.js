(function($) {
	let refreshRate=10000;

	function installTxUi(openId) {
		$(".tonopah-tx-closed-row a").click(function(el) {
			let id=el.target.dataset.txId;
			$(".tonopah-tx-open-row").hide();
			$(".tonopah-tx-closed-row").show();
			$(".tonopah-tx-open-row[data-tx-id='"+id+"']").show();
			$(".tonopah-tx-closed-row[data-tx-id='"+id+"']").hide();
			return false;
		});

		$(".tonopah-tx-open-row a").click(function(el) {
			$(".tonopah-tx-open-row").hide();
			$(".tonopah-tx-closed-row").show();
			return false;
		});

		if (openId) {
			$(".tonopah-tx-open-row[data-tx-id='"+openId+"']").show();
			$(".tonopah-tx-closed-row[data-tx-id='"+openId+"']").hide();
		}
	}

	function refreshBalances() {
		$.ajax({
			type: "GET",
			dataType: "json",
			url: ajaxurl,
			data: {
				action: "tonopah-frontend",
				call: "getCurrencyTexts",
				currency: tonopahCurrency
			},
			success: function(res) {
				let openId=$(".tonopah-tx-open-row:visible").attr("data-tx-id");
				console.log("got balance update, open: "+openId);

				for (let selector in res.text)
					$(selector).text(res.text[selector]);

				for (let selector in res.replaceWith)
					$(selector).replaceWith(res.replaceWith[selector]);

				installTxUi(openId);
				setTimeout(refreshBalances,refreshRate);
			},
			error: function(e) {
				console.log(e);
				setTimeout(refreshBalances,refreshRate);
			}
		});
	}

	if ($("#tonopah-account-balance").length)
		setTimeout(refreshBalances,refreshRate);

	installTxUi();
})(jQuery);