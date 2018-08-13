var ul = document.querySelector('#todoslist'),
    // form = document.querySelector('form'),
    button = document.getElementById('add'),
    item = document.querySelector('#item');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

const liMaker = (text) => {
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
    var removeButton = document.createElement('button');
    removeButton.appendChild(document.createTextNode("X"));
    // removeButton.setAttribute('onClick','removeName('+i+')');
    li.appendChild(removeButton);
    // ul.appendChild(li);
}

button.addEventListener('click', function (e) {
    e.preventDefault();
    itemsArray.push({text: item.value, status: false});
    // itemsArray.push(item.value);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    // list.innerHTML += '<li>' + item.value + '</li>';
    liMaker(item.value);
    item.value = "";
}, false)

data.forEach(item => {
    liMaker(item.text);
});


// function store() {
//     localStorage.setItem('items', JSON.stringify(itemsArray));
//     // window.localStorage.myitems = list.innerHTML;
// }