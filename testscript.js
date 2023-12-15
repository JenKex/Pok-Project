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
let teamContainer1 = document.querySelector(".member-container:first-child")
let teamContainer2 = document.querySelector(".member-container:nth-child(2)")
let teamContainer3 = document.querySelector(".member-container:last-child")
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

//Det känns som att jag har fått fler problem med dubletter?
//Måste implementera dublett-protection, är alldeles för bängligt annars om man skriver snabbt
//Gör också ett alfabet och verifiera att keyup-value matchar alfabetet, blir annars så att listan refreshar vid shift, ctrl, etc

searchField.addEventListener('keyup', async () => {
  clearSearch()
    for (let i = 0; i < sample.results.length; i++){
      if (searchField.value === ''){
        clearSearch()
      }
      else
        if (sample.results[i].name.toUpperCase().includes(searchField.value.toUpperCase())){
            console.log(sample.results[i].name)
            let url = sample.results[i].url
          	const response = await fetch(url)
            const data = await response.json()
            console.log(data)
            let listItem = document.createElement('div')
            searchResultList.appendChild(listItem)
            let listItemImage = document.createElement('img')
            listItemImage.src = data.sprites.front_default
            let listItemInfoContainer = document.createElement('div')
            let listItemText = document.createElement('p')
            let listItemAddButton = document.createElement('button')
            // Skapa en funktion som lägger till en eventlistener på en button, och eftersom event-listenern läggs till i samma skedet som knappen
            // läggs till kommer ItemImage och ItemText hänvisa till samma bild som skapades jämte den(?; fick förklaring om detta, men är inte
            // helt hundra på att det funkar när flera olika listItems existerar på sajten. Men om man lagrar det i en ny variabel i funktionen,
            // t.ex. thisImage = listItemImage? Och om det funkar borde det vara synonymt?
            console.log('sample results', sample?.results[i])
            listItemText.innerText = data.species.name[0].toUpperCase() + data.species.name.slice(1) //Vill gärna göra en .includes('-'),
            //splitta vid bindestreck och versalera igen på namn med bindestreck.
            console.log(listItemText.innerText)
            listItemAddButton.addEventListener('click', () =>{
              if (teamMember1 === ''){
                teamMember1 = listItemText.innerText
              }
              else if (teamMember2 === ''){
                teamMember2 = listItemText.innerText
              }
              else if (teamMember3 === ''){
                teamMember3 = listItemText.innerText
              }
              else{
                let reserveListItem = document.createElement('div')
                reserveList.appendChild(reserveListItem)
                let reserveListItemImage = document.createElement('img')
                reserveListItemImage.src = listItemImage.src
                let reserveListItemInfoContainer = document.createElement('div')
                let reserveListItemText = document.createElement('p')
                reserveListItemText.innerText = listItemText.innerText
                let reserveListItemRemoveButton = document.createElement('button')
                   // Sätt innertext, image etc. baserat på Pokémonen som valdes ut.
                reserveListItem.appendChild(reserveListItemImage)
                reserveListItem.appendChild(reserveListItemInfoContainer)
                reserveListItemInfoContainer.appendChild(reserveListItemText)
                reserveListItemInfoContainer.appendChild(reserveListItemRemoveButton)
              }
              console.log(teamMember1)
              console.log(teamMember2)
              console.log(teamMember3)
            })
            listItem.appendChild(listItemImage)
            listItem.appendChild(listItemInfoContainer)
            listItemInfoContainer.appendChild(listItemText)
            listItemInfoContainer.appendChild(listItemAddButton)
            listItemAddButton.innerText = 'Add'
            //Bugg just nu som innebär att om man söker på t.ex. 'Gourgeist' dyker 9 gourgeists upp, ett för varje knapptryck som matchar namnet.
            //ClearSearch() i början funkar inte, eftersom det innebär att bara en Pokémon dyker upp per gång (antagligen den sista i ledet med den bokstaven),
            //och alla andra rensas--t.ex. att söka 'o' visar bara Gourgeist och inte Koraidon, Ogerpon etc.
            //Detta kanske kan lösas på en av tre olika sätt--David föreslog debounce, som väntar ett tag på att användaren skrivit färdigt innan
            //sökningen körs, men nämnde att det är lite bortom vad vi egentligen ska kunna. Sedan skulle jag kunna kolla på existerande namn
            //för att se om listan redan inkluderar Pokémonen man söker på, eller ladda hela listan i början, göra den osynlig, och bara sätta
            //den till att displaya snarare än generera varje element, men detta känns väldigt overkill.
            // Också en bugg just nu att vissa arter söks på och visas utan rätt söksträng eftersom deras namn (inklusive former) är det som söks på.
            // För att lösa detta måste jag fetcha och cachea datan i början, eftersom artnamnen är lagrade ett steg neråt.
            // (Ska också sätta in input.value.toUpperCase() och data.species.name.toUpperCase() för att göra den icke case-sensitive.)
        }
    }
})

