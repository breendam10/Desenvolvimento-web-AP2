const exibirDetalhes = (dados) => {
  const detalhesImagem = document.createElement("img");
  detalhesImagem.src = dados.imagem;
  detalhesImagem.alt = `foto de ${dados.nome}`;

  document.getElementById('foto').appendChild(detalhesImagem);
};

const obterDetalhes = async () => {
  const id = localStorage.getItem('id');
  const endpoint = `https://botafogo-atletas.mange.li/${id}`;

  try {
    const resposta = await fetch(endpoint);
    const dados = await resposta.json();

    console.log("Dados do servidor:", dados);
    
    exibirDetalhes(dados);
  } catch (erro) {
    console.error("Erro ao obter dados:", erro);
  }
};

const exibirPerfilJogador = () => {
  const detalhesDiv = document.getElementById('informacoes');

  detalhesDiv.innerHTML = `
    <p>Nome: ${localStorage.getItem('nome_completo')}</p>
    <p>Nascimento: ${localStorage.getItem('nascimento')}</p>
    <p>Altura: ${localStorage.getItem('altura')}</p>
    <p>Descrição: ${localStorage.getItem('descricao')}</p>
  `;
};

document.addEventListener("DOMContentLoaded", () => {
  obterDetalhes();
  exibirPerfilJogador();
});

  
  perfil_jogador ()
  
  const voltar = () => {
    const exit = document.querySelector('footer');
  
    const sai = document.createElement('a');
    sai.href = 'jogadores.html';
    sai.textContent = 'Voltar';
    sai.style.color = '#f1f1f1';
    sai.style.textDecoration = 'none';
    sai.style.fontSize = '16px';
    sai.style.fontWeight = 'bold';
    sai.style.backgroundColor = '#212121';
    sai.style.padding = '10px';
    sai.style.borderRadius = '4px';
    sai.style.margin = '44%'
  
    exit.appendChild(sai);

    
  };
  
  voltar();


  