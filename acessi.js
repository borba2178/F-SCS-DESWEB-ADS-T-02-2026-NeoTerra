document.addEventListener('DOMContentLoaded', () => {
  const btnAcessibilidade = document.getElementById('btnAcessibilidade');
  const painel = document.getElementById('painelAcessibilidade');
  const aviso = document.getElementById('avisoAcessibilidade');

  // Só roda se o painel existir na página
  if (!btnAcessibilidade || !painel) return;

  // Anuncia mudanças para leitores de tela
  const anunciar = (texto) => {
    if (aviso) aviso.textContent = texto;
  };

  // Guarda preferências entre as páginas (com proteção contra erro)
  const guardar = (chave, valor) => {
    try { localStorage.setItem(chave, valor); } catch (e) { /* ignora */ }
  };
  const ler = (chave) => {
    try { return localStorage.getItem(chave); } catch (e) { return null; }
  };

  // ---------- Abrir / fechar painel ----------
  const fecharPainel = () => {
    painel.classList.remove('ativo');
    btnAcessibilidade.setAttribute('aria-expanded', 'false');
  };

  btnAcessibilidade.addEventListener('click', (e) => {
    e.stopPropagation();
    const aberto = painel.classList.toggle('ativo');
    btnAcessibilidade.setAttribute('aria-expanded', String(aberto));
    btnAcessibilidade.setAttribute(
      'aria-label',
      aberto ? 'Fechar painel de acessibilidade' : 'Abrir painel de acessibilidade'
    );
  });

  document.addEventListener('click', (e) => {
    if (!painel.contains(e.target) && !btnAcessibilidade.contains(e.target)) {
      fecharPainel();
      btnAcessibilidade.setAttribute('aria-label', 'Abrir painel de acessibilidade');
    }
  });

  // Tecla Esc fecha o painel e devolve o foco ao botão
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && painel.classList.contains('ativo')) {
      fecharPainel();
      btnAcessibilidade.setAttribute('aria-label', 'Abrir painel de acessibilidade');
      btnAcessibilidade.focus();
    }
  });

  // ---------- 1. Tamanho da fonte ----------
  let escalaFonte = parseInt(ler('neoterra-fonte'), 10);
  if (isNaN(escalaFonte) || escalaFonte < 80 || escalaFonte > 160) escalaFonte = 100;

  const aplicarEscala = () => {
    document.documentElement.style.fontSize = escalaFonte + '%';
    guardar('neoterra-fonte', escalaFonte);
  };
  aplicarEscala();

  document.getElementById('btnAumentarFonte').addEventListener('click', () => {
    if (escalaFonte < 160) {
      escalaFonte += 10;
      aplicarEscala();
      anunciar('Fonte em ' + escalaFonte + ' por cento');
    } else {
      anunciar('Tamanho máximo da fonte atingido');
    }
  });

  document.getElementById('btnDiminuirFonte').addEventListener('click', () => {
    if (escalaFonte > 80) {
      escalaFonte -= 10;
      aplicarEscala();
      anunciar('Fonte em ' + escalaFonte + ' por cento');
    } else {
      anunciar('Tamanho mínimo da fonte atingido');
    }
  });

  document.getElementById('btnResetarFonte').addEventListener('click', () => {
    escalaFonte = 100;
    aplicarEscala();
    anunciar('Fonte restaurada para o padrão');
  });

  // ---------- 2. Contraste (Normal -> Baixo -> Alto) ----------
  const btnContraste = document.getElementById('btnContraste');
  const nomesContraste = ['Normal', 'Baixo Contraste', 'Alto Contraste'];
  const classesContraste = ['', 'baixo-contraste', 'alto-contraste'];

  let estadoContraste = parseInt(ler('neoterra-contraste'), 10);
  if (isNaN(estadoContraste) || estadoContraste < 0 || estadoContraste > 2) estadoContraste = 0;

  const aplicarContraste = () => {
    document.body.classList.remove('baixo-contraste', 'alto-contraste');
    if (classesContraste[estadoContraste]) {
      document.body.classList.add(classesContraste[estadoContraste]);
    }
    btnContraste.textContent = nomesContraste[estadoContraste];
    guardar('neoterra-contraste', estadoContraste);
  };
  aplicarContraste();

  btnContraste.addEventListener('click', () => {
    estadoContraste = (estadoContraste + 1) % 3;
    aplicarContraste();
    anunciar('Contraste: ' + nomesContraste[estadoContraste]);
  });

  // ---------- 3. Leitor de voz (SpeechSynthesis) ----------
  let leituraVozAtiva = false;
  const btnLeitorVoz = document.getElementById('btnLeitorVoz');

  btnLeitorVoz.addEventListener('click', () => {
    leituraVozAtiva = !leituraVozAtiva;
    btnLeitorVoz.textContent = leituraVozAtiva ? 'Ativado' : 'Desativado';
    btnLeitorVoz.setAttribute('aria-pressed', String(leituraVozAtiva));
    if (!leituraVozAtiva && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  });

  document.addEventListener('focusin', (e) => {
    if (!leituraVozAtiva) return;
    const alvo = e.target;
    let textoParaLer = '';

    if (alvo.tagName === 'A' || alvo.tagName === 'BUTTON') {
      textoParaLer = alvo.getAttribute('aria-label') || alvo.innerText;
    } else if (alvo.tagName === 'INPUT' || alvo.tagName === 'TEXTAREA') {
      const label = document.querySelector('label[for="' + alvo.id + '"]');
      textoParaLer = label ? label.innerText + ' campo de texto' : 'Campo de entrada';
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