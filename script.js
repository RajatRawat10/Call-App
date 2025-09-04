
let addnote = document.querySelector("#add-note");
let formContainer = document.querySelector(".form-container");
let closeBtn = document.querySelector(".close-btn");

const cardStack = document.querySelector(".card-stack");
const upArrowBtn = document.querySelector("#up-arrow");
const downArrowBtn = document.querySelector("#down-arrow");

// Select form and inputs
const form = document.querySelector("form");
const imageInput = document.querySelector("#image");
const fullnameInput = document.querySelector("#fullname");
const hometownInput = document.querySelector("#hometown");
const purposeInput = document.querySelector("#purpose");
// Select radio buttons (all categories)
const categoryInputs = document.querySelectorAll("input[name='category']");
// Select buttons
const createBtn = document.querySelector(".create-btn");


// Example: get selected category
function getSelectedCategory() {
    let selected = "";
    categoryInputs.forEach(input => {
        if (input.checked) {
            selected = input.parentElement.textContent.trim();
        }
    });
    return selected;
}

function saveToLocalstorage(obj) {              //this function will receive the object 
    if (localStorage.getItem("tasks") === null) {     //this will  run when the task is null
        let oldTasks = [];
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    }
    else {
        let oldTasks = localStorage.getItem("tasks");        //this will  run when old tasks were already there 
        oldTasks = JSON.parse(oldTasks);                    //old tasks to  array add new task and again setit into stringify
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    }
}


//for opening form by clicking
addnote.addEventListener("click", function () {
    formContainer.style.display = "initial"
})
//for  close form 
closeBtn.addEventListener("click", function () {
    formContainer.style.display = "none"
})


//form validation
function validateForm() {
    let isValid = true;

    // reset all borders first
    imageInput.style.border = "";
    fullnameInput.style.border = "";
    hometownInput.style.border = "";
    purposeInput.style.border = "";
    categoryInputs.forEach(input => (input.parentElement.style.color = ""));

    // check each field
    if (imageInput.value.trim() === "") {
        imageInput.style.border = "2px solid red";
        isValid = false;
    }

    if (fullnameInput.value.trim() === "") {
        fullnameInput.style.border = "2px solid red";
        isValid = false;
    }

    if (hometownInput.value.trim() === "") {
        hometownInput.style.border = "2px solid red";
        isValid = false;
    }

    if (purposeInput.value.trim() === "") {
        purposeInput.style.border = "2px solid red";
        isValid = false;
    }

    if (getSelectedCategory() === "") {
        categoryInputs.forEach(input => {
            input.parentElement.style.color = "red";
        });
        isValid = false;
    }

    if (!isValid) {
        alert("All fields are required!");
    }

    return isValid;
}


// form submit section
form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateForm()) {
        const note = {
            image: imageInput.value.trim(),
            fullname: fullnameInput.value.trim(),
            hometown: hometownInput.value.trim(),
            purpose: purposeInput.value.trim(),
            category: getSelectedCategory()
        };
        saveToLocalstorage(note);  // save note into localStorage
        renderCards();             // re-render cards immediately
        // console.log("Note saved", note);
        form.reset();              // for reset form 
        formContainer.style.display = "none";
    }
});

//render in the cards
function renderCards() {
    const allCards = JSON.parse(localStorage.getItem("tasks")) || [];
    // console.log(allCards)
    cardStack.innerHTML = ""; // clear old cards before re-rendering

    allCards.forEach(function (task) {              //html createElement markup
        // main card
        const card = document.createElement("div");
        card.classList.add("card");

        // profile div
        const profile = document.createElement("div");
        profile.classList.add("profile");

        const img = document.createElement("img");
        img.src = task.image;
        img.alt = "profile";
        profile.appendChild(img);

        // name
        const name = document.createElement("h3");
        name.textContent = task.fullname;

        // hometown   
        const hometowninfo = document.createElement("p");
        const label = document.createElement("b");
        label.textContent = "Hometown:";
        const value = document.createTextNode(` ${task.hometown}`);
        hometowninfo.append(label, value);

        // purpose
        const purposeinfo = document.createElement("p");
        purposeinfo.innerHTML = `<b>Purpose:</b> ${task.purpose}`;

        // actions
        const actions = document.createElement("div");
        actions.classList.add("actions");

        const callBtn = document.createElement("button");
        callBtn.classList.add("call-btn");
        callBtn.textContent = "Call";

        const msgBtn = document.createElement("button");
        msgBtn.classList.add("msg-btn");
        msgBtn.textContent = "Message";

        actions.appendChild(callBtn);
        actions.appendChild(msgBtn);

        // assemble card
        card.appendChild(profile);
        card.appendChild(name);
        card.appendChild(hometowninfo);
        card.appendChild(purposeinfo);
        card.appendChild(actions);

        cardStack.appendChild(card);
    });
}
// renderCards();
window.addEventListener("DOMContentLoaded", renderCards);


//update the cardstack with arrow buttons
function updateCardStack() {
    const cards = document.querySelectorAll(".card")
    cards.forEach(function (card, index) {
        card.style.zIndex = 3 - index;
        card.style.transform = `translateY(${index * 10}px scale(${1 - index * 0.02}))`;
        card.style.opacity = `${1 - index * 0.01}`;

    });
}
upArrowBtn.addEventListener("click", function () {
    let lastchild = cardStack.lastElementChild;
    if (lastchild) {
        cardStack.insertBefore(lastchild, cardStack.firstElementChild);
        updateCardStack();    //for update the card stack
    }

})
downArrowBtn.addEventListener("click", function () {
    let firstchild = cardStack.firstElementChild;
    if (firstchild) {
        cardStack.append(firstchild);
        updateCardStack();    //for update the card stack
    }
})

