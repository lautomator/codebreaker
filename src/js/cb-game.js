var codebreaker = function (params, targets) {

    "use strict";

    var turns = params.guesses,

// validates the primary game parameters

        check_params = function (gameopts, tgts) {

            var err = [],
                status_window = tgts.gameStatus,
                err_item = document.createElement("p"),
                err_msg = document.createTextNode(
                    "Invalid game configuration"
                );

            if (!gameopts.skillLevel || gameopts.skillLevel !== 3) {

                err.push("Missing skill level. " +
                    "Skill level must equal 3.  ");

            }
            if (!gameopts.players || gameopts.players !== 1) {

                err.push("Missing number of players. " +
                    "This is a 1-player version.");

            }
            if (!gameopts.guesses || gameopts.guesses !== 10) {

                err.push("Missing number of guesses. " +
                    "Only 10 guess permitted.");

            }
            if (err.length > 0) {

                err_item.appendChild(err_msg);
                status_window.appendChild(err_item);

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

// Set a solution for this game

        solution = set_solution(params.skillLevel),

// get the game rules

        get_rules = function () {

            var rules = targets.gameRules;

            // use the 'info' button
            if (rules.style.visibility === 'hidden') {

                rules.style.visibility = 'visible';

            } else {

                rules.style.visibility = 'hidden';
            }
        },

// exit the info panel

        exit_info_panel = function () {

            var rules = targets.gameRules;

            rules.style.visibility = 'hidden';

        },

// redirect to the game source code GitHub page

        src_redirect = function () {

            var url = targets.cbSrc;

            window.location.assign(url);

        },

// the player clicks the numbered keys ("the calculator")

        keyboard_click = function (s) {
			
			this.s = s;
			console.log('hello charlie', s.value);

        },

// method to validate a guess

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

// method to process a valid guess, generate a response, and return a win

        process_guess = function () {

            var guess = targets.playerGuess.value,
                feedback = targets.gameFeedback,
                console_messages = targets.gameMessages,
                console_message = '',
                p = document.createElement("p"),
                response = '',
                message = '',
                score = '',
                status = '',
                win = false;

// check to verify a valid guess has been entered

            if (!validate_guess(guess)) {

                console_message = 'Enter 3 numbers (0-9) only.';
                turns += 1;

            } else if (guess === solution) {

                response = guess + get_flag(guess);
                score = turns;
                console_message = 'You WIN! | Score: ' + score;
                win = true;

            } else if (turns === 1) {

                response = guess + get_flag(guess);
                console_message = 'You have run out of guesses.';

            } else {

                response = guess + get_flag(guess);

            }

            console_messages.textContent = console_message;
            status = document.createTextNode(response + message);
            p.appendChild(status);
            feedback.appendChild(p);
            targets.submitGuess.reset();

            return win;
        },

// method to handle the sequence of game events

        init = function () {

            var // rmForm = targets.playerGuess,
                // formrEl = rmForm.parentNode,
                win = process_guess(),
                replay = targets.playAgain;

            turns -= 1;

            if ((turns === 0 && !win) || win) {

                // TODO: need to make the form inoperable
				// when the game is complete.
				// formrEl.remove(rmForm);
                replay.style.visibility = 'visible';
            }
        },

// play again

        replay = function () {

            window.location.reload();
        };

    check_params(params, targets);

    // for debugging -----------------------
    console.log(solution);
    // -------------------------------------

// keypad click/touch events

	var s = targets.keypad[0].value;
	
	targets.keyPad[0].onclick = keyboard_click.bind();

// primary click/touch events

	targets.submitGuess.onsubmit = init;
    targets.playAgain.onclick = replay;
    targets.gameInfo.onclick = get_rules;
    targets.infoExit.onclick = exit_info_panel;
    targets.gameSrc.onclick = src_redirect;

};
