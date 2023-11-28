const url = 'https://botafogo-atletas.mange.li';

const pega_json = async (caminho) => {
  const resposta = await fetch(caminho);
  const dados = await resposta.json();
  return dados;
}

const cria_cartao = (entrada) => {  

  const main = document.querySelector('main');
  main.style.display = 'flex';
  main.style.gap = '20px';
  main.style.flexWrap = 'wrap';
  main.style.justifyContent = 'center';


  const container_atleta = document.createElement('article');
  container_atleta.style.width = '250px';
  container_atleta.style.height = '450px'
  container_atleta.style.backgroundColor = '#ffffff';
  container_atleta.style.textAlign = 'center';
  container_atleta.style.margin = '10px';  
  container_atleta.style.borderRadius = '10px';

  container_atleta.dataset.id = entrada.id;
  container_atleta.dataset.altura = entrada.altura;
  container_atleta.dataset.nome_completo = entrada.nome_completo;
  container_atleta.dataset.nascimento = entrada.nascimento;
  container_atleta.dataset.descricao = entrada.descricao;

  const titulo = document.createElement('h3');
  titulo.innerHTML = entrada.nome;
  const imagem = document.createElement('img');
  imagem.src = entrada.imagem;
  imagem.alt = `foto de ${entrada.nome}`;
  imagem.style.margin = '0px 0px 8px 0px';
  imagem.style.borderRadius = '10px';

  const ver_detalhes = document.createElement('button');
  ver_detalhes.textContent = 'Ver detalhes';
  ver_detalhes.style.fontWeight ='bold'
  ver_detalhes.style.backgroundColor = '#000000';
  ver_detalhes.style.padding = '6px 25px';
  ver_detalhes.style.borderRadius = '5px';
  ver_detalhes.onclick = manipulaClick;

  container_atleta.appendChild(titulo);
  container_atleta.appendChild(imagem);
  container_atleta.appendChild(ver_detalhes);

  main.appendChild(container_atleta);

}

const manipulaClick = (e) => {
  const artigo = e.target.closest('article');

  document.cookie = `id=${artigo.dataset.id}`;
  document.cookie = `altura=${artigo.dataset.altura}`;
  document.cookie = `nome_completo=${artigo.dataset.nome_completo}`;
  document.cookie = `nascimento=${artigo.dataset.nascimento}`;
  document.cookie = `descricao=${artigo.dataset.descricao}`

  localStorage.setItem('id', artigo.dataset.id);
  localStorage.setItem('altura', artigo.dataset.altura);
  localStorage.setItem('nome_completo', artigo.dataset.nome_completo);
  localStorage.setItem('nascimento', artigo.dataset.nascimento);
  localStorage.setItem('descricao', artigo.dataset.descricao)


  window.location = `detalhes.html?id=${artigo.dataset.id}`;

}

const acha_cookie = (chave) => {
  const lista_de_cookies = document.cookie.split("; ");
  const procurado = lista_de_cookies.find(
    (e)=> e.startsWith(chave));
  return procurado.split('=')[1];
}


document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const lista_botoes = document.querySelector('nav');

  initializeHeader(header);
  initializeButtons(lista_botoes);
  fetchAndCreateCards();

  window.addEventListener('resize', () => {
    adjustLayout(main);
  });

  adjustLayout(main);
});

const adjustLayout = (main) => {
  const windowWidth = window.innerWidth;

  if (windowWidth <= 768) {
    setSingleColumnLayout(main);
  } else if (windowWidth <= 1024) {
    setTwoColumnsLayout(main);
  } else {
    setFourColumnsLayout(main);
  }
};

const setSingleColumnLayout = (main) => {
  main.style.display = 'grid';
  main.style.gridTemplateColumns = '1fr';
  main.style.textAlign = 'center';
};

const setTwoColumnsLayout = (main) => {
  main.style.display = 'grid';
  main.style.gridTemplateColumns = 'repeat(2, 1fr)';
  main.style.maxWidth = '1024px';
  main.style.textAlign = 'center';
  
};

const setFourColumnsLayout = (main) => {
  main.style.display = 'grid';
  main.style.gridTemplateColumns = 'repeat(4, 1fr)';
  main.style.maxWidth = '1200px';
  main.style.textAlign = 'center';
  main.style.margin = 'auto';  
};

const initializeHeader = (header) => {
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.padding = '0px 45px';
  header.style.backgroundColor = '#757575';
  header.style.alignItems = 'center';

  const titulo2 = document.createElement('h2');
  titulo2.textContent = 'Atletas do Botafogo';
  titulo2.style.color = '#f1f1f1';

  const sair = document.createElement('a');
  sair.href = 'index.html';
  sair.textContent = 'Sair';
  sair.style.color = '#f1f1f1';
  sair.style.textDecoration = 'none';
  sair.style.fontSize = '16px';
  sair.style.fontWeight = 'bold';
  sair.style.backgroundColor = '#212121';
  sair.style.padding = '10px';
  sair.style.borderRadius = '4px';

  header.appendChild(titulo2);
  header.appendChild(sair);
};

const initializeButtons = (lista_botoes) => {

  lista_botoes.style.listStyle = 'none';
  lista_botoes.style.margin = '17px';
  lista_botoes.style.textAlign = 'center';

  createButton('Feminino', `${url}/feminino`, lista_botoes);
  createButton('Masculino', `${url}/masculino`, lista_botoes);
  createButton('Elenco Completo', `${url}/all`, lista_botoes);
};

const createButton = (text, url, lista_botoes) => {
  
  const button = document.createElement('button');
  button.textContent = text;
  button.style.fontSize = '18px';
  button.style.padding = '13px';
  button.style.backgroundColor = '#212121';
  button.style.color = '#f1f1f1';
  button.style.borderRadius = '4px';
  button.style.margin = '20px';
  button.onclick = () => fetchAndCreateCards(url);

  lista_botoes.appendChild(button);
};

const loadingElements = document.querySelector('p');
loadingElements.style.display = 'none';

const fetchAndCreateCards = async (url) => {


    try {
      const data = await pega_json(url);
      const main = document.querySelector('main');

      main.innerHTML = '';

      for (const atleta of data) {
        cria_cartao(atleta);
      }  
    
  } finally {
    loadingElements.style.display = 'none';
  }  
}
