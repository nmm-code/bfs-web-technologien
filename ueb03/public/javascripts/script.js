const btnSend = document.querySelector("#btn-send");
const btnReviews = document.querySelectorAll(".page-item");
const modal = document.querySelector(".modal");
const btnOpen = document.querySelector("#btn-open");
const btnClose = document.querySelector("#btn-close");
const btnTop = document.querySelector(".Top");
const products = document.querySelectorAll(".kachel p");



// Aufgabe 1

function clickOpen() {
  modal.classList.toggle("active");
}

if (btnOpen != null)
  btnOpen.addEventListener("click", clickOpen);

if (btnClose != null)
  btnClose.addEventListener("click", clickOpen);

// Aufgabe 2
function clickTop() {
  window.scroll({
    top: 0,
    left: 100,
    behavior: "smooth",
  });
}

btnTop.addEventListener("click",clickTop);

// Aufgabe 3
function setTime() {
  const p = document.querySelector(".time");
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
   // p.innerHTML = time + "<br>"+ date;
}

setTime();
setInterval(setTime, 1000);


// Aufgabe 4
if (products != null) {
  let min = Infinity;

  products.forEach((item) => {
    let preis = item.innerHTML.replace(",", ".").replace("€");
    preis = parseFloat(preis);
    if (preis < min) {
      min = preis;
    }
  });
  products.forEach((item) => {
    let preis = item.innerHTML.replace(",", ".").replace("€");
    preis = parseFloat(preis);
    if (preis == min) {
      item.parentNode.classList.add("sale");
    }
  });
}
function addToCart() {
  const url2 = window.location.href;

// Den Teil der URL nach dem letzten Schrägstrich (/) extrahieren
  const key = url2.substring(url2.lastIndexOf('/') + 1);
  const url = `/produkte/${key}`; // Passe die URL entsprechend an
  fetch(url)
  .then(response => {
    return response.text();
  })
  .then(text => {
    const targetElement = document.getElementById('message');
    targetElement.textContent = "erfolgreich hinzugefügt";
  })
  .catch(error => {
    console.error(error);
  });
}


const addToCartButton = document.getElementById('addToCartButton');
if (addToCartButton !== null) {
  addToCartButton.addEventListener('click', addToCart);
} 


