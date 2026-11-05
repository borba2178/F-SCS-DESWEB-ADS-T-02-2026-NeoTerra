document.addEventListener('DOMContentLoaded', () => {
  const btnAcessibilidade = document.getElementById('btnAcessibilidade');
  const painel = document.getElementById('painelAcessibilidade');
  
  // Verifica se os elementos existem na página antes de rodar
  if (!btnAcessibilidade || !painel) return;

  // Abrir/Fechar Painel (agora utilizando .closest para suportar cliques no texto interno)
  btnAcessibilidade.addEventListener('click', (e) => {
    e.stopPropagation();
    const aberto = painel.classList.toggle('ativo');
    btnAcessibilidade.setAttribute('aria-expanded', aberto);
  });

  document.addEventListener('click', (e) => {
    // Fecha o painel se o clique não foi nem no painel e nem dentro do botão de acessibilidade
    if (!painel.contains(e.target) && !btnAcessibilidade.contains(e.target)) {
      painel.classList.remove('ativo');
      btnAcessibilidade.setAttribute('aria-expanded', 'false');
    }
  });

  // 1. Funcionalidade de Tamanho de Fonte (Incremento/Decremento de 10%)
  let escalaFonte = 100;
  const aplicarEscala = () => {
    document.documentElement.style.fontSize = escalaFonte + '%';
  };

  document.getElementById('btnAumentarFonte').addEventListener('click', () => {
    if (escalaFonte < 160) {
      escalaFonte += 10;
      aplicarEscala();
    }
  });

  document.getElementById('btnDiminuirFonte').addEventListener('click', () => {
    if (escalaFonte > 80) {
      escalaFonte -= 10;
      aplicarEscala();
    }
  });

  document.getElementById('btnResetarFonte').addEventListener('click', () => {
    escalaFonte = 100;
    aplicarEscala();
  });

  // 2. Funcionalidade de Contraste (Ciclo: Normal -> Baixo Contraste -> Alto Contraste)
  let estadoContraste = 0; // 0: Normal, 1: Baixo Contraste, 2: Alto Contraste
  const btnContraste = document.getElementById('btnContraste');

  btnContraste.addEventListener('click', () => {
    document.body.classList.remove('baixo-contraste', 'alto-contraste');
    estadoContraste = (estadoContraste + 1) % 3;

    if (estadoContraste === 1) {
      document.body.classList.add('baixo-contraste');
      btnContraste.textContent = "Baixo Contraste";
    } else if (estadoContraste === 2) {
      document.body.classList.add('alto-contraste');
      btnContraste.textContent = "Alto Contraste";
    } else {
      btnContraste.textContent = "Normal";
    }
  });

  // 3. Leitor de Tela Nativo (SpeechSynthesis API)
  let leituraVozAtiva = false;
  const btnLeitorVoz = document.getElementById('btnLeitorVoz');

  btnLeitorVoz.addEventListener('click', () => {
    leituraVozAtiva = !leituraVozAtiva;
    if (leituraVozAtiva) {
      btnLeitorVoz.textContent = "Ativado";
      btnLeitorVoz.style.background = "#c6f6d5";
      btnLeitorVoz.style.borderColor = "#38a169";
      btnLeitorVoz.setAttribute('aria-pressed', 'true');
    } else {
      btnLeitorVoz.textContent = "Desativado";
      btnLeitorVoz.style.background = "#e2e8f0";
      btnLeitorVoz.style.borderColor = "";
      btnLeitorVoz.setAttribute('aria-pressed', 'false');
      window.speechSynthesis.cancel();
    }
  });

  // Evento de foco para ler o texto usando a API SpeechSynthesis
  document.addEventListener('focusin', (e) => {
    if (!leituraVozAtiva) return;
    const alvo = e.target;
    let textoParaLer = "";

    if (alvo.tagName === 'A' || alvo.tagName === 'BUTTON') {
      textoParaLer = alvo.innerText || alvo.getAttribute('aria-label');
    } else if (alvo.tagName === 'INPUT' || alvo.tagName === 'TEXTAREA') {
      const label = document.querySelector(`label[for="${alvo.id}"]`);
      textoParaLer = label ? label.innerText + " campo de texto" : "Campo de entrada";
    } else if (alvo.tagName === 'H1' || alvo.tagName === 'H2' || alvo.tagName === 'H3') {
      textoParaLer = alvo.innerText;
    }

    if (textoParaLer && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const fala = new SpeechSynthesisUtterance(textoParaLer);
      fala.lang = 'pt-BR';
      window.speechSynthesis.speak(fala);
    }
  });
});