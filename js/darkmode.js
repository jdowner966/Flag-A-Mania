document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkMode");
    const images = [
        { id: "drawingImage", light : "../img/drawingvector.png", dark : "../img/StudentStudyingDark.png"},
        { id: "beingCreativeImage", light : "../img/Being Creative.png", dark : "../img/beingCreativeDark.png"},
        {id : "aboutUsImage", light : "../img/About Our Team.png", dark : "../img/AboutOurTeamDark.png"},
    ]

    function updateImages() {
        images.forEach(imageObj => {
            let imgElement = document.getElementById(imageObj.id);
            if (imgElement) {
                imgElement.src = document.documentElement.classList.contains("dark-mode") ? imageObj.dark : imageObj.light;
            }
        })
    }

    if (localStorage.getItem("darkMode") === "enabled") {
        document.documentElement.classList.add("dark-mode");
        darkModeToggle.classList.replace("fa-moon-o", "fa-sun-o");
        updateImages();
    }

    darkModeToggle.addEventListener("click", function () {
        document.documentElement.classList.toggle("dark-mode");

        if (document.documentElement.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.classList.replace("fa-moon-o", "fa-sun-o");
        
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.classList.replace("fa-sun-o", "fa-moon-o");
        }
        updateImages()
    });
});