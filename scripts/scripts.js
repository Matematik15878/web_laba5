/* Міняє контент 2 блоків місцями */
function swapBlocks() {

  var blocks_1 = document.getElementsByClassName('name1');
  var blocks_6 = document.getElementsByClassName('name6');

  var temp = blocks_1[0].innerHTML;
  blocks_1[0].innerHTML = blocks_6[0].innerHTML;
  blocks_6[0].innerHTML = temp;
}

/* Знаходить площу правильного п'ятикутника */
function findSquare() {

  var input1_value = parseFloat(document.querySelector('.input_1').value);
  var input2_value = parseFloat(document.querySelector('.input_2').value);

  if (!isNaN(input1_value) && !isNaN(input2_value)) {
      var result = (5 / 12 * input1_value * input2_value).toFixed(2)
      document.querySelector('#result').innerHTML = 'Результат = ' + result;
  } else {
      alert('Неправильне введення');
  }
}

/* Записує число в оберненому порядку */
function rollNumber() {
  var number = parseFloat(document.querySelector('.input_3').value);
  var new_number = 0;

  if (!isNaN(number)) {
    while (number >= 1) {
      new_number = new_number * 10 + Math.floor(number % 10);
      number = Math.floor(number / 10);
    }
    setCookie("new_number", new_number, 1);
    alert(new_number);
  } else {
    alert('Неправильне введення');
  }
}

/* Записує значення у cookies */
function setCookie(name, value, days) {
  var date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

/* Зчитує значення з cookies */
function getCookie(name) {
  var name_to_find = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(name_to_find) == 0) return c.substring(name_to_find.length, c.length);
  }
  return null;
}

/* Функція зміни кольору рамок номерних блоків */
function changeColor() {

  var input_elements = document.getElementsByClassName("input_4");
  var color = input_elements[0].value; 
  colorBorders(color);
}

/* Функція, що змінює колір рамок на заданий */
function colorBorders(color) {
  if (color !== "") {

    localStorage.setItem('borders_color', color);

    var block_1 = document.querySelector('.website_head');
    var block_2 = document.querySelector('.name1');
    var block_3 = document.querySelector('.name3');
    var block_4 = document.querySelector('.name6');
    var block_5 = document.querySelector('.name7');
    var block_6 = document.querySelector('.name8');
    var block_7 = document.querySelector('.website_foot');

    block_1.style.border = '0.5vh solid ' + color;
    block_2.style.border = '0.5vh solid ' + color;
    block_3.style.border = '0.5vh solid ' + color;
    block_4.style.border = '0.5vh solid ' + color;
    block_5.style.border = '0.5vh solid ' + color;
    block_6.style.border = '0.5vh solid ' + color;
    block_7.style.border = '0.5vh solid ' + color;
  } 
  else {
    alert("Введіть колір!");
  }
}

/* Робить блоки 5 завдання видимими */
function unhidBlocks() {

  var block1 = document.getElementById('task_50');
  var block2 = document.getElementById('task_51');

  block1.style.visibility = 'visible';
  block2.style.visibility = 'visible';
}

/* Вводить зміни для 5 завдання */
function changeCSS() {

  var tag = document.getElementsByClassName('input_5')[0].value;
  var css_instr = document.getElementsByClassName('input_6')[0].value;

  var elements = document.querySelectorAll(tag);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.cssText = css_instr;
  }

  localStorage.setItem('savedTag', tag);
  localStorage.setItem('savedCSS', css_instr);

  unhidBlocks();
}

/* Функція, що бере інформацію з локального сховища */
function loadTegsFromStorage() {

  var savedTag = localStorage.getItem('savedTag');
  var savedCSS = localStorage.getItem('savedCSS');


  var elements = document.querySelectorAll(savedTag);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.cssText = savedCSS;
  }
}

/* Видаляє записи з локального сховища */
function removeFromLocalStorage() {

  var savedTag = localStorage.getItem('savedTag');
  var savedCSS = localStorage.getItem('savedCSS');

  var elements = document.querySelectorAll(savedTag);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.cssText = '';
  }

  localStorage.removeItem('savedTag');
  localStorage.removeItem('savedCSS');

  unhidBlocks();
}

/* Функція, що виконується при відкритті вікна */
window.onload = function () {

  loadTegsFromStorage();

  var saved_color = localStorage.getItem('borders_color');
  colorBorders(saved_color);

  var number = getCookie("new_number");
  var new_number = 0;

  if (number !== null) {
    var userConfirmation = confirm("Перевернуте число: " + number + "\nНатисніть 'ОК' для видалення cookies");

    if (userConfirmation) {
      document.cookie = "new_number=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      alert("cookies було успішно видалено");
      var elements = document.getElementsByClassName('input_3');
      var element = elements[0];
      while (number >= 1) {
        new_number = new_number * 10 + Math.floor(number % 10);
        number = Math.floor(number / 10);
      }
      element.value = new_number;
    }
  }
};