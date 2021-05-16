/*
 *
 *  for minify: https://luxeach.tk/js/utils_compatible.js
 *
 */



if (!NodeList.forEach) NodeList.prototype.forEach = function (callback, thisArg) {
    array = this
    for (var index = 0; index < array.length; ++index) callback(array[index], index, array).bind(thisArg)
}

if (!('addEventListener' in window)) {
    Window.prototype.addEventListener = HTMLDocument.prototype.addEventListener = Element.prototype.addEventListener = function (type, handler) {
        var _this = this
        this.attachEvent("on" + type, function(){
            handler.call(_this, window.event)
        })
    }
}
    
function getXMLHttpRequest () {
    var xhr = null
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject('Msxml2.XMLHTTP')
            } catch(e) {
                xhr = new ActiveXObject('Microsoft.XMLHTTP')
            }
        } else xhr = new XMLHttpRequest()
    } else {
        alert('Votre navigateur ne supporte pas l\'objet XMLHTTPRequest...')
        return null
    }
    return xhr
}

function debounce (callback, delay){
    var timer;
    return function(){
        var args = arguments
        var context = this
        clearTimeout(timer)
        timer = setTimeout(function(){
            callback.apply(context, args)
        }, delay)
    }
}

function throttle (callback, delay) {
    var last
    var timer
    return function () {
        var context = this
        var now = +new Date
        var args = arguments
        if (last && now < last + delay) {
            clearTimeout(timer)
            timer = setTimeout(function () {
                last = now
                callback.apply(context, args)
            }, delay)
        } else {
            last = now
            callback.apply(context, args)
        }
    }
}

function preventThrottle (callback, delay) {
    return function () {
        var args = arguments
        args[0].preventDefault()
        throttle(callback, delay).apply(this, args)
    }
}