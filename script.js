document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.querySelector("#start");

    if ("webkitSpeechRecognition" in window) {
        let speechRecognition = new webkitSpeechRecognition();
        let final_transcript = "";

        speechRecognition.continuous = true;
        speechRecognition.interimResults = true;

        speechRecognition.onstart = () => {
            document.querySelector("#status").style.display = "block";
            startBtn.classList.add('active'); // Add class for animation
        };
        speechRecognition.onerror = () => {
            document.querySelector("#status").style.display = "none";
            console.log("Speech Recognition Error");
        };
        speechRecognition.onend = () => {
            document.querySelector("#status").style.display = "none";
            startBtn.classList.remove('active');
            console.log("Speech Recognition Ended");
        };

        speechRecognition.onresult = (event) => {
            let interim_transcript = "";
            let lang = event.results[0][0].lang || '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
            document.querySelector("#final").innerHTML = final_transcript;
            document.querySelector("#interim").innerHTML = interim_transcript;

            document.querySelector("#final").setAttribute("lang", lang);
            document.querySelector("#interim").setAttribute("lang", lang);
        };

        startBtn.addEventListener("click", () => {
            speechRecognition.lang = '';
            speechRecognition.start();
            startBtn.classList.add('clicked');
            setTimeout(() => {
                startBtn.classList.remove('clicked');
            }, 100);
        });

        document.querySelector("#stop").addEventListener("click", () => {
            speechRecognition.stop();
        });
    } else {
        console.log("Speech Recognition Not Available");
    }
});
