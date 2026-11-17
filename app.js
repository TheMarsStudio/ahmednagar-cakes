/**
 * Ahmednagar Cakes - Interactive Application Logic
 * Pair programmed for high fidelity & smooth user experience
 */

// Phone number from uploaded store assets: +91 82375 76793
const STORE_PHONE = "918237576793";
const STORE_NAME = "Ahmednagar Cakes";

// Master Product Database
const PRODUCTS = [
  {
    id: "cookie-tins",
    name: "Cookie Tins",
    subtitle: "Assorted, Fresh & Irresistible",
    price: 399,
    originalPrice: 449,
    category: "cookies",
    badge: "Bestseller",
    image: "assets/card_cookie.jpg",
    description: "Handcrafted gourmet cookie collection made with pure butter, rich chocolate chunks, and slow-baked perfection. Packaged in a festive keepsake gold tin.",
    weights: ["Standard Tin (350g)", "Deluxe Box (700g)"],
    eggless: true,
    rating: 4.9,
    reviews: 128
  },
  {
    id: "classic-tiramisu",
    name: "Classic Tiramisu",
    subtitle: "Velvety Layers, Bold Coffee",
    price: 699,
    originalPrice: 799,
    category: "cakes",
    badge: "Chef's Special",
    image: "assets/card_tira.jpg",
    description: "Authentic Italian-inspired tiramisu with espresso-soaked ladyfingers, velvety mascarpone cream, and dusted with rich dark cocoa stars. Pure indulgence in every bite.",
    weights: ["500g", "1 Kg", "1.5 Kg"],
    eggless: true,
    rating: 5.0,
    reviews: 214
  },
  {
    id: "tiramisu-truffles",
    name: "Tiramisu Truffles",
    subtitle: "Rich, Creamy & Chocolatey",
    price: 349,
    originalPrice: 399,
    category: "cakes",
    badge: "Trending",
    image: "assets/card_truf.jpg",
    description: "Mouth-watering tiramisu cream truffles with cocoa dust and roasted coffee aroma in a golden tin, garnished with fresh mint sprig.",
    weights: ["Tub of 12", "Tub of 24"],
    eggless: true,
    rating: 4.8,
    reviews: 95
  },
  {
    id: "dubai-kunafa",
    name: "Dubai Kunafa Cheesecake",
    subtitle: "Crispy Kataifi & Pistachio Cream",
    price: 899,
    originalPrice: 999,
    category: "cakes",
    badge: "Viral Hit",
    image: "assets/product_kunafa.jpg",
    description: "Our signature Dubai-style dessert: rich baked cheesecake layered with buttery crispy golden kataifi and loaded with luxurious pistachio cream drizzle.",
    weights: ["500g", "1 Kg"],
    eggless: true,
    rating: 5.0,
    reviews: 310
  },
  {
    id: "artisanal-donuts",
    name: "Artisanal Glazed Donuts",
    subtitle: "Pink Frosting & Sprinkles",
    price: 249,
    originalPrice: 299,
    category: "donuts",
    badge: "Fresh Daily",
    image: "assets/product_donuts.jpg",
    description: "Pillow-soft artisanal donuts dipped in strawberry glaze, dark chocolate icing, and topped with whimsical sprinkles and white chocolate drizzle.",
    weights: ["Box of 4", "Box of 6", "Box of 12"],
    eggless: true,
    rating: 4.9,
    reviews: 180
  },
  {
    id: "velvet-cupcakes",
    name: "Red Velvet Cupcakes",
    subtitle: "Silky Cream Cheese Frosting",
    price: 299,
    originalPrice: 349,
    category: "cupcakes",
    badge: "Popular",
    image: "assets/product_cupcakes.jpg",
    description: "Tender, cocoa-infused red velvet sponge topped with high swirls of silky cream cheese frosting and delicate red velvet crumbs.",
    weights: ["Box of 4", "Box of 6"],
    eggless: true,
    rating: 4.8,
    reviews: 88
  },
  {
    id: "fudge-brownies",
    name: "Belgian Fudge Brownies",
    subtitle: "Crinkly Top, Gooey Center",
    price: 379,
    originalPrice: 429,
    category: "brownies",
    badge: "Decadent",
    image: "assets/product_brownies.jpg",
    description: "Baked with premium 70% dark Belgian chocolate. Crackly shiny crust on top with an ultra-fudgy, melt-in-your-mouth chocolate center.",
    weights: ["Box of 4 (Large)", "Box of 8"],
    eggless: true,
    rating: 4.9,
    reviews: 142
  },
  {
    id: "festive-giftbox",
    name: "Sweet Celebration Gift Box",
    subtitle: "Curated Assortment For Gifting",
    price: 999,
    originalPrice: 1199,
    category: "gift-boxes",
    badge: "Luxury Hamper",
    image: "assets/product_giftbox.jpg",
    description: "The ultimate gifting hamper: Includes artisanal cookies, brownie bites, cocoa truffles, and a custom gold-foil celebration greeting card.",
    weights: ["Signature Hamper", "Deluxe Grand Box"],
    eggless: true,
    rating: 5.0,
    reviews: 76
  }
];

