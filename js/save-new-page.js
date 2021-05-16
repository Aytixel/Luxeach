//variable
var body = document.querySelector('.body')
var save = document.querySelector('.save')
var form = document.querySelector('.save-form')
var url = document.querySelector('.url')
var socket_connected = true
var socket = null

//object
var returns = [
    {'message': 'La page a été envoyer à la vérification pour être enregistrer.', 'attribute': 'success return', 'position': 'beforeend', 'element': save},
    {'message': 'La page n\'a pas pu être envoyer à la verification.', 'attribute': 'error return', 'position': 'beforeend', 'element': save},
    {'message': 'Vous n\'avez pas entré d\'url.', 'attribute': 'error return', 'position': 'beforeend', 'element': save},
    {'message': 'L\'url que vous avez entré n\'est pas valide.', 'attribute': 'error return', 'position': 'beforeend', 'element': save},
    {'message': 'La page que vous voulez enregistrer a déjà été enregistrer.', 'attribute': 'error return', 'position': 'beforeend', 'element': save},
    {'message': 'Nous avons perdu la lumière du serveur, mais nous la cherchons.', 'attribute': 'warning return in', 'position': 'afterbegin', 'element': body}
]

//function
function returnMessage (returnNumber) {
    var returnElement = document.querySelectorAll('.return')
    returnElement.forEach(function (element) {element.remove()})
    returns[returnNumber].element.insertAdjacentHTML(returns[returnNumber].position, '<div class="' + returns[returnNumber].attribute + '">' + returns[returnNumber].message + '</div>')
}

//try catch for socket.io
function try_socket (success) {
    if (socket_connected) {
        try {
            success()
        } catch (e){
            socket_connected = false
            returnMessage(5)
        }
    }
}

try_socket(function () {
    socket = io()
})

//on submit url
form.addEventListener('submit', function (e) {
    e.preventDefault()
    try_socket(function () {
        if (url.value != '') {
            socket.emit('client:save_new-page', url.value)
            socket.on('server:response_new-page', function (returnMessageNumber) {returnMessage(returnMessageNumber)}) 
            url.value = ''
        } else returnMessage(2)
    })
})