let details    = document.getElementsByClassName("details")
let header     = []
let list       = []
let movingUp   = [];       // Массивы movingUp и movingDown служат флагами открытия/закрытия списка, 
let movingDown = [];       // чтобы предотвратить попытку открытия/закрытия списка во время анимации.

for (let i = 0; i < details.length; i++ ){
    header.push(details[i].getElementsByClassName("details-header")[0])
    list.push(details[i].getElementsByClassName("details-list")[0])
    movingUp.push(false)
    movingDown.push(false)
    
    header[i].addEventListener("click", function() {
        if (window.getComputedStyle(list[i]).display == "none") {
            list[i].style.display = "block"
            //details[i].getElementsByTagName("img")[0].setAttribute("src", "img/close.png")
            animationBlocks(list[i], headerHeight, 10, 0, i)
        } else {
            //details[i].getElementsByTagName("img")[0].setAttribute("src", "img/open.png")
            animationBlocksBack(list[i], 10, list[i].getElementsByTagName("div").length - 1, i)
        }
    })
}

let headerHeight = getHeight(header[0])
let fontSize = window.getComputedStyle(header[0]).fontSize

function getHeight(element) {
    height = window.getComputedStyle(element).height
    return Number(height.match(/\d+/i).toString())
}

// Анимация открытия списка
function animationBlocks(list, height, step, i, listNumber) {
    if (!movingUp[listNumber]) {
        movingDown[listNumber] = true

        // Если нужная высота не достигнута, увеличивается высота текущего блока
        let element = list.getElementsByTagName("div")[i]
        if (i < list.getElementsByTagName("div").length && getHeight(element) < height) {
            element.style.height = getHeight(element) + step  + "px"
            
            setTimeout(function() {
                details[listNumber].style.marginBottom = getHeight(list) * (i + 1) + getHeight(element)  + "px"
                animationBlocks(list, height, step, i, listNumber)
            }, 5)
        } 
        // Иначе, если мы не достигли конца списка, переходим к следующему элементу
        else if (i < list.getElementsByTagName("div").length) {
            element.style.borderBottom = "1px solid black"
            element.style.fontSize = fontSize
            animationBlocks(list, height, step, i + 1, listNumber)
        } 
        // В конце концов, устанавливаем нижний внешний отступ для текущего списка
        else {
            details[listNumber].getElementsByTagName("img")[0].setAttribute("src", "img/close.png")
            let count = list.getElementsByTagName("div").length
            details[listNumber].style.marginBottom = (list.lastElementChild.clientHeight + 2) * count + window.screen.height / 100 * 2 + "px"
            movingDown[listNumber] = false;
        }
    }
}

// Анимация закрытия списка
function animationBlocksBack(list, step, i, listNumber) {
    if (!movingDown[listNumber]) {
        movingUp[listNumber] = true
        let element = list.getElementsByTagName("div")[i]
        element.style.fontSize = 0

        // Если высота текущего элемента больше нуля, уменьшаем высоту блока
        if (getHeight(element) > 0) {
            element.style.height = getHeight(element) - step  + "px"
            setTimeout(function() {
                details[listNumber].style.marginBottom = getHeight(list) * (i + 1) + getHeight(element) + "px"
                animationBlocksBack(list, step, i, listNumber)
            }, 5)
        } 
        // Иначе, если мы не дошли до начала списка, переходим к следующему элементу
        else if (i > 0) {
            animationBlocksBack(list, step, i - 1, listNumber)
            element.style.borderBottom = "0px solid black"
        } 
        // В конце концов, делаем внешний отступ и скрываем список
        else {
            details[listNumber].getElementsByTagName("img")[0].setAttribute("src", "img/open.png")
            details[listNumber].style.marginBottom = "2vh"
            list.style.display = "none"
            movingUp[listNumber] = false
        }
    }
}
