// Função para embaralhar a ordem dos números
function embaralharVetor(vetor) {
  for (let i = vetor.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [vetor[i], vetor[j]] = [vetor[j], vetor[i]];
  }
}

// Função para verificar se os números estão ordenados
function verificarOrdenacao(elementos) {
  return Array.from(elementos).every(function(elemento, indice) {
    return parseInt(elemento.textContent) === indice + 1;
  });
}

// Função para adicionar números à lista ordenável
function adicionarNumerosOrdenaveis(ordenavel, numeros) {
  for (let i = 0; i < numeros.length; i++) {
    let itemLista = document.createElement('li');
    itemLista.textContent = numeros[i];
    ordenavel.appendChild(itemLista);
  }
}

// Função para inicializar Sortable
function inicializarSortable() {
  let ordenavel = new Sortable(document.getElementById('sortable-grid'), {
    animation: 150, // Duração da animação em milissegundos
    onStart: function(evt) {
      evt.from.classList.add('sortable-chosen'); // Adicionar a classe quando o arrastar começa
    },
    onEnd: function(evt) {
      evt.from.classList.remove('sortable-chosen'); // Remover a classe quando o arrastar termina

      // Verificar se os números estão ordenados
      let estaOrdenado = verificarOrdenacao(evt.from.children);

      // Exibir alerta se os números estiverem ordenados
      if (estaOrdenado) {
        alert("Parabéns, os números estão ordenados agora!");
      }
    },
  });

  return ordenavel;
}

// Função para aguardar que o DOM esteja pronto antes de inicializar
function inicializarQuandoPronto() {
  document.addEventListener("DOMContentLoaded", function() {
    // Criar uma lista de números de 1 a 10
    let numeros = Array.from({ length: 10 }, function(indice) {
      return indice + 1;
    });

    // Embaralhar os números
    embaralharVetor(numeros);

    // Adicionar os números à lista ordenável
    let ordenavel = inicializarSortable();
    adicionarNumerosOrdenaveis(ordenavel.el, numeros);
  });
}

// Inicializar quando o DOM estiver pronto
inicializarQuandoPronto();
