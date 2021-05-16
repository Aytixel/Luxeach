var last_result = null
var context_menu = null

function swapper (result, method) {
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            var url = result.getAttribute('href')
            switch (method) {
                default:
                case 0:
                    document.location.href = url
                    break
                case 1:
                    window.open(url)
                    break
                case 2:
                    window.open(url, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes')
                    break
            }
        }
    }
    xhr.open('GET', '/php/update-vues.php?url=' + result.getAttribute('href'), false)
    xhr.send()
}

function contextMenu (result) {
    last_result = result
    context_menu = document.createElement('div')
    
    var copy_title = document.createElement('div')
    copy_title.className = 'copy_title'
    copy_title.appendChild(document.createTextNode('Copier le titre'))
    copy_title.onmousedown = copy_title.ontouchstart = function (e) {
        e.stopPropagation()
        copy(result.querySelector('.title h3').textContent)
    }
    
    var copy_description = document.createElement('div')
    copy_description.className = 'copy_description'
    copy_description.appendChild(document.createTextNode('Copier la description'))
    copy_description.onmousedown = copy_description.ontouchstart = function (e) {
        e.stopPropagation()
        copy(result.querySelector('.description').textContent)
    }
    
    var copy_url = document.createElement('div')
    copy_url.className = 'copy_url'
    copy_url.appendChild(document.createTextNode('Copier l\'url'))
    copy_url.onmousedown = copy_url.ontouchstart = function (e) {
        e.stopPropagation()
        copy(result.href)
    }
    
    var open_tab = document.createElement('div')
    open_tab.className = 'open_tab'
    open_tab.appendChild(document.createTextNode('Ouvrir dans un autre onglet'))
    open_tab.onmousedown = open_tab.ontouchstart = function (e) {
        e.stopPropagation()
        swapper(result, 1)
    }
    
    var open_window = document.createElement('div')
    open_window.className = 'open_window'
    open_window.appendChild(document.createTextNode('Ouvrir dans une autre fenêtre'))
    open_window.onmousedown = open_window.ontouchstart = function (e) {
        e.stopPropagation()
        swapper(result, 2)
    }
    
    context_menu.appendChild(copy_title)
    context_menu.appendChild(copy_description)
    context_menu.appendChild(copy_url)
    context_menu.appendChild(open_tab)
    context_menu.appendChild(open_window)
    context_menu.className = 'context-menu'
    
    result.classList.add('context')
    result.firstChild.appendChild(context_menu)
}
        
function toggleOther () {
    if (last_result) {
        if (last_result.classList.contains('hover')) last_result.classList.remove('hover')
        if (last_result.classList.contains('context')) {
            last_result.classList.remove('context')
            last_result.firstChild.removeChild(context_menu)
            context_menu = null
        }
    }
}

function copy (data) {
    var copy_area = document.createElement('textarea')
    copy_area.value = data
    copy_area.style = {position: 'absolute', left: '-9999px'}
    document.body.appendChild(copy_area)
    copy_area.select()
    document.execCommand('copy')
    document.body.removeChild(copy_area)
}
        
function load_result_manager (results) {
    results.forEach(function (result) {
        var last, last_y, click, long_click
        var move_for_new_open_lenght = 50
        var long_interval = 700
        var interval = 120
        
        //for computer
        function startClick (e) {
            e.preventDefault()
            if ((e.button == 0 && !e.currentTarget.classList.contains('context')) || e.button == 2) {
                last_y = e.clientY
                last = +new Date
            }
            if (e.button == 0 && !e.currentTarget.classList.contains('context')) setTimeout(function () {if (last && last_y) contextMenu(result)}, long_interval)
            return false
        }
        
        function stopClick (e) {
            e.preventDefault()
            if (last && last_y && !e.currentTarget.classList.contains('context')) {
                click = +new Date < last + interval
                if (e.button == 0 && click) swapper(result, 0)
                else if (e.button == 2 && click) contextMenu(result)
                last = last_y = null
            }
            return false
        }
        
        function stopDragClick (e) {
            e.preventDefault()
            if (last && last_y) {
                click = +new Date < last + interval
                long_click = +new Date > last + long_interval
                if (e.button == 2 && !click && !long_click && e.clientY > last_y + move_for_new_open_lenght) swapper(result, 1)
                last = last_y = null
            }
            return false
        }
        
        function cancelClick (e) {
            e.preventDefault()
            last = last_y = null
            return false
        }

        //for smartphone
        function startTouchClick (e) {
            e.preventDefault()
            last_y = e.changedTouches[0].clientY
            last = +new Date
            if (!e.currentTarget.classList.contains('context')) {
                setTimeout(function () {
                    if (last && last_y) {
                        last_result = result
                        last_result.classList.add('hover')
                    }
                    setTimeout(function () {if (last && last_y) contextMenu(result)}, long_interval - interval)
                }.bind(this), interval)
            }
            return false
        }
        
        function stopTouchClick (e) {
            e.preventDefault()
            toggleOther
            if (last && last_y && !e.currentTarget.classList.contains('context')) {
                click = +new Date < last + interval
                if (click) swapper(result, 0)
                last = last_y = null
            }
            return false
        }
        
        result.oncontextmenu = function (e) {e.preventDefault()}
        
        //for computer
        result.addEventListener('mousedown', startClick)
        
        result.addEventListener('mouseup', stopClick)
        
        result.onclick = function (e) {e.preventDefault()}
        
        document.addEventListener('mouseup', stopDragClick)

        document.addEventListener('mouseleave', cancelClick)
        
        document.addEventListener('mousedown', toggleOther)

        //for smartphone
        result.addEventListener('touchstart', startTouchClick)

        result.addEventListener('touchend', stopTouchClick)
        
        document.addEventListener('touchstart', toggleOther)
        
        document.ontouchleave = document.ontouchcancel = cancelClick
    })
}