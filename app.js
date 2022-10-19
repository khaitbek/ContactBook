// get all elements from the DOM
const userForm = document.querySelector("#userForm")
const userFirstNameInput = userForm.querySelector("#userFirstNameInput")
const userContactGroup = userForm.querySelector("#userContactGroup")
const userPhoneInput = userForm.querySelector("#userPhoneInput")
const cardsList = document.querySelector("#cardList")
const alertElem = userForm.querySelector("#alert")
const successAlertElem = userForm.querySelector("#alertSuccess")

// declare an empty array to collect all the contacts
const cards = JSON.parse(window.localStorage.getItem("contacts")) || []

// declare emojis for different contact groups
const emojis = {
    "mom":"🧕",
    "dad":"👨",
    "bro":"👨",
    "sister":"🧕",
    "anaconda":"🐍",
    "friends":"👨",
    "aunt":"🧕",
    "niece":"🧕",
}

// render cards from localstorage
renderCards()

// add form submit event
userForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    // check user phone number
    if(!checkPhoneNumber(userPhoneInput.value)) return;
    clearErrorMessages();
    // add card to array
    cards.push({
        contactName: userFirstNameInput.value,
        contactGroup: userContactGroup.value,
        contactPhone: userPhoneInput.value
    })
    updateAndRenderCards()
    triggerSuccess()
    // clearInputs
    userForm.reset()
})

function updateAndRenderCards(){
    clearCards()
    updateLocalContacts(cards)
    renderCards(cards)
}

function clearCards(){
    cardsList.innerHTML = ""
}

function clearErrorMessages(){
    alertElem.textContent = ""
    alertElem.classList.remove("d-block")
    alertElem.classList.add("d-none")
}

function checkPhoneNumber(phoneNumber) {
    if(cards.length === 0) return true
    if(checkIfAlreadyUser(phoneNumber)){
        triggerError("The user with this phone number already exists!")
        return false
    }
    return true
}

function checkIfAlreadyUser(phoneNumber){
    cards.forEach(card => {
        console.log(card.contactPhone,phoneNumber);
    })
    return cards.find(card => card.contactPhone === phoneNumber)
}

function triggerError(errorMessage = "Something went wrong!") {
    alertElem.textContent = errorMessage
    alertElem.classList.remove("d-none")
    alertElem.classList.add("d-block")
}

function triggerSuccess(successMessage = "Contact added successfully!"){
    successAlertElem.classList.remove("d-none")
    successAlertElem.classList.add("d-block")
    successAlertElem.textContent = successMessage

    setTimeout(()=>{
        successAlertElem.classList.remove("d-block")
        successAlertElem.classList.add("d-none")
    },2000)
}

function updateLocalContacts(cards){
    window.localStorage.setItem("contacts",JSON.stringify(cards))
}

function renderCards(cards) {
    const localContacts = window.localStorage.getItem("contacts")
    localContacts && localContacts !== "undefined" ? addCards(JSON.parse(localContacts)) : addCards(cards)
}

function addCards(cards){
    if(!cards) return
    cards.forEach((card,index) => {
        const cardTemplate = document.querySelector("#cardTemplate").content.cloneNode(true).children[0]
        // create a card
        const isEmoji = emojis[`${card.contactName.toLowerCase()}`] || emojis[`${card.contactGroup.toLowerCase()}`]
        cardTemplate.querySelector("#userFirstNameText").textContent = isEmoji ? `${card.contactName} ${isEmoji}` : card.contactName 
        cardTemplate.querySelector("#userLastNameText").textContent = card.contactGroup
        cardTemplate.querySelector("#userPhoneText").textContent = card.contactPhone
        cardTemplate.querySelector("#deleteBtn").dataset.deleteId = index
        cardsList.append(cardTemplate)
    })
}

// add click event to card list
cardsList.addEventListener("click",(evt)=>{
    const targetElem = evt.target
    if(targetElem.dataset.action === "delete"){
        const deleteId = Number(targetElem.dataset.deleteId)
        cards.splice(deleteId,1)
        updateAndRenderCards()
    }
})