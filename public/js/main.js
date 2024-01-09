var socket = io()

const submit = document.querySelector("#submit")
submit.addEventListener("click", ()=>{
    let message = document.querySelector("#message").value
    socket.emit("chat message", message)

})

const chat = document.querySelector(".chat-box")
socket.on("received", data => {
    const div = document.createElement('div')
    div.classList.add("chat")
    div.classList.add("my-3")
    div.classList.add("p-2")
    div.classList.add("rounded")
    div.classList.add("text-light")
    div.innerHTML = 
    `<b class="sender d-inline-block mb-1">${data.sender} </b>
    <p class="fw-light">${data.message} </p>
    <div class="text-end m-0">
        <small class="text-secondary">${data.dateSent}</small>
    </div>`
    chat.appendChild(div)
    console.log(data.message)
})

socket.on("user_active", data => {
    const contactBox = document.querySelector(".contact-box")
    const div = document.createElement('div')
    div.classList.add("container")
    div.classList.add("mb-4")
    div.classList.add("px-2")
    div.innerHTML = `
        <div class="contact">
            ${data.username}
        </div>`
    contactBox.appendChild(div)
    // contactBox.innerHTML = "COKKK"
})