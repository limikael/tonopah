export function getMockReply(state) {
	if (state.tournamentState=="registration" &&
			state.tournamentButtons[0].action=="joinTournament") {
		return {
			action: "joinTournament"
		}
	}

	if (state.tournamentState=="playing" &&
			state.buttons) {

		if (state.sliderMax)
			return {
				action: "raise",
//				value: state.sliderMax
			}

		else
			return {
				action: "call"
			}
	}
}