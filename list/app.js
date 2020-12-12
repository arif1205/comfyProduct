// Taking variable 
let overlayMain = document.querySelector('div.overlay-main');
let productList = document.querySelector('div.product-list');
let middlePart = document.querySelector("div.product-list div.inner div.middle-part");
let totalPriceText = document.querySelector('div.product-list div.inner div.lower-part h1 span');
let totalPrice = Number('0');
totalPriceText.innerHTML = totalPrice;
let overCart = document.querySelector("section#section-1 nav div.cart span");

function openCart(elem) {
  if (elem == 1) {
    overlayMain.style.display = "block";
    productList.style.right = "0";
  } else {
    overlayMain.style.display = "block";
    productList.style.right = "0";

    let cartHolder = elem.parentElement.parentElement.parentElement;
    // Product Name
    let productTitle = cartHolder.querySelector('div.img-text span.title');
    // Product price
    let productPrice = cartHolder.querySelector('div.img-text span.price');
    totalPrice = (totalPrice * 100 + Number(productPrice.innerHTML) * 100) / 100;
    totalPriceText.innerHTML = totalPrice.toFixed(2);
    // product img source 
    let imgAttribute = cartHolder.querySelector('div.img img');
    let imgSource = imgAttribute.getAttribute("src");

    ////// Creating a list item 
    let listItem = document.createElement('div');
    listItem.setAttribute('class', 'list-item');

    let container = document.createElement("div");
    container.setAttribute("class", "container");

    listItem.appendChild(container);

    let row = document.createElement("div");
    row.setAttribute("class", "row");

    container.appendChild(row);

    let col3 = document.createElement("div");
    col3.setAttribute("class", "col-3 align-self-center");

    row.appendChild(col3);

    let img = document.createElement("img");
    img.setAttribute("class", "w-100");
    img.setAttribute('src', imgSource);
    img.setAttribute('alt', 'product');

    col3.appendChild(img);

    let col6 = document.createElement("div");
    col6.setAttribute("class", "col-6 align-self-center");

    row.appendChild(col6);

    let h5 = document.createElement("h5");
    h5.innerHTML = productTitle.innerHTML;

    col6.appendChild(h5);

    let span = document.createElement("span");
    span.innerHTML = '$';
    span.setAttribute('class', 'd-block price');

    col6.appendChild(span);

    let price = document.createElement('span');
    price.innerHTML = productPrice.innerHTML;

    span.appendChild(price);

    let remove = document.createElement('span');
    remove.setAttribute('class', 'remove');
    remove.setAttribute('onclick', 'removeElement(this)');
    remove.innerHTML = 'Remove';

    col6.appendChild(remove);

    let lastCol = document.createElement('div');
    lastCol.setAttribute('class', 'col-3 d-flex flex-column justify-content-between align-self-center');

    row.appendChild(lastCol);

    let upkey = document.createElement('span');
    upkey.setAttribute('onclick', 'updateQuantity(this, 1)');
    let upkeyI = document.createElement('i');
    upkeyI.setAttribute('class', 'fas fa-chevron-up');
    upkey.appendChild(upkeyI);
    lastCol.appendChild(upkey);

    let num = document.createElement("span");
    num.setAttribute('class', 'num');
    num.innerText = '1';

    lastCol.appendChild(num);

    let downkey = document.createElement("span");
    downkey.setAttribute("onclick", "updateQuantity(this, -1)");
    let downkeyI = document.createElement("i");
    downkeyI.setAttribute('class', 'fas fa-chevron-down');
    downkey.appendChild(downkeyI);

    lastCol.appendChild(downkey);

    middlePart.appendChild(listItem);

    // checking 
    let arr = document.querySelectorAll("div.product-list div.inner div.middle-part div.list-item");

    let mark = false;
    let arrLength = arr.length;
    // Over Cart text
    overCart.innerText = arr.length;

    /////////////
    let point;
    ////////////////////

    if (arrLength > 1) {
      for (let j = 0; j < arrLength - 1; j++) {
        let lastPrice = arr[arrLength - 1].querySelector('div.container div.row div.col-6 span.price span').innerText;
        let lastTitle = arr[arrLength - 1].querySelector('div.container div.row div.col-6 h5').innerText;
        let firstPrice = arr[j].querySelector("div.container div.row div.col-6 span.price span").innerText;
        let firstTitle = arr[j].querySelector("div.container div.row div.col-6 h5").innerText;

        if ((lastPrice == firstPrice) && (lastTitle == firstTitle)) {
          mark = true;
          point = j;
          break;
        }
      }
    }
    if (mark) {
      arr[arr.length - 1].remove();
      let quantity = arr[point].querySelector("div.container div.row div.col-3 span.num");
      let Quantity = Number(quantity.innerText);
      quantity.innerHTML = ++Quantity;
      // let dollar = arr[point].querySelector("div.container div.row div.col-6 span.price span").innerText;
      // console.log(totalPrice);
      // totalPrice = (totalPrice * 100 + Number(dollar) * 100) / 100;
      // totalPriceText.innerHTML = totalPrice;
    }

  }
}

