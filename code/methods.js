import { RestorationProduct, StoreProduct } from "./class.js";

export const getLogin = () => {
    const data = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return data[new Date().getDay()].toLowerCase() + new Date().getHours();
}

export const getPassword = () => {
    const data = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота"];
    return data[new Date().getDay()].toLowerCase() + new Date().getHours() + new Date().getMinutes();
}

export const validate = (r, v) => r.test(v);

export const bodyModal = (title = "", category = "") => {
    document.querySelector(".modal-window").innerHTML = "";
    const temlate = `
    <h2 class="title-modal">${title}</h2>
    <div class="select-modal">${category}</div>
    <div class="body-modal"></div>
    <div class="btn-modal">
    <button type="button" id="save">Зберегти</button>
    <button type="button" id="close">Закрити</button>
    </div>
    `
    return temlate;
}

export function showInputModal(category) {
    //category - передана категодія з події change
    const body_modal = document.querySelector(".body-modal");
    // готова форма 
    let form = ""

    body_modal.innerHTML = ""

    if (category === "Ресторан") {
        //Створення формочки з елементами під кожну категорію продуку. 
        //Формочка буде показуватись у модільному віконечку
        form = `
            <form data-category="${category}" id="category-form">
                ${patternCreateInputForModal("Назва продукту", undefined, generatorID(), "productName")}
                ${patternCreateInputForModal("Вага продукту", undefined, generatorID(), "productWeiht")}
                ${patternCreateInputForModal("Склад", undefined, generatorID(), "ingredients")}
                ${patternCreateInputForModal("Вартість продукту", "number", generatorID(), "price")}
                ${patternCreateInputForModal("Картинка продукту", "url", generatorID(), "productImageUrl")}
                ${patternCreateInputForModal("Гарячі слова. Розділяти комою", undefined, generatorID(), "keywords")}
            </form>
            `
    }else if(category === "Магазин"){
       form = `<form data-category="${category}" id="category-form">
                ${patternCreateInputForModal("Назва продукту", undefined, generatorID(), "productName")}
                ${patternCreateInputForModal("Вартість продукту", "number", generatorID(), "porductPrice")}
                ${patternCreateInputForModal("Картинка продукту", "url", generatorID(), "productImage")}
                ${patternCreateInputForModal("Опис продукту", undefined, generatorID(), "productDescription")}
                ${patternCreateInputForModal("Гарячі слова. Розділяти комою", undefined, generatorID(), "keywords")}
        </form>
        ` 
    }

    // інтеграція готової форми на html сторінку
    body_modal
        .insertAdjacentHTML("beforeend", form)
}

function patternCreateInputForModal(value = "", type = "text", id = "", name = "") {
    return `<div class="box-input">
    <label for="${id}">${value}</label>
    <input type="${type}" id="${id}" data-props-name="${name}">
</div>
`
}

export function createEditProductInput(value = "---", placeholder, id = "") {
    const div = createProductElement("div");
    const label = createProductElement("label");
    const input = createProductElement("input");
    input.disabled = "idstopListdate".includes(placeholder)? true : false;
    input.value = value;
    input.key = placeholder;
    label.innerText = placeholder;
    label.setAttribute("for", id);
    input.id = id;
    div.append(label, input);
    return div
}



function generatorID() {
    const sub = "qwertyuiopasdfghjklzxcvbnm1234567890&$_";
    const idLength = Math.floor(Math.random() * (10 - 18) + 18);
    let id = "";
    for (let i = 0; i < idLength; i++)
        id += sub[Math.floor(Math.random() * sub.length)]
    return id;
}

export function getDateNow() {
    //yyyy-mm-dd hh:mm:ss
    const date = new Date();
    return `
    ${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
 `
}

export function addProduct(category) {
    // знайшли всі inputs
    const [...inputs] = document.querySelectorAll("#category-form input");
    //Тут зберігаємо дані перед відправкою констркуктору
    const obj = {
        id: generatorID,
        date: getDateNow
    }
    // перебір кожного інпута для додавання до obj
    inputs.forEach((input) => {
        obj[input.dataset.propsName] = input.value;
    });

    if (category === "Ресторан") {
        const restorationBD = JSON.parse(localStorage.restorationBD);
        restorationBD.push(new RestorationProduct(obj));
        localStorage.restorationBD = JSON.stringify(restorationBD);
        const alertOk = document.querySelector(".alert-ok");
        alertOk.classList.remove("hide"); 
        alertOk.innerHTML = "Ви успішно зберегли дані про старву!"
        setTimeout(()=>{alertOk.classList.add("hide"); }, 2000)
    }else if(category === "Магазин"){
        const storeBD = JSON.parse(localStorage.storeBD);
        storeBD.push(new StoreProduct(obj));
        localStorage.storeBD = JSON.stringify(storeBD);
    }
    document.querySelector(".container-modal").classList.add("hide")
}

export function createProductElement (tagName = "div", className, value = "", attr = [], listener, context) {
    const element = document.createElement(tagName);
    if(className){
        element.classList.add(className);
    }
    element.innerHTML = value;
    attr.forEach((obj)=>{
        const objectInfo = Object.entries(obj);
        element.setAttribute(objectInfo[0][0], objectInfo[0][1])
    })

    if("inputtextariaselect".includes(tagName)){
        if(!listener) return element
        element.addEventListener("change", (e) => {
            if(context){
               listener(context) 
            }else{
                listener(e)
            }
        })
    }else{
        element.addEventListener("click", (e) => {
            if(!listener) return element
            if(context){
               listener(context) 
            }else{
                listener(e)
            }
        })
    }
    return element
}
