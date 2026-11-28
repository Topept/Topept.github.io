const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('#menu');

if (menuBtn && menu) {
  menuBtn.addEventListener('click', function () {
    // toggle() devolve true se a classe ficou adicionada
    const isOpen = menu.classList.toggle('open');
    menuBtn.classList.toggle('ativo', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
      menuBtn.classList.remove('ativo');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}


const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const category = button.dataset.filter;

    // .ativo é para o CSS, o aria-pressed é para os leitores de ecrã
    filterButtons.forEach(function (btn) {
      btn.classList.toggle('ativo', btn === button);
      btn.setAttribute('aria-pressed', btn === button);
    });

    projectCards.forEach(function (card) {
      const show = category === 'todos' || card.dataset.category === category;
      card.classList.toggle('escondido', !show);
    });
  });
});


const modal = document.querySelector('#modal');
const modalTitle = document.querySelector('#modal-title');
const modalContent = document.querySelector('#modal-content');
const modalClose = document.querySelector('.modal-close');
let lastFocused;

function openModal(card) {
  // Os detalhes de cada projeto estão escondidos dentro do próprio card
  modalTitle.textContent = card.querySelector('h2').textContent;
  modalContent.innerHTML = card.querySelector('.project-details').innerHTML;

  lastFocused = document.activeElement;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  modalClose.focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  // Apagar o conteúdo também pára o vídeo, se estiver a tocar
  modalContent.innerHTML = '';
  lastFocused.focus();
}

if (modal) {
  projectCards.forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card);
    });
  });

  modalClose.addEventListener('click', closeModal);

  // Só fecha se o clique for no fundo escuro, não dentro da caixa
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
}


const copyBtn = document.querySelector('#copy-email');

if (copyBtn) {
  copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(copyBtn.dataset.email).then(function () {
      copyBtn.textContent = 'Copiado!';
      setTimeout(function () {
        copyBtn.textContent = 'Copiar';
      }, 2000);
    });
  });
}
