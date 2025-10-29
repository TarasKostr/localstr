const form = document.querySelector(".js-form")
const nameInp = document.querySelector(".js-name")
const surnameInp = document.querySelector(".js-surname")
const phoneInp = document.querySelector(".js-phone")
const emailInp = document.querySelector(".js-email")
const btn = document.querySelector(".js-btn")
const list = document.querySelector(".js-list")
const del = document.querySelector(".js-del")

const contacts = JSON.parse(localStorage.getItem("contacts")) || []

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

// function back2edit(opt){
//     nameInp.value = opt.name
//     surnameInp.value = opt.surname
//     phoneInp.value = opt.phone
//     emailInp.value = opt.email
// }

list.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-edit")){
        const li = event.target.closest("li")
        const idx = li.dataset.idx
        // removeItem(idx)
        console.log(li)
        const opt = contacts[idx]
        // back2edit(opt)
    }
})

function render(array){
    list.innerHTML = array.map(({name,surname,phone,email}) => {
        return `<li>
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