function closeCart() {
  overlayMain.style.display = "none";
  productList.style.right = "-100%";
}

function removeElement(elem) {
  let removeItem = elem.parentElement.parentElement.parentElement.parentElement;
  let x = elem.parentElement;
  let quantity = elem.parentElement.nextSibling.querySelector('span.num').innerText;
  let quan = Number(quantity);
  let price = x.querySelector('span span');
  totalPrice = (totalPrice * 100 - Number(price.innerText) * quan * 100) / 100;
  totalPriceText.innerHTML = totalPrice.toFixed(2);
  removeItem.remove();
  let OverCart = Number(overCart.innerText);
  overCart.innerText = --OverCart;
}

function updateQuantity(elem, n) {
  if (n == 1) {
    let quantity = elem.nextSibling;
    let Quantity = Number(quantity.innerText);
    quantity.innerText = ++Quantity;
    if (Quantity > 0) {
      elem.nextSibling.nextSibling.setAttribute('onclick', 'updateQuantity(this, -1)');
    }
    let dollar = elem.parentElement.previousSibling.querySelector('span.price span').innerText;
    totalPrice = (totalPrice * 100 + Number(dollar) * 100) / 100;
    totalPriceText.innerHTML = totalPrice.toFixed(2);
    console.log(Quantity);
  } else {
    let quantity = elem.previousSibling;
    let Quantity = Number(quantity.innerText);
    let Quan = Quantity + n;
    quantity.innerText = Quan;
    let dollar = elem.parentElement.previousSibling.querySelector("span.price span").innerText;
    totalPrice = (totalPrice * 100 - Number(dollar) * 100) / 100;
    totalPriceText.innerHTML = totalPrice.toFixed(2);
    if (Quan < 2) {
      elem.setAttribute("onclick", "updateQuantity(this, 0)");
    }
    if (n == 0) {
      totalPrice = (totalPrice * 100 + Number(dollar) * 100) / 100;
      totalPriceText.innerHTML = totalPrice.toFixed(2);
    }
  }
}

function sortProduct(elem) {
  let value = elem.parentElement.querySelector('p span');
  value.innerText = elem.value;

  let sortList = document.querySelectorAll('section#section-2 div.container div.row div.product-row div.row div.col-sm-4');

  for (let i = 0; i < sortList.length; i++) {
    let compare1 = sortList[i].querySelector('div.img-text span.price').innerText;
    let compare2 = elem.value;
    if(Number(compare1) < Number(compare2)) {
      sortList[i].style.display = 'block';
    } else {
      sortList[i].style.display = 'none';
    }
  }
} 

function productTab(elem) {
  let sortList = document.querySelectorAll('section#section-2 div.container div.row div.product-row div.row div.col-sm-4');

  let list = elem.parentElement.querySelectorAll('li');
  for (let i = 0; i < list.length; i++) {
    list[i].style.border = 'none';
  }
  elem.style.border = '1px solid black';

  if (elem.innerText == 'All') {
    for (let i = 0; i < sortList.length; i++) {
      sortList[i].style.display = 'block';
    }
  } else {
    let listText = elem.innerText;
    let compareText = 'All' + ' ' + listText;
    //let productAttribute = 
    for (let i = 0; i < sortList.length; i++) {
      let productAttribute = sortList[i].getAttribute('data-product-type');
      if (productAttribute == compareText) {
        sortList[i].style.display = 'block';
      } else {
        sortList[i].style.display = 'none';
      }
    }
  }
}

function searchProduct(elem) {
  let searchList = document.querySelectorAll('section#section-2 div.container div.row div.product-row div.row div.col-sm-4');
  for (let i = 0; i < searchList.length; i++) {
    searchList[i].style.display = 'none';
  }
  let compare = elem.value.toLowerCase();

  for (let i = 0; i < searchList.length; i++) {
   let title = searchList[i].querySelector('div.img-text span').innerText.toLowerCase();
   
   let n = title.indexOf(compare);
   if(n != -1) {
     searchList[i].style.display = 'block';
   } else {
     searchList[i].style.display = 'none';
   }
  }
}