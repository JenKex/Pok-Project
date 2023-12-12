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
// let listItems = searchResultList.querySelectorAll(":scope > div")
let teamMember1 = ''
let teamMember2 = ''
let teamMember3 = ''
let nameList = []
let a = 0

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

searchField.addEventListener('keyup', async () => {
    for (let i = 0; i < sample.results.length; i++){
      if (searchField.value === ''){
        clearSearch()
      }
      else
        if (sample.results[i].name.includes(searchField.value)){
            console.log(sample.results[i].name)
            let url = sample.results[i].url
          	const response = await fetch(url)
            const data = await response.json()
            console.log(data)
            let listItem = document.createElement('div')
            searchResultList.appendChild(listItem) 
            let listItemImage = document.createElement('img')
            listItemImage.src = data.sprites.front_default
            let listItemText = document.createElement('p')
            console.log('sample results', sample?.results[i])
            listItemText.innerText = data.species.name[0].toUpperCase() + data.species.name.slice(1) //Vill gärna göra en .includes('-'),
            //splitta vid bindestreck och versalera igen på namn med bindestreck.
            listItem.appendChild(listItemImage)
            listItem.appendChild(listItemText)
            //Bugg just nu som innebär att om man söker på t.ex. 'Gourgeist' dyker 9 gourgeists upp, ett för varje knapptryck som matchar namnet.
            //ClearSearch() i början funkar inte, eftersom det innebär att bara en Pokémon dyker upp per gång (antagligen den sista i ledet med den bokstaven),
            //och alla andra rensas--t.ex. att söka 'o' visar bara Gourgeist och inte Koraidon, Ogerpon etc.
        }
    }
})

function clearSearch(){
  let oldSearch = searchResultList.querySelectorAll('div')
  for (let i = 0; i < oldSearch.length; i++) {
  oldSearch[i].remove();
}
}

// for (let i = 0; i < sample.results.length; i++){
//   let url = sample.results[i].url
// 	const response = await fetch(url)
//   const data = await response.json()
//   console.log(data)
//   let listItem = document.createElement('div')
//   searchResultList.appendChild(listItem) 
//   let listItemImage = document.createElement('img')
//   listItemImage.src = data.sprites.front_default
//   let listItemText = document.createElement('p')
//   console.log('sample results', sample?.results[i])
//   listItemText.innerText = data.species.name[0].toUpperCase() + data.species.name.slice(1) //Vill gärna göra en .includes('-'),
//   //splitta vid bindestreck och versalera igen på namn med bindestreck.
//   listItem.appendChild(listItemImage)
//   listItem.appendChild(listItemText)
// }

// Knapp för att lägga till i laget --
// Sätter TeamMember1 till nuvarande Pokémon. Om TeamMember1 != null, sätt den på TeamMember2, om TeamMember2 != null, på 3 etc.
// Om hela laget är fullt, sätt i reservlistan. Skulle också vara rätt användbart för en 'byt plats på medlemmar' funktion.

// listItemImage.innerHTML = `img src=${url.value}`

//Funktion för att rensa listan;

// function clearSearch(){
//   let oldSearch = listItems.querySelectorAll('div')
// for (let i = 0; i < oldSearch.length; i++) {
//   oldSearch[i].remove();
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

//Ursprunglig kod för att printa hela listan:

// for (let i = 0; i < sample.results.length; i++){
//   let url = sample.results[i].url
// 	const response = await fetch(url)
//   const data = await response.json()
//   console.log(data)
//   let listItem = document.createElement('div')
//   searchResultList.appendChild(listItem) 
//   let listItemImage = document.createElement('img')
//   listItemImage.src = data.sprites.front_default
//   let listItemText = document.createElement('p')
//   console.log('sample results', sample?.results[i])
//   listItemText.innerText = data.species.name[0].toUpperCase() + data.species.name.slice(1) //Vill gärna göra en .includes('-'),
//   //splitta vid bindestreck och versalera igen på namn med bindestreck.
//   listItem.appendChild(listItemImage)
//   listItem.appendChild(listItemText)
// }