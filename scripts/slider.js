function initSlider() {
    let dotsBlockWidth = dots.clientWidth / dots.parentElement.clientWidth * 100 // в процентах
    dots.style.margin = "0 0 0 ".concat((100 - dotsBlockWidth) / 2, "%");

    let arrowWidth = right_arrow.clientWidth / right_arrow.parentElement.clientWidth * 100
    setInterval(function() {
        nextSlide("right", null)
    }, 5000)
}

let slide = 1
let imagesCount = 3
let left_arrow = document.getElementsByClassName("left-arrow")[0]
let right_arrow = document.getElementsByClassName("right-arrow")[0]
let dots = document.getElementsByClassName("dots")[0]

for (let i = 0; i < dots.children.length; i++ ){
    dots.children[i].addEventListener("click", function() {
        nextSlide(null, i + 1)
    })
}

function slideAnimation(element, time) {
    if (time < 1) {
        time += 0.05
        element.style.opacity = time
        setTimeout(function() {
            slideAnimation(element, time)
        }, 50)
    }
}

function nextSlide(direction, choosen_slide) {
    let current_slide = document.getElementsByClassName("image"+slide)[0]
    current_slide.classList.add("hiden")

    let current_label = document.getElementsByClassName("label" + slide)[0]
    current_label.classList.add("hiden")

    let current_dot = document.getElementsByClassName("dot"+slide)[0]
    current_dot.classList.remove("selected")

    if (choosen_slide == null) {
        if (direction == "left") {
            slide -= 1
            if (slide == 0) {
                slide = 3
            }
        } else {
            slide += 1
            if (slide == 4) {
                slide = 1
            }
        }
    } else {
        slide = choosen_slide
    }

    let next_image = document.getElementsByClassName("image" + slide)[0]
    next_image.classList.remove("hiden")
    next_image.style.opacity = 0
    slideAnimation(next_image, 0)

    
    let next_label = document.getElementsByClassName("label" + slide)[0]
    next_label.classList.remove("hiden")
    slideAnimation(next_label, 0)

    let next_dot = document.getElementsByClassName("dot"+slide)[0]
    next_dot.classList.add("selected")
}

left_arrow.addEventListener("click", function() {
    nextSlide("left", null)
})
left_arrow.addEventListener("mouseover", function() {
    left_arrow.getElementsByTagName("div")[0].style.opacity = 1;
})
left_arrow.addEventListener("mouseout", function() {
    left_arrow.getElementsByTagName("div")[0].style.opacity = 0.5;
})

right_arrow.addEventListener("click", function() {
    nextSlide("right", null)
})
right_arrow.addEventListener("mouseover", function() {
    right_arrow.getElementsByTagName("div")[0].style.opacity = 1;
})
right_arrow.addEventListener("mouseout", function() {
    right_arrow.getElementsByTagName("div")[0].style.opacity = 0.5;
})