function clearSearch(){
  let oldSearch = searchResultList.querySelectorAll('div')
  for (let i = 0; i < oldSearch.length; i++) {
  oldSearch[i].remove();
}
}

//OBS -- när jag lade till teamMember1 = listItemText.innerText i eventlistenern direkt var det inga problem, men när jag sätter in den
//i en funktion och sedan kallar på den funktionen får jag felet 'listItemText is not defined'. Detta känns underligt för mig, eftersom
//det känns rätt rimligt -- den drar ifrån listItemText som assignas sist--men det är samma formulering, bara inkallad från en funktion istället...
//Kanske behöver ligga till hela funktionen -- alltså 'button addeventlistener' i en separat funktion för att det ska funka? Eller
//skulle det bara leda till 'button is undefined'? 

//function addPokemon(){
  // if (teamMember1 === ''){
  //   teamMember1 = listItemText.innerText
  // }
  // if (teamMember1 != ''){
  //   teamMember2 = listItemText.innerText
  // }
  // if (teamMember1 != '' && TeamMember2 != ''){
  //   teamMember3 = listItemText.innerText
  // }
  // if (teamMember1 != '' && teamMember2 != '' && teamMember3 != ''){
  //   addToReserve()
  // }
// }

// addButton.addEventListener('click', () => {
//   if (TeamMember1 === ''){
//     TeamMember1 = parentNode.listItemText.innerText
//   }
//   if (TeamMember1 != ''){
//     TeamMember2 = parentNode.listItemText.innerText
//   }
//   if (TeamMember1 != '' && TeamMember2 != ''){
//     TeamMember3 = parentNode.listItemText.innerText
//   }
//   if (TeamMember1 != '' && TeamMember2 != '' && TeamMember3 != ''){
//     addToReserve()
//   }
// })

//Egentligen känns det inte nödvändigt att ha alla dessa reserveListItem-etc. variabler i och med att informationen finns i det man just har skapat?
//Kan bara sätta en 'reserveList.appendChild(listitem)' etc?

// function addToReserve(){
//   let reserveListItem = document.createElement('div')
//   reserveList.appendChild(reserveListItem)
//   let reserveListItemImage = document.createElement('img')
//   reserveListItemImage.src = listItemImage.src
//   let reserveListItemInfoContainer = document.createElement('div')
//   let reserveListItemText = document.createElement('p')
//   reserveListItemText.innerText = listItemText.innerText
//   let reserveListItemRemoveButton = document.createElement('button')
//      // Sätt innertext, image etc. baserat på Pokémonen som valdes ut.
//   reserveListItem.appendChild(reserveListItemImage)
//   reserveListItem.appendChild(reserveListItemInfoContainer)
//   reserveListItemInfoContainer.appendChild(reserveListItemText)
//   reserveListItemInfoContainer.appendChild(reserveListItemRemoveButton) 
// }

// Insåg att jag antagligen inte behövde dessa, eftersom kombinerat gjorde de samma sak som ClearSearch(), och problemet med ClearSearch()
// var att jag hade satt det i fel plats på keyup-funktionen så att den avfyrade varje for-loop; att sätta den längst upp för att rensa listan
// innan nästa resultat visades funkade för mina behov. Behåller dock dessa ifall jag behöver de senare, eftersom det finns fortfarande
// lite problem med att dupletter visas om man skriver snabbt. (Kanske inte behöver remova någonting dock, utan skriva om add-funktionen
// så att den inte lägger till element som redan finns i listan.)

// function clearDuplicates(){
//   let oldSearch = searchResultList.querySelectorAll('div')
//   for (let i = 0; i < oldSearch.length; i++) {
//     let oldSearchName = oldSearch[i].querySelector('p')
//     if (oldSearchName[i].includes(searchField.value)){
//       oldSearch[i].remove();
//     }
//   }
// }

// function clearMismatches(){
//   let oldSearch = searchResultList.querySelectorAll('div')
//   let oldSearchName = oldSearch.querySelectorAll('p')
//   for (let i = 0; i < oldSearch.length; i++) {
//     if (!oldSearchName.includes(searchField.value)){
//       oldSearch[i].remove()
//     }
//   }
// }

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