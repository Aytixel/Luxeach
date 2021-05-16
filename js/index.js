//variable
var select_categ = document.querySelector('.selection-button')
var options = document.querySelector('.options')
var option = document.querySelectorAll('.option')
var category = document.querySelectorAll('.category')
var xhr = getXMLHttpRequest()
var results_manager = document.querySelectorAll('.result')
var last_category = category[0]

//code
select_categ.addEventListener('click', function () {
    this.classList.add('hidden')
    setTimeout(function () {
        select_categ.classList.add('no-toggle')
        setTimeout(function () {
            options.classList.add('visible')
        }, 50 / 3)
    }, 400)
})

option.forEach(function (option_elem) {
    option_elem.addEventListener('click', function () {
        var categ_select = document.querySelector('.categories .category[id="' + option_elem.id + '"]')
        var change_categ = true;
        select_categ.textContent != this.textContent ? last_category.classList.remove('visible') : change_categ = false
        select_categ.innerHTML = this.textContent
        options.classList.remove('visible')
        setTimeout(function () {
            select_categ.classList.remove('no-toggle')
            if (change_categ) {
                last_category.classList.remove('toggle')
                categ_select.classList.add('toggle')
                last_category = categ_select
            }
            setTimeout(function () {
                if (change_categ) categ_select.classList.add('visible')
                select_categ.classList.remove('hidden')
            }, 50 / 3)
        }, 400)
    })
})

window.onload = function() {
    scroller(category, [true, true, true])
    load_result_manager(results_manager)
}