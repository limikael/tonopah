(function($) {
	let refreshRate=10000;

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
			success: function(replacements) {
				console.log("got balance update...");
				for (let selector in replacements) {
					let replacement=replacements[selector];
					$(selector).html(replacement);
				}
				setTimeout(refreshBalances,refreshRate);
			},
			error: function(e) {
				console.log(e);
				setTimeout(refreshBalances,refreshRate);
			}
		});
	}

	if ($("#tonopah-account-balance").length) {
		setTimeout(refreshBalances,refreshRate);
		//refreshBalances();
	}


})(jQuery);