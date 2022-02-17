let eCard = [
    {
        id: 1,
        name: 'Банан',
        price: 20,
        href: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Fw3LitQt-XjInupvJj-pocRo6l6mYrmx9HhrRsqn6-jVyYwX4Rc7KtjBU8XRlrgsFfA&usqp=CAU'
    },
    {
        id: 2,
        name: 'Виноград',
        price: 30,
        href: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/640px-Table_grapes_on_white.jpg'
    },
    {
        id: 3,
        name: 'Яблоки',
        price: 10,
        href: 'http://www.telegid.com/wp-content/uploads/2018/01/apples-in-Alabama-by-Roman-Sanokhin-at-Shutterstock.jpg'
    }
]

const priceModel = $.modal({
  titel: "Цена на товар",
  closable: true,
//   content: `
//         <h4>Modal is working</h4>
//         <p>Lorem ipsum dolor sit.</p>
//     `,
  width: "400px",
  footerBtn: [
    {
      text: "Ok",
      type: "primary",
      handler() {
        priceModel.close();
      },
    }
  ]
});

const _card = function _renderCardElement(cards = []) {
    if (cards.length === 0) {
        return document.createElement("div");
    }
    const wrap = document.createElement("div");
    wrap.classList.add("card");
    wrap.setAttribute("data-card",`${cards.id}`)
    wrap.insertAdjacentHTML("afterbegin",`
        <img style="height: 300px;" src="${cards.href}" alt="банан">
        <div class="card-body">
            <h5 class="card-title">${cards.name || 'Фрукт'}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${cards.id}">Цена</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${cards.id}">Удалить</a>
        </div>
    `);

    return wrap;
}

eCard.forEach(card => {
    document.querySelector('[data-container]').appendChild(_card(card))
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id //преобразование строчки в число (тип)

    if (btnType === 'price') {
        const fruit = eCard.find(f => f.id === id)
        priceModel.setContent(`
            <p>Цена на ${fruit.name}: <strong>${fruit.price}$</strong></p>
        `)
        priceModel.open()
    } else if (btnType === 'remove') {
        const fruit = eCard.find(f => f.id === id)
        $.confirm({
            titel: 'Вы уверены?',
            content: `
                <p>Фрукт: <strong>${fruit.name}</strong> будет удален</p>
            `
        }).then(() => {
            eCard = eCard.filter(f => f.id !== id)
            const datacard = '[data-card="'+id+'"]'
            document.querySelector(datacard).remove()
        }).catch(() => {
            console.log('Cansel')
        })
    }
})