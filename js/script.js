// script.js
window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  const content = document.getElementById("content");

  // Hilangkan elemen loading setelah 1 detik
  setTimeout(() => {
    loading.style.display = "none";
    content.style.display = "block";
  }, 1000);
});
