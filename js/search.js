//variable
var results = document.querySelector('.results')
var visible_results_count = 0
var enabled_loader = true
var xhr = getXMLHttpRequest()

//code
function load (limit_high, first) {
    if ((results.scrollLeft > results.scrollLeftMax - 500 && enabled_loader == true) || first == true) {
        var rq = encodeURIComponent(results.getAttribute('rq'))
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                var results_data = JSON.parse(xhr.responseText)
                if (results_data != null)  {
                    visible_results_count = visible_results_count + limit_high
                    results_data.forEach(function (data) {results.innerHTML = results.innerHTML + ('<a href="'+ data['url'] +'" class="result"><div class="box"><div class="title"><h3>'+ data['title'] +'</h3></div><div class="description">'+ data['description'] +'</div></div></a>')})
                    load_result_manager(document.querySelectorAll('.result'))
                    if (results.childElementCount != visible_results_count) enabled_loader = false
                }
            }
        }
        xhr.open('GET', '/php/loader.php?rq='+ rq +'&limit_low='+ visible_results_count +'&limit_high='+ (visible_results_count + limit_high), true)
        xhr.send()
    }
}

function update (e) {
    load(10, false)
}

results.addEventListener('mousemove', update)
results.addEventListener('mousewheel', update)
results.addEventListener('touchmove', update)

window.onload = function () {
    load(60, true)
    scroller(document.querySelectorAll('.results'), [true])
}