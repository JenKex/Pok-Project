getPokemon()

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
let pokemonList = []

// Start på API-kallning och localStorage-sättning. Måste fixa 'object Object' problemet (har inte strängifierat rätt)
// och kolla mot om information redan lagrats.

async function getPokemon() {
  if (localStorage.getItem("pokemonobjectlist") === null) {
    const api = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1017')
    const objectlist = await api.json()
    console.log(objectlist)
    let objectliststring = JSON.stringify(objectlist)
    localStorage.setItem("pokemonobjectlist", objectliststring)
    makeTraitList()
  }
}
// objectlist.stringify
// localStorage.setItem(objectlist)
// localStorage.getItem(object)


async function makeTraitList() {
  if (localStorage.getItem("pokemonStorageList") === null) {
    let objectlist = localStorage.getItem("pokemonobjectlist")
    objectlist = JSON.parse(objectlist)
    console.log(objectlist)
    for (let i = 0; i < 1017; i++) {
      console.log(objectlist.results[i].name)
      let url = objectlist.results[i].url
      const response = await fetch(url)
      const data = await response.json()
      //Och möjligen göra en ny localstorage-lista att kolla mot, där relevant information cacheas? Detta är inte färdigt men känns som en bra start.
      //Och om jag gör LocalStorage av denna begränsade lista, behöver jag lagra/cachea den ursprungliga listan med data alls?
      let pokemon = {}
      pokemon.name = data.species.name
      pokemon.sprite = data.sprites.front_default
      pokemon.abilities = []
      for (let i = 0; i < data.abilities.length; i++) {
        pokemon.abilities[i] = data.abilities[i].ability.name
      }
      console.log(pokemon)
      pokemonList.push(pokemon)
      console.log(pokemonList)
      if (i === 1016) {
        let pokemonStorageList = JSON.stringify(pokemonList)
        localStorage.setItem("pokemonStorageList", pokemonStorageList)
      }
    }
  }
}

// async function testEkans(){
//   const response = await fetch('https://pokeapi.co/api/v2/pokemon/24/')
//   const data = await response.json()
//   console.log(data.name)
//   console.log(data.abilities)
//   let pokemon = {name: 'ekans'}
//   pokemon.abilities = []
//   for (let i = 0; i < data.abilities.length; i++){
//     pokemon.abilities[i] = data.abilities[i].ability.name
//   }
//   console.log(pokemon)
// }
// testEkans()

tabHeaders.forEach(function (tabHeader) {
  tabHeader.addEventListener("click", function () {
    let tabNumber = this.id.split("-")[2];
    document.querySelector(".tab-header.active").classList.remove("active");
    document.querySelector(".tab-content.active").classList.remove("active");
    this.classList.add("active");
    document.getElementById("tab-content-" + tabNumber).classList.add("active");
  });
});

tabAddPokemon()

tabHeader1.addEventListener("click", () => {
  tabAddPokemon()
})

tabHeader2.addEventListener("click", () => {
  tabMyTeam()
})

function tabAddPokemon() {
  tabContent1.classList.remove('hidden')
  tabContent2.classList.add('hidden')
}

function tabMyTeam() {
  tabContent1.classList.add('hidden')
  tabContent2.classList.remove('hidden')
  checkTeamComplete()
}

// Ursprunglig moveButton-funktion -- ersatte hela elementet via insertBefore.
// Problem: Knapparna raderas/skapades inte om, så om man valde move back på första Pokémonen så hängde bara den knappen med,
// och monen som flyttades uppåt hade en Move Forward-knapp som inte gjorde någonting. 

// function moveButton(buttonContainer2){
//   let card = buttonContainer2.parentElement
//   console.log(card)
//   console.log(card.parentElement)
//   let buttonForward = document.createElement('button')
//   buttonForward.innerText = 'Move Forward'
//   buttonForward.addEventListener('click', () =>{
//     teamContainer.insertBefore(card, card.previousSibling)
//     buttonCheck(buttonContainer2, card, buttonForward, buttonBack)
//   })
//   let buttonBack = document.createElement('button')
//   buttonBack.addEventListener('click', () =>{
//     teamContainer.insertBefore(card, card.nextSibling.nextSibling)
//     buttonCheck(buttonContainer2, card, buttonForward, buttonBack)
//   })
//   buttonBack.innerText = 'Move Back'
//   if (card === teamContainer1){
//   buttonContainer2.appendChild(buttonBack)
//   }
//   else if (card === teamContainer2){
//     buttonContainer2.appendChild(buttonForward)
//     buttonContainer2.appendChild(buttonBack)
//   }
//   else{
//     buttonContainer2.appendChild(buttonForward)
//   }
// }

// function buttonCheck(buttonContainer2, card, buttonForward, buttonBack){
//   buttonForward.remove()
//   buttonBack.remove()
//   if (card === teamContainer1){
//     buttonContainer2.appendChild(buttonBack)
//   }
//   else if (card === teamContainer2){
//     buttonContainer2.appendChild(buttonForward)
//     buttonContainer2.appendChild(buttonBack)
//   }
//   else{
//     buttonContainer2.appendChild(buttonForward)
// }
// }

