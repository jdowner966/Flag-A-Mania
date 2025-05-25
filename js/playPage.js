function main(){
    const settingsBox = document.getElementById("triviaSettingsBox");

    const learningSettingsBox = document.getElementById("learningSettingsBox");

    const dim = document.getElementById("overlay");

    const triviaButton = document.getElementById("triviaMode");

    const learnButton = document.getElementById('learningMode');

    const settingsCancel = document.getElementById("cancelButton");

    const learningCancel = document.getElementById("learningCancelButton");

    const settingsSaved = document.getElementById("settingsSaved");

    const mainContent = document.getElementById("mainContent");

    var timerDur = document.getElementById('timer');
    var questionAmt = document.getElementById('questions');
    var volumeSli = document.getElementById('volumeSlider');
    var sliderTxt = document.getElementById("sliderTxt");
    var ttsSwitch = document.getElementById('tts');

    var lTimerDur = document.getElementById('learningTimer');
    var lQuestionAmt = document.getElementById('learningQuestions');
    var lVolumeSli = document.getElementById('learningVolumeSlider');
    var lSliderTxt = document.getElementById('learningSliderTxt');
    var lTTS = document.getElementById('learningTTS');

    
    const confirmBtn = document.getElementById('confirmButton');

    const learningConfirmButton = document.getElementById('learningConfirmButton');

    

    function triviaClick() {
        settingsBox.style.display = "block";
        dim.style.display = "block";
        settingsBox.style.animation = "zoomIn 0.3s ease-out forwards";
        
    /* Code for an off-screen animation; might not be an accessible concept
    
    let pos = -250;
        clearInterval(animateBox);

        function frame () {
        if (pos === 50) {
            clearInterval(animateBox);
        } else {
            pos++;
            settingsBox.style.top = pos + 'px';
        } 
    } 

        animateBox = setInterval(frame, 1); */

    }

    function learningClick() {
        learningSettingsBox.style.display = "block";
        dim.style.display = "block";
        learningSettingsBox.style.animation = "zoomIn 0.3s ease-out forwards";
    }

    function cancelClick() {
        settingsBox.style.animation = "zoomOut 0.3s ease-in forwards";

        setTimeout(Reset, 300)

        function Reset() {
        settingsBox.style.display = "none";
        dim.style.display = "none";
        }
    }

    function learningCancelClick() {
        learningSettingsBox.style.animation = "zoomOut 0.3s ease-in forwards";

        setTimeout(Reset, 300)

        function Reset() {
        settingsBox.style.display = "none";
        dim.style.display = "none";
        }
    }

    function wavyAnimation(text) {

        let delay = 100;

      settingsSaved.innerHTML = text
        .split("")
        .map(letter => {
          return `<span>` + letter + `</span>`;
        })
        .join("");

      Array.from(settingsSaved.children).forEach((span, index) => {
        setTimeout(() => {
          span.classList.add("wavy");
        }, index * 60 + delay);
      });

      const totalWavyDuration = 0.6 * 1000 + delay + text.length * 60;
    setTimeout(() => {
        mainContent.classList.add("fade-out"); // 
    }, totalWavyDuration);


    }

    function triviaConfirm(event) {
        event.preventDefault();
        
        var sec = timerDur.value;
        var questions = questionAmt.value;
        var volume = volumeSli.value;
        var TTStf = ttsSwitch.value;
        
        console.log(sec);
        document.cookie = `timerSet=${sec}` + ";" + "path=/"
        document.cookie = `questionAmt=${questions}` + ";" + "path=/";
        document.cookie = `volumeAmt=${volume}` + ";" + "path=/";
        document.cookie = `TTStf=${TTStf}` + ";" + "path=/";

        settingsSaved.style.display = "block";

        settingsSaved.className = "";

        setTimeout(triviaLink, 2100);


    wavyAnimation("Settings Saved!")

        settingsBox.style.animation = "zoomOut 0.3s ease-in forwards";
        setTimeout(Reset, 300)

        function Reset() {
        settingsBox.style.display = "none";
        dim.style.display = "none";
        }

        function triviaLink() {
            window.location.href = "trivia.html";
        }

    }

    function learningConfirm(event) {
        event.preventDefault();
        
        var sec = lTimerDur.value;
        var questions = lQuestionAmt.value;
        var volume = lVolumeSli.value;
        var TTStf = lTTS.value;
        
        console.log(sec);
        document.cookie = `lTimerSet=${sec}` + ";" + "path=/"
        document.cookie = `lQuestionAmt=${questions}` + ";" + "path=/";
        document.cookie = `lVolumeAmt=${volume}` + ";" + "path=/";
        document.cookie = `lTTS=${TTStf}` + ";" + "path=/";

        settingsSaved.style.display = "block";

        settingsSaved.className = "";

        setTimeout(learningLink, 2100);

        wavyAnimation("Settings Saved!")


        learningSettingsBox.style.animation = "zoomOut 0.3s ease-in forwards";
        setTimeout(Reset, 300)

        function Reset() {
        learningSettingsBox.style.display = "none";
        dim.style.display = "none";
        }

        function learningLink() {
            window.location.href = "learningMode.html";
        }


    }


    function ttsOnOff() {
        if (ttsSwitch.value === "on") {
            ttsSwitch.value = "off";
            ttsSwitch.innerHTML = "OFF"
        } else if (ttsSwitch.value === "off") {
            ttsSwitch.value = "on";
            ttsSwitch.innerHTML = "ON"
        }
    }
    
    function lTTSOnOff() {
        if (lTTS.value === "on") {
            lTTS.value = "off";
            lTTS.innerHTML = "OFF"
        } else if (lTTS.value === "off") {
            lTTS.value = "on";
            lTTS.innerHTML = "ON"
        }
    }
    
    
    
    console.log(document.cookie)
    sliderTxt.innerHTML = volumeSli.value;
    function sliderChange() {
        sliderTxt.innerHTML = this.value;
    }
    lSliderTxt.innerHTML = lVolumeSli.value;
    function lSliderChange() {
        lSliderTxt.innerHTML = this.value;
    }  
    volumeSli.addEventListener("input", sliderChange, true);
    lVolumeSli.addEventListener("input", lSliderChange, true)
    ttsSwitch.addEventListener("click", ttsOnOff);
    lTTS.addEventListener("click", lTTSOnOff);
    confirmBtn.addEventListener("click", triviaConfirm);
    learningConfirmButton.addEventListener("click", learningConfirm);
    triviaButton.addEventListener("click", triviaClick);
    learnButton.addEventListener("click", learningClick)

    settingsCancel.addEventListener("click", cancelClick);

    learningCancel.addEventListener("click", learningCancelClick);

}

document.addEventListener("DOMContentLoaded", main);
