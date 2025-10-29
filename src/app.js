const form = document.querySelector(".js-form")
const nameInp = document.querySelector(".js-name")
const surnameInp = document.querySelector(".js-surname")
const phoneInp = document.querySelector(".js-phone")
const emailInp = document.querySelector(".js-email")
const btn = document.querySelector(".js-btn")
const list = document.querySelector(".js-list")
const del = document.querySelector(".js-del")

const contacts = JSON.parse(localStorage.getItem("contacts")) || []

let editIndex = null

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const name = nameInp.value.trim()
    const surname = surnameInp.value.trim()
    const phone = phoneInp.value.trim()
    const email = emailInp.value.trim()

    addContact(name,surname,phone,email)
    event.currentTarget.reset()
    storage()
})

function addContact(name,surname,phone,email){
    contacts.push({name,surname,phone,email})
}

function storage(){
    localStorage.setItem("contacts", JSON.stringify(contacts))
    render(contacts)
}

list.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-del")){
        const li = event.target.closest("li")
        const idx = li.dataset.idx
        removeItem(idx)
    }
})

function removeItem(idx){
    contacts.splice(idx,1)
    storage()
}

list.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-edit")){
        const li = event.target.closest("li")
        const idx = li.dataset.idx
        editItem(idx)
        removeItem(idx)
    }
})

function editItem(idx) {
  const contact = contacts[idx];
  nameInp.value = contact.name;
  surnameInp.value = contact.surname;
  phoneInp.value = contact.phone;
  emailInp.value = contact.email;

  editIndex = idx;
  console.log(editIndex, contact)
}

function render(array){
    list.innerHTML = array.map(({name,surname,phone,email}, index) => {
        return `<li data-idx="${index}">
            <p>Name: ${name}</p>
            <p>Surname: ${surname}</p>
            <p>Phone number: ${phone}</p>
            <p>Email: ${email}</p>
            <button type="button" class="js-del">Delete</button>
            <button type="button" class="js-edit">Edit</button>
        </li>`
    }).join("")
}

render(contacts)