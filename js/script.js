'use strict'

import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'
let buttonOpenModalWindow = document.querySelector('.header__buttons').lastElementChild;
let modalWindow = document.querySelector('.modal-window');
let authorizationForm = document.forms.authorizationForm;
let authorizationInput = document.querySelector('.authorization__body');
let authorizationButtons = document.querySelector('.authorization__buttons');
let buttonOpenAuthorization = document.querySelector('.header__buttons').firstElementChild;
let windowAuthorization = document.querySelector('.authorization');
let authorizationErrorNull = windowAuthorization.querySelector('.authorization__error-null');
let mainProducts = document.querySelector('.main__products');

let productsMainItems = document.querySelector(".products-main__items");
let mainItemsContainer = document.querySelector('.main__container');
let mainPromo = document.querySelector('.main__promo');
let headerLogo = document.querySelector(".header__logo");
let productsItems = document.querySelector(".main__items");


let getData = async function (url) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Ошибка по адресу ${url},
		статус ошибки ${response.status}`)
	};

	return await response.json();
}

function createCarts(item) {
	const {
		id,
		name,
		stars,
		price,
		category,
		image,
		products
	} = item;
	productsMainItems.insertAdjacentHTML("beforeend", `
	<div class="products-main__item item-products-main animate__animated  animate__backInUp" id="${id}" data-products="${products}">
	<div class="item-products-main__img" href="#"><img src="${image}" alt="item">
	</div>
	<div class="item-products-main__block-info">
		<div class="item-products-main__block-info-top">
			<div class="item-products-main__name">${name}</div>
			<div class="item-products-main__time">50 мин</div>
		</div>
		<div class="item-products-main__block-info-bottom">
			<div class="item-products-main__grade">${stars}</div>
				<div class="item-products-main__prise">
					<span>От ${price} ₽</span>
					<span>${category}</span>
				</div>
			</div>
		</div>
	</div>
	`
	);
};
getData("db/partners.json").then(function (data) {
	data.forEach(createCarts);
});

buttonOpenModalWindow.addEventListener("click", getModalWindow);
function getModalWindow() {
	if (!mainProducts.classList.contains('active-authorization')) {
		getWindowAuthorization();
		return;
	}
	modalWindow.style.display = "flex"
	document.body.style.overflow = "hidden";
};

modalWindow.addEventListener("click", removeModalWindow);
function removeModalWindow(event) {
	if (event.target.closest('.modal-window__fon') || event.target.closest('#modal-window__two') || event.target.closest('.modal-window__cancel')) {
		modalWindow.style.display = "none";
		document.body.style.overflow = "visible";
	};
};


buttonOpenAuthorization.addEventListener("click", getWindowAuthorization);
function getWindowAuthorization() {
	windowAuthorization.style.display = "flex";
	document.body.style.overflow = "hidden";

};

windowAuthorization.addEventListener("click", removeWindowAuthorization);
function removeWindowAuthorization(event) {
	if (event.target.closest('.authorization__fon') || event.target.closest('.authorization__button-cancel')) {
		windowAuthorization.style.display = "none";
		document.body.style.overflow = "visible";
		authorizationErrorNull.setAttribute("hidden", "");
		authorizationInput.firstElementChild.style.border = "1px solid rgb(96, 92, 92)"
		authorizationInput.lastElementChild.style.border = "1px solid rgb(96, 92, 92)"
	};
};


authorizationForm.addEventListener("submit", giveAuthorizationForm);
function giveAuthorizationForm(event) {
	let j1 = 0;
	let j2 = 0;

	login: for (let i = 0; i < authorizationInput.firstElementChild.value.length; i++) {
		if (!authorizationInput.firstElementChild.value[i] == " ") {
			j1++;
		}
	};
	password: for (let i = 0; i < authorizationInput.lastElementChild.value.length; i++) {
		if (!authorizationInput.lastElementChild.value[i] == " ") {
			j2++;
		}
	};
	if (j1 == 0 || j2 == 0) {
		authorizationErrorNull.removeAttribute("hidden");
		event.preventDefault();
		if (j1 == 0) {
			authorizationInput.firstElementChild.style.border = "1px solid red"
		};
		if (j2 == 0) {
			authorizationInput.lastElementChild.style.border = "1px solid red"
		};
		return;
	};
	windowAuthorization.style.display = "none";
	buttonOpenAuthorization.innerHTML = "Выйти";
	windowAuthorization.style.display = "none";
	authorizationInput.firstElementChild.value = "";
	authorizationInput.lastElementChild.value = "";

	mainProducts.classList.add('active-authorization');
	buttonOpenAuthorization.addEventListener("click", getWindowAuthorization1);
	document.body.style.overflow = "visible";
	function getWindowAuthorization1() {
		mainPromo.style.display = "block";
		mainItemsContainer.firstElementChild.innerHTML = '';
		mainItemsContainer.lastElementChild.innerHTML = '';
		mainProducts.style.display = "block";
		mainItemsContainer.style.display = "none";

		buttonOpenAuthorization.innerHTML = "";
		windowAuthorization.style.display = "none";
		mainProducts.classList.remove('active-authorization');
		buttonOpenAuthorization.insertAdjacentHTML(
			'afterbegin',
			` 
			<div><img src="img/header/header__icon-user.svg" alt="icon"></div> 
			<div>Войти</div> 
			`
		);
		buttonOpenAuthorization.addEventListener("click", getWindowAuthorization);
		function getWindowAuthorization() {
			windowAuthorization.style.display = "flex";
			document.body.style.overflow = "hidden";

		};
		document.body.style.overflow = "visible";
	};

};

windowAuthorization.addEventListener("focusin", focusAuthorizationForm, { "capture": true })
function focusAuthorizationForm() {
	//authorizationErrorSpace.setAttribute("hidden", "");
	authorizationErrorNull.setAttribute("hidden", "");
	authorizationInput.firstElementChild.style.border = "1px solid rgb(96, 92, 92)"
	authorizationInput.lastElementChild.style.border = "1px solid rgb(96, 92, 92)"
};

mainItemsContainer.style.display = "none";
productsMainItems.addEventListener("click", clickProduct);

function getMainHeader(item) {
	const {
		id,
		name,
		stars,
		price,
		category,
		image,
		products
	} = item;
	i++;
	if (id === a) {
		mainItemsContainer.firstElementChild.insertAdjacentHTML(
			"afterbegin",
			`
			<div class="main__title">${name}</div>
			<div class="main__grade">${stars}</div>
			<div class="main__price">
				<span>От ${price} ₽</span>
				<span>${category}</span>
			</div>
		`
		);
	};

};
let a;
function clickProduct(event) {
	if (!mainProducts.classList.contains('active-authorization')) {
		if (event.target.closest('.products-main__item')) {
			getWindowAuthorization();
		};
		//
	} else if (mainProducts.classList.contains('active-authorization') && event.target.closest('.products-main__item')) {

		mainProducts.style.display = "none";
		mainItemsContainer.style.display = "block";
		mainPromo.style.display = "none";

		///

		getData("db/partners.json").then(function (data) {
			//getMainHeader(data);
			a = event.target.closest('.products-main__item').id;
			console.log(a);
			data.forEach(getMainHeader, a)
		});
		getData(`${event.target.closest('.products-main__item').dataset.products}`).then(function (data) {
			data.forEach(getMainHeaderAndItems)
		});
		///

	};
};
let i = 0;
function getMainHeaderAndItems(item) {
	const {
		id,
		name,
		description,
		price,
		image,
	} = item;
	getMainItems(`${image}`, `${name}`, `${description}`, `${price}`, `${id}`);

};
function getMainItems(itemMainImg, itemMainTitle, itemMainText, ItemMainPrice, itemMainId) {
	mainItemsContainer.lastElementChild.insertAdjacentHTML(
		"beforeend",
		`
		<div class="main__item item-main animate__animated animate__backInDown" id="${itemMainId}">
			<div class="item-main__img"><img src="${itemMainImg}" alt="img"></div>
			<div class="item-main__title">${itemMainTitle}</div>
			<div class="item-main__text">${itemMainText}</div>
			<div class="item-main__block-bottom">
				<div class="item-main__button">В корзину</div>
				<div class="item-main__price">${ItemMainPrice} ₽</div>
			</div>
		</div>
		`
	);
};
headerLogo.addEventListener("click", setHeaderLogo)
function setHeaderLogo() {
	mainProducts.style.display = "block";
	mainItemsContainer.style.display = "none";
	mainPromo.style.display = "block";
	mainItemsContainer.firstElementChild.innerHTML = '';
	mainItemsContainer.lastElementChild.innerHTML = '';
}

new Swiper('.swiper',
	{
		loop: true,
		sliderPerView: 1,
	});
new WOW().init();
