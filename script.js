
let addnote = document.querySelector("#add-note");
let formContainer = document.querySelector(".form-container");
let closeBtn = document.querySelector(".close-btn");


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
// const closeBtn = document.querySelector(".close-btn");

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

function saveToLocalstorage(note) {              //this function will receive the object 
    if (localStorage.getItem("tasks") === null) {     //this will  run when the task is null
        let oldTasks = [];
        oldTasks.push(note);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    }
    else {
        let oldTasks = localStorage.getItem("tasks");        //this will  run when old tasks were already there 
        oldTasks = JSON.parse(oldTasks);                    //old tasks to  array add new task and again setit into stringify
        oldTasks.push(note);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    }
}


//for opening form by clicking
addnote.addEventListener("click", function () {
    formContainer.style.display = "initial"
})

closeBtn.addEventListener("click", function () {
    formContainer.style.display = "none"
})


//for validation
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
        console.log("Note saved", note);

        form.reset();
        formContainer.style.display = "none";
    }
});


// function to add cards from localStorage
function renderCards() {
    const allCards = JSON.parse(localStorage.getItem("tasks")) || [];
    const cardStack = document.querySelector(".card-stack"); // container in HTML
   // cardStack.innerHTML = ""; // clear old cards before re-rendering

    allCards.forEach(function (task) {
        // Main card container
        const card = document.createElement("div");
        card.classList.add("card");

        // Profile div
        const profileDiv = document.createElement("div");
        profileDiv.classList.add("profile");

        const img = document.createElement("img");
        img.src = task.image || ""; // fallback image
        img.alt = "profile";
        profileDiv.appendChild(img);

        // Name
        const name = document.createElement("h3");
        name.textContent = task.fullname;

        // Hometown
        const hometown = document.createElement("p");
        hometown.innerHTML = `<b>Hometown:</b> ${task.hometown}`;

        // Purpose
        const purpose = document.createElement("p");
        purpose.innerHTML = `<b>Purpose:</b> ${task.purpose}`;

        // Actions div
        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("actions");

        const callBtn = document.createElement("button");
        callBtn.classList.add("call-btn");
        callBtn.textContent = "Call";

        const msgBtn = document.createElement("button");
        msgBtn.classList.add("msg-btn");
        msgBtn.textContent = "Message";

        actionsDiv.appendChild(callBtn);
        actionsDiv.appendChild(msgBtn);

        // Append all to card
        card.appendChild(profileDiv);
        card.appendChild(name);
        card.appendChild(hometown);
        card.appendChild(purpose);
        card.appendChild(actionsDiv);

        // finally append card to container
        cardStack.appendChild(card);
    });
}
renderCards()
