// native JS version
//
// document.addEventListener(`DOMContentLoaded`, () => {
// 	const modal =  document.querySelector('.modal'),
// 		modalBtn = document.querySelectorAll(`[data-toggle=modal]`),
// 		closeBtn = document.querySelector('.modal__close'),
// 		modalClose = () => modal.classList.remove(`modal--visible`);
//
// 	modalBtn.forEach(element => {
// 		element.addEventListener(`click`, () => {
// 			modal.classList.add(`modal--visible`);
//
// 			modal.addEventListener(`click`, (clickEvent) => {
// 				if (clickEvent.target.classList[0] === `modal`) modalClose();
// 			});
//
// 			document.addEventListener(`keydown`, (keyEvent) => {
// 				if (keyEvent.key === `Escape`) modalClose();
// 			});
// 		});
// 	});
//
// 	closeBtn.addEventListener(`click`, modalClose);
// });

$(function () { 												//= document.addEventListener(`DOMContentLoaded`
	const $modal = $(`.modal`),
			$modalBtns = $(`[data-toggle=modal]`),
			$closeBtn = $(`.modal__close`),
			$submitBtns = $(`[data-toggle=submit]`),
			$scrollUpBtn = $(`.scroll-up`);

	$modalBtns.on(`click`, function () {
		$modal.removeClass(`animated faster fadeOut`)
					.addClass(`animated faster fadeIn`)
					.addClass(`modal--visible`);

		$modal.on(`click`, (clickEvent) => {
			if (clickEvent.target.classList.contains(`modal`)) modalClose();
		});

		$(document).on(`keydown`, (keyEvent) => {
			if (keyEvent.key === `Escape`) modalClose();
		});
	});

	$closeBtn.on(`click`, modalClose);

	function modalClose() {
		$modal.removeClass(`animated faster fadeIn`)
					.addClass(`animated faster fadeOut`)
					.removeClass(`modal--visible`);
	}

	$modalBtns.each((i, btn) => {
		$(btn).hover(() => { //mouseenter handler
			if ($(window).width() >= 992)	$(btn).addClass(`animated pulse`);
		}, () => { //mouseleave handler
			if ($(window).width() >= 992) $(btn).removeClass(`animated pulse`);
		});
	});

	//visibility and animation options for .scroll-up element
	// $(document).on(`scroll`, (scrollEvent) => {
	// 	if (scrollEvent.originalEvent.target.defaultView.scrollY > 450 ) {
	// 		$scrollUpBtn.removeClass(`animated fadeOutRight`)
	// 								.addClass(`animated fadeInRight`)
	// 								.removeClass(`scroll--invisible`);
	// 	} else {
	// 		$scrollUpBtn.removeClass(`animated fadeInRight`)
	// 								.addClass(`animated fadeOutRight`)
	// 								.addClass(`scroll--invisible`);
	// 	}
	// });

	// let stepsSwiper =  new Swiper (`.steps__swiper-container`, {
	// 	wrapperClass: `steps__swiper-wrapper`,
	// 	slideClass: `steps__swiper-slide`,
	// 	loop: true,
	// 	navigation: {
	// 		nextEl: `.steps__swiper-button-next`,
	// 		prevEl: `.steps__swiper-button-prev`,
	// 	},
	// 	pagination: {
	// 		el: `.steps__swiper-pagination`,
	// 		type: `bullets`,
	// 	},
	// 	grabCursor: true,
	// });

	//initialize swiper for projects section
	let projectsSwiper = new Swiper('.projects .swiper-container', {
		// Optional parameters
		spaceBetween: 1,
		loop: true,
		navigation: {
			nextEl: '.projects .swiper-button-next',
			prevEl: '.projects .swiper-button-prev',
		},
		pagination: {
			el: '.projects .swiper-pagination',
			type: 'bullets',
		},
	});

	// initialize wow plugin
	let wow = new WOW({
			mobile: false //don't play wow animation on mob devs
		}
	);
	wow.init();

	//form validation
	$(`.form`).each(function (i, form) {
		$(form).validate({
			rules: {
				userName: {
					required: true,
					rangelength: [2, 15]
				},
				userPhone: {
					required: true,
					minlength: 18,
				},
				userEmail: {
					required: true,
					email: true
				},
				[`policy-checkbox`]: {
					required: true,
				}
			},
			messages: {
				userName: {
					required: "Заполните поле",
					rangelength: "От 2 до 15 букв",
				},
				userPhone: {
					required: "Заполните поле",
					minlength: "Телефон в формате: +7 (xxx) xxx-xx-xx",
				},
				userEmail: {
					required: "Заполните поле",
					email: "Email должен быть в формате name@domain.com"
				},
				[`policy-checkbox`]: {
					required: "Соглашайтесь!"
				}
			},
			errorClass: "invalid",
			errorElement: "div",
			submitHandler: function (form) {
				$.ajax({
					type: `post`,
					url: `send.php`,
					data: $(form).serialize(),
					success: function (response) {
						form.reset();
						alert(`Форма отправлена, мы свяжемся с вами через 10 минут`);

						if ($(form).hasClass('modal__form')) modalClose();

						ym(56920936, 'reachGoal', 'formSubmit');
						return true;
					},
					error: function (jqXHR, textStatus, errorThrown) {
						console.error(`Ошибка отправки формы. jqXHR: ${jqXHR}, textStatus: ${textStatus}, errorThrown: ${errorThrown}`);
					}
				})
			},
		});
	});

	//phone mask
	$(`[type="tel"]`).mask(`+7 (000) 000-00-00`)
		.each(function(i, element) {
			$(element).on(`focus`, () => {
				$(this).attr("placeholder", "+7 (___) ___ __-__");
			});
		});

	//YouTube video embedding
	const $videoContainer = $(`.control__video`);

	$(`.control__play`).on(`click`, function onYouTubeIframeAPIReady() {	// This function creates an <iframe> (and
		// YouTube player) after the API code downloads.
		let player = new YT.Player('player', {
			width: $videoContainer.width(),
			height: $videoContainer.height(),
			videoId: 'eyNNuaqvT7I',
			playerVars: {
				color: `white`,
				iv_load_policy: 3,
				// modestbranding: 1,
				rel: 0,
				showinfo: 0,
				start: 179,
			},
			events: {
				'onReady': onPlayerReady,
			}
		});
	});

	function onPlayerReady(event) {	// The API will call this function when the video player is ready.
		event.target.setVolume(10);
		event.target.playVideo();
	}

	new Blazy();

	let mapY = document.getElementById(`yandex-map`).getBoundingClientRect().top;
	let isMap = false;

	document.body.onscroll = function () {
		if (window.pageYOffset > mapY && !isMap) {
			isMap = true;

			// initialize 2gis map api
			// DG.then(function () {
			// 	let map = DG.map('yandex-map', {
			// 		center: [47.244734, 39.723227],
			// 		zoom: 17,
			// 		scrollWheelZoom: false,
			// 		fullscreenControl: false
			// 	});
			//
			// 	myIcon = DG.icon({
			// 		iconUrl: 'img/icons/locator.png',
			// 		iconSize: [32, 32]
			// 	});
			//
			// 	DG.marker([47.244734, 39.723227], {
			// 		icon: myIcon
			// 	}).addTo(map);
			// });

			// initialize Yandex map
			ymaps.ready(initMap);

			function initMap() {
				let yandexMap = new ymaps.Map("yandex-map", {
					center: [47.244734, 39.723227],
					zoom: 17,
					controls: ['zoomControl']
				});

				yandexMap.behaviors.disable([`scrollZoom`]);

				let decorum = new ymaps.Placemark([47.244734, 39.723227], {}, {});

				yandexMap.geoObjects.add(decorum);
			}
		}
	}
});