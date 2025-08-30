/**
 * Generates a string with a given number of zeroes.
 * @param amount The amount of zeroes the string should contain.
 * @returns The string.
 */
export const generateZeroes = (amount: number) => {
	let string = ``;

	for (let i = 0; i < amount; i++) {
		string += "0";
	}

	return string;
}