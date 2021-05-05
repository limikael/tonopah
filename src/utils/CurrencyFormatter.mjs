export default class CurrencyFormatter {
	constructor(options) {
		this.options=options;

		if (!this.options.divisorPlaces)
			this.options.divisorPlaces=0;
	}

	format(amount) {
		amount=amount/Math.pow(10,this.options.divisorPlaces);
		amount=String(amount);

		if (this.options.symbol)
			amount+=" "+this.options.symbol;

		return amount;
	}
}
