function saveList() {
    const items = [];
    const lis = document.querySelectorAll('#myUL li');
    lis.forEach(li => {
      items.push({
        text: li.childNodes[0].nodeValue,
        checked: li.classList.contains('checked')
      });
    });
    localStorage.setItem('todoList', JSON.stringify(items));
  }

  function loadList() {
    const data = JSON.parse(localStorage.getItem('todoList'));
    if (!data) return;
  
    data.forEach(item => {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(item.text));
      if (item.checked) li.classList.add("checked");
  
      const span = document.createElement("SPAN");
      const txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);
  
      document.getElementById("myUL").appendChild(li);
    });
  
    addCloseEvent();
  }
  
  function addCloseEvent() {
    const close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        const li = this.parentElement;
        li.remove();
        saveList();
      }
    }
  }
  
  document.querySelector('ul').addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
      saveList();
    }
  }, false);
  
  function newElement() {
    const inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
      alert("Você deve escrever algo!");
      return;
    }
  
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(inputValue));
  
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  
    document.getElementById("myUL").appendChild(li);
    document.getElementById("myInput").value = "";
  
    addCloseEvent();
    saveList();
  }
  
  window.onload = loadList;