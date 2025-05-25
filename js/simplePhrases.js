function startScript() {

    

   const container = document.getElementById("country-container");
    const buttons = container.querySelectorAll('button');


    buttons.forEach(button => {
        button.addEventListener('click', function() {
          const value = this.value; 
          document.cookie = "countrySPSelected=" + value + ";" + "path=/"

          window.location.href = '../html/countrySimplePhrases.html';
        });
    });
  }

window.addEventListener("load", startScript, false);
