const products = document.getElementById("products");
const cartNum =document.getElementById("cartNum");
const totalPrice = document.getElementById("totalPrice");
const searchBtn  = document.getElementById("search");
const searchInput = document.getElementById("search-input");
let productArr = [];
if(localStorage.getItem("products")){
    let products = JSON.parse(localStorage.getItem("products"));
    productArr = [...products];
}
if(localStorage.getItem("myProducts")){
    let sellerArr = JSON.parse(localStorage.getItem("myProducts"))
    productArr = [...productArr,...sellerArr]
}

let tvArr = productArr.filter((phone) =>phone.category == "TV");
const addFromLocale = (arr)=>{
    products.innerHTML = ''
    arr.forEach((phone)=>{
        const item = document.createElement("div");
        item.setAttribute("dataId",productArr.indexOf(phone));
        item.classList.add("item");
        const img = document.createElement("img");
        img.src = phone.img;
        const divp = document.createElement("div");
        const title = document.createElement("h3");
        title.textContent = phone.name;
        const price = document.createElement("p");
        price.textContent = "$";
        const num = document.createElement("span");
        num.textContent = phone.price;
        price.appendChild(num);
        divp.appendChild(title);
        divp.appendChild(price)
        const description = document.createElement("p");
        description.textContent = phone.disc;
        description.classList.add("desP")
        const button =document.createElement("button");
        button.id = "Add"
        button.textContent = "Add to cart";
        item.appendChild(img);
        item.appendChild(divp);
        item.appendChild(description);
        item.appendChild(button);
        products.appendChild(item)
    })
}
addFromLocale(tvArr);
    const addBtns = document.querySelectorAll("#Add");

    addBtns.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            addToLocale(btn.parentElement.getAttribute("dataId"));
        });
    });

    let cartArr = []
    if(localStorage.getItem("cart")){
        let locale = JSON.parse(localStorage.getItem("cart"));
        cartArr = [...locale];
    }
const addToLocale = (id)=>{
    cartArr.push(productArr[id]);
    localStorage.setItem("cart",JSON.stringify(cartArr));
    getTotalProducts();

};

const getTotalProducts = ()=>{
    let num = cartArr.length;
    cartNum.textContent = num;
    let price = 0;
    cartArr.forEach((pro)=>{
        price+= pro.price;
    })
    totalPrice.textContent = price;
}
getTotalProducts()

searchBtn.addEventListener("click",(searchBtn)=>{
    searchBtn.preventDefault();
    if(searchInput.value.trim() === ""){
        return;
    }else{

        getSearchRes(searchInput.value)
    }

})

const getSearchRes = (value)=>{
    let res = tvArr.filter((e)=>e.name.includes(value))
    if(res.length > 0){
        addFromLocale(res)
    }else{
        addFromLocale(tvArr);
        window.alert("This product does not exist")
    }

    
}