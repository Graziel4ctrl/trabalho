const search = document.getElementById("search");
    const lista = document.getElementById("lista");
    const itens = lista.getElementsByTagName("li");

    search.addEventListener("keyup", function() {
      let filtro = search.value.toLowerCase();

      for (let i = 0; i < itens.length; i++) {
        let texto = itens[i].textContent.toLowerCase();
        if (texto.includes(filtro)) {
          itens[i].style.display = "";
        } else {
          itens[i].style.display = "none";
        }
      }
    });

  // === DROPS COM TIMER ===
  const dropFim = new Date().getTime() + (1000 * 60 * 5); // drop dura 5 minutos
  function atualizarTimer() {
    const agora = new Date().getTime();
    const diff = dropFim - agora;
    if (diff <= 0) {
      document.getElementById("timer").innerText = "ESGOTADO!";
      return;
    }
    const m = Math.floor((diff % (1000*60*60)) / (1000*60));
    const s = Math.floor((diff % (1000*60)) / 1000);
    document.getElementById("timer").innerText = `${m}m ${s}s restantes`;
  }
  setInterval(atualizarTimer, 1000);
 
  // === SISTEMA DE STICKERS ===
  const stickersDisponiveis = [
    { nome: "🔥 Fogo", img: "https://twemoji.maxcdn.com/v/latest/svg/1f525.svg" },
    { nome: "🛹 Skate", img: "https://twemoji.maxcdn.com/v/latest/svg/1f6f9.svg" },
    { nome: "🎧 Som", img: "https://twemoji.maxcdn.com/v/latest/svg/1f3a7.svg" }
  ];
 
  function getUsuario() {
    return JSON.parse(localStorage.getItem("usuario")) || { nome: "Você", pontos: 0, stickers: [] };
  }
 
  function salvarUsuario(u) {
    localStorage.setItem("usuario", JSON.stringify(u));
  }
 
  function comprar() {
    const u = getUsuario();
 
    // Checar se drop ainda vale
    if (new Date().getTime() > dropFim) {
      alert("Esse drop já esgotou!");
      return;
    }
 
    // Sorteia sticker
    const s = stickersDisponiveis[Math.floor(Math.random() * stickersDisponiveis.length)];
    u.stickers.push(s);
    u.pontos += 10;
    salvarUsuario(u);
 
    alert(`Você comprou e ganhou o sticker: ${s.nome} 🎉`);
    renderStickers();
    renderRanking();
  }
 
  function renderStickers() {
    const u = getUsuario();
    const div = document.getElementById("stickers");
    div.innerHTML = "";
    u.stickers.forEach(s => {
      const img = document.createElement("img");
      img.src = s.img;
      img.className = "sticker";
      div.appendChild(img);
    });
  }
 
  // === RANKING (simples, só 1 usuário salvo) ===
  function renderRanking() {
    const u = getUsuario();
    const ul = document.getElementById("ranking");
    ul.innerHTML = `<li>${u.nome} — ${u.pontos} pontos</li>`;
  }
 
  // Inicializar
  renderStickers();
  renderRanking();
