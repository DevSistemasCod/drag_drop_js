// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
  // Configura o comportamento de arrastar elementos quando o DOM estiver pronto
  configurarArrastarElemento();
});

function configurarArrastarElemento() {
  // Obtém referências para o elemento preenchido e espaços vazios
  let preenchido = document.querySelector('.preenchido');
  let espacosVazios = document.querySelectorAll('.espacoVazio');

  // Função chamada quando o arrastar de um elemento 
  function iniciarArrastar() {
    // Adiciona a classe 'segurar' ao elemento
    this.classList.add('segurar');
    // Configura um temporizador para alterar a classe para 'invisivel' após 0 segundos
    setTimeout(function () {
      this.classList = 'invisivel';
    }, 0);
  }

  // Função chamada quando o arrastar de um elemento é finalizado
  function finalizarArrastar() {
    // Define a classe para 'preenchido' no elemento
    this.classList = 'preenchido';
  }

  // Função chamada quando um elemento 
  //está sendo arrastado sobre outro
  function arrastarPorCima(e) {
    // Impede o comportamento padrão do navegador 
    // durante o arrastar sobre
    e.preventDefault();
  }

  // Função chamada quando um elemento está sendo arrastado para dentro de outro
  function entrarArrastar(e) {
    // Impede o comportamento padrão do navegador durante o arrastar para dentro
    e.preventDefault();
    // Adiciona a classe 'flutuar' ao elemento
    this.classList.add('flutuar');
  }

  // Função chamada quando um elemento está sendo arrastado para fora de outro
  function sairArrastar() {
    // Define a classe para 'espacoVazio' no elemento
    this.classList = 'espacoVazio';
  }

  // Função chamada quando um elemento é solto sobre outro
  function soltarArrastar() {
    // Define a classe para 'espacoVazio' no elemento
    this.classList = 'espacoVazio';
    // Adiciona o elemento preenchido como filho do elemento alvo
    this.appendChild(preenchido);
  }

  // Adiciona os ouvintes de eventos para o elemento preenchido
  preenchido.addEventListener('dragstart', iniciarArrastar);
  preenchido.addEventListener('dragend', finalizarArrastar);

  // Adiciona os ouvintes de eventos para cada espaço vazio
  for (let i = 0; i < espacosVazios.length; i++) {
    let espacoVazio = espacosVazios[i];
    espacoVazio.addEventListener('dragover', arrastarPorCima);
    espacoVazio.addEventListener('dragenter', entrarArrastar);
    espacoVazio.addEventListener('dragleave', sairArrastar);
    espacoVazio.addEventListener('drop', soltarArrastar);
  }
}
