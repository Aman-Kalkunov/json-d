initHTML();

//Получаем данные и на их основе отображаем список пользователей. 
function initHTML() {
  fetch('static/default.json')
    .then(response => response.json())
    .then(data => {
      const list = document.querySelector(".parent-list");
      const arrayParents = getArrayParents(data);
      list.innerHTML = getParentList(arrayParents);
    });
}

let table = document.querySelector(".parent-list");
table.addEventListener("click", clickButton);

//Сортируем массив по parentId, возвращаем массив с массивами обьектов.
function getArrayParents(data) {
  const parents = data.reduce((obj, item) => {
    const parent = item.parentId;
    if (!obj[parent]) {
      obj[parent] = [];
    }
    obj[parent].push(item);
    return obj;
  }, {});

  return arrayParents = Object.getOwnPropertyNames(parents).map(item => parents[item]);
};

//Собираем HTML.
//Создаем список групп.
function getParentList(array) {
  let parentList = '';

  for (let i = 0; i < array.length; i++) {
    const parent =
      `
    <li class="parent border">
      <div class="name__heading">
        <h2>Group number: ${array[i][0].parentId}</h2>
        <div class="button-box">
          <button class="active">Show active</button>
          <button class="arrow"></button>
        </div>
      </div>
      <ul class="list">
      ${getUserList(array[i])}
      </ul>
    `
    parentList += parent;
  }
  return parentList;
}

//Создаем список пользователей.
function getUserList(array) {
  let userList = '';

  for (let i = 0; i < array.length; i++) {
    const user =
      `
      <li class="${array[i].isActive ? "name border" : "name border not-active"}">
        <div class="name__heading">
          <h3>${array[i].name}</h3>
          <div class="button-box">
            <button class="arrow"></button>
          </div>
        </div>
        <ul class="list">
          <li class="info border"><span class="info__span">Balance: </span>${array[i].balance}</li>
          <li class="info border"><span class="info__span">Email: </span>${array[i].email}</li>
        </ul>
      </li>
    `
    userList += user;
  }
  return userList;
}

//Обрабатываем клик покнопкам.
function clickButton(event) {
  const button = event.target;

  if (button.classList.contains("arrow")) {
    const parentSibling = button.parentElement.parentElement.nextElementSibling;
    button.classList.toggle("arrow__hide");
    parentSibling.classList.contains("list") ? parentSibling.classList.toggle("show") : false;
  }

  if (button.classList.contains("active")) {
    const parentSibling = button.parentElement.parentElement.nextElementSibling;
    button.classList.toggle("active__hide");
    const notActiveUser = parentSibling.querySelectorAll(".not-active");
    for (let elem of notActiveUser) {
      elem.classList.toggle("hide");
    }
  }
}