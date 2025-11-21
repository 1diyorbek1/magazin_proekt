// ----- PAGE OPEN -----
function openPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ----- CATEGORIES -----
const sizesShoes = ["38","39","40","41","42","43","44"];
const sizesClothes = ["XS","S","M","L","XL","2XL","3XL"];

function openCategory(cat) {
  openPage("products");

  document.getElementById("categoryTitle").innerText = cat.toUpperCase();
  
  let list = "";
  for (let i=1; i<=27; i++) {
    list += `
      <div class="product">
        <img src="img/${cat}/${i}.jpg">
        <p>${cat} #${i}</p>
        <button onclick="chooseProduct('${cat}','${cat} #${i}','img/${cat}/${i}.jpg')">
          Razmerni tanlash
        </button>
      </div>
    `;
  }
  
  document.getElementById("productList").innerHTML = list;
}

// ----- SELECT PRODUCT -----
function chooseProduct(cat, name, img) {
  let sizes = (cat=="krasofka" || cat=="lofer") ? sizesShoes : sizesClothes;

  let html = "";
  sizes.forEach(s => {
    html += `<button class='size-btn' onclick="openPurchase('${name}','${s}','${img}')">${s}</button>`;
  });

  document.getElementById("productList").innerHTML = html;
}

// ----- GO TO PURCHASE -----
function openPurchase(name, size, img) {
  document.getElementById("productName").value = name;
  document.getElementById("productSize").value = size;
  document.getElementById("productImg").value = img;

  openPage("purchase");
}

// ----- TELEGRAM SEND -----
document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let data = new FormData(this);
  let txt =
`Yangi buyurtma:
Ism: ${data.get("ism")}
Fam: ${data.get("fam")}
Tel: ${data.get("tel")}
Joy: ${data.get("joy")}
Tovar: ${document.getElementById("productName").value}
Razmer: ${document.getElementById("productSize").value}
Rasm: ${document.getElementById("productImg").value}`;

  let telegramID = "6986959848"; // <<== O'zingizni ID qo'yasiz
  let token = "8056794290:AAHrK7Y9eGgYtPpAvoOBjRFaKk1faZDWRWU";        // <<== Bot token qo'yasiz

  fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${telegramID}&text=${encodeURIComponent(txt)}`)
    .then(() => alert("Yuborildi!"))
    .catch(() => alert("Xatolik!"));
});



