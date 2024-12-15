let modalQt = 1
let cartQt = []

//Adicionando produtos no body
hamburguers.map((item, index) => {
    let areaProd = document.querySelector('.prod-area')
    const produtosContainer = document.querySelector('.produtos-container')

    if(areaProd){
        let burguer = areaProd.cloneNode(true)

        burguer.query
        burguer.setAttribute('data-key', `hamburguers ${index}`)
        burguer.querySelector('.imagem-prod img').src = item.img
        burguer.querySelector('.nome-prod').innerHTML = item.nome
        burguer.querySelector('.price').innerHTML = `R$${item.price.toFixed(2)}`

        produtosContainer.appendChild(burguer)
    }
})

gourmet.map((item, index) => {
    let areaProd = document.querySelector('.prod-area')
    const produtosContainer = document.querySelector('.produtos-container-gourmet')

    if(areaProd){
        let burguer = areaProd.cloneNode(true)

        burguer.setAttribute('data-key', `gourmet ${index}`)
        burguer.querySelector('.imagem-prod img').src = item.img
        burguer.querySelector('.nome-prod').innerHTML = item.nome
        burguer.querySelector('.price').innerHTML = `R$${item.price.toFixed(2)}`

        produtosContainer.appendChild(burguer)
    }
})

//Abrir e fechar o carrinho
const abrirCarrinho = document.querySelector('.cart-area')
const carrinho = document.querySelector('.cart')
const fecharCarrinho = document.querySelector('.area span')

abrirCarrinho.addEventListener('click', () => {
    carrinho.classList.toggle('open')
})

fecharCarrinho.addEventListener('click', () => {
    carrinho.classList.remove('open')
})

//Modal
const abrirModal = document.querySelectorAll('.prod-area')
const btnCancelar = document.querySelector('.cancelar')
const btnAdicionar = document.querySelector('.adicionar')
const btnMais = document.querySelector('.mais')
const btnMenos = document.querySelector('.menos')
const btnFinalizar = document.querySelector('.finalizar')

const atualizaQtmodal = () => {
    document.querySelector('.qt').innerHTML = modalQt
}

btnMais.addEventListener('click', () => {
    modalQt++
    atualizaQtmodal()
})

btnMenos.addEventListener('click', () => {
    if(modalQt > 1){
        modalQt--
        atualizaQtmodal()
    }
})

abrirModal.forEach(item => {
    item.addEventListener('click', () => {
        modalQt = 1
        atualizaQtmodal()

        let modal = document.querySelector('.modal')
        modal.classList.add('active')
        const info = item.getAttribute('data-key')

        modal.querySelector('.img').src = item.querySelector('.imagem-prod').src
        modal.querySelector('.info h1').innerHTML = item.querySelector('.nome-prod').innerHTML
        modal.querySelector('.atual-price').innerHTML = item.querySelector('.price').innerHTML
        
    })
})

btnCancelar.addEventListener('click', () => {
    let modal = document.querySelector('.modal')
    modal.classList.remove('active')
    
})

btnAdicionar.addEventListener('click', () => {
    let modal = document.querySelector('.modal')

    let nome = modal.querySelector('.info h1').innerHTML
    let preco = parseFloat(modal.querySelector('.atual-price').innerHTML.replace('R$', ''))
    let quantidade = parseInt(modal.querySelector('.qt').innerHTML)

    let produto = {
        nome,
        preco,
        quantidade
    }

    let itemExiste = cartQt.findIndex(item => item.nome === nome)
    if(itemExiste !== -1){
        cartQt[itemExiste].quantidade += quantidade
    } else {
        cartQt.push(produto)
    }

    atualizaCarrinho()
    modal.classList.remove('active')
})

btnFinalizar.addEventListener('click', () => {
    alert('Pedido finalizado!')
    window.location.reload(true)
})

const atualizaCarrinho = () => {
    let cartItens = document.querySelector('.produtos')
    let subTotal = document.querySelector('.subtotal')
    cartItens.innerHTML = ''

    let totalSub = 0

    cartQt.forEach(item => {
        let modal = document.querySelector('.modal')
        let quantidade = parseInt(modal.querySelector('.qt').innerHTML)
        let cartItem = document.createElement('div')
        cartItem.classList.add('produtos-add')

        let itemTotal = item.preco * item.quantidade
        total = totalSub += itemTotal

        subTotal.innerHTML = `<span>Total:R$ ${total.toFixed(2)}</span>`


        cartItem.innerHTML = `
            <span>${item.nome}</span>
            <span>R$${item.preco.toFixed(2)}</span>
            <span>Qt:${item.quantidade}</span>
        `
        cartItens.appendChild(cartItem)

    })

    document.querySelector('#cart-total-qt').innerHTML = totalQtcart()
}

const totalQtcart = () => {
    return cartQt.reduce((total, item) => total + item.quantidade, 0);
};
