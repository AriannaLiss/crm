import { hideModalWindowEvent, showModalWindow } from "./events.js";
import { createEditProductInput, createProductElement, getData, getStorageName, fillProductTable } from "./methods.js";


try{
    showListProduct()
    }
    catch { (e) => console.error(e)
    }
    

function showListProduct() {
    const data = getData();
    const table = document.querySelector("table");
    if(table.querySelector("tbody")){
        table.querySelector("tbody").remove()
    }
    const tbody = document.createElement("tbody");
    table.append(tbody);
    tbody.append(...fillProductTable(data));
}

export function editClickEvent(e) {
    // e - event || productObject
    const mw = document.querySelector(".modal-window");
    mw.innerHTML = '';
    const product = Object.entries(e).map(([key, value], id) => {
        return createEditProductInput(value, key, id)
    });

    const div = createProductElement("div", "btn-edit-product");
    const save = createProductElement("button", "save-product", "Зберегти", undefined, saveProduct, e);
    div.append(save);

    mw.append(...product, div);
    showModalWindow()

}

function saveProduct(oldObject) {
    hideModalWindowEvent()
    const newObj = {
        id: oldObject.id,
        date: oldObject.date,
    }


    const inputs = document.querySelectorAll(".modal-window input");

    inputs.forEach((el) => {
        if (el.key === "stopList") return
        newObj[el.key] = el.value;
    })
    newObj.stopList = newObj.quantity > 0 ? false : true;

    const arr = JSON.parse(localStorage[getStorageName()]);
    const index = arr.findIndex((el) => {
        return el.id === oldObject.id
    })
    arr.splice(index, 1, newObj);
    localStorage[getStorageName()] = JSON.stringify(arr);
    showListProduct()
}
