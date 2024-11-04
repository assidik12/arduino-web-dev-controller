// label button
const btn_ruang_tamu = document.getElementsByClassName("ruang-tamu");
const btn_ruang_keluarga = document.getElementsByClassName("ruang-keluarga");
const btn_dapur = document.getElementsByClassName("dapur");

// img led
const ruangtamuLED = document.getElementsByClassName("ruang-tamu-LED");
const ruangkeluargaLED = document.getElementsByClassName("ruang-keluarga-LED");
const dapurLED = document.getElementsByClassName("dapur-LED");

function toggleLampu(btn, led) {
  if (btn[0].classList.contains("bg-red-500")) {
    btn[0].classList.remove("bg-red-500");
    btn[0].classList.add("bg-blue-500");
    led[0].classList.remove("bg-red-500");
    led[0].classList.add("bg-blue-500");
    led[0].src = "../../src/img/lampu-putih.jpg";
  } else if (btn[0].classList.contains("bg-blue-500")) {
    btn[0].classList.remove("bg-blue-500");
    btn[0].classList.add("bg-red-500");
    led[0].classList.remove("bg-blue-500");
    led[0].classList.add("bg-red-500");
    led[0].src = "../../src/img/lampu-kunig.jpg";
  }
}

function Arduino(data, tempat) {
  fetch("http://localhost:4000/api/sensor", { method: "POST", body: JSON.stringify({ data, tempat }), headers: { "Content-Type": "application/json" } });
}

document.getElementById("ruang-tamu").addEventListener("click", function (e) {
  toggleLampu(btn_ruang_tamu, ruangtamuLED);
  let isOn = "";
  e.target.classList.contains("bg-red-500") ? ((isOn = "1"), alert("lampu dihidupkan")) : ((isOn = "0"), alert("lampu dimatikan"));
  Arduino(isOn, "ruang-tamu");
});

// document.getElementById("ruang-keluarga").addEventListener("click", function () {
//   toggleLampu(btn_ruang_keluarga, ruangkeluargaLED);
//   fetch("http://localhost:4000/api/sensor", { method: "POST", body: JSON.stringify({ data }), headers: { "Content-Type": "application/json" } });
// });

// document.getElementById("dapur").addEventListener("click", function () {
//   toggleLampu(btn_dapur, dapurLED);
//   fetch("http://localhost:4000/api/sensor", { method: "POST", body: JSON.stringify({ data }), headers: { "Content-Type": "application/json" } });
// });
