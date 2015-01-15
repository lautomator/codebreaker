// This is a preliminary study for CodeBreaker.

// wrapper for the entire game

var guessing_game = function (params, targets) {

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

        validate_guess = function () {

            var guess = targets.playerGuess.value,
                ok = true;

            if (!guess.match(/[0-9]{3}/)
                    || isNaN(guess)
                    || guess === '') {

                ok = false;
            }

            return ok;
        },

// method to evaluate a guess:

        process_guess = function () {

            var guess = targets.playerGuess.value,
                feedback = targets.gameFeedback,
                p = document.createElement("p"),
                response = '',
                status = '',
                win = false;

// A guess must be n=skillLevel numbers and must not be empty.

            if (!guess.match(/[0-9]{3}/) || guess === '') {
                response = 'Enter 3 numbers (0-9) only.';
            } else if (guess === solution) {
                response = 'You WIN!';
                win = true;
            } else {

                response = guess;
            }

            status = document.createTextNode(response);
            p.appendChild(status);
            feedback.appendChild(p);
            targets.submitGuess.reset();

            return win;
        },

// method to handle the sequence of playing the game:

        init = function () {

            var rmForm = targets.submitGuess,
                containerEl = rmForm.parentNode,
                win = process_guess();

            console.log('you have', turns - 1, 'turns left.');

            turns -= 1;

            if (turns === 0 && !win) {
                console.log('you have made 10 guesses and you lose.');
                containerEl.remove(rmForm);
            }
            if (win) {
                console.log('you WIN!');
                containerEl.remove(rmForm);
            }
            /*
            if (validate_guess()) {
                console.log('a valid guess');
                process_guess();
            } else {
                console.log('not valid');
            }*/

            // TODO:
            // check for valid guess
            // if so, process guess
            // return response
            // count valid guesses

        };

    check_params(params);

    // for debugging -----------------------
    console.log(solution);
    // -------------------------------------

    targets.submitGuess.onsubmit = init;

};
