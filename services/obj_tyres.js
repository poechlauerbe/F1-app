function Tyres (tyreAgeAtStart, stintNr, lapStart, lapEnd, compound ) {
	this.tyreAgeAtStart = tyreAgeAtStart;
	this.stintNr = stintNr;
	this.lapStart = lapStart;
	this.lapEnd = lapEnd;
	this.compound = compound;
	this.lapCount = this.lapEnd - this.lapStart + lapStart;
}

tyres = [];

function addTyre(driverNumber, tyreAgeAtStart, stintNr, lapStart, lapEnd, compound) {
	if (!tyres[driverNumber]) {
		tyres.driverNumber = [];
	}
	const driverTyres = tyres.driverNumber.find(t => t.stintNr === stintNr);
	if (!driverTyres) {
		tyres.driverNumber.push(new Tyres(tyreAgeAtStart, stintNr, lapStart, lapEnd, compound));
	}
}
