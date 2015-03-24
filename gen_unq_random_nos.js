// a comment 
var skill = 3;

function getSample() {

    // generate a sample of three numbers
    // between 0 and 9.

    var sample = [0, 0, 0];

    for (var index in sample) {

        // generate a random number between one and nine
        // ranNum = Math.floor(Math.random() * 10);

        sample[index] = Math.floor(Math.random() * 10);

    }









    // // ensure the numbers are unique
    // for (var i = 0; i < 3; i++) {

    //     // ensure the numbers are unique
    //     switch (sample[i]) {

    //         case 0:
    //             console.log("case 0");
    //             break;

    //         case 1:
    //             console.log("case 1");
    //             break;

    //         case 2:
    //             console.log("case 2");
    //             break;

    //         default:
    //             console.log("default");
    //             break;
    //     }

    // }



    return sample;

}

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
