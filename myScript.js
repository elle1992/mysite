window.onload = function() { // событие load на объекте window наступает, когда загрузилась вся страница, включая стили, картинки и другие ресурсы
	changeColor();
	getData();
}

let color = ["green", "red", "blue", "orange", "black", "grey", "pink", "yellow"] // массив цветов

function getColor() { // функция, возвращающая цвет
	let random = Math.floor(Math.random() * 8); // получение случайного целого числа от 0 до 7
	return color[random]; // возвращение рандомного цвета из массива цветов
}

function changeColor() { // функция, изменяющая цвет
	let block = document.getElementById('head-div'); // обращаемся на элемент head-div
	block.addEventListener("click", function() { // обработчик события: при клике на head-div меняет его цвет
		block.style.backgroundColor = getColor();
	})
}

function isEmailValid(email) { // функция валидации почты
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
	{
		return true;
	}
 
  	return false;
}

function showAlerts(message) {
	alert(message);
}


function checkName(name) {
	if (name.length === 0) {
		return false;
	}
	return true;
}

function checkEmail(email) {
	if (email.length === 0 || !isEmailValid(email)) {
		return false;
	}
	return true;
}

function checkMessage(message) {
	if (message.length < 50) {
		return false;
	}
	return true;
}

function validateForm() {
	let name = document.getElementById('name').value.trim();
	let message = document.getElementById('message').value.trim();
	let email = document.getElementById('mail').value;

	name_is_valid = checkName(name);
	email_is_valid = checkEmail(email);
	message_is_valid = checkMessage(message);

	if (name_is_valid && email_is_valid && message_is_valid) {
		return true;
	}

	return false;

}

function printResult() {
	let userName = document.getElementById('name').value; // возвращает значение поля "ваше имя"
	let userMail = document.getElementById('mail').value; // возвращает значения поля "ваша почта"
	let userMessage = document.getElementById('message').value; // возвращает значения поля "ваше сообщение"

	let li1 = document.createElement('li'); // создает и возвращает новый элемент li
	li1.innerText = 'Ваше имя: '+ userName; // получает текстовый контент из поля "ваше имя"

	let li2 = document.createElement('li'); // создает и возвращает новый элемент li
	li2.innerText = 'Ваша почта: '+ userMail; // получает текстовый контент из поля "ваша почта"

	let li3 = document.createElement('li'); // создает и возвращает новый элемент li
	li3.innerText = 'Ваше сообщение: '+ userMessage; // получает текстовый контент из поля "ваше сообщение"

	let footer = document.getElementById('footer');
	footer.innerHTML = ''; // старое содержимое футера скрывается/удаляется (с номером телефона, с соц сетями)
	footer.append(li1); // определяет, что содержимое в элементе footer будут возвращены данные с li.innerText (имя)
	footer.append(li2); // почта
	footer.append(li3); // сообщение
}

function getData() {
	let sendBtn = document.getElementById('sendBtn');
	sendBtn.addEventListener("click", function(event) {
		event.preventDefault();

		let userName = document.getElementById('name').value; // возвращает значение поля "ваше имя"
		let userMail = document.getElementById('mail').value; // возвращает значения поля "ваша почта"
		let userMessage = document.getElementById('message').value; // возвращает значения поля "ваше сообщение"

		name_is_valid = checkName(userName);
		email_is_valid = checkEmail(userMail);
		message_is_valid = checkMessage(userMessage);

		if (!name_is_valid) {
			showAlerts('Заполните поле "Ваше имя"');
		}

		if (!email_is_valid) {
			showAlerts('Заполните поле "Ваша почта"');
		}

		if (!message_is_valid) {
			showAlerts('Заполните поле "Ваше сообщение"');
		}

		if (name_is_valid && email_is_valid && message_is_valid) {
			printResult();
			
			let user = {
				name: userName,
				mail: userMail,
				message: userMessage
			};

			send(user);
		}
	})
}

async function send(user) {
	let response = await fetch('myUrl', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(user)
	});
	
	let result = await response.json();
	alert(result.message);
}

	