function codebreaker(params, targets) {

    "use strict";

    var turns = params.guesses;

    // validates the primary game parameters
    function checkParams(gameopts, tgts) {

        var err = [],
            statusWindow = tgts.gameMessages,
            errItem = document.createElement("p"),
            errMsg = document.createTextNode(
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

            errItem.appendChild(errMsg);
            statusWindow.appendChild(errItem);

            throw "Invalid game configuration: " + err;

        }
    }

    // TODO: break this into two functions
    // returns the solution of a game:
    // generates a solution: 3 unique random numbers.
    function setSolution(skill) {

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

    // get the game rules
    function getRules() {

        var rules = targets.gameRules;

        rules.style.visibility = 'visible';

    }

    // exit the info panel
    function exitInfoPanel() {

        var rules = targets.gameRules;

        rules.style.visibility = 'hidden';

    }

    // redirect to the game source code GitHub page
    function srcRedirect() {

        var url = targets.cbSrc;

        window.open(url);

    }

    // play again
    function replay() {

        // TODO: rewrite this
        window.location.reload();
    }

    // TODO: extract this and make into a separate object
    // keypad events
    function keypadInit() {

        var buttons = targets.keyPad,
            numOfGuesses = params.skillLevel,
            clicks = [],

            // method to supress double input
            keypadDbls = function (e, clicks) {

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
            keypadClick = function (e) {

                var display = targets.keyDisplay;

                if (clicks.length < numOfGuesses &&
                        keypadDbls(e, clicks)) {

                    clicks.push(e);

                }

                if (e === 'reset') {

                    display.textContent = '';
                    clicks = '';
                    targets.playerGuess.value = clicks;
                    keypadInit();

                } else {

                    targets.playerGuess.value = clicks.join('');
                    display.textContent = clicks.join('');

                }
            },
            // input from the keyboard
            keyboardInput = function (e) {

                var display = targets.keyDisplay;

                // enable focus for keyboard input
                targets.keyEnter.focus();

                // clear any input
                // handle 'c' as a reset call.
                if (e.keyCode === 99) {

                    display.textContent = '';
                    clicks = '';
                    targets.playerGuess.value = clicks;
                    keypadInit();

                }

                if (clicks.length < numOfGuesses &&
                        keypadDbls(
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
            keypadClick(buttons[0].value);
        };
        // 8
        buttons[1].onclick = function () {
            keypadClick(buttons[1].value);
        };
        // 9
        buttons[2].onclick = function () {
            keypadClick(buttons[2].value);
        };
        // 4
        buttons[3].onclick = function () {
            keypadClick(buttons[3].value);
        };
        // 5
        buttons[4].onclick = function () {
            keypadClick(buttons[4].value);
        };
        // 6
        buttons[5].onclick = function () {
            keypadClick(buttons[5].value);
        };
        // 1
        buttons[6].onclick = function () {
            keypadClick(buttons[6].value);
        };
        // 2
        buttons[7].onclick = function () {
            keypadClick(buttons[7].value);
        };
        // 3
        buttons[8].onclick = function () {
            keypadClick(buttons[8].value);
        };
        // 0
        buttons[9].onclick = function () {
            keypadClick(buttons[9].value);
        };
        // C
        buttons[10].onclick = function () {
            keypadClick('reset');
        };

        // button keyboard events
        window.onkeypress = keyboardInput;

    }

    // validate a guess
    function validateGuess(aguess) {

        var ok = true;

    // A guess must be 3 numbers and must not be empty.

        if (!aguess.match(/[0-9]{3}/)) {

            ok = false;

        }

        return ok;
    }

    // generate a flag (displayed feedback to the player):
    // See the instructions for the meaning of the flags.
    function getFlag(resp) {

        var results = [],
            guessValues = [],
            solValues = [],
            index = 0,
            fdback = '';

    // populates guessValues with the response (guess)

        for (index in resp) {

            if (resp.hasOwnProperty(index)) {

                guessValues.push(resp[index]);

            }

        }

    // populates solValues with this game's solution

        for (index in window.solution) {

            if (window.solution.hasOwnProperty(index)) {

                solValues.push(window.solution[index]);

            }
        }

    // parse guess and solution values and prepare results

        for (index in guessValues) {

            if (guessValues.hasOwnProperty(index)) {

                for (index in solValues) {

                    if (solValues.hasOwnProperty(index)) {

                        if (guessValues[index] === solValues[index]) {

                            results[index] = '+';

                        } else if (guessValues[index] === solValues[0]
                                || guessValues[index] === solValues[1]
                                || guessValues[index] === solValues[2]) {

                            results[index] = '*';

                        } else {

                            results[index] = '_';

                        }
                    }
                }
            }
        }

        results.sort();

        fdback = results.join('');

        return fdback;
    }

    // process a valid guess, generate a response, and return a win
    function processGuess() {

        var guess = targets.playerGuess.value,
            feedback = targets.gameFeedback,
            consoleMsgs = targets.gameMessages,
            consoleMessage = '',
            p = document.createElement("li"),
            response = '',
            message = '',
            score = '',
            status = '',
            win = false,
            guessesLeft = true;

    // check to verify a valid guess has been entered

        if (!validateGuess(guess)) {

            consoleMessage = 'Enter 3 numbers (0-9) only.';
            turns += 1;

        } else if (guess === window.solution) {

            response = guess + '  |  ' + getFlag(guess);
            score = turns;
            consoleMessage = 'You WIN! Score: ' + score;
            win = true;

        } else if (turns === 1) {

            response = guess + '  |  ' + getFlag(guess);
            consoleMessage = 'You have run out of guesses.';
            guessesLeft = false;


        } else {

            response = guess + '  |  ' + getFlag(guess);

        }

        consoleMsgs.textContent = consoleMessage;

        if (!consoleMessage || !guessesLeft || win) {

            status = document.createTextNode(response + message);
            p.appendChild(status);
            feedback.appendChild(p);
            targets.playerGuess.value = 0;
            targets.submitGuess.reset();

        }

        return win;
    }

    // submit a guess
    function submitGuess() {

        var display = targets.keyDisplay,
            enter = targets.keyEnter,
            win = processGuess(),
            playAgain = targets.playAgain;

        turns -= 1;
        display.textContent = '';

        if ((turns === 0 && !win) || win) {

            // disable the screen and submit button
            // render the 'play again' button
            display.style.visibility = 'hidden';
            enter.type = 'button';
            playAgain.style.visibility = 'visible';

        } else {

            keypadInit();

        }
    }

    function init() {

        var solution = setSolution(params.skillLevel);

        // for debugging -----------------------
        console.log(solution);
        // -------------------------------------

        checkParams(params, targets);

        keypadInit();

        // general click events
        targets.submitGuess.onsubmit = submitGuess;
        targets.playAgain.onclick = replay;
        targets.gameInfo.onclick = getRules;
        targets.infoExit.onclick = exitInfoPanel;
        targets.gameSrc.onclick = srcRedirect;

    }

    init();

}
