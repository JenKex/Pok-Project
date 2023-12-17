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
    checkTeamComplete()
}

//Det känns som att jag har fått fler problem med dubletter?
//Måste implementera dublett-protection, är alldeles för bängligt annars om man skriver snabbt
//Gör också ett alfabet och verifiera att keyup-value matchar alfabetet, blir annars så att listan refreshar vid shift, ctrl, etc

//För cacheande av hela funktionen skulle jag kunna göra på ett annat sätt -- fetcha hela APIn, sedan skapa en lista objekt i LocalStorage
//med formen 'namn, image, ability', hämta de från relevanta delar av APIn och sätta in det som en komplett lista.
//Detta skulle bli galet många requests på en gång -- runt 2000? -- men sedan inte behöva göra fler requests alls, och det känns annars som att
//det blir alldeles för mycket requests med sökfunktionen om inget sparas.
//Men man kanske kan göra en kombination: Fetcha+cachea hela APIt i början. Sätt in en söksträng. Kolla vilka namn den söksträngen matchar. Om de
//finns i objektlistan, dra infon därifrån, om inte dra den ifrån APIt och sätt in den i objektlistan? Så att istället för att det blir
//sök på 'omanyte' -- api fetch
//sök på 'omanyte' -- api fetch
//blir det
//sök på 'omanyte' -- api fetch, spara relevanta variabler som ett objekt
//sök på 'omanyte' -- dra ut relevanta variabler från objektlista?

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
                //Kan säkert göra det här istället med en for-loop och hitta member-container med nth-child[i] istället för att definiera i början?
                //Men tycker å andra sidan att det är rätt bra att ha en bakgrunds-teamMember(x) variabel att kunna matcha villkor mot.
                teamMember1 = listItemText.innerText
                let memberName = teamContainer1.querySelector('.poke-name')
                let memberImage = teamContainer1.querySelector('.poke-image')
                let buttonContainer = teamContainer1.querySelector('.buttons')
                let buttonRemove = document.createElement('button')
                buttonRemove.addEventListener('click', () =>{
                  memberName.innerText = ''
                  memberImage.src = ''
                  teamMember1 = ''
                  buttonRemove.remove()
                  checkTeamComplete()
                })
                // I mån av tid, implementera en knapp som kickar till reservlistan och drar en reserv därifrån;
                // let buttonReserve = document.createElement('button')
                // buttonReserve.addEventListener('click', () =>{

                // })
                memberName.innerText = listItemText.innerText
                memberImage.src = listItemImage.src
                buttonRemove.innerText = 'Remove'
                buttonContainer.appendChild(buttonRemove)
              }
              else if (teamMember2 === ''){
                teamMember2 = listItemText.innerText
                let memberName = teamContainer2.querySelector('.poke-name')
                let memberImage = teamContainer2.querySelector('.poke-image')
                let buttonContainer = teamContainer2.querySelector('.buttons')
                let buttonRemove = document.createElement('button')
                buttonRemove.addEventListener('click', () =>{
                  memberName.innerText = ''
                  memberImage.src = ''
                  teamMember2 = ''
                  buttonRemove.remove()
                  checkTeamComplete()
                })
                // let buttonRelease = document.createElement('button')
                memberName.innerText = listItemText.innerText
                memberImage.src = listItemImage.src
                buttonRemove.innerText = 'Remove'
                buttonContainer.appendChild(buttonRemove)
              }
              else if (teamMember3 === ''){
                teamMember3 = listItemText.innerText
                let memberName = teamContainer3.querySelector('.poke-name')
                let memberImage = teamContainer3.querySelector('.poke-image')
                let buttonContainer = teamContainer3.querySelector('.buttons')
                let buttonRemove = document.createElement('button')
                buttonRemove.addEventListener('click', () =>{
                  memberName.innerText = ''
                  memberImage.src = ''
                  teamMember3 = ''
                  buttonRemove.remove()
                  checkTeamComplete()
                })
                // let buttonRelease = document.createElement('button')
                memberName.innerText = listItemText.innerText
                memberImage.src = listItemImage.src
                buttonRemove.innerText = 'Remove'                
                buttonContainer.appendChild(buttonRemove)
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
                reserveListItemRemoveButton.addEventListener('click', () =>{
                  reserveListItem.remove()
                })
                reserveListItemRemoveButton.innerText = 'Remove'
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

function checkTeamComplete(){
  if (teamMember1 === '' || teamMember2 === '' || teamMember3 === ''){
    if (teamContainer.querySelector('h3')){
      
    }
    else{
      let incompleteTeam = document.createElement('h3')
      incompleteTeam.innerText = 'Your team needs at least three Pokémon.'
      teamContainer.appendChild(incompleteTeam)
    }
  }
  else{
    if (!teamContainer.querySelector('h3')){

    }
    else{
    let incompleteTeam = teamContainer.querySelector('h3')
    incompleteTeam.remove()
    }
  }
}

// Denna funktionen kommer nu smygfuska -- den lägger till den nya Pokémonen i team-containern med sitt vanliga namn, och ändrar sedan
// innertexten på detta namn efter det läggs till. Borde kunna göra om det genom att bara köra AddPokemon efter att antingen ett 'yes'
// eller 'no' har tryckts (vilket också skulle lösa möjliga problem med att behöva leta i reservlistan), men vill först se om det här funkar
// alls. Om jag kan lösa mitt problem med variabler vill jag också gärna dela upp alla dessa i funktioner -- nicknameAdd(), addPokemon(), etc.,
// vilket borde göra blocken mer läsbara.  

//function nicknameAdd(){
  // listItemImage.remove()
  // listItemInfoContainer.remove()
  // let nicknamePrompt = document.createElement('p')
  // let nicknamePrompt.innerText 'Would you like to add a nickname?'
  // let yesButton = document.createElement('button')
  // let noButton = document.createElement('button')
  // yesButton.innerText = 'Yes'
  // noButton.innerText = 'No'
  // yesButton.addEventListener('click', () =>{
    // nicknamePrompt.remove()
    // yesButton.remove()
    // noButton.remove()
  // let nicknameInput = document.createElement('input')
  // let confirmButton = document.createElement('button')
  // confirmButton.innerText = 'Confirm'
  // confirmButton.addEventListener('click', () =>{
    // if (teamMember1 === ''){
    // let nickname = teamContainer1.querySelector('.poke-name')
    // nickname.innerText = nicknameInput.value
    // }
    // else if (teamMember2 === ''){
    // let nickname = teamContainer2.querySelector('.poke-name')
    // nickname.innerText = nicknameInput.value
    // }
    // else if (teamMember3 === ''){
    // let nickname = teamContainer3.querySelector('.poke-name')
    // nickname.innerText = nicknameInput.value
    // }
//    listItem.appendChild(listItemImage)
//    listItem.appendChild(listItemInfoContainer)
//    listItemInfoContainer.appendChild(listItemInfoText)
//    listItemInfoContainer.appendChild(listItemAddButton)
//  })
//  })
  // noButton.addEventListener('click', () =>{
    // nicknamePrompt.remove()
    // yesButton.remove()
    // noButton.remove()
//    listItem.appendChild(listItemImage)
//    listItem.appendChild(listItemInfoContainer)
//    listItemInfoContainer.appendChild(listItemInfoText)
//  listItemInfoContainer.appendChild(listItemAddButton)
//  })
// listItem.appendChild(nicknamePrompt)
// listItem.appendChild(yesButton)
// listItem.appendChild(noButton)
//}

//OBS -- när jag lade till teamMember1 = listItemText.innerText i eventlistenern direkt var det inga problem, men när jag sätter in den
//i en funktion och sedan kallar på den funktionen får jag felet 'listItemText is not defined'. Detta känns underligt för mig, eftersom
//det känns rätt rimligt -- den drar ifrån listItemText som assignas sist--men det är samma formulering, bara inkallad från en funktion istället...
//Kanske behöver lägga till hela funktionen -- alltså 'button addeventlistener' i en separat funktion för att det ska funka? Eller
//skulle det bara leda till 'button is undefined'? Känns definitivt som ett scope-problem, men vet inte hur man ska fixa det, eftersom
//att declarea en createElement först i dokumentet bara leder till komplikationer. Går det att declarea till ett helt tomt värde?
//Ja -- kanske skulle gå om jag bara skrev 'let listItemText, listItemImage' etc.

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
//I och för sig -- behöver fortfarande skapa ett nytt element för reservlistan, och inte dubbel-appenda det för ursprungslistan.

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