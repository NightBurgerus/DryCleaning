/*
    TODO:
        - Добавить регулярку на телефон
        - Добавить вывод сообщения о невалидном поле
        - Сделать кнопку сброс

*/

let productList = document.getElementsByClassName("productList")[0]
let addButton   = document.getElementsByClassName("product")[0].lastChild

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

function delCategory(i) {
    category = productList.getElementsByTagName("div")[i]
    mainList = category.getElementsByTagName("input")[0]
    secondList = category.getElementsByTagName("input")[1]
    delButton  = category.getElementsByTagName("div")[0]

    if (productList.children.length < 2) {
        mainList.value = ""                 // Очистка основной категории
        category.removeChild(secondList)    // Удаление уточняющего списка 
        category.removeChild(delButton)     // Удаление кнопки удаления
    } else {
        productList.removeChild(category)   // Полное удаление строки
    }
    productList.style.height = productList.children.length * productList.firstElementChild.clientHeight + "px";
}

function addEvent(product, i) {
    let input = product.getElementsByTagName("input")[0]
    input.addEventListener("input", function() {
        //let delButton = document.createElement("input")
        let delButton = document.createElement("div")
        let field= document.createElement("input")

        // Добавление атрибута list для пытадающего списка
        if (input.value == "Одежда") {
            field.setAttribute("list", "clothes")
        } else if (input.value == "Обувь") {
            field.setAttribute("list", "shoes")
        } else if (input.value == "Домашний интерьер") {
            field.setAttribute("list", "home")
        } else if (input.value == "Аксессуары") {
            field.setAttribute("list", "accessories")
        } else {
            return;
        }

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
                    delCategory(i)
                })
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
            productList.appendChild(div)
            addEvent(div)
            productList.style.height = productList.children.length * productList.firstElementChild.clientHeight + "px";
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
    let inputDate   = document.getElementsByClassName("date")[0].getElementsByTagName("input")[0].valueAsDate.toString()
    let currentDate = Date().toString()
    currentDate = currentDate.match(/^.*\s\d{4}/i).pop()
    inputDate   = inputDate.match(/^.*\s\d{4}/i).pop()
    console.log(inputDate < currentDate)
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