/* =========================================================
   DOÇURAS DO CÉU — script.js
   Bolos e doces caseiros | Brás de Pina - RJ
   Instagram: @docurasdoceu.bolosedoces

   GUIA RÁPIDO DE MANUTENÇÃO
   - O arquivo inteiro roda dentro de UMA função só (IIFE, linha
     abaixo). É só pra não "vazar" variável nenhuma pro resto da
     página — não precisa se preocupar com isso no dia a dia.
   - Cada bloco tem um título em CAIXA ALTA (ex: "DADOS DOS
     PRODUTOS", "CARRINHO — estado"). Use Ctrl+F pelo título
     pra achar rápido a parte que precisa mexer.
   - Pontos mais comuns de manutenção:
     • Adicionar/editar bolo → array PRODUCTS (logo abaixo)
     • Preço, WhatsApp, textos de erro do carrinho → bloco
       "CARRINHO — pagamento e entrega" e "CARRINHO — data e
       horário da encomenda"
     • Horário de funcionamento → BUSINESS_HOURS
========================================================= */
(function () {
  "use strict";

  // Número da Doçuras do céu. Precisa ser SÓ DÍGITOS (DDI+DDD+número),
  // senão o link do wa.me quebra. Ex: "5521987798912"
  const WHATSAPP_NUMBER = "5521987798912";

  /* ---------------------------------------------------------
     DADOS DOS PRODUTOS — catálogo atual (9 bolos)

     img: caminho da foto do bolo, dentro da pasta "images/" ao lado
     deste arquivo. Se a imagem não existir, o card usa um ícone de
     bolo como substituto automático — o site não quebra.

     price: TODO — confirme/ajuste os valores reais de cada bolo.
     Mantive os preços que já estavam definidos para os bolos que já
     existiam no catálogo antigo; para "Bolo cenoura cremosa" ainda
     não temos uma foto exclusiva (ver aviso no chat).
  --------------------------------------------------------- */
  const PRODUCTS = [
    {
      id: "p1",
      name: "Bolo amanteigado com beijinho",
      cat: "especial",
      price: 50.0,
      desc: "Massa amanteigada tradicional, fofinha e com sabor caseiro, coberta com beijinho cremoso e coco ralado.",
      info: ["Tamanho: 22 cm", "Rendimento: 12 a 15 fatias"],
      img: "images/bolo-amanteigado-beijinho.jpg",
      // coco ralado "nevando"
      topping: { particles: { color: "#FFFFFF", color2: "#F5F0E8", shape: "flake" } },
    },
    {
      id: "p2",
      name: "Bolo de cenoura tradicional",
      cat: "classica",
      price: 55.0,
      desc: "Massa tradicional e fofinha de cenoura com uma cobertura generosa e brilhante de calda de chocolate.",
      info: ["Tamanho: 22 cm", "Rendimento: 12 a 15 fatias"],
      img: "images/bolo-de-cenoura-tradicional.png",
      // calda brilhante
      topping: { shine: true },
    },
    {
      id: "p3",
      name: "Bolo de chocolate com brigadeiro",
      cat: "especial",
      price: 60.0,
      desc: "Massa de chocolate fofinha com uma cobertura generosa de brigadeiro tradicional e granulado gourmet por cima.",
      info: ["Tamanho: 22 cm", "Rendimento: 12 a 15 fatias"],
      img: "images/bolo-de-chocolate-com-brigadeiro.png",
      // brigadeiro brilhante + granulado gourmet caindo
      topping: {
        shine: true,
        particles: { color: "#2A1810", color2: "#4A2712", shape: "rect" },
      },
    },
    {
      id: "p4",
      name: "Bolo de baunilha com morango",
      cat: "especial",
      price: 54.99,
      desc: "Massa fofinha de baunilha com uma cobertura generosa e cremosa de brigadeiro de morango, finalizada com granulado gourmet por cima.",
      info: ["Tamanho: 22 cm", "Rendimento: 12 a 15 fatias"],
      img: "images/bolo-baunilha-morango.jpg",
      // granulado de chocolate caindo
      topping: { particles: { color: "#4A2E22", color2: "#6B3A28", shape: "rect" } },
    },
    {
      id: "p5",
      name: "Bolo de ninho cremoso",
      cat: "especial",
      price: 50.90,
      desc: "Massa super fofinha combinada com uma cobertura altamente cremosa de Leite Ninho, finalizada com granulado gourmet por cima.",
      info: ["Tamanho: 22 cm", "Rendimento: 12 a 15 fatias"],
      img: "images/bolo-ninho-cremoso.jpg",
      // brilho cremoso + raspas de chocolate escuro caindo
      topping: {
        shine: true,
        particles: { color: "#3B2417", color2: "#2A1810", shape: "rect" },
      },
    },
    {
      id: "p6",
      name: "Bolo de milho com coco",
      cat: "classica",
      price: 36.0,
      desc: "Massa super úmida e tradicional de milho verde, finalizada com uma camada generosa de coco ralado e fios de leite condensado por cima.",
      info: ["Tamanho: 22 cm", "Rendimento: 12 a 15 fatias"],
      img: "images/bolo-milho-coco.jpg",
      // coco ralado "nevando"
      topping: { particles: { color: "#FFFFFF", color2: "#F5F0E8", shape: "flake" } },
    },
    {
      id: "p7",
      name: "Bolo de cenoura cremosa",
      cat: "especial",
      price: 65.0,
      desc: "Massa tradicional e fofinha de cenoura com uma cobertura generosa e aveludada de ganache de chocolate ao leite, finalizada com granulado gourmet por cima.",
      info: ["Tamanho: 22 cm", "Rendimento: 12 a 15 fatias"],
      img: "images/bolo-cenoura-cremosa.jpg",
      // ganache aveludada brilhante + granulado gourmet caindo
      topping: {
        shine: true,
        particles: { color: "#5C3820", color2: "#3B2417", shape: "rect" },
      },
    },
    {
      id: "p8",
      name: "Bolo de fubá com goiabada",
      cat: "classica",
      price: 45.0,
      desc: "Massa tradicional e muito macia de fubá, combinada com uma calda artesanal e generosa de goiabada escorrendo por cima.",
      info: ["Tamanho: 22 cm", "Rendimento: 12 a 15 fatias"],
      img: "images/bolo-fuba-goiabada.jpg",
      // calda de goiabada brilhante
      topping: { shine: true },
    },
    {
      id: "p9",
      name: "Bolo de paçoca cremosa",
      cat: "classica",
      price: 49.99,
      desc: "Massa fofinha de paçoca com uma cobertura generosa e cremosa de paçoca, finalizada com paçoca esfarelada por cima.",
      info: ["Tamanho: 22 cm", "Rendimento: 12 a 15 fatias"],
      img: "images/bolo-pacoca-cremosa.jpg",
      // farofinha de paçoca caindo
      topping: { particles: { color: "#E6CFA0", color2: "#C9A15A", shape: "crumb" } },
    },
     {
      id: "p10",
      name: "Bolo de chocolate intenso",
      cat: "especial",
      price: 65.0,
      desc: "Massa de chocolate fofinha com uma cobertura generosa de ganache meio amargo e granulado gourmet por cima.",
      info: ["Tamanho: 22 cm", "Rendimento: 12 a 15 fatias"],
      img: "images/bolo-de-chocolate-intenso.png",
      // farofinha de paçoca caindo
      topping: { particles: { color: "#E6CFA0", color2: "#C9A15A", shape: "crumb" } },
    },
     {
      id: "p11",
      name: "Bolo de aipim com coco",
      cat: "classica",
      price: 45.0,
      desc: "Massa tradicional e super úmida de aipim com muito coco e uma camada generosa de coco ralado por cima.",
      info: ["Tamanho: 22 cm", "Rendimento: 12 a 15 fatias"],
      img: "images/bolo-de-aipim-com-coco.png",
      // farofinha de paçoca caindo
      topping: { particles: { color: "#E6CFA0", color2: "#C9A15A", shape: "crumb" } },
    },
  ];

  const TESTIMONIALS = [
    { name: "olgaluiisa", text: "O melhor!! ❤️😃" },
    { name: "eloizavieiraalves7", text: "Tudo de bom !!!" },
  ];

  /* ---------------------------------------------------------
     ÍCONE SVG genérico usado nos cards (referencia sprite #ico-cake)
  --------------------------------------------------------- */
  function cakeSvg() {
    return `<svg viewBox="0 0 64 64"><use href="#ico-cake"/></svg>`;
  }

  // Mostra a foto real do bolo (p.img); se o arquivo não existir,
  // troca automaticamente pelo ícone de bolo — nunca quebra o layout.
  function productMedia(p) {
    return `
      <img src="${p.img}" alt="${p.name}" loading="lazy"
        onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="media-fallback" style="display:none">${cakeSvg()}</div>
    `;
  }

  function formatPrice(v) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  /* ---------------------------------------------------------
     BRILHO + PARTÍCULAS — reflexo passando por cima do bolo e
     granulado/coco/farofa "caindo", diferente para cada bolo
     (p.topping), usado na vitrine. Sem a calda/drip.
  --------------------------------------------------------- */
  function toppingMarkup(p) {
    const t = p.topping;
    if (!t) return "";
    return `
      <div class="slider-topping${t.shine ? " topping-shine" : ""}">
        ${t.shine ? '<div class="topping-shine-sweep"></div>' : ""}
        ${t.particles ? `<div class="topping-particles" data-shape="${t.particles.shape}"></div>` : ""}
      </div>
    `;
  }

  function spawnToppingParticles(container, particleCfg) {
    if (!container || !particleCfg) return;
    container.innerHTML = "";
    const colors = [particleCfg.color, particleCfg.color2 || particleCfg.color];
    const shape = particleCfg.shape || "rect";
    const count = 16;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "topping-particle shape-" + shape;
      el.style.left = (4 + Math.random() * 88) + "%";
      el.style.background = colors[i % colors.length];
      const size = shape === "flake" ? 4 + Math.random() * 3 : 3 + Math.random() * 2;
      el.style.width = size + "px";
      el.style.height = (shape === "rect" ? size * 2.6 : size) + "px";
      el.style.animationDuration = (2.4 + Math.random() * 2.2) + "s";
      el.style.animationDelay = Math.random() * -4.5 + "s";
      container.appendChild(el);
    }
  }

  /* ---------------------------------------------------------
     CARRINHO — estado + persistência local
  --------------------------------------------------------- */
  const CART_KEY = "flordeacucar_cart";
  let cart = loadCart();

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }
  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  function addToCart(id, originEl) {
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    renderCart();
    bumpCartIcon();
    showToast("Adicionado ao carrinho 🌸");
    if (originEl) burstSprinkles(originEl);
  }
  function changeQty(id, delta) {
    if (!cart[id]) return;
    cart[id] += delta;
    if (cart[id] <= 0) delete cart[id];
    saveCart();
    renderCart();
  }
  function removeFromCart(id) {
    delete cart[id];
    saveCart();
    renderCart();
  }

  function cartCount() {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }
  function cartTotal() {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const p = PRODUCTS.find((x) => x.id === id);
      return p ? sum + p.price * qty : sum;
    }, 0);
  }

  function bumpCartIcon() {
    const el = document.getElementById("cartCount");
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
  }

  function renderCart() {
    const itemsEl = document.getElementById("cartItems");
    const emptyMsg = document.getElementById("cartEmptyMsg");
    const totalEl = document.getElementById("cartTotal");
    const countEl = document.getElementById("cartCount");

    const entries = Object.entries(cart);
    countEl.textContent = cartCount();
    totalEl.textContent = formatPrice(cartTotal());

    itemsEl.querySelectorAll(".cart-item").forEach((n) => n.remove());

    if (entries.length === 0) {
      emptyMsg.style.display = "block";
      return;
    }
    emptyMsg.style.display = "none";

    entries.forEach(([id, qty]) => {
      const p = PRODUCTS.find((x) => x.id === id);
      if (!p) return;
      const item = document.createElement("div");
      item.className = "cart-item";
      item.innerHTML = `
        <div class="ci-media">${cakeSvg()}</div>
        <div class="ci-info">
          <h5>${p.name}</h5>
          <div class="ci-price">${formatPrice(p.price)} un.</div>
          <div class="ci-qty">
            <button data-action="dec" aria-label="Diminuir quantidade">−</button>
            <span>${qty}</span>
            <button data-action="inc" aria-label="Aumentar quantidade">+</button>
          </div>
          <button class="ci-remove" data-action="remove">Remover</button>
        </div>
      `;
      item.querySelector('[data-action="inc"]').addEventListener("click", () => changeQty(id, 1));
      item.querySelector('[data-action="dec"]').addEventListener("click", () => changeQty(id, -1));
      item.querySelector('[data-action="remove"]').addEventListener("click", () => removeFromCart(id));
      itemsEl.appendChild(item);
    });
  }

  /* ---------------------------------------------------------
     CARRINHO — abrir/fechar drawer
  --------------------------------------------------------- */
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");

  function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }
  document.getElementById("cartOpenBtn").addEventListener("click", openCart);
  document.getElementById("cartCloseBtn").addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  /* ---------------------------------------------------------
     CARRINHO — data e horário da encomenda
     Como os bolos são feitos só por encomenda, com no mínimo
     2 dias de antecedência, a data mínima selecionável é sempre
     hoje + 2 dias (não permite pedido pra hoje nem pra amanhã).
  --------------------------------------------------------- */
  const orderDateInput = document.getElementById("orderDate");
  const orderTimeInput = document.getElementById("orderTime");
  if (orderDateInput) {
    const minLeadDays = 2;
    const minDay = new Date();
    minDay.setDate(minDay.getDate() + minLeadDays);
    const minDate = minDay.toISOString().split("T")[0];
    orderDateInput.min = minDate;
  }

  // Esconde o molde "00/00/0000" / "00:00" assim que o campo tiver valor
  function setupDatetimeMask(input) {
    if (!input) return;
    const field = input.closest(".cart-datetime-field");
    if (!field) return;
    const sync = () => field.classList.toggle("filled", !!input.value);
    input.addEventListener("input", sync);
    input.addEventListener("change", sync);
    sync();
  }
  setupDatetimeMask(orderDateInput);
  setupDatetimeMask(orderTimeInput);

  /* ---------------------------------------------------------
     HORÁRIO DE FUNCIONAMENTO — seg a sex 9h–18h, sáb 8h–13h,
     domingo fechado. Usado pra bloquear encomendas fora desse
     horário e explicar o motivo pro cliente.
  --------------------------------------------------------- */
  const BUSINESS_HOURS = {
    0: null,        // domingo: fechado
    1: [9, 18],     // segunda
    2: [9, 18],     // terça
    3: [9, 18],     // quarta
    4: [9, 18],     // quinta
    5: [9, 18],     // sexta
    6: [8, 13],     // sábado
  };

  function checkBusinessHours(dateStr, timeStr) {
    const [y, m, d] = dateStr.split("-").map(Number);
    const selectedDate = new Date(y, m - 1, d);
    const weekday = selectedDate.getDay(); // 0 = domingo ... 6 = sábado
    const hours = BUSINESS_HOURS[weekday];

    if (!hours) {
      return {
        ok: false,
        errorField: "date",
        message: "Não atendemos aos domingos — escolha uma data de segunda a sábado 🌸",
      };
    }

    const [openH, closeH] = hours;
    const [h, min] = timeStr.split(":").map(Number);
    const minutos = h * 60 + min;
    if (minutos < openH * 60 || minutos > closeH * 60) {
      const faixa = weekday === 6 ? "aos sábados, das 8h às 13h" : "de segunda a sexta, das 9h às 18h";
      return {
        ok: false,
        errorField: "time",
        message: `Fora do nosso horário de funcionamento — atendemos ${faixa}. Escolha um horário dentro desse intervalo 🌸`,
      };
    }
    return { ok: true };
  }

  /* ---------------------------------------------------------
     CARRINHO — pagamento e entrega
  --------------------------------------------------------- */
  const PAYMENT_LABELS = { pix: "Pix", debito: "Débito", credito: "Crédito" };
  const DELIVERY_LABELS = { retirada: "Retirar em loja", motorista: "Motorista parceiro (Uber/99)" };

  function setupCartOptionGroup(groupId) {
    const group = document.getElementById(groupId);
    if (!group) return;
    group.addEventListener("change", () => {
      group.querySelectorAll(".cart-radio").forEach((label) => {
        label.classList.toggle("checked", label.querySelector("input").checked);
      });
    });
  }
  setupCartOptionGroup("paymentGroup");
  setupCartOptionGroup("deliveryGroup");

  /* ---------------------------------------------------------
     CHECKOUT — monta pedido e envia pro WhatsApp
  --------------------------------------------------------- */
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    const entries = Object.entries(cart);
    if (entries.length === 0) {
      showToast("Seu carrinho está vazio 🌸");
      return;
    }

    const dateVal = orderDateInput ? orderDateInput.value : "";
    const timeVal = orderTimeInput ? orderTimeInput.value : "";
    const dateField = orderDateInput ? orderDateInput.closest(".cart-datetime-field") : null;
    const timeField = orderTimeInput ? orderTimeInput.closest(".cart-datetime-field") : null;
    if (!dateVal || !timeVal) {
      showToast("Escolha a data e o horário da encomenda 🌸");
      dateField && dateField.classList.toggle("field-error", !dateVal);
      timeField && timeField.classList.toggle("field-error", !timeVal);
      return;
    }
    if (orderDateInput.min && dateVal < orderDateInput.min) {
      showToast("Nossos bolos são feitos por encomenda com 2 dias de antecedência — escolha uma data mais à frente 🌸");
      dateField && dateField.classList.add("field-error");
      return;
    }

    const horarioCheck = checkBusinessHours(dateVal, timeVal);
    if (!horarioCheck.ok) {
      showToast(horarioCheck.message);
      dateField && dateField.classList.toggle("field-error", horarioCheck.errorField !== "time");
      timeField && timeField.classList.toggle("field-error", horarioCheck.errorField !== "date");
      return;
    }
    dateField && dateField.classList.remove("field-error");
    timeField && timeField.classList.remove("field-error");

    const paymentInput = document.querySelector('input[name="payment"]:checked');
    if (!paymentInput) {
      showToast("Escolha a forma de pagamento 🌸");
      return;
    }
    const deliveryInput = document.querySelector('input[name="delivery"]:checked');
    if (!deliveryInput) {
      showToast("Escolha a forma de entrega 🌸");
      return;
    }

    const [ano, mes, dia] = dateVal.split("-");
    const dataFormatada = `${dia}/${mes}/${ano}`;

    let msg = "Olá, Doçuras do céu! Quero fazer o seguinte pedido:%0A%0A";
    entries.forEach(([id, qty]) => {
      const p = PRODUCTS.find((x) => x.id === id);
      if (!p) return;
      msg += `• ${qty}x ${p.name} — ${formatPrice(p.price * qty)}%0A%0A`;
    });
    msg += `*Total:* ${formatPrice(cartTotal())}%0A%0A`;
    msg += `*Data e horário da encomenda:*%0A${dataFormatada} às ${timeVal}%0A%0A`;
    msg += `*Forma de pagamento:* ${PAYMENT_LABELS[paymentInput.value]}%0A%0A`;
    msg += `*Forma de entrega:* ${DELIVERY_LABELS[deliveryInput.value]}`;
    if (deliveryInput.value === "motorista") {
      msg += `%0A_(Envio por motorista de aplicativo é de responsabilidade do cliente)_`;
    }
    msg += `%0A%0AAguardo a validação do meu pedido.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    window.open(url, "_blank", "noopener");
  });

  /* ---------------------------------------------------------
     GRID DE PRODUTOS + FILTRO POR CATEGORIA
  --------------------------------------------------------- */
  const productGrid = document.getElementById("productGrid");

  function renderProductGrid() {
    productGrid.innerHTML = PRODUCTS.map((p) => `
      <div class="product-card" data-cat="${p.cat}">
        <div class="pc-media">
          ${productMedia(p)}
          <span class="pc-cat">${p.cat}</span>
        </div>
        <div class="pc-body">
          <h4>${p.name}</h4>
          <p>${p.desc}</p>
          ${p.info ? `<ul class="pc-info">${p.info.map((linha) => `<li>${linha}</li>`).join("")}</ul>` : ""}
          <div class="pc-footer">
            <span class="pc-price">${formatPrice(p.price)}</span>
            <button class="add-btn" data-id="${p.id}">Adicionar</button>
          </div>
        </div>
      </div>
    `).join("");

    productGrid.querySelectorAll(".add-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        addToCart(btn.dataset.id, btn);
        btn.classList.add("added");
        const original = btn.textContent;
        btn.textContent = "Adicionado ✓";
        setTimeout(() => { btn.textContent = original; btn.classList.remove("added"); }, 1200);
      });
    });
  }

  document.querySelectorAll(".cat-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".cat-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      const filter = pill.dataset.filter;
      document.querySelectorAll(".product-card").forEach((card) => {
        card.classList.toggle("hide", filter !== "todos" && card.dataset.cat !== filter);
      });
    });
  });

  /* ---------------------------------------------------------
     VITRINE ANIMADA — troca de bolo com animação
     (substitui o carrossel horizontal simples)

     A vitrine mostra só uma seleção de bolos (não o catálogo
     inteiro) — o catálogo completo continua na grade abaixo.
  --------------------------------------------------------- */
  const CAT_LABELS = { classica: "Clássica", especial: "Especial" };

  // ids dos bolos que aparecem na vitrine, na ordem desejada
  const SLIDER_IDS = ["p4", "p5", "p7", "p3"];
  const SLIDER_PRODUCTS = SLIDER_IDS
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  const sliderStage = document.getElementById("sliderStage");
  const sliderPhoto = document.getElementById("sliderPhoto");
  const sliderIndex = document.getElementById("sliderIndex");
  const sliderCat = document.getElementById("sliderCat");
  const sliderName = document.getElementById("sliderName");
  const sliderDesc = document.getElementById("sliderDesc");
  const sliderPrice = document.getElementById("sliderPrice");
  const sliderAddBtn = document.getElementById("sliderAddBtn");
  const sliderThumbs = document.getElementById("sliderThumbs");
  const sliderInfo = document.getElementById("sliderInfo");
  const sliderSection = document.getElementById("mais-pedidos");

  let sliderCurrent = 0;
  let sliderAutoTimer = null;

  function renderSliderPhoto(p) {
    sliderPhoto.innerHTML = `
      <img src="${p.img}" alt="${p.name}" loading="lazy"
        onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="media-fallback" style="display:none">${cakeSvg()}</div>
      ${toppingMarkup(p)}
    `;
    if (p.topping && p.topping.particles) {
      spawnToppingParticles(sliderPhoto.querySelector(".topping-particles"), p.topping.particles);
    }
  }

  function goToSlide(i, direction) {
    sliderCurrent = (i + SLIDER_PRODUCTS.length) % SLIDER_PRODUCTS.length;
    const p = SLIDER_PRODUCTS[sliderCurrent];

    // troca o tema de cor de fundo por categoria do bolo
    sliderSection.dataset.theme = p.cat;

    // animação de saída
    sliderPhoto.classList.remove("in");
    sliderPhoto.classList.add(direction === "prev" ? "out-right" : "out-left");
    sliderInfo.classList.add("fade-out");

    setTimeout(() => {
      renderSliderPhoto(p);
      sliderIndex.textContent = String(sliderCurrent + 1).padStart(2, "0") + " / " + String(SLIDER_PRODUCTS.length).padStart(2, "0");
      sliderCat.textContent = CAT_LABELS[p.cat] || p.cat;
      sliderName.textContent = p.name;
      sliderDesc.textContent = p.desc;
      sliderPrice.textContent = formatPrice(p.price);
      sliderAddBtn.dataset.id = p.id;

      sliderPhoto.classList.remove("out-right", "out-left");
      void sliderPhoto.offsetWidth; // reinicia a animação CSS
      sliderPhoto.classList.add("in");
      sliderInfo.classList.remove("fade-out");
    }, 260);

    sliderThumbs.querySelectorAll(".slider-thumb").forEach((t, idx) => {
      t.classList.toggle("active", idx === sliderCurrent);
    });
  }

  function renderSliderThumbs() {
    sliderThumbs.innerHTML = SLIDER_PRODUCTS.map((p, i) => `
      <button class="slider-thumb${i === 0 ? " active" : ""}" data-i="${i}" aria-label="${p.name}">
        <img src="${p.img}" alt="" loading="lazy" onerror="this.remove();">
      </button>
    `).join("");

    sliderThumbs.querySelectorAll(".slider-thumb").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.dataset.i);
        stopSliderAutoplay();
        goToSlide(i, i < sliderCurrent ? "prev" : "next");
        startSliderAutoplay();
      });
    });
  }

  function startSliderAutoplay() {
    clearInterval(sliderAutoTimer);
    sliderAutoTimer = setInterval(() => goToSlide(sliderCurrent + 1, "next"), 5000);
  }
  function stopSliderAutoplay() {
    clearInterval(sliderAutoTimer);
  }

  document.getElementById("sliderPrev").addEventListener("click", () => {
    stopSliderAutoplay();
    goToSlide(sliderCurrent - 1, "prev");
    startSliderAutoplay();
  });
  document.getElementById("sliderNext").addEventListener("click", () => {
    stopSliderAutoplay();
    goToSlide(sliderCurrent + 1, "next");
    startSliderAutoplay();
  });
  sliderAddBtn.addEventListener("click", () => addToCart(sliderAddBtn.dataset.id, sliderAddBtn));
  sliderStage.addEventListener("mouseenter", stopSliderAutoplay);
  sliderStage.addEventListener("mouseleave", startSliderAutoplay);

  function renderFloatingDecor() {
    const wrap = document.getElementById("sliderDecor");
    const colors = ["#C46A80", "#C9A15A", "#F6C9D6", "#E6CFA0"];
    for (let i = 0; i < 10; i++) {
      const dot = document.createElement("span");
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = Math.random() * 100 + "%";
      dot.style.background = colors[i % colors.length];
      dot.style.animationDuration = 5 + Math.random() * 6 + "s";
      dot.style.animationDelay = Math.random() * 5 + "s";
      wrap.appendChild(dot);
    }
  }

  function initSlider() {
    renderSliderPhoto(SLIDER_PRODUCTS[0]);
    sliderPhoto.classList.add("in");
    sliderIndex.textContent = "01 / " + String(SLIDER_PRODUCTS.length).padStart(2, "0");
    sliderCat.textContent = CAT_LABELS[SLIDER_PRODUCTS[0].cat] || SLIDER_PRODUCTS[0].cat;
    sliderName.textContent = SLIDER_PRODUCTS[0].name;
    sliderDesc.textContent = SLIDER_PRODUCTS[0].desc;
    sliderPrice.textContent = formatPrice(SLIDER_PRODUCTS[0].price);
    sliderAddBtn.dataset.id = SLIDER_PRODUCTS[0].id;
    sliderSection.dataset.theme = SLIDER_PRODUCTS[0].cat;
    renderSliderThumbs();
    renderFloatingDecor();
    startSliderAutoplay();
  }

  /* ---------------------------------------------------------
     DEPOIMENTOS — slider
  --------------------------------------------------------- */
  const testimonialTrack = document.getElementById("testimonialTrack");
  const testimonialDots = document.getElementById("testimonialDots");
  let testimonialIndex = 0;
  let testimonialTimer = null;

  function renderTestimonials() {
    testimonialTrack.innerHTML = TESTIMONIALS.map((t) => `
      <div class="testimonial-card">
        <div class="testimonial-inner">
          <div class="testimonial-stars">★★★★★</div>
          <p class="quote">"${t.text}"</p>
          <div class="testimonial-author">${t.name}</div>
        </div>
      </div>
    `).join("");
    testimonialDots.innerHTML = TESTIMONIALS.map((_, i) => `<span class="dot${i === 0 ? " active" : ""}"></span>`).join("");

    testimonialDots.querySelectorAll(".dot").forEach((dot, i) => {
      dot.addEventListener("click", () => goToTestimonial(i));
    });
  }

  function goToTestimonial(i) {
    testimonialIndex = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
    testimonialDots.querySelectorAll(".dot").forEach((d, idx) => d.classList.toggle("active", idx === testimonialIndex));
  }

  function startTestimonialAutoplay() {
    clearInterval(testimonialTimer);
    testimonialTimer = setInterval(() => goToTestimonial(testimonialIndex + 1), 5500);
  }

  /* ---------------------------------------------------------
     TOAST
  --------------------------------------------------------- */
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  /* ---------------------------------------------------------
     EFEITO "CHUVA DE CONFEITOS" ao adicionar ao carrinho
  --------------------------------------------------------- */
  const sprinkleColors = ["#C46A80", "#C9A15A", "#F6C9D6", "#8A3A52", "#F2B84B"];
  function burstSprinkles(originEl) {
    const rect = originEl.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const container = document.getElementById("sprinkleBurst");

    for (let i = 0; i < 14; i++) {
      const piece = document.createElement("span");
      piece.className = "sprinkle-piece";
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 70;
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist - 30;
      piece.style.left = originX + "px";
      piece.style.top = originY + "px";
      piece.style.background = sprinkleColors[i % sprinkleColors.length];
      piece.style.setProperty("--fly-transform", `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`);
      container.appendChild(piece);
      setTimeout(() => piece.remove(), 950);
    }
  }

  /* ---------------------------------------------------------
     PÉTALAS FLUTUANTES NO HERO
  --------------------------------------------------------- */
  function renderPetals() {
    const wrap = document.querySelector(".hero-petals");
    if (!wrap) return;
    const count = window.innerWidth < 700 ? 8 : 16;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("span");
      petal.style.left = Math.random() * 100 + "%";
      petal.style.animationDuration = 7 + Math.random() * 9 + "s";
      petal.style.animationDelay = Math.random() * 8 + "s";
      petal.style.opacity = 0.3 + Math.random() * 0.4;
      petal.style.width = petal.style.height = 6 + Math.random() * 8 + "px";
      petal.style.background = Math.random() > 0.5 ? "var(--rose)" : "var(--gold)";
      wrap.appendChild(petal);
    }
  }

  /* ---------------------------------------------------------
     HEADER — sombra ao rolar + menu mobile
  --------------------------------------------------------- */
  const header = document.getElementById("siteHeader");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }, { passive: true });

  const hamburger = document.getElementById("hamburgerBtn");
  const mainNav = document.getElementById("mainNav");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mainNav.classList.toggle("open");
  });
  mainNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mainNav.classList.remove("open");
    });
  });

  /* ---------------------------------------------------------
     NEWSLETTER (demo — sem backend real)
  --------------------------------------------------------- */
  document.getElementById("newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("newsletterMsg").textContent = "Prontinho! Você vai receber nossas novidades. 💌";
    e.target.reset();
  });

  /* ---------------------------------------------------------
     LOGIN OBRIGATÓRIO (cadastro manual) + CADASTRO COMPLEMENTAR
     Fluxo: 1) usuário cria conta -> POST /api/register
               ou já tem conta   -> POST /api/login
            2) se faltar idade/endereço/bolo -> formulário extra
               -> POST /api/profile
            3) GET /api/me confirma sessão a cada carregamento
               da página e libera (ou não) o site.
  --------------------------------------------------------- */
  const authGate = document.getElementById("authGate");
  const authStepLogin = document.getElementById("authStepLogin");
  const authStepProfile = document.getElementById("authStepProfile");
  const authLoginError = document.getElementById("authLoginError");
  const authProfileError = document.getElementById("authProfileError");
  const userChip = document.getElementById("userChip");

  function populateProfileBoloOptions() {
    const select = document.getElementById("profileBolo");
    if (!select) return;
    select.innerHTML =
      '<option value="" disabled selected>Escolha um sabor</option>' +
      PRODUCTS.map((p) => `<option value="${p.name}">${p.name}</option>`).join("") +
      '<option value="Outro">Outro / ainda não experimentei</option>';
  }

  function showGate() {
    document.body.style.overflow = "hidden";
    authGate.hidden = false;
  }

  function hideGate() {
    document.body.style.overflow = "";
    authGate.hidden = true;
  }

  function showLoginStep() {
    authStepLogin.style.display = "block";
    authStepProfile.style.display = "none";
  }

  function showProfileStep() {
    authStepLogin.style.display = "none";
    authStepProfile.style.display = "block";
  }

  function updateUserChip(user) {
    if (!user || !userChip) return;
    document.getElementById("userChipName").textContent = (user.name || user.email || "").split(" ")[0];
    userChip.style.display = "flex";
  }

  function afterAuthSuccess(data) {
    updateUserChip(data.user);
    if (data.profileComplete) {
      hideGate();
    } else {
      showProfileStep();
    }
  }

  function setupAuthTabs() {
    const tabLoginBtn = document.getElementById("tabLoginBtn");
    const tabRegisterBtn = document.getElementById("tabRegisterBtn");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const title = document.getElementById("authLoginTitle");
    const desc = document.getElementById("authLoginDesc");
    if (!tabLoginBtn || !tabRegisterBtn) return;

    function showLoginTab() {
      tabLoginBtn.classList.add("active");
      tabRegisterBtn.classList.remove("active");
      loginForm.style.display = "flex";
      registerForm.style.display = "none";
      title.textContent = "Entre para continuar";
      desc.textContent = "Para acessar o cardápio e fazer pedidos, entre com sua conta. Leva 5 segundos. 🌸";
      authLoginError.textContent = "";
    }

    function showRegisterTab() {
      tabRegisterBtn.classList.add("active");
      tabLoginBtn.classList.remove("active");
      registerForm.style.display = "flex";
      loginForm.style.display = "none";
      title.textContent = "Crie sua conta";
      desc.textContent = "Leva menos de um minuto e já libera o cardápio. 🌸";
      authLoginError.textContent = "";
    }

    tabLoginBtn.addEventListener("click", showLoginTab);
    tabRegisterBtn.addEventListener("click", showRegisterTab);
  }

  function setupLoginForm() {
    const form = document.getElementById("loginForm");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      authLoginError.textContent = "";
      const email = form.email.value.trim();
      const senha = form.senha.value;
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha }),
        });
        const data = await res.json();
        if (!res.ok) {
          authLoginError.textContent = data.error || "Não foi possível entrar. Tente de novo.";
          return;
        }
        afterAuthSuccess(data);
      } catch (e) {
        authLoginError.textContent = "Erro de conexão. Verifique sua internet e tente de novo.";
      }
    });
  }

  /* ---------------------------------------------------------
     MÁSCARA DE CELULAR — formata (00) 00000-0000 enquanto digita
  --------------------------------------------------------- */
  function maskCelular(value) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits.replace(/^(\d*)/, "($1");
    if (digits.length <= 7) return digits.replace(/^(\d{2})(\d*)/, "($1) $2");
    return digits.replace(/^(\d{2})(\d{5})(\d*)/, "($1) $2-$3");
  }
  function setupCelularMask(input) {
    if (!input) return;
    input.addEventListener("input", () => {
      const cursorFromEnd = input.value.length - input.selectionStart;
      input.value = maskCelular(input.value);
      const pos = input.value.length - cursorFromEnd;
      input.setSelectionRange(pos, pos);
    });
  }
  setupCelularMask(document.getElementById("registerCelular"));

  function setupRegisterForm() {
    const form = document.getElementById("registerForm");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      authLoginError.textContent = "";
      const nome = form.nome.value.trim();
      const celular = form.celular.value.trim();
      const email = form.email.value.trim();
      const senha = form.senha.value;

      const celularDigits = celular.replace(/\D/g, "");
      if (celularDigits.length < 10 || celularDigits.length > 11) {
        authLoginError.textContent = "Digite um celular válido, com DDD. Ex: (21) 98765-4321";
        form.celular.focus();
        return;
      }

      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, celular, email, senha }),
        });
        const data = await res.json();
        if (!res.ok) {
          authLoginError.textContent = data.error || "Não foi possível criar sua conta. Tente de novo.";
          return;
        }
        afterAuthSuccess(data);
      } catch (e) {
        authLoginError.textContent = "Erro de conexão. Verifique sua internet e tente de novo.";
      }
    });
  }

  function setupProfileForm() {
    const form = document.getElementById("profileForm");
    if (!form) return;
    populateProfileBoloOptions();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      authProfileError.textContent = "";

      const idade = form.idade.value.trim();
      const endereco = form.endereco.value.trim();
      const boloPreferido = form.boloPreferido.value;
      const consentiu = document.getElementById("profileConsent").checked;

      if (!idade || !endereco || !boloPreferido || !consentiu) {
        authProfileError.textContent = "Preencha idade, endereço, bolo preferido e aceite o uso dos dados.";
        return;
      }

      try {
        const res = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idade, endereco, boloPreferido }),
        });
        const data = await res.json();
        if (!res.ok) {
          authProfileError.textContent = data.error || "Não foi possível salvar seu cadastro.";
          return;
        }
        updateUserChip(data.user);
        hideGate();
        showToast("Cadastro concluído! Bem-vindo(a). 🌸");
      } catch (e) {
        authProfileError.textContent = "Erro de conexão. Tente de novo.";
      }
    });
  }

  function setupLogout() {
    const btn = document.getElementById("logoutBtn");
    if (!btn) return;
    btn.addEventListener("click", async () => {
      try {
        await fetch("/api/logout", { method: "POST" });
      } catch (e) { /* segue o baile mesmo se falhar */ }
      userChip.style.display = "none";
      showLoginStep();
      authLoginError.textContent = "";
      showGate();
    });
  }

  async function initAuthGate() {
    setupAuthTabs();
    setupLoginForm();
    setupRegisterForm();
    setupProfileForm();
    setupLogout();
    try {
      const res = await fetch("/api/me");
      if (!res.ok) {
        showGate();
        showLoginStep();
        return;
      }
      const data = await res.json();
      updateUserChip(data.user);
      if (data.profileComplete) {
        hideGate();
      } else {
        showGate();
        showProfileStep();
      }
    } catch (e) {
      // Sem conexão com a API — libera login mesmo assim
      showGate();
      showLoginStep();
    }
  }

  /* ---------------------------------------------------------
     SCROLL REVEAL simples (fade-in ao entrar na tela)
  --------------------------------------------------------- */
  function setupScrollReveal() {
    const targets = document.querySelectorAll(".product-card, .step, .carousel-card");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "slideIn .5s ease both";
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach((t) => io.observe(t));
  }

  /* ---------------------------------------------------------
     INIT
  --------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();
  renderProductGrid();
  initSlider();
  renderTestimonials();
  startTestimonialAutoplay();
  renderPetals();
  renderCart();
  setupScrollReveal();
  initAuthGate();
})();
