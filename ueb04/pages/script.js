const btnSend = document.querySelector("#btn-send");
const btnReviews = document.querySelectorAll(".page-item");
const modal = document.querySelector(".modal");
const btnOpen = document.querySelector("#btn-open");
const btnClose = document.querySelector("#btn-close");
const btnTop = document.querySelector(".Top");
const products = document.querySelectorAll(".kachel p");


function getStars() {
  let starCount = 1;
  let count = 0;
  btnReviews.forEach((item) => {
    if (item.classList.contains("reviewSelected")) {
      starCount = count;
    } else count++;
  });
  return starCount;
}

if (btnSend != null)
  btnSend.addEventListener("click", () => {
    modal.classList.remove("active");

    const divElem = document.createElement("div");
    const h3Elem = document.createElement("h3");
    const pElem = document.createElement("p");
    const pElem2 = document.createElement("p");

    divElem.classList.add("column");
    divElem.classList.add("col-6");
    divElem.classList.add("col-md-12");

    let author = document.getElementById("author").value;
    h3Elem.innerHTML = author;
    document.getElementById("author").value = "";

    let text = document.getElementById("text").value;
    pElem.innerText = text;

    document.getElementById("text").value = "";

    let starCount = getStars();

    pElem2.innerHTML = "Sterne";
    debugger;
    for (let index = 0; index <= starCount; ++index) {
      pElem2.innerHTML = "&#9733; " + pElem2.innerHTML;
    }
    divElem.appendChild(h3Elem);
    divElem.appendChild(pElem2);
    divElem.appendChild(pElem);

    document.getElementById("Benutzer").appendChild(divElem);
  });

if (btnReviews != null)
  btnReviews.forEach((item) => {
    if (item.innerHTML != "Sterne")
      item.addEventListener("click", (event) => {
        btnReviews.forEach((item) => {
          item.classList.remove("reviewSelected");
        });
        event.target.classList.add("reviewSelected");
        const elem = document.querySelector(".disabled");
        let s = getStars();
        if (elem != null) {
          elem.innerHTML = "";
          for (let index = 0; index <= s; ++index) {
            elem.innerHTML = "&#9733;" + elem.innerHTML;
          }
        }
      });
  });

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
    p.innerHTML = time + "<br>"+ date;
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