// App State
let cart = JSON.parse(localStorage.getItem("ahmednagar_cart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("ahmednagar_wishlist") || "[]");
let activeCategory = "all";
let currentCarouselIndex = 0;
let visibleProducts = [...PRODUCTS];

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  renderCarousel();
  updateCartBadge();
  updateWishlistCount();
  setupEventListeners();
  setupTouchCarousel();
});

// Setup All Interactive Event Listeners
function setupEventListeners() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMobileMenu = document.getElementById("closeMobileMenu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden");
    });
  }
  if (closeMobileMenu && mobileMenu) {
    closeMobileMenu.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  }

  // Cart Drawer Toggle
  const cartBtn = document.getElementById("cartBtn");
  const cartDrawer = document.getElementById("cartDrawer");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartBackdrop = document.getElementById("cartBackdrop");

  if (cartBtn && cartDrawer) {
    cartBtn.addEventListener("click", () => openCart());
  }
  if (closeCartBtn && cartDrawer) {
    closeCartBtn.addEventListener("click", () => closeCart());
  }
  if (cartBackdrop && cartDrawer) {
    cartBackdrop.addEventListener("click", () => closeCart());
  }

  // Carousel Navigation Buttons
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      navigateCarousel(-1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      navigateCarousel(1);
    });
  }

  // Category Filter Pills
  const categoryPills = document.querySelectorAll(".category-pill");
  categoryPills.forEach(pill => {
    pill.addEventListener("click", (e) => {
      const cat = pill.getAttribute("data-category");
      filterByCategory(cat, pill);
    });
  });

  // Custom Cake Modal
  const openCustomCakeBtns = document.querySelectorAll(".btn-open-custom-cake");
  const customCakeModal = document.getElementById("customCakeModal");
  const closeCustomCakeBtn = document.getElementById("closeCustomCakeBtn");
  const customCakeBackdrop = document.getElementById("customCakeBackdrop");
  const customCakeForm = document.getElementById("customCakeForm");

  openCustomCakeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (customCakeModal) customCakeModal.classList.remove("hidden");
    });
  });

  if (closeCustomCakeBtn && customCakeModal) {
    closeCustomCakeBtn.addEventListener("click", () => {
      customCakeModal.classList.add("hidden");
    });
  }
  if (customCakeBackdrop && customCakeModal) {
    customCakeBackdrop.addEventListener("click", () => {
      customCakeModal.classList.add("hidden");
    });
  }

  if (customCakeForm) {
    customCakeForm.addEventListener("submit", handleCustomCakeSubmit);
  }

  // Quick View Modal
  const quickViewModal = document.getElementById("quickViewModal");
  const closeQuickViewBtn = document.getElementById("closeQuickViewBtn");
  const quickViewBackdrop = document.getElementById("quickViewBackdrop");

  if (closeQuickViewBtn && quickViewModal) {
    closeQuickViewBtn.addEventListener("click", () => {
      quickViewModal.classList.add("hidden");
    });
  }
  if (quickViewBackdrop && quickViewModal) {
    quickViewBackdrop.addEventListener("click", () => {
      quickViewModal.classList.add("hidden");
    });
  }

  // WhatsApp Direct Order from Cart
  const whatsappCheckoutBtn = document.getElementById("whatsappCheckoutBtn");
  if (whatsappCheckoutBtn) {
    whatsappCheckoutBtn.addEventListener("click", handleWhatsAppCheckout);
  }
}

