initHTML();

//Получаем данные и на их основе отображаем список пользователей. 
function initHTML() {
  fetch('static/default.json')
    .then(response => response.json())
    .then(data => {
      const list = document.querySelector(".table");
      const table = getParentList(data);
      list.appendChild(table);
    });
}

function getParentList(array) {
  let parents = document.createElement('ul');
  parents.className = "body";

  array.map(item => {
    findParent(item, parents, array)
  });
  return parents;
}

function findParent(item, parents, array) {
  if (item.parentId === 0) {
    const parent = createItem(item, parents);
    parents.innerHTML += parent;
  } else {
    const childsFolder = parents.getElementsByClassName(`parent-${item.parentId}`)[0];
    if (!childsFolder) {

      let upperParent = array.find((obj) => obj.id === item.parentId)
      findParent(upperParent, parents, array)
    }
    else {
      insertItem(item, parents)
    };
  }
}

function insertItem(item, parents) {
  const childsFolder = parents.getElementsByClassName(`parent-${item.parentId}`)[0].lastElementChild;
  const parent = createItem(item, parents);
  childsFolder.innerHTML += parent;
}

function createItem(array, parents) {
  let str = `
    <li class="parent parent-${array.id}">
      <div class="${array.isActive ? "row" : "row not-active"}">
        <span class="cell num">${array.id}</span>
        <span class="cell name">${array.name}</span>
        <span class="cell balance">${array.balance}</span>
        <span class="cell mail">${array.email}</span>
        <span class="cell button-active"><button class="active">Show active</button></span>
        <span class="cell button-arrow"><button class="arrow"></button></span>
      </div>
      <ul class="childs hide">

      </ul>
    </li>
  `
  if (parents.getElementsByClassName(array.id).length === 1) {
    return ''
  };
  return str;
}

let table = document.querySelector(".table");
table.addEventListener("click", clickButton);

function clickButton(event) {
  const button = event.target;

  if (button.classList.contains("arrow")) {
    const parentSibling = button.parentElement.parentElement.nextElementSibling;
    button.classList.toggle("arrow__hide");
    parentSibling.classList.toggle("hide");
  }

  if (button.classList.contains("active")) {
    const parent = button.parentElement.parentElement.parentElement;
    if (parent.classList.contains("title")) {
      const parentSibling = parent.nextElementSibling;
      button.classList.toggle("active__hide");
      const notActiveUser = parentSibling.querySelectorAll(".not-active");
      for (let elem of notActiveUser) {
        elem.classList.toggle("hide");
      }
    } else {
      const parentSibling = button.parentElement.parentElement.nextElementSibling;
      button.classList.toggle("active__hide");
      const notActiveUser = parentSibling.querySelectorAll(".not-active");
      for (let elem of notActiveUser) {
        elem.classList.toggle("hide");
      }
    }
  }
}