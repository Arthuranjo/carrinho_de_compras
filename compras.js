const produtos = [
    { nome: "Camiseta", preco: 29.99, quantidade: 10 },
    { nome: "Calça", preco: 59.99, quantidade: 5 },
    { nome: "Tênis", preco: 89.99, quantidade: 3 },
    { nome: "Relógio", preco: 149.99, quantidade: 2 },
    { nome: "Boné", preco: 19.99, quantidade: 20 }
];

// Carrinho de compras
let carrinho = [];

// Funcao para buscar produto pelo nome
function buscarProduto(nome) {
    return produtos.find(produto => produto.nome.toLowerCase() === nome.toLowerCase());
}

// Funcao para adicionar produto ao carrinho 
function adicionarAoCarrinho() {
    const nome = document.getElementById("produtoNome").value;
    const quantidade = parseInt(document.getElementById("produtoQuantidade").value);
    adicionarProdutoAoCarrinho(nome, quantidade);
}

// Funcao para adicionar produto ao carrinho
function adicionarProdutoAoCarrinho(nome, quantidade) {
    const produto = buscarProduto(nome);
    if (produto && produto.quantidade >= quantidade) {
        const itemCarrinho = carrinho.find(item => item.nome === produto.nome);
        if (itemCarrinho) {
            itemCarrinho.quantidade += quantidade;
        } else {
            carrinho.push({ ...produto, quantidade });
        }
        produto.quantidade -= quantidade; // tirar a quantidade no estoque
        atualizarCarrinho();
        alert(`${quantidade} ${produto.nome}(s) adicionado(s) ao carrinho.`);
    } else {
        alert("Produto não encontrado ou quantidade indisponível.");
    }
}

// Função para remover produto do carrinho
function removerDoCarrinho() {
    const nome = document.getElementById("removerNome").value;
    const indice = carrinho.findIndex(item => item.nome.toLowerCase() === nome.toLowerCase());
    if (indice !== -1) {
        const [produtoRemovido] = carrinho.splice(indice, 1);
        const produtoOriginal = buscarProduto(produtoRemovido.nome);
        if (produtoOriginal) {
            produtoOriginal.quantidade += produtoRemovido.quantidade; // Devolver no estoque
        }
        alert(`${produtoRemovido.quantidade} ${produtoRemovido.nome}(s) removido(s) do carrinho.`);
        atualizarCarrinho();
    } else {
        alert("Produto não encontrado no carrinho.");
    }
}

// esssa funçao ta calculando o total do carrinho
function calcularTotal() {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

//  atualizar a tabela do carrinho
function atualizarCarrinho() {
    const tabela = document.getElementById("carrinhoTabela").querySelector("tbody");
    tabela.innerHTML = "";
    
    // deixar os produtos na frente  por preço
    const carrinhoOrdenado = [...carrinho].sort((a, b) => a.preco - b.preco);

    carrinhoOrdenado.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${item.nome}</td><td>${item.quantidade}</td><td>R$ ${item.preco.toFixed(2)}</td>`;
        tabela.appendChild(row);
    });
    
    document.getElementById("totalCarrinho").textContent = `Total da compra: R$ ${calcularTotal().toFixed(2)}`;
}
