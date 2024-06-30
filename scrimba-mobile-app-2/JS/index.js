import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://scrimba-mobile-app-2-default-rtdb.firebaseio.com/"}

const app = initializeApp(firebaseConfig);

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({active:true, currentWindow: true}, (tabs) => {
        myLeads.push(tabs[0]).url
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    leads.forEach((lead) => {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>`
    })
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", () => {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

