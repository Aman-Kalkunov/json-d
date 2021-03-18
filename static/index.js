initHTML()

// Получаем данные и на их основе отображаем список пользователей. 
function initHTML() {
  fetch('static/2000.json')
    .then(response => response.json())
    .then(data => {
      const list = document.querySelector(".body")
      const parents = getArrayParents(data)
      list.innerHTML += addParents(parents)

      getChildren(data)
      removeButton()
    })
}

// Проходим по массиву и создаем объект родителей с нулевым родительским id.
function getArrayParents(data) {
  let parents = {}

  data.forEach((item) => {
    if (item.parentId === 0) parents[item.id] = item
    else if (item.parentId === item.id) {
      item.parentId = 0
      parents[item.id] = item
    }
  })

  return parents
}

// Выводим родителей по порядку возрастания.
function addParents(obj) {
  let parents = ''
  for (key in obj) {
    parents += createItem(obj[key])
  }
  return parents
}

// Проходим по массиву повторно
function getChildren(data) {
  const arrChildren = []

  data.forEach((item) => {
    const parent = document.getElementById(`${item.parentId}`)

    if (item.parentId !== 0 && parent) {
      parent.querySelector('.children').innerHTML += createItem(item)
    }
    else if (!parent && item.parentId !== 0) arrChildren.push(item)
  })

  // Если остались элементы без родителей, запускаем рекурсию только для них.
  if (arrChildren.length) getChildren(arrChildren)
}

// Создаем ячейку таблицы.
function createItem(array) {
  const item = `
    <li id="${array.id}" class="parent">
      <div class="${array.isActive ? "row" : "row not-active not-active_red"}">
        <span class="cell num">${array.id}</span>
        <span class="cell name">${array.name}</span>
        <span class="cell balance">${array.balance}</span>
        <span class="cell mail">${array.email}</span>
        <span class="cell button-active">${array.isActive ? "Active" : "Not-Active"}</span>
        <span class="cell button-arrow"><button class="arrow"></button></span>
      </div>
      <ul class="children hide"></ul>
    </li>
  `
  return item
}

// После отрисовки всех элементов убираем кнопки у тех, кто не имеет дочерних.
function removeButton() {
  const parents = document.querySelectorAll('.parent')

  parents.forEach(item => {
    const childFolder = item.querySelector('.children')

    if (childFolder.children.length === 0) {
      item.querySelector(".button-arrow").innerHTML = ''
    }
  })
}

// Работа кнопок
const table = document.querySelector(".table")
table.addEventListener("click", clickButton)

function clickButton(event) {
  const button = event.target
  const isArrow = button.classList.contains("arrow")
  const isActive = button.classList.contains("active")

  if (isArrow) {
    const parentSibling = button.parentElement.parentElement.nextElementSibling
    button.classList.toggle("arrow__hide")
    parentSibling.classList.toggle("hide")
  }

  if (isActive) {
    button.classList.toggle("active__hide")
    const notActiveUser = document.querySelectorAll('.not-active')
    for (let elem of notActiveUser) elem.classList.toggle("not-active_red")
  }
}