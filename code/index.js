import { changeInputAuth, showModalWindow, userLoginEvent, addPatterntHTMLEvent } from "./events.js";
import { getLogin, getPassword } from "./methods.js";

//Перевірка авторизації користувача. 
if (!sessionStorage.isLoginUser && !document.location.pathname.includes("/authorization/")) {
   document.location = "/authorization"
}

try {
   document.querySelector(".window form")
      .addEventListener("change", changeInputAuth);
   document.querySelector("#btn")
      .addEventListener("click", userLoginEvent)
} catch (e) {
   if (document.location.pathname.includes("/authorization/")) {
      console.error(e)
   }
}

try{
   document.getElementById("btn-add-product")
   .addEventListener("click", showModalWindow);
   
   document.getElementById("btn-add-product")
   .addEventListener("click", addPatterntHTMLEvent);
   
}catch (e){
   
}


if(!localStorage.restorationBD ){
   localStorage.restorationBD = JSON.stringify([])
}
if(!localStorage.storeBD ){
   localStorage.storeBD = JSON.stringify([])
}
if(!localStorage.videoBD ){
   localStorage.videoBD = JSON.stringify([])
}



console.log(getLogin())
console.log(getPassword());

