
const recognition = new webkitSpeechRecognition(); // ini adalah objek untuk merekam suara
recognition.lang = 'id-ID';  // ini adalah bahasa yang akan direkam
recognition.continuous = true; // ini biar tidak berhenti setelah selesai bicara
recognition.interimResults = true; // ini biar hasilnya bisa diakses segera setelah selesai bicara
let isRecording = false; // ini untuk mengecek apakah sedang merekam atau tidak
let transcript = ''; //ini adalah variabel untuk menampung hasil transkripsi


recognition.onresult = async function(event) { // ini adalah event ketika hasil rekaman sudah didapat
  for (let i = event.resultIndex; i < event.results.length; i++) { // ini adalah loop untuk mengakses hasil rekaman
    if (event.results[i].isFinal) {             // ini adalah kondisi ketika hasil rekaman sudah selesai
      transcript += event.results[i][0].transcript; // ini adalah hasil rekaman yang sudah diolah
    }
  }
  document.getElementById('code-block').textContent = transcript; // ini adalah untuk menampilkan hasil rekaman ke dalam elemen dengan id code-block


// console.log(await res.json()); // hanya untuk debugging
// ini adalah untuk menampilkan hasil rekaman ke dalam console

};

const startButton = document.getElementById('start-recording'); // ini adalah elemen button untuk memulai merekam
const buttonText = document.getElementById('button-text'); // ini adalah elemen text yang berada di dalam button

recognition.onspeechstart = function() { // ini adalah event ketika mulai bicara
  buttonText.textContent = 'Mendengarkan...'; // untuk mengubah text pada button ketika user mulai berbicara
};

recognition.onspeechend = function() {// ini adalah event ketika user sudah selesai bicara setelah menekan tombol stop
  buttonText.textContent = 'Mulai Rekam'; // untuk mengubah text pada button ketika user menekan tombol stop rekaman
};


function startRecording() { // ini adalah fungsi untuk memulai merekam
  recognition.start();    // ini adalah fungsi untuk memulai merekam
  isRecording = true; // ini adalah untuk mengubah nilai isRecording menjadi true
}

function stopRecording() { // ini adalah fungsi untuk menghentikan merekam
  recognition.stop();    // ini adalah fungsi untuk menghentikan merekam
  isRecording = false; // ini adalah untuk mengubah nilai isRecording menjadi false
}



startButton.addEventListener('click', function() { // ini adalah event ketika tombol start rekaman ditekan
  if (!isRecording) {   // jika isRecording bernilai false, maka jalankan fungsi startRecording
    startRecording();  // fungsi untuk memulai merekam
  } else {
    stopRecording();  // fungsi untuk menghentikan merekam
  }
});


