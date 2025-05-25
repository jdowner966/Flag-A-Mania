document.addEventListener("DOMContentLoaded", function () {
    const totalTime = document.getElementById("timeInsert");
    const crctAnswers = document.getElementById("correctInsert");
    const incrAnswers = document.getElementById("incorrectInsert");
    const scoreTotal = document.getElementById("finalScoreValue");

    const cookies = document.cookie.split(';');
    for (var cookie of cookies) {
        var refinedCookie = cookie.trim()
        if (refinedCookie.startsWith("totalSeconds=")) {
            var secondsLeft = refinedCookie.split("=").pop();
            totalTime.textContent = secondsLeft + " seconds";
        } if (refinedCookie.startsWith("correctAnswers=")) {
            var correct = refinedCookie.split("=").pop();
            crctAnswers.textContent = correct;
        } if (refinedCookie.startsWith("incorrectAnswers=")) {
            var incorrect = refinedCookie.split("=").pop()
            incrAnswers.textContent = incorrect;
        } if (refinedCookie.startsWith("finalScore=")) {
            var score = refinedCookie.split("=").pop();
            scoreTotal.textContent = score;
        } 
    }

});