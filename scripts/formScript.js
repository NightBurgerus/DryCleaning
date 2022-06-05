let productList = document.getElementsByClassName("productList")[0]
let addButton   = document.getElementsByClassName("addButton")[0].lastChild


let clothes     = ["Повседневная", "Торжественная", "Верхняя", "Детская", "Домашняя", "Спортивная"]
let shoes       = ["Туфли", "Сапоги", "Кроссовки", "Ботинки", "Балетки"]
let accessories = ["Галстук", "Сумка", "Шарф", "Зонт", "Головной убор", "Пурчатки"]
let home        = ["Подушки", "Ковры", "Постельное бельё", "Шторы", "Одеяло, плед, покрывало", "Чехлы", "Мягкая игрушка"]

function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}

function delCategory(button) {

    let div = button.parentElement
    let parent = div.parentElement
    
    if (parent.children.length < 2) {
        div.getElementsByTagName("input")[0].value = ""
        div.removeChild(div.getElementsByTagName("input")[1])
        div.removeChild(div.getElementsByClassName("delButton")[0])
    } else {
        parent.removeChild(div)
    }
}



function addEvent(product, i) {
    let input = product.getElementsByTagName("input")[0]
    input.addEventListener("input", function() {
        let delButton = document.createElement("div")
        let field= document.createElement("input")

        // Добавление атрибута list для пытадающего списка
        if (input.value == "Одежда") {
            field.setAttribute("list", "clothes")
            field.setAttribute("name", "clothes")
        } else if (input.value == "Обувь") {
            field.setAttribute("list", "shoes")
            field.setAttribute("name", "shoes")
        } else if (input.value == "Домашний интерьер") {
            field.setAttribute("list", "home")
            field.setAttribute("name", "home")
        } else if (input.value == "Аксессуары") {
            field.setAttribute("list", "accessories")
            field.setAttribute("name", "accessories")
        } else {
            return;
        }

        field.classList.add("form__input")
        field.classList.add("_req")

        // Если категория изменилась, нужно удалить уточняющий список 
        // прошлой категории
        if (product.children.length > 1) {
            product.removeChild(product.lastChild)
        }
        
        // Добавление уточняющего списка
        product.appendChild(field)

        
        field.addEventListener("input", function() {
            if (contains(clothes, field.value) || contains(shoes, field.value)
                || contains(accessories, field.value) || contains(home, field.value)) {
                delButton.classList.add("delButton")
                delButton.addEventListener("click", function() {
                    delCategory(delButton)
                })
                delButton.classList.add("shadow")
                delButton.style.marginTop = "5px"
                delButton.style.height = "20px"
                delButton.style.paddingTop = "5px"
                delButton.style.paddingBottom = "5px"
                delButton.style.width = "80px"
                delButton.style.textAlign = "center"
                delButton.textContent = "Удалить"
                product.appendChild(delButton)
            }
        })
    })
}

function addCategory() {
    let list = productList.lastElementChild.children
    if (list.length == 3) {
            let div = document.createElement("div")
            let input = document.createElement("input")
            input.setAttribute("list", "products")
            div.appendChild(input)
            input.classList.add("form__input")
            input.classList.add("_req")
            input.setAttribute("onkeyup", "inputChanged(this)")
            productList.appendChild(div)
            addEvent(div)
    }
}

addEvent(productList.getElementsByTagName("div")[0], 0)

let number = document.getElementsByClassName("number")[0].getElementsByTagName("input")[0]
number.addEventListener("keyup", function(e) {
    if (number.value.length == 1 && e.key != "Backspace") {
        number.value = "(" + number.value
    }
    if (number.value.length == 4 && e.key != "Backspace") {
        number.value += ")"
    }

    let valueLength = number.value.length

    // Если пользователь перестал вводить, телефон проверяется
    setTimeout(function() {
        if (valueLength == number.value.length) {
            console.log(number.value.match(/((\()?\d(\))?){10}/i))
        }
    }, 2000)
})



function validateDate() {
    setTimeout(function() {
        let inputDate   = document.getElementsByClassName("date")[0].valueAsDate.toString()
        let currentDate = Date().toString()
        currentDate = currentDate.match(/^.*\s\d{4}/i).pop()
        inputDate   = inputDate.match(/^.*\s\d{4}/i).pop()
        if (inputDate < currentDate) {
            alert("Введена некорректная дата")
            return false
        }
        return true
    }, 4000)
}

function submitClicked() {
    let inputs = document.getElementsByTagName("input")
    for (let i = 0; i < input.length; i++ ){
        if (inputs[i].value.trim().length == 0) {
            alert("Не все поля заполнены")
            console.log(false)
            
            return false
        }
    }
    alert("Данные отправлены на сервер")
    console.log(true)
    return true
}

function inputChanged(sender) {
    if (sender.value != "Одежда" && sender.value != "Обувь" && sender.value != "Домашний интерьер" && sender.value != "Аксессуары"){
        let parent = sender.parentElement
        parent.removeChild(parent.getElementsByTagName("input")[1])

        if (parent.children.length == 2) {
            parent.removeChild(parent.lastElementChild)
        }

    }
}