import { LinkedList } from './linkedlist.js';

const list = new LinkedList();
const display = document.getElementById('linkedListDisplay');

window.appendNode = function () {
  const value = document.getElementById('valueInput').value;
  if (!value) return;
  list.append(value);
  document.getElementById('valueInput').value = '';
  renderList();
};

window.clearList = function () {
  list.clear();
  renderList();
};

function renderList() {
  display.innerHTML = '';
  let current = list.headNode;
  while (current) {
    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'node';
    nodeDiv.textContent = current.value;
    display.appendChild(nodeDiv);
    current = current.nextNode;
  }

  const nullDiv = document.createElement('div');
  nullDiv.className = 'node';
  nullDiv.style.backgroundColor = '#6c757d';
  nullDiv.textContent = 'null';
  nullDiv.style.pointerEvents = 'none';
  display.appendChild(nullDiv);
}