// Filter by Category
function filterByCategory(cat, pillEl) {
  activeCategory = cat;

  // Update pills visual state
  document.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));
  if (pillEl) {
    pillEl.classList.add("active");
  }

  if (cat === "all") {
    visibleProducts = [...PRODUCTS];
  } else {
    visibleProducts = PRODUCTS.filter(p => p.category === cat || (cat === "gift-boxes" && p.category.includes("gift-boxes")));
    // If fewer than 3, pad with others so carousel stays rich
    if (visibleProducts.length === 0) {
      visibleProducts = PRODUCTS.filter(p => p.category === "cakes");
    }
  }

  currentCarouselIndex = 0;
  renderCarousel();
  
  // Smooth scroll to treats section if pill was clicked
  const treatsSection = document.getElementById("treatsSection");
  if (treatsSection) {
    treatsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Render the Carousel Cards
function renderCarousel() {
  const container = document.getElementById("treatsCarousel");
  if (!container) return;

  // Clear container
  container.innerHTML = "";

  // The items to display
  const displayItems = visibleProducts.length > 0 ? visibleProducts : PRODUCTS;

  displayItems.forEach((product, idx) => {
    const isWishlisted = wishlist.includes(product.id);
    const card = document.createElement("div");
    card.className = "treat-card flex-none w-[260px] sm:w-[280px] md:w-[calc(33.333%-14px)] transition-all flex flex-col justify-between";
    card.setAttribute("data-id", product.id);

    card.innerHTML = `
      <div class="relative w-full aspect-[4/3] overflow-hidden bg-[#F6EEE5]">
        <img 
          src="${product.image}" 
          alt="${product.name}" 
          class="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105 cursor-pointer"
          onclick="openQuickView('${product.id}')"
          loading="lazy"
        />
        ${product.badge ? `
          <div class="absolute top-2.5 left-2.5">
            <span class="badge-bestseller font-medium">${product.badge}</span>
          </div>
        ` : ''}
        <button 
          class="btn-wishlist absolute top-2.5 right-2.5 ${isWishlisted ? 'active' : ''}" 
          onclick="toggleWishlist('${product.id}', this, event)"
          title="Add to Wishlist"
          aria-label="Wishlist"
        >
          <svg class="w-3.5 h-3.5" fill="${isWishlisted ? '#C83B65' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>

      <div class="p-3.5 sm:p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 
            class="text-[#382017] font-bold text-base sm:text-lg hover:text-[#C83B65] transition cursor-pointer"
            onclick="openQuickView('${product.id}')"
          >
            ${product.name}
          </h3>
          <p class="text-[#786055] text-xs mt-0.5 line-clamp-1">
            ${product.subtitle}
          </p>
        </div>

        <div class="flex items-center justify-between mt-3 pt-2 border-t border-[#F5EAE0]">
          <div class="flex items-baseline gap-1.5">
            <span class="text-lg sm:text-xl font-bold text-[#382017]">₹${product.price}</span>
            ${product.originalPrice ? `<span class="text-[11px] text-[#9B8479] line-through">₹${product.originalPrice}</span>` : ''}
          </div>
          <button 
            class="btn-card-action group" 
            onclick="quickAddToCart('${product.id}', event)" 
            title="Add ${product.name} to Cart"
            aria-label="Add to Cart"
          >
            <svg class="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  updateDots();
}

// Navigate Carousel
function navigateCarousel(direction) {
  const container = document.getElementById("treatsCarousel");
  if (!container) return;

  const cardWidth = container.querySelector(".treat-card")?.offsetWidth || 300;
  const gap = 24; // gap between cards
  const scrollAmount = (cardWidth + gap) * direction;

  container.scrollBy({
    left: scrollAmount,
    behavior: "smooth"
  });

  // Update index for dots
  const maxIndex = Math.max(0, visibleProducts.length - 1);
  currentCarouselIndex = Math.min(Math.max(currentCarouselIndex + direction, 0), maxIndex);
  updateDots();
}

// Update Pagination Dots
function updateDots() {
  const dots = document.querySelectorAll(".carousel-dot");
  dots.forEach((dot, idx) => {
    if (idx === currentCarouselIndex % dots.length) {
      dot.className = "carousel-dot w-2.5 h-2.5 rounded-full bg-[#382017] transition-all scale-110";
    } else {
      dot.className = "carousel-dot w-2 h-2 rounded-full bg-[#D6C4B8] hover:bg-[#A89285] transition-all";
    }
  });
}

// Setup Touch Carousel Swipe
function setupTouchCarousel() {
  const container = document.getElementById("treatsCarousel");
  if (!container) return;

  let startX = 0;
  let scrollLeft = 0;

  container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  });
}

// Wishlist Functionality
function toggleWishlist(productId, btnEl, event) {
  if (event) event.stopPropagation();

  const index = wishlist.indexOf(productId);
  let added = false;

  if (index > -1) {
    wishlist.splice(index, 1);
    if (btnEl) {
      btnEl.classList.remove("active");
      const svg = btnEl.querySelector("svg");
      if (svg) svg.setAttribute("fill", "none");
    }
    showToast("Removed from wishlist", "info");
  } else {
    wishlist.push(productId);
    added = true;
    if (btnEl) {
      btnEl.classList.add("active");
      const svg = btnEl.querySelector("svg");
      if (svg) svg.setAttribute("fill", "#C83B65");
    }
    showToast("Added to your wishlist! ♡", "success");
  }

  localStorage.setItem("ahmednagar_wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
}

function updateWishlistCount() {
  const badge = document.getElementById("wishlistCount");
  if (badge) {
    badge.textContent = wishlist.length;
    badge.style.display = wishlist.length > 0 ? "flex" : "none";
  }
}

// Add To Cart Quick Action
function quickAddToCart(productId, event) {
  if (event) event.stopPropagation();
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  addToCart(product, 1, product.weights[0] || "Standard", "");
  openCart();
}

// Add Item to Cart
function addToCart(product, quantity = 1, weight = "", note = "") {
  const existingIndex = cart.findIndex(item => item.id === product.id && item.weight === weight);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: weight || (product.weights ? product.weights[0] : "Standard"),
      note: note,
      quantity: quantity
    });
  }

  localStorage.setItem("ahmednagar_cart", JSON.stringify(cart));
  updateCartBadge();
  renderCartDrawer();
  showToast(`Added ${product.name} to cart! 🍰`, "success");
}

// Update Cart Badge Count
function updateCartBadge() {
  const badges = document.querySelectorAll(".cart-count-badge");
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  badges.forEach(badge => {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "flex" : "flex";
  });
}

// Open / Close Cart Drawer
function openCart() {
  renderCartDrawer();
  const drawer = document.getElementById("cartDrawer");
  if (drawer) drawer.classList.remove("translate-x-full");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  const drawer = document.getElementById("cartDrawer");
  if (drawer) drawer.classList.add("translate-x-full");
  document.body.style.overflow = "auto";
}

// Render Cart Drawer Contents
function renderCartDrawer() {
  const container = document.getElementById("cartItemsContainer");
  const emptyState = document.getElementById("cartEmptyState");
  const subtotalEl = document.getElementById("cartSubtotal");
  const totalEl = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("whatsappCheckoutBtn");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    if (subtotalEl) subtotalEl.textContent = "₹0";
    if (totalEl) totalEl.textContent = "₹0";
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add("opacity-50", "cursor-not-allowed");
    }
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");
  if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }

  container.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const row = document.createElement("div");
    row.className = "flex gap-3 py-3 border-b border-[#F0E5D8] items-center";

    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover border border-[#EADBCC] flex-shrink-0" />
      <div class="flex-grow min-w-0">
        <h4 class="font-bold text-[#382017] text-sm truncate">${item.name}</h4>
        <span class="text-xs text-[#786055] block">${item.weight}</span>
        ${item.note ? `<span class="text-[11px] text-[#C83B65] italic truncate block">Note: "${item.note}"</span>` : ''}
        <div class="flex items-center justify-between mt-1.5">
          <div class="flex items-center border border-[#DFCEBD] rounded-lg bg-[#FAF4EC]">
            <button class="px-2 py-0.5 text-xs text-[#382017] hover:bg-[#EADBCC] rounded-l" onclick="updateItemQuantity(${index}, -1)">-</button>
            <span class="px-2.5 text-xs font-semibold text-[#382017]">${item.quantity}</span>
            <button class="px-2 py-0.5 text-xs text-[#382017] hover:bg-[#EADBCC] rounded-r" onclick="updateItemQuantity(${index}, 1)">+</button>
          </div>
          <span class="font-bold text-sm text-[#382017]">₹${itemTotal}</span>
        </div>
      </div>
      <button class="text-[#B39B8F] hover:text-[#C83B65] p-1 transition" onclick="removeCartItem(${index})" title="Remove">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
      </button>
    `;

    container.appendChild(row);
  });

  const delivery = subtotal > 0 ? 0 : 0; // Free delivery promo!
  const finalTotal = subtotal + delivery;

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (totalEl) totalEl.textContent = `₹${finalTotal}`;
}

// Update Cart Quantity
function updateItemQuantity(index, change) {
  if (!cart[index]) return;
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("ahmednagar_cart", JSON.stringify(cart));
  updateCartBadge();
  renderCartDrawer();
}

// Remove Single Item
function removeCartItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("ahmednagar_cart", JSON.stringify(cart));
  updateCartBadge();
  renderCartDrawer();
  showToast("Item removed from cart", "info");
}

