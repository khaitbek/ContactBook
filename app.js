// get all elements from the DOM
const userForm = document.querySelector("#userForm")
const userFirstNameInput = userForm.querySelector("#userFirstNameInput")
const userLastNameInput = userForm.querySelector("#userLastNameInput")
const userPhoneInput = userForm.querySelector("#userPhoneInput")
const cardsList = document.querySelector("#cardList")
const cards = []

// add form submit event
userForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    console.log("submit");
    // clear the cards
    cardsList.innerHTML = ""

    // add card to array
    cards.push({
        fName: userFirstNameInput.value,
        LName: userLastNameInput.value,
        phone: userPhoneInput.value
    })

    renderCards(cards)

    // clearInputs
    userForm.reset()
})

function renderCards(cards) {
    cards.forEach(card => {
        console.log(document.querySelector("#cardTemplate"));
        const cardTemplate = document.querySelector("#cardTemplate").content.cloneNode(true).children[0]

        console.log(card);

        // create a card
        cardTemplate.querySelector("#userFirstNameText").textContent = card.fName
        cardTemplate.querySelector("#userLastNameText").textContent = card.LName
        cardTemplate.querySelector("#userPhoneText").textContent = card.phone

        cardsList.append(cardTemplate)
    })
}