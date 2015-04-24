function getScore(ckName, cbBestScoreTarget) {

    "use strict";

    var name = ckName + "=",
        ckArray = document.cookie.split(';'),
        topScore = cbBestScoreTarget,
        l = document.createElement("li"),
        i;

    for (i = 0; i < ckArray.length; i += 1) {

        while (ckArray[i].charAt(0) === ' ') {

            ckArray[i] = ckArray[i].substring(1);

        }

        if (ckArray[i].indexOf(name) === 0) {

            l.appendChild(document.createTextNode(ckArray[i].substring(
                name.length,
                ckArray[i].length)));
            topScore.appendChild(l);

        }

    }

    return "";
}
