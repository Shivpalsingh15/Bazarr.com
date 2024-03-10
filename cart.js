let getCart = JSON.parse(localStorage.getItem("Cart")) || [];
console.log("getCart:", getCart);
mapUI(getCart);
configureToasts({
  topOrigin: -500, // [default=0] Y-axis origin of the messages (better to use CSS `transform` instead).
  deleteDelay: 300, // time until the toast is completely removed from the DOM after deleting.
});
function mapUI(data) {
  let container = document.getElementById("container");
  container.innerHTML = null;
  if (data.length === 0) {
    let p = document.createElement("p");
    p.innerText = "Please add products to your cart";
    p.style.fontStyle = "italic";
    p.style.fontSize = "50px";
    container.appendChild(p);
  }
  data.forEach((el) => {
    let mainChild = document.createElement("div");

    let imgdiv = document.createElement("div");
    imgdiv.setAttribute("id", "imgdiv");

    let textdiv = document.createElement("div");
    textdiv.setAttribute("id", "textdiv");

    let img = document.createElement("img");
    img.src = el.image;

    let price = document.createElement("p");
    price.innerText = `Price: $${el.price}`;

    let title = document.createElement("p");
    title.innerText = el.title;

    let qntydiv = document.createElement("div");
    qntydiv.setAttribute("id", "qntydiv");

    let qnty = document.createElement("p");
    qnty.innerText = el.qnty;
    let incBtn = document.createElement("button");
    incBtn.innerText = "+";
    incBtn.addEventListener("click", () => {
      incCount(el.id);
    });
    let decBtn = document.createElement("button");
    decBtn.innerText = "-";
    decBtn.addEventListener("click", () => {
      decCount(el.id);
    });

    let removeCart = document.createElement("button");
    removeCart.innerText = "Remove";
    removeCart.addEventListener("click", () => {
      removeCartfunc(el.id);
    });
    qntydiv.append(incBtn, qnty, decBtn);
    imgdiv.append(img, removeCart);
    textdiv.append(title, price, qntydiv);
    mainChild.append(imgdiv, textdiv);

    container.append(mainChild);
  });

  const Tprice = data.reduce((accumulator, currentItem) => {
    const { qnty, price } = currentItem;
    return Math.round(accumulator + Number(qnty) * Number(price));
  }, 0);
  console.log("Tprice:", Tprice);
  let itemprice = document.getElementById("itemprice");
  // itemprice.style.backgroundColor = 'lightgray';
  let delcharges = document.getElementById("delcharges");
  let totalamount = document.getElementById("totalamount");
  let checkoutbtn = document.getElementById("checkoutbtn");
  checkoutbtn.addEventListener("click", checkoutfunc);
  itemprice.innerText = `$${Tprice}`;
  Tprice >= 50
    ? (delcharges.innerText = `$50`)
    : (delcharges.innerText = "Free");
  console.log("itemprice.innerText >= 50 :", itemprice.innerText >= 50);
  // console.log('itemprice.value:', itemprice.innerText)
  if (Tprice >= 50) {
    totalamount.innerText = `$${Tprice + 50}`;
  } else {
    totalamount.innerText = `$${Tprice}`;
  }
}
function checkoutfunc() {
  console.log("sdvkjn");
  new Toast(
    "Thanks for shopping with Bazaar!😍🤩",
    Toast.TYPE_DONE,
    Toast.TIME_SHORT
  );

  // alert('Thanks for shopping with Bazaar!😍🤩');
  window.location.href = "index.html";
}
function removeCartfunc(id) {
  let getCart = JSON.parse(localStorage.getItem("Cart")) || [];
  let filtered = getCart.filter((el) => el.id !== id);
  console.log("filtered:", filtered.length);
  localStorage.setItem("Cart", JSON.stringify(filtered));
  mapUI(filtered);
  // alert('Item removed successfully')

  new Toast("Item removed successfully", Toast.TYPE_DONE, Toast.TIME_SHORT);
}

function incCount(id) {
  let latestCart = JSON.parse(localStorage.getItem("Cart")) || [];

  let updatedCart = latestCart.map((el) => {
    if (el.id == id) {
      return { ...el, qnty: el.qnty + 1 };
    } else {
      return el;
    }
  });
  localStorage.setItem("Cart", JSON.stringify(updatedCart));
  mapUI(updatedCart);
}

function decCount(id) {
  let latestCart = JSON.parse(localStorage.getItem("Cart")) || [];

  let updatedCart = latestCart.map((el) => {
    if (el.id == id) {
      return { ...el, qnty: el.qnty - 1 };
    } else {
      return el;
    }
  });
  localStorage.setItem("Cart", JSON.stringify(updatedCart));
  mapUI(updatedCart);
}
