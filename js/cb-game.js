var codebreaker = function (params, targets) {

    var turns = params.guesses,

// validates the game parameters:

        check_params = function (gameopts) {

            var err = '';

            if (!gameopts.skillLevel) {

                err += " missing skill level";

            }
            if (!gameopts.players) {

                err += " missing number of players";

            }
            if (!gameopts.guesses) {

                err += " missing number of guesses";

            }
            if (err) {

                throw "Invalid game configuration: " + err;

            }
        },

// method to return the solution of a game:

        set_solution = function (skill) {

// generates a solution: 3 unique random numbers.

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

            return solutions.join('');
        },

// Set a solution for this game:

        solution = set_solution(params.skillLevel),

// method to validate a guess:

        validate_guess = function (aguess) {

            var ok = true;

// A guess must be 3 numbers and must not be empty.

            if (!aguess.match(/[0-9]{3}/)
                    || isNaN(aguess)
                    || aguess === '') {

                ok = false;

            }

            return ok;
        },

// method to generate a flag (displayed feedback to the player):
// See the instructions to decipher the meaning of the flags.

        get_flag = function (resp) {

            var results = ['-', '-', '-'],
                guess_values = [],
                sol_values = [],
                index = 0,
                sol = 0;

// populates guess_values with the response (guess)

            for (index in resp) {

                guess_values.push(resp[index])

            }

// populates sol_values with this game's solution

            for (sol in solution) {

                sol_values.pish(solution[sol]);

            }

// parse guess and solution values and prepare results

            for (index in guess_values) {

                for (sol in sol_values) {

                    if (index === sol) {

                        results[index[0]] = '+'

                    }
                    if (index[0] !== sol[0] && index[1] === sol[1]) {

                        results[index[0]] = '*'

                    }
                }
            }

            fdback = results.join('');

            return fdback;

        },

// method to process a valid guess, generate a response, and return a win:

        process_guess = function () {

            var guess = targets.playerGuess.value,
                feedback = targets.gameFeedback,
                p = document.createElement("p"),
                response = '',
                flag = '',
                status = '',
                win = false;

// check to verify a valid guess has been entered:

            if (!validate_guess(guess)) {

                response = 'Enter 3 numbers (0-9) only.';
                turns += 1;

            } else if (guess === solution) {

                response = 'You WIN!';
                win = true;

            } else {

                flag = guess;
                response = get_flag(response);

            }

            status = document.createTextNode(response);
            p.appendChild(status);
            feedback.appendChild(p);
            targets.submitGuess.reset();

            return win;
        },

// method to handle the sequence of game events:

        init = function () {

            var rmForm = targets.playerGuess,
                containerEl = rmForm.parentNode,
                win = process_guess();

            console.log('you have', turns - 1, 'turns left.');

            turns -= 1;

            if (turns === 0 && !win) {

                containerEl.remove(rmForm);

            }
            if (win) {

                console.log('score =', turns);
                containerEl.remove(rmForm);

            }
        };

    check_params(params);

    // for debugging -----------------------
    console.log(solution);
    // -------------------------------------

    targets.submitGuess.onsubmit = init;

};
