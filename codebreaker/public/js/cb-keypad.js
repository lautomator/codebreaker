// keypad events
function keypadInit() {

    "use strict";

    var buttons = targets.keyPad,
        numOfGuesses = params.skillLevel,
        clicks = [];

    // method to supress double input
    function keypadDbls(e, clicks) {

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

    }

    // input from the buttons
    function keypadClick(e) {

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
    }

    // input from the keyboard
    function keyboardInput(e) {

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

        // handle 'enter' from the keyboard
        if (e.keyCode === 13) {

            targets.keyEnter.click();

        }

        if (clicks.length < numOfGuesses &&
                keypadDbls(
                    String.fromCharCode(e.keyCode),
                    clicks
                )) {

            // suppress any key clicks except for numbers.
            if (e.keyCode >= 48 && e.keyCode <= 57) {

                clicks.push(String.fromCharCode(e.keyCode));
                targets.playerGuess.value = clicks.join('');
                display.textContent = clicks.join('');

            }
        }
    }

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
