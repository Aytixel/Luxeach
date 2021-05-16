//variable
var body = document.querySelector('.body')
var verification_form = document.querySelector('.verification .verification-form')
var accepted = document.querySelectorAll('.verification .accept')
var refused = document.querySelectorAll('.verification .refuse')
var xhr = getXMLHttpRequest()
var socket_connected = true
var socket = null

//object
var returns = [
    {'message': 'Nous avons perdu la lumière du serveur, mais nous la cherchons.', 'attribute': 'warning return in', 'position': 'afterbegin', 'element': body}
]

//function
function returnMessage (returnNumber) {
    var returnElement = document.querySelectorAll('.return')
    
    returnElement.forEach(function (element) {
        element.remove()
    })
    
    returns[returnNumber].element.insertAdjacentHTML(returns[returnNumber].position, '<div class="' + returns[returnNumber].attribute + '">' + returns[returnNumber].message + '</div>')
}

//try catch for socket.io
function try_socket (success) {
    if (socket_connected) {
        try {
            success()
        } catch (e){
            socket_connected = false
            returnMessage(0)
        }
    }
}

try_socket(function () {
    socket = io()
})

try_socket(function () {
    socket.on('client:save_new-page', function(data) {
        parsedData = JSON.parse(data)
        verification_form.insertAdjacentHTML('beforeend', '<li id="' + parsedData.id + '" class="page"><a href="' + parsedData.url + '" target="_blank">' + parsedData.url + '</a><span class="refuse"></span><span class="accept"></span></li>')
        verify(document.querySelector('#' + parsedData.id + ' .accept'), true)
        verify(document.querySelector('#' + parsedData.id + ' .refuse'), false)
    })
})

//scroll
window.onload = function (e) {scroller([verification_form], [false])}

//accept & refuse
function verify (element, decision) {
    element.addEventListener('mouseover', function () {
        element.parentNode.style.borderBottomColor = decision ? '#53ff1c' : '#FF2828'
    })
    
    element.addEventListener('mouseout', function () {
        element.parentNode.style.borderBottomColor = '#00E8F3'
    })
    
    element.addEventListener('click', function (e) {
        e.preventDefault()
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) element.parentNode.remove()
        }
        xhr.open('GET', '/php/verify-new-page.php?id=' + element.parentNode.id + '&decision=' + decision.toString(), true)
        xhr.send()
    })
}

accepted.forEach(function (accept) {
    verify(accept, true)
})

refused.forEach(function (refuse) {
    verify(refuse, false)
})