// Checkout via WhatsApp
function handleWhatsAppCheckout() {
  if (cart.length === 0) return;

  const customerName = document.getElementById("customerNameInput")?.value?.trim() || "";
  const customerAddress = document.getElementById("customerAddressInput")?.value?.trim() || "";

  let message = `*✨ New Order from Ahmednagar Cakes Website ✨*\n\n`;
  if (customerName) message += `*Customer:* ${customerName}\n`;
  if (customerAddress) message += `*Delivery Address:* ${customerAddress}\n\n`;

  message += `*Items Ordered:*\n`;
  let total = 0;

  cart.forEach((item, idx) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `${idx + 1}. *${item.name}* (${item.weight})\n`;
    message += `   Qty: ${item.quantity} × ₹${item.price} = ₹${itemTotal}\n`;
    if (item.note) message += `   _Note: ${item.note}_\n`;
  });

  message += `\n*Total Amount:* ₹${total}\n`;
  message += `*Preferred Delivery:* Today 6:30 PM - 8:30 PM (or specify)\n`;
  message += `\nPlease confirm my order and share payment details! 🎂`;

  const encodedMsg = encodeURIComponent(message);
  const waUrl = `https://wa.me/${STORE_PHONE}?text=${encodedMsg}`;

  window.open(waUrl, "_blank");
}

