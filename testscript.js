import {sample, details} from "./pokemonSample.js"

let tabHeaders = document.querySelectorAll(".tab-header")
let tabHeader1 = document.querySelector("#tab-header-1")
let tabHeader2 = document.querySelector("#tab-header-2")
let tabContent1 = document.querySelector("#tab-content-1")
let tabContent2 = document.querySelector("#tab-content-2")
let teamContainer = document.querySelector("#team-container")
let searchField = document.querySelector("#search-field")
let searchResultList = document.querySelector("#list")
let reserveList = document.querySelector("#reserve-list")
let listItems = searchResultList.querySelectorAll(":scope > div")

tabHeaders.forEach(function(tabHeader) {
  tabHeader.addEventListener("click", function() {
    let tabNumber = this.id.split("-")[2];
    document.querySelector(".tab-header.active").classList.remove("active");
    document.querySelector(".tab-content.active").classList.remove("active");
    this.classList.add("active");
    document.getElementById("tab-content-" + tabNumber).classList.add("active");
  });
});

tabAddPokemon()

tabHeader1.addEventListener("click", () =>{
    tabAddPokemon()
})

tabHeader2.addEventListener("click", () =>{
    tabMyTeam()
})

function tabAddPokemon(){
    tabContent1.classList.remove('hidden')
    tabContent2.classList.add('hidden')
}

function tabMyTeam(){
    tabContent1.classList.add('hidden')
    tabContent2.classList.remove('hidden')
}

let listItem = document.createElement('div')
searchResultList.appendChild(listItem)
let listItem2 = document.createElement('div')
searchResultList.appendChild(listItem2)
let listItem3 = document.createElement('div')
searchResultList.appendChild(listItem3)
let listItem4 = document.createElement('div')
searchResultList.appendChild(listItem4)
let listItem5 = document.createElement('div')
searchResultList.appendChild(listItem5)
let listItemImage = document.createElement('img')
// listItemImage.src = `${url.value}`
let listItemText = document.createElement('p')
// listItemText.innerText = 
listItem.appendChild(listItemImage)
listItem.appendChild(listItemText)

// listItemImage.innerHTML = `img src=${url.value}`

// searchField.addEventListener('change', () => {
//     for (let i = 0; i < list.length; i++){
//         if (list[i].name.includes(input.value)){
//         nameList[a] = list[i].name
//         a++
//         }
//     }
//     for (let i = 0; i < nameList.length; i++){
//       let newContainer = document.createElement('div')
//       append
//         // createElement-div per namn i namnlistan;
//         //en div-container med två saker, img och p
//         //innerText med namnet
//         //appendChild till denna lista
//     }
// })

// function clearSearch(){
//   let oldSearch = listItems.querySelectorAll('div')
// }

// nameList = []
// let a = 0

// //Försök till sökfunktion:
// input.addEventListener(change, () => {
//     for (let i = 0; i < list.length; i++){
//         if (list[i].name.includes(input.value)){
//         nameList[a] = list[i].name
//         a++
//         }
//     }
//     for (let i = 0; i < nameList.length; i++){
//         // createElement-div per namn i namnlistan;
//         //en div-container med två saker, img och p
//         //innerText med namnet
//         //appendChild till denna lista
//     }
// })