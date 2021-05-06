export default class CurrencyFormatter {
	constructor(options) {
		this.options=options;

		if (!this.options.divisorPlaces)
			this.options.divisorPlaces=0;
	}

	format(amount, style="standard") {
		amount=amount/Math.pow(10,this.options.divisorPlaces);

		switch (style) {
			case "number":
				break;

			case "standard":
				amount=String(amount);

				if (this.options.symbol)
					amount+=" "+this.options.symbol;
				break;

			default:
				throw new Error("Unknown number format style: "+style)
		}

		return amount;
	}
}
