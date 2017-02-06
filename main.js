const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name="item"]')).value;
  const item = {
    text,
    completed: false
  }
  items.push(item);
  displayListItems(items,itemsList);
  localStorage.setItem('items',JSON.stringify(items));
  this.reset();
}

function displayListItems(platesArray = [],platesHtml) {
  platesHtml.innerHTML = platesArray.map((plate,i) => {
    return `
      <li>
        <input type="checkbox" data-index="${i}" id="item-${i}"  ${plate.completed ? 'checked' : ''}>
        <label for="item-${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].completed = !items[index].completed;
  localStorage.setItem('items',JSON.stringify(items));
  displayListItems(items,itemsList);
}

addItems.addEventListener('submit',addItem);
itemsList.addEventListener('click',toggleDone);


displayListItems(items,itemsList);
