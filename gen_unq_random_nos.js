function getSample(skill) {
    
    // generate a range of 3 random numbers
    
    var ranNum;
    
    // generate a random number between one and nine
    ranNum = Math.floor(Math.random() * 10);
    
    return ranNum;
    
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