// Andra försök till move-funktion -- hoppades på detta, men det verkar som att man inte kan köra queryselectors på prevCard, eller att dessa
// element blev undefined för anledningar jag inte kunde reda ut i tid.

// function moveButton(buttonContainer2){
//   let card = buttonContainer2.parentElement
//   let name = card.querySelector('.poke-name')
//   let image = card.querySelector('.poke-image')
//   let prevCard = card.previousSibling
//   let nextCard = card.nextSibling
//   console.log(card.parentElement)
//   console.log(card)
//   console.log(prevCard)
//   let testTeam = card.parentElement.querySelector('.member-container')
//   console.log(testTeam)
//   let buttonForward = document.createElement('button')
//   buttonForward.innerText = 'Move Forward'
//   buttonForward.addEventListener('click', () =>{
//     let prevName = prevCard.querySelector('.poke-name')
//     let prevImage = prevCard.querySelector('.poke-image')
//     name.innerText = prevName.innerText
//     image.src = prevImage.src
//   })
//   let buttonBack = document.createElement('button')
//   buttonBack.addEventListener('click', () =>{
//     nextName = nextCard.querySelector('.poke-name')
//   })
//   buttonBack.innerText = 'Move Back'
//   if (card === teamContainer1){
//   buttonContainer2.appendChild(buttonBack)
//   }
//   else if (card === teamContainer2){
//     buttonContainer2.appendChild(buttonForward)
//     buttonContainer2.appendChild(buttonBack)
//   }
//   else{
//     buttonContainer2.appendChild(buttonForward)
//   }
// }

function moveButton(buttonContainer2){
  let card = buttonContainer2.parentElement
  console.log(card)
  console.log(card.parentElement)
  let buttonForward = document.createElement('button')
  buttonForward.innerText = 'Move Forward'
  buttonForward.addEventListener('click', () =>{
    if (card.previousSibling){
    teamContainer.insertBefore(card, card.previousSibling)
    }
  })
  let buttonBack = document.createElement('button')
  buttonBack.addEventListener('click', () =>{
    if (card.nextSibling){
    teamContainer.insertBefore(card, card.nextSibling.nextSibling)
    }
  })
  buttonBack.innerText = 'Move Back'
  buttonContainer2.appendChild(buttonForward)
  buttonContainer2.appendChild(buttonBack)
}

function moveButtonReserve(reserveListItemInfoContainer){
  let card = reserveListItemInfoContainer.parentElement
  let buttonForward = document.createElement('button')
  buttonForward.innerText = 'Forward'
  buttonForward.addEventListener('click', () =>{
    if (card.previousSibling){
    reserveList.insertBefore(card, card.previousSibling)
    }
  })
  let buttonBack = document.createElement('button')
  buttonBack.addEventListener('click', () =>{
    reserveList.insertBefore(card, card.nextSibling.nextSibling)
  })
  buttonBack.innerText = 'Back'
  reserveListItemInfoContainer.appendChild(buttonForward)
  reserveListItemInfoContainer.appendChild(buttonBack)
}

function removeButtonsAbilities(memberAbilities, buttonContainer2){
  let moveButtons = buttonContainer2.querySelectorAll('button')
  for (let i = 0; i < moveButtons.length; i++){
    moveButtons[i].remove()
  }
  memberAbilities.innerText = ''
}

