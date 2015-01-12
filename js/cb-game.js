// This is a preliminary study for CodeBreaker.

// wrapper for the entire game

var guessing_game = function (params, targets) {

// validates the game parameters:

    var check_params = function (gameopts) {

            var err = '';

            if (!gameopts.skillLevel) {
                err += " missing skill level";
            }
            if (!gameopts.players) {
                err += " missing number of players";
            }
            if (err) {
                throw "Invalid game configuration: " + err;
            }
        },

// method to return the solution of a game:

        set_solution = function (skill) {

// generates a solution: n=skillLevel unique random numbers.

            var randomnumber,
                found = false,
                solutions = [],
                i;

            while (solutions.length < skill) {
                randomnumber = Math.floor(Math.random() * 10);
                found = false;

                for (i = 0; i < solutions.length; i += 1) {
                    if (solutions[i] === randomnumber) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    solutions[solutions.length] = randomnumber;
                }
            }

// Join the list into a string.

            return solutions.join('');
        },

// Set a solution for this game

        solution = set_solution(params.skillLevel),

// method to evaluate a guess:

        process_guess = function () {

            var guess = targets.playerGuess.value,
                feedback = targets.gameFeedback,
                p = document.createElement("p"),
                error = '',
                response = '',
                status = '',
                counter = 0;

// A guess must be n=skillLevel numbers and must not be empty.

            if (!guess.match(/[0-9]{3}/) || guess === '') {
                error = 'Enter 3 numbers (0-9) only.';
            }
            if (guess === solution) {
                response = 'You guessed it!';
            } else {

// TODO: the feedback returned to the player must
// indicate the status of the  guess.                

                response = guess;
            }

            status = document.createTextNode(response);

            p.appendChild(status);

            feedback.appendChild(p);

            return false;
        };

    check_params(params);

    targets.submitGuess.onsubmit = process_guess;

// for debugging -----------------------
    console.log(solution);
// -------------------------------------
};