// Open Quick View Modal
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("quickViewModal");
  const modalImg = document.getElementById("quickViewImg");
  const modalName = document.getElementById("quickViewName");
  const modalPrice = document.getElementById("quickViewPrice");
  const modalOrigPrice = document.getElementById("quickViewOrigPrice");
  const modalDesc = document.getElementById("quickViewDesc");
  const modalWeights = document.getElementById("quickViewWeights");
  const modalRating = document.getElementById("quickViewRating");

  if (!modal) return;

  if (modalImg) modalImg.src = product.image;
  if (modalName) modalName.textContent = product.name;
  if (modalPrice) modalPrice.textContent = `₹${product.price}`;
  if (modalOrigPrice) {
    if (product.originalPrice) {
      modalOrigPrice.textContent = `₹${product.originalPrice}`;
      modalOrigPrice.classList.remove("hidden");
    } else {
      modalOrigPrice.classList.add("hidden");
    }
  }
  if (modalDesc) modalDesc.textContent = product.description;
  if (modalRating) modalRating.textContent = `★ ${product.rating} (${product.reviews} reviews)`;

  // Render weights
  if (modalWeights && product.weights) {
    modalWeights.innerHTML = "";
    product.weights.forEach((w, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `px-3 py-1.5 rounded-full text-xs font-medium border transition ${idx === 0 ? 'bg-[#382017] text-white border-[#382017]' : 'bg-[#FAF4EC] text-[#382017] border-[#DFCEBD] hover:border-[#382017]'}`;
      btn.textContent = w;
      btn.onclick = () => {
        modalWeights.querySelectorAll("button").forEach(b => {
          b.className = "px-3 py-1.5 rounded-full text-xs font-medium border transition bg-[#FAF4EC] text-[#382017] border-[#DFCEBD] hover:border-[#382017]";
        });
        btn.className = "px-3 py-1.5 rounded-full text-xs font-medium border transition bg-[#382017] text-white border-[#382017]";
      };
      modalWeights.appendChild(btn);
    });
  }

  // Setup Add To Cart from modal
  const addBtn = document.getElementById("quickViewAddBtn");
  if (addBtn) {
    addBtn.onclick = () => {
      const selectedWeightBtn = modalWeights.querySelector(".bg-\\[\\#382017\\]");
      const selectedWeight = selectedWeightBtn ? selectedWeightBtn.textContent : (product.weights[0] || "");
      const note = document.getElementById("quickViewNote")?.value?.trim() || "";
      const qty = parseInt(document.getElementById("quickViewQty")?.value || "1", 10);

      addToCart(product, qty, selectedWeight, note);
      modal.classList.add("hidden");
      openCart();
    };
  }

  // Setup WhatsApp direct button from modal
  const waBtn = document.getElementById("quickViewWaBtn");
  if (waBtn) {
    waBtn.onclick = () => {
      const msg = `Hi Ahmednagar Cakes! 👋 I want to order *${product.name}* (Price: ₹${product.price}). Please let me know availability!`;
      window.open(`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
    };
  }

  modal.classList.remove("hidden");
}

// Handle Custom Celebration Cake Form Submit
function handleCustomCakeSubmit(e) {
  e.preventDefault();
  const form = e.target;

  const occasion = form.elements["occasion"]?.value || "Celebration";
  const flavor = form.elements["flavor"]?.value || "Chef's Recommendation";
  const weight = form.elements["weight"]?.value || "1 Kg";
  const date = form.elements["date"]?.value || "Upcoming";
  const eggless = form.elements["eggless"]?.checked ? "Yes (100% Eggless 🌱)" : "Regular";
  const inscription = form.elements["inscription"]?.value?.trim() || "No specific message";
  const notes = form.elements["notes"]?.value?.trim() || "None";
  const customerName = form.elements["name"]?.value?.trim() || "";

  let msg = `*🎂 Custom Cake Inquiry - Ahmednagar Cakes 🎂*\n\n`;
  if (customerName) msg += `*From:* ${customerName}\n`;
  msg += `*Occasion:* ${occasion}\n`;
  msg += `*Flavor:* ${flavor}\n`;
  msg += `*Weight:* ${weight}\n`;
  msg += `*Dietary:* ${eggless}\n`;
  msg += `*Delivery Date:* ${date}\n`;
  msg += `*Message on Cake:* "${inscription}"\n`;
  msg += `*Special Instructions:* ${notes}\n\n`;
  msg += `Please let me know design possibilities and price quote! ✨`;

  const waUrl = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");

  document.getElementById("customCakeModal")?.classList.add("hidden");
  showToast("Inquiry sent to WhatsApp! We'll reply shortly. 🎂", "success");
}

// Toast Notification System
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  const bg = type === "success" ? "bg-[#382017] text-white" : "bg-[#C83B65] text-white";
  toast.className = `toast-enter flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl ${bg} text-sm font-medium border border-white/20`;

  toast.innerHTML = `
    <span class="text-base">${type === 'success' ? '🍰' : '♡'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}
