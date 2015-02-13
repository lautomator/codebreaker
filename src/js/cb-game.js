var codebreaker = function (params, targets) {

    var turns = params.guesses,

// validates the primary game parameters:

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
// generates a solution: 3 unique random numbers.

        set_solution = function (skill) {

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

// get the game rules:
        get_rules = function () {

            var rules = targets.gameRules;

            if (rules.getAttribute('class') === 'hide') {

                rules.setAttribute('class', 'show');

            } else {

                rules.setAttribute('class', 'hide');
            }
        },

// redirect to the game source code GitHub page

        src_redirect = function () {

            var url = targets.cb_src;

            window.location.assign(url);

        }

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

            var results = [],
                guess_values = [],
                sol_values = [],
                index = 0,
                fdback = '';

// populates guess_values with the response (guess)

            for (index in resp) {

                if (resp.hasOwnProperty(index)) {

                    guess_values.push(resp[index]);

                }

            }

// populates sol_values with this game's solution

            for (index in solution) {

                if (solution.hasOwnProperty(index)) {

                    sol_values.push(solution[index]);

                }
            }

// parse guess and solution values and prepare results

            for (index in guess_values) {

                if (guess_values.hasOwnProperty(index)) {

                    for (index in sol_values) {

                        if (sol_values.hasOwnProperty(index)) {

                            if (guess_values[index] === sol_values[index]) {

                                results[index] = '+';

                            } else if (guess_values[index] === sol_values[0]
                                    || guess_values[index] === sol_values[1]
                                    || guess_values[index] === sol_values[2]) {

                                results[index] = '*';

                            } else {

                                results[index] = '-';

                            }
                        }
                    }
                }
            }

            results.sort();

            fdback = results.join('');

            return fdback;
        },

// method to process a valid guess, generate a response, and return a win:

        process_guess = function () {

            var guess = targets.playerGuess.value,
                feedback = targets.gameFeedback,
                p = document.createElement("p"),
                response = '',
                message = '',
                score = '',
                status = '',
                win = false;

// check to verify a valid guess has been entered:

            if (!validate_guess(guess)) {

                response = 'Enter 3 numbers (0-9) only.';
                turns += 1;

            } else if (guess === solution) {

                response = guess + ' --> ';
                response += get_flag(guess);
                message = 'You WIN!';
                score = 'Score = ' + turns;
                win = true;

            } else if (turns === 1) {

                response = guess + ' --> ';
                response += get_flag(guess);
                message = 'You have run out of guesses.';
                message += 'Solution: ' + solution

            } else {

                response = guess + ' --> ';
                response += get_flag(guess);

            }

            status = document.createTextNode(response + message + score);
            p.appendChild(status);
            feedback.appendChild(p);
            targets.submitGuess.reset();

            return win;
        },

// method to handle the sequence of game events:

        init = function () {

            var rmForm = targets.playerGuess,
                formrEl = rmForm.parentNode,
                win = process_guess();

            turns -= 1;

            if ((turns === 0 && !win) || win) {

                formrEl.remove(rmForm);
            }
        },

// play again

        replay = function () {

            window.location.reload();
        };

    check_params(params);

    // for debugging -----------------------
    console.log(solution);
    // -------------------------------------

// primary click/touch events:

    targets.submitGuess.onsubmit = init;
    targets.playAgain.onclick = replay;
    targets.gameInfo.onclick = get_rules;
    targets.gameSrc.onclick = src_redirect;

};