function addAbilityFromReserve(datalist, memberAbilities, promotedPokemonName){
  for (let i = 0; i < datalist.length; i++){
    if (promotedPokemonName.innerText.toLowerCase() === datalist[i].name){
      let abilitylist = datalist[i].abilities
      for (let i = 0; i < abilitylist.length; i++){
        if (i != (abilitylist.length - 1)){
          if (abilitylist[i].includes('-')){
            let splitability = abilitylist[i].split('-')
            memberAbilities.innerText += splitability[0][0].toUpperCase() + splitability[0].slice(1) + ' ' + splitability[1][0].toUpperCase() + splitability[1].slice(1) + ', '
          }
          else{
            memberAbilities.innerText += abilitylist[i][0].toUpperCase() + abilitylist[i].slice(1) + ', '
            }
          }
          else{
            if (abilitylist[i].includes('-')){
              let splitability = abilitylist[i].split('-')
              memberAbilities.innerText += splitability[0][0].toUpperCase() + splitability[0].slice(1) + ' ' + splitability[1][0].toUpperCase() + splitability[1].slice(1)
            }
            else{
              memberAbilities.innerText += abilitylist[i][0].toUpperCase() + abilitylist[i].slice(1)
          }
        }
      }
    }
  }
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
  let datalist = localStorage.getItem("pokemonStorageList")
  datalist = JSON.parse(datalist)
  clearSearch()
  for (let i = 0; i < datalist.length; i++) {
    if (searchField.value === '') {
      clearSearch()
    }
    else
    if (datalist[i].name.toUpperCase().includes(searchField.value.toUpperCase())) {
      let listItem = document.createElement('div')
      searchResultList.appendChild(listItem)
      let listItemImage = document.createElement('img')
      listItemImage.src = datalist[i].sprite
      let listItemInfoContainer = document.createElement('div')
      let listItemText = document.createElement('p')
      let listItemAddButton = document.createElement('button')
      // Skapa en funktion som lägger till en eventlistener på en button, och eftersom event-listenern läggs till i samma skedet som knappen
      // läggs till kommer ItemImage och ItemText hänvisa till samma bild som skapades jämte den(?); fick förklaring om detta, men är inte
      // helt hundra på att det funkar när flera olika listItems existerar på sajten. Men om man lagrar det i en ny variabel i funktionen,
      // t.ex. thisImage = listItemImage? Och om det funkar borde det vara synonymt?
      if (datalist[i].name.includes('-')) {
        let splitname = datalist[i].name.split('-')
        console.log(splitname)
        listItemText.innerText = splitname[0][0].toUpperCase() + splitname[0].slice(1) + '-' + splitname[1][0].toUpperCase() + splitname[1].slice(1)
      }
      else {
        listItemText.innerText = datalist[i].name[0].toUpperCase() + datalist[i].name.slice(1) //Vill gärna göra en .includes('-'),
        //splitta vid bindestreck och versalera igen på namn med bindestreck.
      }
      listItemAddButton.addEventListener('click', () => {
        listItemImage.remove()
        listItemInfoContainer.remove()
        listItem.classList.add('nicknameprompt')
        let nicknamePrompt = document.createElement('p')
        nicknamePrompt.innerText = 'Would you like to add a nickname?'
        let listButtonContainer = document.createElement('div')
        let yesButton = document.createElement('button')
        let noButton = document.createElement('button')
        yesButton.innerText = 'Yes'
        noButton.innerText = 'No'
        yesButton.addEventListener('click', () => {
          nicknamePrompt.remove()
          listButtonContainer.remove()
          let nicknameInput = document.createElement('input')
          let confirmButton = document.createElement('button')
          confirmButton.innerText = 'Confirm'
          confirmButton.addEventListener('click', () => {
            nicknameInput.remove()
            confirmButton.remove()
            if (teamMember1 === '') {
              teamMember1 = listItemText.innerText
              listItem.appendChild(listItemImage)
              listItem.appendChild(listItemInfoContainer)
              listItemInfoContainer.appendChild(listItemText)
              listItemInfoContainer.appendChild(listItemAddButton)
              let nickname = teamContainer1.querySelector('.poke-name')
              nickname.innerText = nicknameInput.value
              let memberImage = teamContainer1.querySelector('.poke-image')
              memberImage.src = listItemImage.src
              let memberAbilities = teamContainer1.querySelector('.poke-abilities')
              for (let i = 0; i < datalist.length; i++){
                if (listItemText.innerText.toLowerCase() === datalist[i].name){
                  let abilitylist = datalist[i].abilities
                  for (let i = 0; i < abilitylist.length; i++){
                    if (i != (abilitylist.length - 1)){
                      if (abilitylist[i].includes('-')){
                        let splitability = abilitylist[i].split('-')
                        memberAbilities.innerText += splitability[0][0].toUpperCase() + splitability[0].slice(1) + ' ' + splitability[1][0].toUpperCase() + splitability[1].slice(1) + ', '
                      }
                      else{
                        memberAbilities.innerText += abilitylist[i][0].toUpperCase() + abilitylist[i].slice(1) + ', '
                        }
                      }
                      else{
                        if (abilitylist[i].includes('-')){
                          let splitability = abilitylist[i].split('-')
                          memberAbilities.innerText += splitability[0][0].toUpperCase() + splitability[0].slice(1) + ' ' + splitability[1][0].toUpperCase() + splitability[1].slice(1)
                        }
                        else{
                          memberAbilities.innerText += abilitylist[i][0].toUpperCase() + abilitylist[i].slice(1)
                      }
                    }
                  }
                }
              }
              let buttonContainer = teamContainer1.querySelector('.buttons')
              let buttonContainer2 = teamContainer1.querySelector('.buttons2')
              let buttonRemove = document.createElement('button')
              let buttonBench = document.createElement('button')
              buttonRemove.addEventListener('click', () => {
                nickname.innerText = ''
                memberImage.src = ''
                teamMember1 = ''
                buttonRemove.remove()
                buttonBench.remove()
                removeButtonsAbilities(memberAbilities, buttonContainer2)
                checkTeamComplete()
              })
              buttonBench.addEventListener('click', () => {
                let reserveListItem = document.createElement('div')
                reserveList.appendChild(reserveListItem)
                let reserveListItemImage = document.createElement('img')
                reserveListItemImage.src = memberImage.src
                let reserveListItemInfoContainer = document.createElement('div')
                let reserveListItemText = document.createElement('p')
                reserveListItemText.innerText = nickname.innerText
                let reserveListItemRemoveButton = document.createElement('button')
                reserveListItemRemoveButton.addEventListener('click', () => {
                  reserveListItem.remove()
                })
                reserveListItemRemoveButton.innerText = 'Remove'
                reserveListItem.appendChild(reserveListItemImage)
                reserveListItem.appendChild(reserveListItemInfoContainer)
                reserveListItemInfoContainer.appendChild(reserveListItemText)
                reserveListItemInfoContainer.appendChild(reserveListItemRemoveButton)
                moveButtonReserve(reserveListItemInfoContainer)
                let promotedPokemon = reserveList.querySelector('div')
                let promotedPokemonName = promotedPokemon.querySelector('div > p')
                let promotedPokemonImage = promotedPokemon.querySelector('img')
                nickname.innerText = promotedPokemonName.innerText
                memberImage.src = promotedPokemonImage.src
                removeButtonsAbilities(memberAbilities, buttonContainer2)
                moveButton(buttonContainer2)
                addAbilityFromReserve(datalist, memberAbilities, promotedPokemonName)
                promotedPokemon.remove()
              })
              buttonRemove.innerText = 'Remove'
              buttonContainer.appendChild(buttonRemove)
              buttonBench.innerText = 'Bench'
              buttonContainer.appendChild(buttonBench)
              moveButton(buttonContainer2)
            }
            else if (teamMember2 === '') {
              teamMember2 = listItemText.innerText
              listItem.appendChild(listItemImage)
              listItem.appendChild(listItemInfoContainer)
              listItemInfoContainer.appendChild(listItemText)
              listItemInfoContainer.appendChild(listItemAddButton)
              let nickname = teamContainer2.querySelector('.poke-name')
              nickname.innerText = nicknameInput.value
              let memberImage = teamContainer2.querySelector('.poke-image')
              memberImage.src = listItemImage.src
              let memberAbilities = teamContainer2.querySelector('.poke-abilities')
              for (let i = 0; i < datalist.length; i++){
                if (listItemText.innerText.toLowerCase() === datalist[i].name){
                  let abilitylist = datalist[i].abilities
                  for (let i = 0; i < abilitylist.length; i++){
                    if (i != (abilitylist.length - 1)){
                      if (abilitylist[i].includes('-')){
                        let splitability = abilitylist[i].split('-')
                        memberAbilities.innerText += splitability[0][0].toUpperCase() + splitability[0].slice(1) + ' ' + splitability[1][0].toUpperCase() + splitability[1].slice(1) + ', '
                      }
                      else{
                        memberAbilities.innerText += abilitylist[i][0].toUpperCase() + abilitylist[i].slice(1) + ', '
                        }
                      }
                      else{
                        if (abilitylist[i].includes('-')){
                          let splitability = abilitylist[i].split('-')
                          memberAbilities.innerText += splitability[0][0].toUpperCase() + splitability[0].slice(1) + ' ' + splitability[1][0].toUpperCase() + splitability[1].slice(1)
                        }
                        else{
                          memberAbilities.innerText += abilitylist[i][0].toUpperCase() + abilitylist[i].slice(1)
                      }
                    }
                  }
                }
              }
              let buttonContainer = teamContainer2.querySelector('.buttons')
              let buttonContainer2 = teamContainer2.querySelector('.buttons2')
              let buttonRemove = document.createElement('button')
              let buttonBench = document.createElement('button')
              buttonRemove.addEventListener('click', () => {
                nickname.innerText = ''
                memberImage.src = ''
                teamMember2 = ''
                buttonRemove.remove()
                buttonBench.remove()
                removeButtonsAbilities(memberAbilities, buttonContainer2)
                checkTeamComplete()
              })
              buttonBench.addEventListener('click', () => {
                let reserveListItem = document.createElement('div')
                reserveList.appendChild(reserveListItem)
                let reserveListItemImage = document.createElement('img')
                reserveListItemImage.src = memberImage.src
                let reserveListItemInfoContainer = document.createElement('div')
                let reserveListItemText = document.createElement('p')
                reserveListItemText.innerText = nickname.innerText
                let reserveListItemRemoveButton = document.createElement('button')
                reserveListItemRemoveButton.addEventListener('click', () => {
                  reserveListItem.remove()
                })
                reserveListItemRemoveButton.innerText = 'Remove'
                reserveListItem.appendChild(reserveListItemImage)
                reserveListItem.appendChild(reserveListItemInfoContainer)
                reserveListItemInfoContainer.appendChild(reserveListItemText)
                reserveListItemInfoContainer.appendChild(reserveListItemRemoveButton)
                moveButtonReserve(reserveListItemInfoContainer)
                let promotedPokemon = reserveList.querySelector('div')
                let promotedPokemonName = promotedPokemon.querySelector('div > p')
                let promotedPokemonImage = promotedPokemon.querySelector('img')
                nickname.innerText = promotedPokemonName.innerText
                memberImage.src = promotedPokemonImage.src
                removeButtonsAbilities(memberAbilities, buttonContainer2)
                moveButton(buttonContainer2)
                addAbilityFromReserve(datalist, memberAbilities, promotedPokemonName)
                promotedPokemon.remove()
              })
              buttonRemove.innerText = 'Remove'
              buttonContainer.appendChild(buttonRemove)
              buttonBench.innerText = 'Bench'
              buttonContainer.appendChild(buttonBench)
              moveButton(buttonContainer2)
            }
            else if (teamMember3 === '') {
              teamMember3 = listItemText.innerText
              listItem.appendChild(listItemImage)
              listItem.appendChild(listItemInfoContainer)
              listItemInfoContainer.appendChild(listItemText)
              listItemInfoContainer.appendChild(listItemAddButton)
              let nickname = teamContainer3.querySelector('.poke-name')
              nickname.innerText = nicknameInput.value
              let memberImage = teamContainer3.querySelector('.poke-image')
              memberImage.src = listItemImage.src
              let memberAbilities = teamContainer3.querySelector('.poke-abilities')
              for (let i = 0; i < datalist.length; i++){
                if (listItemText.innerText.toLowerCase() === datalist[i].name){
                  let abilitylist = datalist[i].abilities
                  for (let i = 0; i < abilitylist.length; i++){
                    if (i != (abilitylist.length - 1)){
                      if (abilitylist[i].includes('-')){
                        let splitability = abilitylist[i].split('-')
                        memberAbilities.innerText += splitability[0][0].toUpperCase() + splitability[0].slice(1) + ' ' + splitability[1][0].toUpperCase() + splitability[1].slice(1) + ', '
                      }
                      else{
                        memberAbilities.innerText += abilitylist[i][0].toUpperCase() + abilitylist[i].slice(1) + ', '
                        }
                      }
                      else{
                        if (abilitylist[i].includes('-')){
                          let splitability = abilitylist[i].split('-')
                          memberAbilities.innerText += splitability[0][0].toUpperCase() + splitability[0].slice(1) + ' ' + splitability[1][0].toUpperCase() + splitability[1].slice(1)
                        }
                        else{
                          memberAbilities.innerText += abilitylist[i][0].toUpperCase() + abilitylist[i].slice(1)
                      }
                    }
                  }
                }
              }
              let buttonContainer = teamContainer3.querySelector('.buttons')
              let buttonContainer2 = teamContainer3.querySelector('.buttons2')
              let buttonRemove = document.createElement('button')
              buttonRemove.addEventListener('click', () => {
                nickname.innerText = ''
                memberImage.src = ''
                teamMember3 = ''
                buttonRemove.remove()
                buttonBench.remove()
                removeButtonsAbilities(memberAbilities, buttonContainer2)
                checkTeamComplete()
              })
              let buttonBench = document.createElement('button')
              buttonBench.addEventListener('click', () =>{
                let reserveListItem = document.createElement('div')
                reserveList.appendChild(reserveListItem)
                let reserveListItemImage = document.createElement('img')
                reserveListItemImage.src = memberImage.src
                let reserveListItemInfoContainer = document.createElement('div')
                let reserveListItemText = document.createElement('p')
                reserveListItemText.innerText = nickname.innerText
                let reserveListItemRemoveButton = document.createElement('button')
                reserveListItemRemoveButton.addEventListener('click', () => {
                  reserveListItem.remove()
                })
                reserveListItemRemoveButton.innerText = 'Remove'
                reserveListItem.appendChild(reserveListItemImage)
                reserveListItem.appendChild(reserveListItemInfoContainer)
                reserveListItemInfoContainer.appendChild(reserveListItemText)
                reserveListItemInfoContainer.appendChild(reserveListItemRemoveButton)
                moveButtonReserve(reserveListItemInfoContainer)
                let promotedPokemon = reserveList.querySelector('div')
                let promotedPokemonName = promotedPokemon.querySelector('div > p')
                let promotedPokemonImage = promotedPokemon.querySelector('img')
                nickname.innerText = promotedPokemonName.innerText
                memberImage.src = promotedPokemonImage.src
                removeButtonsAbilities(memberAbilities, buttonContainer2)
                moveButton(buttonContainer2)
                addAbilityFromReserve(datalist, memberAbilities, promotedPokemonName)
                promotedPokemon.remove()
              })
              buttonRemove.innerText = 'Remove'
              buttonContainer.appendChild(buttonRemove)
              buttonBench.innerText = 'Bench'
              buttonContainer.appendChild(buttonBench)
              moveButton(buttonContainer2)
            }
            else {
              listItem.appendChild(listItemImage)
              listItem.appendChild(listItemInfoContainer)
              listItemInfoContainer.appendChild(listItemText)
              listItemInfoContainer.appendChild(listItemAddButton)
              let reserveListItem = document.createElement('div')
              reserveList.appendChild(reserveListItem)
              let reserveListItemImage = document.createElement('img')
              reserveListItemImage.src = listItemImage.src
              let reserveListItemInfoContainer = document.createElement('div')
              let reserveListItemText = document.createElement('p')
              reserveListItemText.innerText = nicknameInput.value
              let reserveListItemRemoveButton = document.createElement('button')
              reserveListItemRemoveButton.addEventListener('click', () => {
                reserveListItem.remove()
              })
              reserveListItemRemoveButton.innerText = 'Remove'
              // Sätt innertext, image etc. baserat på Pokémonen som valdes ut.
              reserveListItem.appendChild(reserveListItemImage)
              reserveListItem.appendChild(reserveListItemInfoContainer)
              reserveListItemInfoContainer.appendChild(reserveListItemText)
              reserveListItemInfoContainer.appendChild(reserveListItemRemoveButton)
              moveButtonReserve(reserveListItemInfoContainer)
            }
            listItem.classList.remove('nicknameprompt')
          })
          listItem.appendChild(nicknameInput)
          listItem.appendChild(confirmButton)
        })
        noButton.addEventListener('click', () => {
          listItem.classList.remove('nicknameprompt')
          nicknamePrompt.remove()
          listButtonContainer.remove()
          listItem.appendChild(listItemImage)
          listItem.appendChild(listItemInfoContainer)
          listItemInfoContainer.appendChild(listItemText)
          listItemInfoContainer.appendChild(listItemAddButton)
          if (teamMember1 === '') {
            teamMember1 = listItemText.innerText
            let memberName = teamContainer1.querySelector('.poke-name')
            let memberImage = teamContainer1.querySelector('.poke-image')
            // // Abilities -- kommentera in när det behövs.        
            let memberAbilities = teamContainer1.querySelector('.poke-abilities')
            for (let i = 0; i < datalist.length; i++){
              if (listItemText.innerText.toLowerCase() === datalist[i].name){
                let abilitylist = datalist[i].abilities
                for (let i = 0; i < abilitylist.length; i++){
                  if (i != (abilitylist.length - 1)){
                    if (abilitylist[i].includes('-')){
                      let splitability = abilitylist[i].split('-')
                      memberAbilities.innerText += splitability[0][0].toUpperCase() + splitability[0].slice(1) + ' ' + splitability[1][0].toUpperCase() + splitability[1].slice(1) + ', '
                    }
                    else{
                      memberAbilities.innerText += abilitylist[i][0].toUpperCase() + abilitylist[i].slice(1) + ', '
                      }
                    }
                    else{
                      if (abilitylist[i].includes('-')){
                        let splitability = abilitylist[i].split('-')
                        memberAbilities.innerText += splitability[0][0].toUpperCase() + splitability[0].slice(1) + ' ' + splitability[1][0].toUpperCase() + splitability[1].slice(1)
                      }
                      else{
                        memberAbilities.innerText += abilitylist[i][0].toUpperCase() + abilitylist[i].slice(1)
                    }
                  }
                }
              }
            }
            let buttonContainer = teamContainer1.querySelector('.buttons')
            let buttonContainer2 = teamContainer1.querySelector('.buttons2')
            let buttonRemove = document.createElement('button')
            buttonRemove.addEventListener('click', () => {
              memberName.innerText = ''
              memberImage.src = ''
              teamMember1 = ''
              buttonRemove.remove()
              buttonBench.remove()
              removeButtonsAbilities(memberAbilities, buttonContainer2)
              checkTeamComplete()
            })
            let buttonBench = document.createElement('button')
              buttonBench.addEventListener('click', () =>{
                let reserveListItem = document.createElement('div')
                reserveList.appendChild(reserveListItem)
                let reserveListItemImage = document.createElement('img')
                reserveListItemImage.src = memberImage.src
                let reserveListItemInfoContainer = document.createElement('div')
                let reserveListItemText = document.createElement('p')
                reserveListItemText.innerText = memberName.innerText
                let reserveListItemRemoveButton = document.createElement('button')
                reserveListItemRemoveButton.addEventListener('click', () => {
                  reserveListItem.remove()
                })
                reserveListItemRemoveButton.innerText = 'Remove'
                reserveListItem.appendChild(reserveListItemImage)
                reserveListItem.appendChild(reserveListItemInfoContainer)
                reserveListItemInfoContainer.appendChild(reserveListItemText)
                reserveListItemInfoContainer.appendChild(reserveListItemRemoveButton)
                moveButtonReserve(reserveListItemInfoContainer)
                let promotedPokemon = reserveList.querySelector('div')
                let promotedPokemonName = promotedPokemon.querySelector('div > p')
                let promotedPokemonImage = promotedPokemon.querySelector('img')
                memberName.innerText = promotedPokemonName.innerText
                memberImage.src = promotedPokemonImage.src
                removeButtonsAbilities(memberAbilities, buttonContainer2)
                moveButton(buttonContainer2)
                addAbilityFromReserve(datalist, memberAbilities, promotedPokemonName)
                promotedPokemon.remove()
              })
              memberName.innerText = listItemText.innerText
              memberImage.src = listItemImage.src
              buttonRemove.innerText = 'Remove'
              buttonContainer.appendChild(buttonRemove)
              buttonBench.innerText = 'Bench'
              buttonContainer.appendChild(buttonBench)
              moveButton(buttonContainer2)
          }
          else if (teamMember2 === '') {
            teamMember2 = listItemText.innerText
            let memberName = teamContainer2.querySelector('.poke-name')
            let memberImage = teamContainer2.querySelector('.poke-image')
            let memberAbilities = teamContainer2.querySelector('.poke-abilities')
            for (let i = 0; i < datalist.length; i++){
              if (listItemText.innerText.toLowerCase() === datalist[i].name){
                let abilitylist = datalist[i].abilities
                for (let i = 0; i < abilitylist.length; i++){
                  if (i != (abilitylist.length - 1)){
                    if (abilitylist[i].includes('-')){
                      let splitability = abilitylist[i].split('-')
                      memberAbilities.innerText += splitability[0][0].toUpperCase() + splitability[0].slice(1) + ' ' + splitability[1][0].toUpperCase() + splitability[1].slice(1) + ', '
                    }
                    else{
                      memberAbilities.innerText += abilitylist[i][0].toUpperCase() + abilitylist[i].slice(1) + ', '
                      }
                    }
                    else{
                      if (abilitylist[i].includes('-')){
                        let splitability = abilitylist[i].split('-')
                        memberAbilities.innerText += splitability[0][0].toUpperCase() + splitability[0].slice(1) + ' ' + splitability[1][0].toUpperCase() + splitability[1].slice(1)
                      }
                      else{
                        memberAbilities.innerText += abilitylist[i][0].toUpperCase() + abilitylist[i].slice(1)
                    }
                  }
                }
              }
            }
            let buttonContainer = teamContainer2.querySelector('.buttons')
            let buttonContainer2 = teamContainer2.querySelector('.buttons2')
            let buttonRemove = document.createElement('button')
            buttonRemove.addEventListener('click', () => {
              memberName.innerText = ''
              memberImage.src = ''
              teamMember2 = ''
              buttonRemove.remove()
              buttonBench.remove()
              removeButtonsAbilities(memberAbilities, buttonContainer2)
              checkTeamComplete()
            })
            let buttonBench = document.createElement('button')
              buttonBench.addEventListener('click', () =>{
                let reserveListItem = document.createElement('div')
                reserveList.appendChild(reserveListItem)
                let reserveListItemImage = document.createElement('img')
                reserveListItemImage.src = memberImage.src
                let reserveListItemInfoContainer = document.createElement('div')
                let reserveListItemText = document.createElement('p')
                reserveListItemText.innerText = memberName.innerText
                let reserveListItemRemoveButton = document.createElement('button')
                reserveListItemRemoveButton.addEventListener('click', () => {
                  reserveListItem.remove()
                })
                reserveListItemRemoveButton.innerText = 'Remove'
                reserveListItem.appendChild(reserveListItemImage)
                reserveListItem.appendChild(reserveListItemInfoContainer)
                reserveListItemInfoContainer.appendChild(reserveListItemText)
                reserveListItemInfoContainer.appendChild(reserveListItemRemoveButton)
                moveButtonReserve(reserveListItemInfoContainer)
                let promotedPokemon = reserveList.querySelector('div')
                let promotedPokemonName = promotedPokemon.querySelector('div > p')
                let promotedPokemonImage = promotedPokemon.querySelector('img')
                memberName.innerText = promotedPokemonName.innerText
                memberImage.src = promotedPokemonImage.src
                removeButtonsAbilities(memberAbilities, buttonContainer2)
                moveButton(buttonContainer2)
                addAbilityFromReserve(datalist, memberAbilities, promotedPokemonName)
                promotedPokemon.remove()
              })
              memberName.innerText = listItemText.innerText
              memberImage.src = listItemImage.src
              buttonRemove.innerText = 'Remove'
              buttonContainer.appendChild(buttonRemove)
              buttonBench.innerText = 'Bench'
              buttonContainer.appendChild(buttonBench)
              moveButton(buttonContainer2)
          }
          else if (teamMember3 === '') {
            teamMember3 = listItemText.innerText
            let memberName = teamContainer3.querySelector('.poke-name')
            let memberImage = teamContainer3.querySelector('.poke-image')
            let memberAbilities = teamContainer3.querySelector('.poke-abilities')
            for (let i = 0; i < datalist.length; i++){
              if (listItemText.innerText.toLowerCase() === datalist[i].name){
                let abilitylist = datalist[i].abilities
                for (let i = 0; i < abilitylist.length; i++){
                  if (i != (abilitylist.length - 1)){
                    if (abilitylist[i].includes('-')){
                      let splitability = abilitylist[i].split('-')
                      memberAbilities.innerText += splitability[0][0].toUpperCase() + splitability[0].slice(1) + ' ' + splitability[1][0].toUpperCase() + splitability[1].slice(1) + ', '
                    }
                    else{
                      memberAbilities.innerText += abilitylist[i][0].toUpperCase() + abilitylist[i].slice(1) + ', '
                      }
                    }
                    else{
                      if (abilitylist[i].includes('-')){
                        let splitability = abilitylist[i].split('-')
                        memberAbilities.innerText += splitability[0][0].toUpperCase() + splitability[0].slice(1) + ' ' + splitability[1][0].toUpperCase() + splitability[1].slice(1)
                      }
                      else{
                        memberAbilities.innerText += abilitylist[i][0].toUpperCase() + abilitylist[i].slice(1)
                    }
                  }
                }
              }
            }
            let buttonContainer = teamContainer3.querySelector('.buttons')
            let buttonContainer2 = teamContainer3.querySelector('.buttons2')
            let buttonRemove = document.createElement('button')
            buttonRemove.addEventListener('click', () => {
              memberName.innerText = ''
              memberImage.src = ''
              teamMember3 = ''
              buttonRemove.remove()
              buttonBench.remove()
              removeButtonsAbilities(memberAbilities, buttonContainer2)
              checkTeamComplete()
            })
            let buttonBench = document.createElement('button')
              buttonBench.addEventListener('click', () =>{
                let reserveListItem = document.createElement('div')
                reserveList.appendChild(reserveListItem)
                let reserveListItemImage = document.createElement('img')
                reserveListItemImage.src = memberImage.src
                let reserveListItemInfoContainer = document.createElement('div')
                let reserveListItemText = document.createElement('p')
                reserveListItemText.innerText = memberName.innerText
                let reserveListItemRemoveButton = document.createElement('button')
                reserveListItemRemoveButton.addEventListener('click', () => {
                  reserveListItem.remove()
                })
                reserveListItemRemoveButton.innerText = 'Remove'
                reserveListItem.appendChild(reserveListItemImage)
                reserveListItem.appendChild(reserveListItemInfoContainer)
                reserveListItemInfoContainer.appendChild(reserveListItemText)
                reserveListItemInfoContainer.appendChild(reserveListItemRemoveButton)
                moveButtonReserve(reserveListItemInfoContainer)
                let promotedPokemon = reserveList.querySelector('div')
                let promotedPokemonName = promotedPokemon.querySelector('div > p')
                let promotedPokemonImage = promotedPokemon.querySelector('img')
                memberName.innerText = promotedPokemonName.innerText
                memberImage.src = promotedPokemonImage.src
                removeButtonsAbilities(memberAbilities, buttonContainer2)
                moveButton(buttonContainer2)
                addAbilityFromReserve(datalist, memberAbilities, promotedPokemonName)
                promotedPokemon.remove()
              })
              memberName.innerText = listItemText.innerText
              memberImage.src = listItemImage.src
              buttonRemove.innerText = 'Remove'
              buttonContainer.appendChild(buttonRemove)
              buttonBench.innerText = 'Bench'
              buttonContainer.appendChild(buttonBench)
              moveButton(buttonContainer2)
          }
          else {
            listItem.appendChild(listItemImage)
            listItem.appendChild(listItemInfoContainer)
            listItemInfoContainer.appendChild(listItemText)
            listItemInfoContainer.appendChild(listItemAddButton)
            let reserveListItem = document.createElement('div')
            reserveList.appendChild(reserveListItem)
            let reserveListItemImage = document.createElement('img')
            reserveListItemImage.src = listItemImage.src
            let reserveListItemInfoContainer = document.createElement('div')
            let reserveListItemText = document.createElement('p')
            reserveListItemText.innerText = listItemText.innerText
            let reserveListItemRemoveButton = document.createElement('button')
            reserveListItemRemoveButton.addEventListener('click', () => {
              reserveListItem.remove()
            })
            reserveListItemRemoveButton.innerText = 'Remove'
            // Sätt innertext, image etc. baserat på Pokémonen som valdes ut.
            reserveListItem.appendChild(reserveListItemImage)
            reserveListItem.appendChild(reserveListItemInfoContainer)
            reserveListItemInfoContainer.appendChild(reserveListItemText)
            reserveListItemInfoContainer.appendChild(reserveListItemRemoveButton)
            moveButtonReserve(reserveListItemInfoContainer)
          }
        })
        listItem.appendChild(nicknamePrompt)
        listItem.appendChild(listButtonContainer)
        listButtonContainer.appendChild(yesButton)
        listButtonContainer.appendChild(noButton)
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

function clearSearch() {
  let oldSearch = searchResultList.querySelectorAll('div')
  for (let i = 0; i < oldSearch.length; i++) {
    oldSearch[i].remove();
  }
}

function checkTeamComplete() {
  if (teamMember1 === '' || teamMember2 === '' || teamMember3 === '') {
    if (teamContainer.querySelector('h3')) {
      
    }
    else {
      let incompleteTeam = document.createElement('h3')
      incompleteTeam.innerText = 'Your team needs at least three Pokémon.'
      teamContainer.appendChild(incompleteTeam)
    }
  }
  else {
    if (!teamContainer.querySelector('h3')) {
      
    }
    else {
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