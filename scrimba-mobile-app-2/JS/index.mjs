// Initialize app must be done every time. sets up the app for development
// Not as sure about getDatabase
// ref is referencing the area you push data to in the database
// push is the function that allows you to push things to the database

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://scrimba-mobile-app-2-default-rtdb.firebaseio.com/"}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

onValue(referenceInDB, (snapshot) => {
    const doesSnapshotExist = snapshot.exists()
    if (doesSnapshotExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
})

console.log(database)

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    leads.forEach((lead) => {
        listItems += `
            <li>
                <a target='_blank' href='${lead}'>
                    ${lead}
                </a>
            </li>`
    })
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", () => {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", () => {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})

