// returns the solution of a game:
// generates a solution: n=skillLevel unique random numbers.
function setSolution(skill) {

    "use strict";

    var randomNumber,
        found = false,
        solutions = [],
        i;

    while (solutions.length < skill) {

        randomNumber = Math.floor(Math.random() * 10);
        found = false;

        for (i = 0; i < solutions.length; i += 1) {

            if (solutions[i] === randomNumber) {

                found = true;
                break;

            }
        }
        if (!found) {

            solutions[solutions.length] = randomNumber;

        }
    }

    return solutions.join('');
}
