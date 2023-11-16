// Função para lidar com o evento de arrastar começando
function movimentarElementoInicio(event) {
  // Armazena o item arrastado para referência posterior
  itemArrastado = event.target;
  // Define o efeito permitido durante a operação de arrastar
  event.dataTransfer.effectAllowed = 'move';
  // Define os dados que serão transferidos durante a operação de arrastar
  event.dataTransfer.setData('text/html', itemArrastado.innerHTML);
}

// Função para lidar com o evento de arrastar sobre
function arrastarPorCima(event) {
  // Impede o comportamento padrão do navegador para o evento de arrastar sobre
  event.preventDefault();
  // Define o efeito de soltar durante a operação de arrastar
  event.dataTransfer.dropEffect = 'move';

  // Identifica o elemento alvo sobre o qual o item está sendo arrastado
  let itemAlvo = event.target;
  // Verifica se o item alvo é diferente do item arrastado e é uma 'drag-item'
  if ((itemAlvo !== itemArrastado) && itemAlvo.classList.contains('drag-item')) {
    // Obtém as coordenadas do retângulo delimitador do item alvo
    let delimitarRetangulo = itemAlvo.getBoundingClientRect();
    let desvio = delimitarRetangulo.y + (delimitarRetangulo.height / 2);

    // Determina se o item deve ser colocado acima ou abaixo do item alvo
    if (event.clientY - desvio > 0) {
      itemAlvo.style.borderBottom = 'solid 2px #000';
      itemAlvo.style.borderTop = '';
    } else {
      itemAlvo.style.borderTop = 'solid 2px #000';
      itemAlvo.style.borderBottom = '';
    }
  }
}

// Função para lidar com o evento de soltar
function soltarElemento(event) {
  // Impede o comportamento padrão do navegador para o evento de soltar
  event.preventDefault();
  // Identifica o elemento alvo sobre o qual o item foi solto
  let itemAlvo = event.target;

  // Verifica se o elemento alvo é uma lista ('drag-list')
  if (itemAlvo.classList.contains('drag-list')) {
    // Adiciona o item arrastado à lista de destino
    itemAlvo.appendChild(itemArrastado);
  } else if ((itemAlvo !== itemArrastado) && itemAlvo.classList.contains('drag-item')) {
    // Muda a cor do item com base na div de destino
    mudarCorItem(itemAlvo);

    // Verifica se o elemento alvo pertence à mesma lista do item arrastado
    if (itemAlvo.parentNode === itemArrastado.parentNode) {
      // Move o item dentro da mesma lista
      if (event.clientY > itemAlvo.getBoundingClientRect().top + (itemAlvo.offsetHeight / 2)) {
        itemAlvo.parentNode.insertBefore(itemArrastado, itemAlvo.nextSibling);
      } else {
        itemAlvo.parentNode.insertBefore(itemArrastado, itemAlvo);
      }
    } else {
      // Move o item para outra lista
      itemAlvo.parentNode.appendChild(itemArrastado);
    }
  }

  // Limpa as bordas de todos os itens após a operação de soltar
  limparBordasItens();
  // Reseta o item arrastado para nulo
  itemArrastado = null;
}

// Função para mudar a cor do item com base na div de destino
function mudarCorItem(itemAlvo) {
  // Identifica a div mais próxima da div de destino
  let part1 = itemAlvo.closest('.part1');
  let part2 = itemAlvo.closest('.part2');
  let part3 = itemAlvo.closest('.part3');

  // Muda a cor do item com base na div de destino
  if (part1 !== null) {
    itemArrastado.style.backgroundColor = 'lightcoral';
  } else if (part2 !== null) {
    itemArrastado.style.backgroundColor = 'lightblue';
  } else if (part3 !== null) {
    itemArrastado.style.backgroundColor = 'lightgreen';
  }
}

// Função para limpar as bordas de todos os itens
function limparBordasItens() {
  // Seleciona todas as listas de arrastar no documento
  let arrastarElementos = document.querySelectorAll('.drag-list');
  for (let i = 0; i < arrastarElementos.length; i++) {
    // Para cada lista, seleciona todos os itens
    let elemento = arrastarElementos[i];
    let items = elemento.querySelectorAll('.drag-item');

    // Limpa as bordas de cada item
    for (let j = 0; j < items.length; j++) {
      let item = items[j];
      item.style.borderTop = '';
      item.style.borderBottom = '';
    }
  }
}

// Adiciona event listeners para os eventos de arrastar e soltar
document.addEventListener('DOMContentLoaded', function () {
  // Seleciona todas as listas de arrastar no documento
  let arrastarElementos = document.querySelectorAll('.drag-list');

  // Adiciona event listeners para cada lista de arrastar
  for (let i = 0; i < arrastarElementos.length; i++) {
    let elemento = arrastarElementos[i];

    // Adiciona event listeners específicos para cada fase da operação de arrastar e soltar
    elemento.addEventListener('dragstart', movimentarElementoInicio);
    elemento.addEventListener('dragover', arrastarPorCima);
    elemento.addEventListener('drop', soltarElemento);
  }
});
