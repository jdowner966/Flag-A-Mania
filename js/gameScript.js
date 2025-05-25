

document.addEventListener("DOMContentLoaded", function () {
    var secondsLeft = 0;
    var questionsLeft = 0;
    var volumeSetting = 0;
    var ttsSetting = '';
    
    const cookies = document.cookie.split(';');
    for (var cookie of cookies) {
        var refinedCookie = cookie.trim()
        if (refinedCookie.startsWith("timerSet=")) {
            secondsLeft = parseInt(refinedCookie.split("=").pop())
        } if (refinedCookie.startsWith("questionAmt=")) {
            questionsLeft = parseInt(refinedCookie.split("=").pop())
        }  if (refinedCookie.startsWith("volumeAmt=")) {
            volumeSetting = parseInt(refinedCookie.split("=").pop())
        } if (refinedCookie.startsWith("TTStf=")) {
            ttsSetting = refinedCookie.split("=").pop()
    }}
    
    var correctAns = 0;
    var incorrectAns = 0;
    var totalSeconds = 0;
    var score = 0;
    const totalTime = secondsLeft; // Store total time for reference
    const questionAmt = questionsLeft;
    const timerBar = document.getElementById("timerBar");
    const timeLeft = document.getElementById("timeLeft");
    const scoreNum = document.getElementById("scoreNum");
    const progressBar = document.getElementById("progressBar");
    const optionsContainer = document.getElementById("optionsContainer")
    const question = document.getElementById("question");
    const option1 = document.getElementById("1");
    const option2 = document.getElementById("2");
    const option3 = document.getElementById("3");
    const option4 = document.getElementById("4");

    const correctAudio = new Audio('../sfx/correct.mp3');
    const incorrectAudio = new Audio('../sfx/wrong.mp3')

    correctAudio.volume = volumeSetting/100;
    incorrectAudio.volume = volumeSetting/100;

    var correctAnswer= [];

    

    function loadQtn() {
        fetch('../getQtnAns.php')
            .then(choicesJSON => choicesJSON.json())
            .then(data => {
                console.log(data);
                var qtnIndex = Math.floor(Math.random() * 4);
                correctAnswer = data[qtnIndex];
                var countryName = correctAnswer['countryName'];
                question.textContent = countryName;
                option1.querySelector("img").src = data[0].imgURL;
                option2.querySelector("img").src = data[1].imgURL;
                option3.querySelector("img").src = data[2].imgURL;
                option4.querySelector("img").src = data[3].imgURL;

                if (ttsSetting === 'on') {
                    var sayQuestion = new SpeechSynthesisUtterance(countryName);
                    sayQuestion.volume = volumeSetting/100;
                    window.speechSynthesis.cancel();
                    window.speechSynthesis.speak(sayQuestion);
                }
            })
            .catch(error => console.error("Error fetching question:", error));
    }       

    //Handles Timer

    if (timerBar && progressBar) {
        // Ensure timer bar starts at full width
        timerBar.style.width = "100%";
        progressBar.style.width = "0%";
    }


    // Check if elements exist
    if (!timerBar || !timeLeft) {
        console.error("Timer elements not found!");
        return; // Exit the function early if elements are missing
    }

    function updateTimer() {
        if (secondsLeft > 1) {
            secondsLeft--;
            timerBar.style.width = `${(secondsLeft / totalTime) * 100}%`;
            timeLeft.textContent = "0:" + secondsLeft.toString().padStart(2, "0");
        } else {
            incorrectAudio.pause();
            incorrectAudio.currentTime = 0;
            incorrectAudio.play();
            if (questionsLeft > 0) {
                incorrectAns ++;
                questionsLeft--;
                totalSeconds += totalTime;
                progressBar.style.width= `${((questionAmt - questionsLeft) / questionAmt) * 100}%`;
                clearInterval(interval); // Stop the timer when it reaches 0
                resetTimer();// Reset timer after 1 second
                loadQtn();
            } else {
                incorrectAns ++;
                totalSeconds += totalTime;
                document.cookie = `finalScore=${score}` + ";" + "path=/";
                document.cookie = `totalSeconds=${totalSeconds}` + ";" + "path=/";
                document.cookie = `correctAnswers=${correctAns}` + ";" + "path=/";
                document.cookie = `incorrectAnswers=${incorrectAns}` + ";" + "path=/";
                clearInterval(interval);
                window.location.href = "scorePage.html";
            }
            }
        
    }

    function resetTimer() {
        secondsLeft = totalTime;
        timerBar.style.width = "100%";
        timeLeft.textContent = "0:" + secondsLeft.toString().padStart(2, "0");
        interval = setInterval(updateTimer, 1000); // Restart the timer
    }

    function checkAnswer(selectedBtn, imgSrc) {
        if (questionsLeft > 1) {
           if (imgSrc == correctAnswer.imgURL) {
            correctAudio.currentTime = 0;
            correctAudio.play();
            correctAns ++;
            score = score + 100;
            selectedBtn.style.backgroundColor = "#6ca678";      
            setTimeout(() => {
                selectedBtn.style.backgroundColor = "";
              }, 400);     
            } else {
                incorrectAudio.currentTime = 0;
                incorrectAudio.play();
                incorrectAns ++;
                selectedBtn.style.backgroundColor = "#a66c70";
                setTimeout(() => {
                    selectedBtn.style.backgroundColor = "";
                  }, 400); 
            } 
            questionsLeft--;
            progressBar.style.width= `${((questionAmt - questionsLeft) / questionAmt) * 100}%`;
            scoreNum.textContent = score;
            totalSeconds += totalTime - secondsLeft;
            setTimeout(() => {
                clearInterval(interval);
                resetTimer();
                loadQtn();
            }, 500);
            
        } else {
            if (imgSrc == correctAnswer.imgURL) {
                correctAudio.currentTime = 0;
                correctAudio.play();
                correctAns ++;
                score += 100;
                selectedBtn.style.backgroundColor = "#6ca678";      
                setTimeout(() => {
                    selectedBtn.style.backgroundColor = "";
                }, 400);   
            } else {
                incorrectAudio.currentTime = 0;
                incorrectAudio.play();
                incorrectAns ++;
                selectedBtn.style.backgroundColor = "#a66c70";
                setTimeout(() => {
                    selectedBtn.style.backgroundColor = "";
                }, 400); 
            }
            totalSeconds += totalTime - secondsLeft;
            document.cookie = `finalScore=${score}` + ";" + "path=/";
            document.cookie = `totalSeconds=${totalSeconds}` + ";" + "path=/";
            document.cookie = `correctAnswers=${correctAns}` + ";" + "path=/";
            document.cookie = `incorrectAnswers=${incorrectAns}` + ";" + "path=/";
            clearInterval(interval);
            setTimeout(() => {
                window.location.href = "scorePage.html";
            }, 500)
        }
    }

    // Start the timer interval
    let interval = setInterval(updateTimer, 1000);
    loadQtn();
    optionsContainer.querySelectorAll("button").forEach(button => button.addEventListener("dblclick", function() {checkAnswer(this, this.querySelector("img").src)}, false));
});
