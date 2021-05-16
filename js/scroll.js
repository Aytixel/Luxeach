function scroller (scrolls, directions) {
    scrolls.forEach(function (scroll, index) {
        var direction = directions[index]
        var last_position = 0

        scroll.onmousedown = function() {return false}
        scroll.onmousemove = function() {return false}

        //for computer
        function updateScroll (e) {
            e.preventDefault()
            direction ? scroll.scrollLeft -= (e.clientX - last_position) : scroll.scrollTop -= (e.clientY - last_position)
            last_position = direction ? e.clientX : e.clientY
            return false
        }

        function mouseScroll (e) {
            var delta = Math.max(-1, Math.min(1, (e.deltaY || -e.wheelDelta || -e.detail))) * 50
            direction ? scroll.scrollLeft += delta : scroll.scrollTop += delta
            return false
        }

        function startScroll (e) {
            e.preventDefault()
            if (e.button == 0) {
                scroll.addEventListener('mousemove', updateScroll)
                last_position = direction ? e.clientX : e.clientY
            }
            return false
        }

        function endScroll (e) {
            e.preventDefault()
            scroll.removeEventListener('mousemove', updateScroll)
            scroll.removeEventListener('touchmove', updateScroll)
            return false
        }

        //for smartphone
        function updateTouchScroll (e) {
            if (e.changedTouches.length < 2) {
                e.preventDefault()
                direction ? scroll.scrollLeft -= (e.changedTouches[0].clientX - last_position) : scroll.scrollTop -= (e.changedTouches[0].clientY - last_position)
                last_position = direction ? e.changedTouches[0].clientX : e.changedTouches[0].clientY
                return false
            }
        }

        function startTouchScroll (e) {
            if (e.changedTouches.length < 2) {
                e.preventDefault()
                scroll.addEventListener('touchmove', updateTouchScroll)
                last_position = direction ? e.changedTouches[0].clientX : e.changedTouches[0].clientY
                return false
            }
        }
        
        //for computer
        scroll.addEventListener('mousedown', startScroll)

        scroll.onmousewheel = scroll.onwheel = preventThrottle(mouseScroll, 50)
        scroll.addEventListener('DOMMouseScroll', preventThrottle(mouseScroll, 50))

        scroll.onmouseup = scroll.onmouseleave = endScroll

        //for smartphone
        scroll.addEventListener('touchstart', startTouchScroll)

        scroll.ontouchend = scroll.ontouchleave = scroll.ontouchcancel = endScroll
    })
}