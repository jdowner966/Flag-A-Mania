function settingsThing(){
    var timerDur = document.getElementById('timer');
    var roundAmt = document.getElementById('rounds');
    var volumeSli = document.getElementById('volumeSlider');
    var sliderTxt = document.getElementById("sliderTxt");
    var ttsSwitch = document.getElementById('tts');
    const confirmBtn = document.getElementById("confirmButton");
    const cancelBtn = document.getElementById("cancelButton");

    function clickConfirm(event) {
        event.preventDefault();
        window.location.href = '../html/learningMode.html';
    }

    function clickCancel(event) {
        event.preventDefault();
        window.location.href = '../html/play.html';
    }

    sliderTxt.innerHTML = volumeSli.value;
    function sliderChange() {
        sliderTxt.innerHTML = this.value;
    }    
    volumeSli.addEventListener("input", sliderChange, true);
    confirmBtn.addEventListener("click", clickConfirm);
    cancelBtn.addEventListener("click", clickCancel);
}

window.addEventListener("load", settingsThing);
