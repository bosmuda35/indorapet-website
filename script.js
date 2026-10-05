/* =========================================================
   INDORAPET - JAVASCRIPT
========================================================= */


/* ================= NAVBAR ================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* ================= MOBILE MENU ================= */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", function () {

    navMenu.classList.toggle("show");

});


const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("show");

    });

});


/* ================= ACTIVE NAV ================= */

window.addEventListener("scroll", function () {

    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 150;

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(function (link) {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                '.nav-menu a[href="#' + sectionId + '"]'
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        }

    });

});


/* ================= PRODUCT FILTER ================= */

const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.getAttribute("data-category");

        productCards.forEach(function (card) {

            const cardCategory = card.getAttribute("data-category");

            if (
                category === "all" ||
                category === cardCategory
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* ================= CART ================= */

let cart = [];


/* TAMBAH PRODUK */

function addToCart(name, price, image) {

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    updateCart();

    openCart();

}


/* UPDATE CART */

function updateCart() {

    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    let totalQuantity = 0;
    let totalPrice = 0;


    cart.forEach(function (item) {

        totalQuantity += item.quantity;

        totalPrice += item.price * item.quantity;

    });


    cartCount.textContent = totalQuantity;

    cartTotal.textContent = formatRupiah(totalPrice);


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>Keranjang masih kosong</h3>

                <p>
                    Yuk pilih produk yang ingin dibeli.
                </p>

            </div>
        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach(function (item, index) {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-item-price">
                    ${formatRupiah(item.price)}
                </div>

                <div class="quantity-control">

                    <button onclick="decreaseQuantity(${index})">
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

            </div>

            <button
                class="delete-item"
                onclick="removeFromCart(${index})">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;

        cartItems.appendChild(cartItem);

    });

}


/* TAMBAH JUMLAH */

function increaseQuantity(index) {

    cart[index].quantity += 1;

    updateCart();

}


/* KURANG JUMLAH */

function decreaseQuantity(index) {

    cart[index].quantity -= 1;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* HAPUS PRODUK */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* FORMAT RUPIAH */

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}


/* ================= CART SIDEBAR ================= */

const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");


function openCart() {

    cartSidebar.classList.add("show");

    cartOverlay.classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeCart() {

    cartSidebar.classList.remove("show");

    cartOverlay.classList.remove("show");

    document.body.style.overflow = "";

}


/* ================= WHATSAPP CHECKOUT ================= */

function checkoutWhatsApp() {

    if (cart.length === 0) {

        alert("Keranjang masih kosong. Silakan pilih produk terlebih dahulu.");

        return;

    }


    let message =
        "Halo INDORAPET, saya ingin memesan:%0A%0A";


    let total = 0;


    cart.forEach(function (item) {

        const subtotal =
            item.price * item.quantity;

        total += subtotal;


        message +=
            "• " +
            item.name +
            " x" +
            item.quantity +
            " = " +
            formatRupiah(subtotal) +
            "%0A";

    });


    message +=
        "%0A*Total: " +
        formatRupiah(total) +
        "*";


    const whatsappNumber =
        "6283894350017";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        message;


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* ================= BACK TO TOP ================= */

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ================= YEAR ================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* ================= CLOSE CART ESC ================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeCart();

    }

});


/* ================= SELECT VARIANT / ECERAN ================= */

function selectVariant(button, name, price) {
    const card = button.closest(".product-card");
    if (!card) return;

    // Ubah status tombol pilihan yang aktif
    const pills = card.querySelectorAll(".variant-pill");
    pills.forEach(function (pill) {
        pill.classList.remove("active");
    });
    button.classList.add("active");

    // Perbarui teks harga di kartu produk
    const priceElement = card.querySelector(".price");
    if (priceElement) {
        priceElement.textContent = formatRupiah(price);
    }

    // Perbarui tombol tambah keranjang agar memasukkan takaran dan harga baru
    const addBtn = card.querySelector(".add-cart");
    if (addBtn) {
        const img = card.querySelector(".product-image img");
        const imgSrc = img ? img.getAttribute("src") : "";
        addBtn.setAttribute("onclick", `addToCart('${name}', ${price}, '${imgSrc}')`);
    }
}