let category = document.getElementById("Category");
category.addEventListener("change", getCategory);

let sort = document.getElementById("Sorting");
sort.addEventListener("change", getSorted);
getData(category.value, sort.value);
async function getData(category,sorting) {
    let response = await fetch('https://fakestoreapi.com/products')
    let mainData = await response.json();
    console.log("mainData:", mainData);
    if (category && sorting) {
        //filter the data acooring to both parameters
        // console.log(category);
        // console.log(sorting);
        let filterarr = mainData.filter((el) => el.category == category);

        // console.log("filterarr:", filterarr);
        if (sorting == "LHR") {
            filterarr.sort((a, b) => a.rating.rate - b.rating.rate);
            mapping(filterarr);
        } else if (sorting == "HLR") {
            filterarr.sort((a, b) => b.rating.rate - a.rating.rate);
            mapping(filterarr);
        } else if (sorting == "HLP") {
            filterarr.sort((a, b) => b.price - a.price);
            mapping(filterarr);
        } else if (sorting == "LHP") {
            filterarr.sort((a, b) => a.price - b.price);
            mapping(filterarr);
        }
    } else if (category) {
        let filterarr = mainData.filter((el) => el.category == category);
        mapping(filterarr);
        // filter main data acording to slected caetgory
        // console.log("only category", category);
    } else if (sorting) {
        let filterarr = [...mainData];

        if (sorting == "LHR") {
            filterarr.sort((a, b) => a.rating.rate - b.rating.rate);
            mapping(filterarr);
        } else if (sorting == "HLR") {
            filterarr.sort((a, b) => b.rating.rate - a.rating.rate);
            mapping(filterarr);
        } else if (sorting == "HLP") {
            filterarr.sort((a, b) => b.price - a.price);
            mapping(filterarr);
        } else if (sorting == "LHP") {
            filterarr.sort((a, b) => a.price - b.price);
            mapping(filterarr);
        }

        // fitler main data accoring to selected sorted parameter
        // console.log("only sorting", sorting);
    } else {
        mapping(mainData);
    }
}

function mapping(data) {
    let container = document.getElementById("container");
    container.innerHTML = "";
    data.forEach((element) => {
        let mydiv = document.createElement("div");
        let title = document.createElement("p");
        title.innerText = `Title: ${ element.title }`;

        let image = document.createElement("img");
        image.src = element.image;

        let rating = document.createElement("span");
        rating.innerText = `Products rating ${ element.rating.rate }`;

        let price = document.createElement("p");
        price.innerText = `Price: ${ element.price }`;
        price.style.fontWeight = "bold";

        let button = document.createElement("button");
        button.innerText = "Add to Cart";

        button.addEventListener("click", () => addCart(element));

        
        mydiv.append(title, image, price, rating, button);
        container.appendChild(mydiv);
    });
}

function getCategory() {
    getData(category.value, sort.value);
}

function getSorted() {
    getData(category.value, sort.value);
}

function addCart(element) {
    let getCart = JSON.parse(localStorage.getItem("Cart")) || [];
    // console.log("getCart:", getCart);
    if (getCart.length == 0) {
        localStorage.setItem("Cart", JSON.stringify([element]));
        alert("Congrulations ! First product added to Cart 🎉");
    } else {
        let alreadyExist = getCart.filter((el) => el.id == element.id);
        if (alreadyExist.length == 0) {
            getCart.push(element);
            localStorage.setItem("Cart", JSON.stringify(getCart));
            alert("Product added to Cart 👌");
        } else {
            alert("Product alreay added in Cart 😒");
        }
    }
}