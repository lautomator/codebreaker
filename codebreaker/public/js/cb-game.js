function codebreaker(params, targets) {

    "use strict";

    var turns = params.guesses,
        solution = setSolution(params.skillLevel);

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

    // get the game rules
    function getRules() {

        var rules = targets.gameRules;
        rules.style.display = 'block';

    }

    // exit the info panel
    function exitInfoPanel() {

        var rules = targets.gameRules;
        rules.style.display = 'none';
    }

    // redirect to the game source code GitHub page
    function srcRedirect() {

        var url = targets.cbSrc;
        window.open(url);

    }

    // set the best score in a cookie
    function setScore(ckName, scr, days) {
        var date,
            expires;

        if (days) {

            date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();

        } else {

            expires = "";

        }

        document.cookie = ckName + "=" + scr + expires + "; path=/";

    }

    function getScore(ckName) {

        var name = ckName + "=",
            ckArray = document.cookie.split(';'),
            i;

        for (i = 0; i < ckArray.length; i += 1) {

            while (ckArray[i].charAt(0) === ' ') {

                ckArray[i] = ckArray[i].substring(1);

            }

            if (ckArray[i].indexOf(name) === 0) {

                return ckArray[i].substring(name.length, ckArray[i].length);

            }
        }

        return "";
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
        for (index in solution) {

            if (solution.hasOwnProperty(index)) {

                solValues.push(solution[index]);

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
            l = document.createElement("li"),
            response = '',
            message = '',
            score = '',
            status = '',
            win = false,
            guessesLeft = true,
            cookieExpiration = 1,
            hiScore = getScore('score');

    // check to verify a valid guess has been entered
        if (!validateGuess(guess)) {

            consoleMessage = 'Enter 3 numbers.';
            turns += 1;

        } else if (guess === solution) {

            response = guess + '  |  ' + getFlag(guess);
            score = turns;
            consoleMessage = 'You WIN! Score: ' + score;

            // determine if a new high score needs to be set
            if (score > hiScore) {

                setScore('score', score, cookieExpiration);

            }

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
            l.appendChild(status);
            feedback.appendChild(l);
            targets.playerGuess.value = 0;
            targets.submitGuess.reset();

        }

        return win;
    }

    // submit a guess
    function submitGuess() {

        var display = targets.keyDisplay,
            enter = targets.keyEnter,
            keys = targets.keyPad,
            win = processGuess(),
            newGame = targets.newGame;

        turns -= 1;
        display.textContent = '';

        if ((turns === 0 && !win) || win) {

            // disable the screen and all of the keys
            // render the 'play again' button
            display.style.visibility = 'hidden';
            keys.disabled = true;
            enter.disabled = true;
            enter.style.color = '#00b9ff';
            newGame.style.visibility = 'visible';

        } else {

            keypadInit();

        }
    }

    function init() {

        // for debugging -----------------------
        // console.log(solution);
        // -------------------------------------

        checkParams(params, targets);

        keypadInit();

        // general click events
        targets.keyEnter.onclick = submitGuess;
        targets.gameInfo.onclick = getRules;
        targets.infoExit.onclick = exitInfoPanel;
        targets.gameSrc.onclick = srcRedirect;
    }

    init();

}
