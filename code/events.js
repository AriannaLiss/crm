import { isBtnModal } from "./listener.js";
import { validate, getLogin, getPassword, bodyModal, showInputModal, addProduct } from "./methods.js";

let flagBtn = false,
    login = false,
    password = false;
const btn = document.getElementById("btn");

export function changeInputAuth(e) {
    if (e.target.dataset.type === "login") {
        if (!validate(new RegExp("^" + getLogin() + "$"), e.target.value)) {
            e.target.classList.add("error");
            login = false
        } else {
            e.target.classList.remove("error");
            login = true;
        }
    } else if (e.target.dataset.type === "password") {
        if (!validate(new RegExp("^" + getPassword() + "$"), e.target.value)) {
            e.target.classList.add("error")
            password = false;
        } else {
            e.target.classList.remove("error")
            password = true;
        }
    } else {
        console.error("Неіснуючий блок");
    }


    flagBtn = login && password ? true : false;
    flagBtn === false ? btn.disabled = true : btn.disabled = false;
}

export const userLoginEvent = () => {
    if (flagBtn) document.location = "/";
    sessionStorage.isLoginUser = true
}

export const showModalWindow = () => {
    document.querySelector(".container-modal")
        .classList.remove("hide")
}

export const hideModalWindowEvent = () => {
    document.querySelector(".container-modal")
    .classList.add("hide")
}

export const addPatterntHTMLEvent = () => {
    document.querySelector(".modal-window").insertAdjacentHTML("beforeend",
        bodyModal("Додавання нового продукту.", `
    <select id="select-category">
    <option selected disabled value="">Оберіть категорію</option>
    <option value="Ресторан">Ресторан</option>
    <option value="Відео хостинг">Відео хостинг</option>
    <option value="Магазин">Магазин</option>
</select>`))
    if (document.querySelector("select")) {
        //Слухач зміни категорії
        document.querySelector("select")
            .onchange = (e) => {
                // Визначає які input виводити для відобрадення користувачу в залежності від обраної категорії
                showInputModal(e.target.value)
            }
    }
    isBtnModal()
}

export const saveProductEvent = () => {
    if(!document.getElementById("category-form")) return;
    // Реагування на настиск кнопки зберегти
    addProduct(document.getElementById("category-form").dataset.category);
}