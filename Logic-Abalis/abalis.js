
const recognition = new webkitSpeechRecognition();
recognition.lang = 'id-ID';
recognition.continuous = true;
recognition.interimResults = true;
let isRecording = false;
let transcript = '';


recognition.onresult = async function(event) {
  for (let i = event.resultIndex; i < event.results.length; i++) {
    if (event.results[i].isFinal) {
      transcript += event.results[i][0].transcript;
    }
  }
  document.getElementById('code-block').textContent = transcript;
//   hasil = translate(transcript, { from: 'id', to: 'en' })
//   document.getElementById('transcript').textContent = hasil;
// const translator = new Lingobyte({ lng: 'en', sourceLanguage: 'id' });
//   translator.translate(transcript).then(translatedText => {
//     document.getElementById('transcript').textContent = translatedText;
//   });

const res = await fetch("https://libretranslate.com/translate", {
  method: "POST",
  body: JSON.stringify({
    q: transcript,
    source: "auto",                         
    target: "id"
  }),
  headers: { "Content-Type": "application/json" }
});

console.log(await res.json());

};

const startButton = document.getElementById('start-recording');
const buttonText = document.getElementById('button-text');

recognition.onspeechstart = function() {
  buttonText.textContent = 'Mendengarkan...';
};

recognition.onspeechend = function() {
  buttonText.textContent = 'Mulai Rekam';
};

startButton.addEventListener('click', function() {
  if (!isRecording) {
    startRecording();
  } else {
    stopRecording();
  }
});

function startRecording() {
  recognition.start();
  isRecording = true;
}

function stopRecording() {
  recognition.stop();
  isRecording = false;
}
