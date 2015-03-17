var codebreaker = function (params, targets) {

    "use strict";

    var turns = params.guesses,

// validates the primary game parameters

        check_params = function (gameopts, tgts) {

            var err = [],
                status_window = tgts.gameMessages,
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

            rules.style.visibility = 'visible';

        },

// exit the info panel

        exit_info_panel = function () {

            var rules = targets.gameRules;

            rules.style.visibility = 'hidden';

        },

// redirect to the game source code GitHub page

        src_redirect = function () {

            var url = targets.cbSrc;

            window.open(url);

        },

// play again

        replay = function () {

            window.location.reload();
        },

// keypad events
        keypad_init = function () {

            var buttons = targets.keyPad,
                n_of_guesses = params.skillLevel,
                clicks = [],

                // method to supress double input
                keypad_dbls = function (e, clicks) {

                    var index = 0,
                        ok = true;

                    if (clicks.length > 0) {

                        for (index in clicks) {

                            if (clicks.hasOwnProperty(index)) {

                                if (e === clicks[index]) {

                                    ok = false;

                                }
                            }
                        }
                    }

                    return ok;

                },
                // input from the buttons
                keypad_click = function (e) {

                    var display = targets.keyDisplay;

                    if (clicks.length < n_of_guesses &&
                            keypad_dbls(e, clicks)) {

                        clicks.push(e);

                    }

                    if (e === 'reset') {

                        display.textContent = '';
                        clicks = '';
                        targets.playerGuess.value = clicks;
                        keypad_init();

                    } else {

                        targets.playerGuess.value = clicks.join('');
                        display.textContent = clicks.join('');

                    }
                },
                // input from the keyboard
                keyboard_input = function (e) {

                    var display = targets.keyDisplay;

                    // enable focus for keyboard input
                    targets.keyEnter.focus();

                    // clear any input
                    // handle 'c' as a reset call.
                    if (e.keyCode === 99) {

                        display.textContent = '';
                        clicks = '';
                        targets.playerGuess.value = clicks;
                        keypad_init();

                    }

                    if (clicks.length < n_of_guesses &&
                            keypad_dbls(
                                String.fromCharCode(e.keyCode),
                                clicks
                            )) {

                        // suppress any key clicks except for numbers,
                        // enter, and clear, respectively.
                        if (e.keyCode >= 48 && e.keyCode <= 57) {

                            clicks.push(String.fromCharCode(e.keyCode));
                            targets.playerGuess.value = clicks.join('');
                            display.textContent = clicks.join('');

                        }
                    }
                };

            // button mouse click events
            // 7
            buttons[0].onclick = function () {
                keypad_click(buttons[0].value);
            };
            // 8
            buttons[1].onclick = function () {
                keypad_click(buttons[1].value);
            };
            // 9
            buttons[2].onclick = function () {
                keypad_click(buttons[2].value);
            };
            // 4
            buttons[3].onclick = function () {
                keypad_click(buttons[3].value);
            };
            // 5
            buttons[4].onclick = function () {
                keypad_click(buttons[4].value);
            };
            // 6
            buttons[5].onclick = function () {
                keypad_click(buttons[5].value);
            };
            // 1
            buttons[6].onclick = function () {
                keypad_click(buttons[6].value);
            };
            // 2
            buttons[7].onclick = function () {
                keypad_click(buttons[7].value);
            };
            // 3
            buttons[8].onclick = function () {
                keypad_click(buttons[8].value);
            };
            // 0
            buttons[9].onclick = function () {
                keypad_click(buttons[9].value);
            };
            // C
            buttons[10].onclick = function () {
                keypad_click('reset');
            };

            // button keyboard events
            window.onkeypress = keyboard_input;

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
// See the instructions for the meaning of the flags.

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
                console_msgs = targets.gameMessages,
                console_message = '',
                p = document.createElement("li"),
                response = '',
                message = '',
                score = '',
                status = '',
                win = false,
                guesses_left = true;

// check to verify a valid guess has been entered

            if (!validate_guess(guess)) {

                console_message = 'Enter 3 numbers (0-9) only.';
                turns += 1;

            } else if (guess === solution) {

                response = guess + '    ' + get_flag(guess);
                score = turns;
                console_message = 'You WIN! | Score: ' + score;
                win = true;

            } else if (turns === 1) {

                response = guess + '    ' + get_flag(guess);
                console_message = 'You have run out of guesses.';
                guesses_left = false;


            } else {

                response = guess + '    ' + get_flag(guess);

            }

            console_msgs.textContent = console_message;

            if (!console_message || !guesses_left || win) {

                status = document.createTextNode(response + message);
                p.appendChild(status);
                feedback.appendChild(p);
                targets.playerGuess.value = 0;
                targets.submitGuess.reset();

            }

            return win;
        },

// submit a guess

        submit_guess = function () {

            var display = targets.keyDisplay,
                enter = targets.keyEnter,
                win = process_guess(),
                play_again = targets.playAgain;

            turns -= 1;
            display.textContent = '';

            if ((turns === 0 && !win) || win) {

                // disable the screen and submit button
                // render the 'play again' button
                display.style.visibility = 'hidden';
                enter.type = 'button';
                play_again.style.visibility = 'visible';

            } else {

                keypad_init();

            }
        },

// method to handle the preliminary game events

        init = function () {

            // for debugging -----------------------
            console.log(solution);
            // -------------------------------------

            check_params(params, targets);

            keypad_init();

        };

    init();

// general click events

    targets.submitGuess.onsubmit = submit_guess;
    targets.playAgain.onclick = replay;
    targets.gameInfo.onclick = get_rules;
    targets.infoExit.onclick = exit_info_panel;
    targets.gameSrc.onclick = src_redirect;

};
