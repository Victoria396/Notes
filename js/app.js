const cards = document.querySelector(".cards");
const buttonAdd = document.querySelector(".add-card");

// функция newCard создает карточку
function newCard (title, text) {
    const cardEl = document.createElement("div");
    cardEl.innerHTML = `
            <div class="card">
                <div class="card__actions">
                    <button class="add">
                        <i class="fa-solid fa-pencil"></i>
                        <i class="fa-solid fa-check hidden"></i>
                    </button>
                    <button class="delete">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                <div class="card__content">
                    <h2 class="card__title">${title}</h2>
                    <textarea type="text" class="card__title-input hidden" placeholder="Ваш заголовок"></textarea>
                    <p class="card__item">${text}</p>
                    <div class="card__list">
                        <label class="card__item-input hidden">
                            <input type="checkbox">
                            <textarea class="item-done" type="text" placeholder="Ваша задача"></textarea>
                        </label>
                        
                    </div>
                    <button class="add-todo">
                            <i class="fa-solid fa-circle-plus hidden"></i>
                    </button>
                </div>
            </div>
    `;

    // эта часть мне не нравится, не придумала как правильно делегировать события
    const editBtn = cardEl.querySelector(".add");
    const deleteBtn = cardEl.querySelector(".delete");
    const titleEl = cardEl.querySelector('.card__title');
    const textEl = cardEl.querySelector('.card__item');
    const titleInputEl = cardEl.querySelector('.card__title-input');
    const textInputEl = cardEl.querySelector('.card__item-input');
    const pen = cardEl.querySelector('.fa-pencil');
    const check = cardEl.querySelector('.fa-check');
    const card = cardEl.querySelector('.card');
    const plus = cardEl.querySelector('.fa-circle-plus')


    // при клике на иконку карандаша, открывается заметка
    editBtn.addEventListener('click', event => {
        card.classList.toggle("card-active");
        pen.classList.toggle("hidden");
        check.classList.toggle("hidden");
        titleEl.classList.toggle('hidden');
        textEl.classList.toggle('hidden');
        titleInputEl.classList.toggle('hidden');
        textInputEl.classList.toggle('hidden');
        plus.classList.toggle('hidden');
    });

    // при клике на мусорное ведро, удаляется карточка. Модального окна нет
    deleteBtn.addEventListener('click', event => {
        cardEl.remove();
    });

    // при закрытии сохраняются прописанные задачи
    titleInputEl.addEventListener('input', event => {
        titleEl.innerText = event.target.value;
    });

    textInputEl.addEventListener('input', event => {
        textEl.innerText = event.target.value;
    });

    const addTodo = cardEl.querySelector('.add-todo');
    const cardList = cardEl.querySelector('.card__list');
    const cardContent = cardEl.querySelector('.card__content')

    // функция добавляет новую задачу
    function newTodo(text) {
        const itemTodo = document.createElement("label");
        itemTodo.innerHTML = `
                        <input type="checkbox">
                        <textarea class="item-done" type="text" placeholder="Ваша задача"></textarea>
                        <button>
                            <i class="fa-solid fa-circle-minus"></i>
                        </button>
                    ` 
        const itemTodoText = document.createElement("p");
        itemTodoText.innerHTML = `${text}`;
        itemTodoText.classList.add("card__item", "hidden");
        cardContent.appendChild(itemTodoText);

        itemTodo.addEventListener('input', event => {
            itemTodoText.innerText = event.target.value;
        });

        itemTodo.classList.add("card__item-input")
        cardList.appendChild(itemTodo);

        // задачи можно удалять
        const deleteItem = itemTodo.querySelector(".fa-circle-minus")
        deleteItem.addEventListener('click', event => {
            deleteItem.parentElement.parentElement.remove();
        });

        // при клике на галочку все изменения сохраняются. Нет модального окна
        editBtn.addEventListener('click', event => {
            itemTodo.classList.toggle("hidden");
            itemTodoText.classList.toggle("hidden");
        });


    }

    // вызов функции по добавлению новой задачи в активной карточке 
    addTodo.addEventListener('click', event => {
        newTodo("Задача");
    });

    return cardEl;
}

// вызов функции(добавить карточку) при клике на плюс рядом с заголовком "Заметки"
buttonAdd.addEventListener('click', event => {
    const el = newCard("Заголовок", "Задача");
    cards.appendChild(el);
});