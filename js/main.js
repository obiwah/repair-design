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
	let $modal =  $(`.modal`),
			$modalBtns = $(`[data-toggle=modal]`),
			$closeBtn = $(`.modal__close`),
			$scrollUpBtn = $(`.scroll-up`);

	$modalBtns.on(`click`, function() {
		$modal.removeClass(`animated faster fadeOut`)
					.addClass(`animated faster fadeIn`)
					.addClass(`modal--visible`);

		$modal.on(`click`,(clickEvent) => {
			if (clickEvent.target.classList.contains(`modal`)) modalClose();
		});

		$(document).on(`keydown`, (keyEvent) => {
			if (keyEvent.key === `Escape`) modalClose();
		});
	});

	$closeBtn.on(`click`, modalClose);

	function modalClose () {
		$modal.removeClass(`animated faster fadeIn`)
					.addClass(`animated faster fadeOut`)
					.removeClass(`modal--visible`);
	}

	//visibility and animation options for .scroll-up element
	$(document).on(`scroll`, (scrollEvent) => {
		if (scrollEvent.originalEvent.target.defaultView.scrollY > 450 ) {
			$scrollUpBtn.removeClass(`animated fadeOutRight`)
									.addClass(`animated fadeInRight`)
									.removeClass(`scroll--invisible`);
		} else {
			$scrollUpBtn.removeClass(`animated fadeInRight`)
									.addClass(`animated fadeOutRight`)
									.addClass(`scroll--invisible`);
		}
	});

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
	let projectsSwiper = new Swiper ('.projects .swiper-container', {
		// Optional parameters
		loop: true,
		navigation: {
			nextEl: '.projects .swiper-button-next',
			prevEl: '.projects .swiper-button-prev',
		},
		pagination: {
			el: '.projects .swiper-pagination',
			type: 'bullets',
		},
		// control: {
		// 	control: stepsSwiper.swiper,
		// }
	});
	//
	// let $next = $('.projects .swiper-button-next'),
	// 		$prev = $('.projects .swiper-button-prev'),
	// 		$bullets = $('.projects .swiper-pagination');
	//
	// $bullets.css(`left`, $prev.width() + 29.5);
	// $next.css(`left`, $prev.width() + $bullets.width() + 29.5 * 2);

	// initialize wow plugin
	let wow = new WOW({
			mobile: false //don't play wow animation on mob devs
		}
	);
	wow.init();

	// modal buttons animation
	$modalBtns.each((i, btn) => {
		$(btn).on(`hover`, () => {
			$(btn).addClass(`animated pulse`);
		}, () => {
			$(btn).removeClass(`animated pulse`);
		});
	});

	//form validation
	$(`.form`).each(function(i, form) {
		$(form).validate({
			rules: {
				// simple rule, converted to {required:true}
				userName: {
					required: true,
					minlength: 2,
					maxlength: 15
				},
				userPhone: "required",
				// compound rule
				userEmail: {
					required: true,
					email: true
				}
			},
			messages: {
				userName: {
					required: "Заполните поле",
					minlength: "Имя не короче 2 букв",
					maxlength: "Имя не длиннее 2 букв"
				},
				userPhone: "Заполните поле",
				userEmail: {
					required: "Заполните поле",
					email: "Email должен быть в формате name@domain.com"
				}
			},
			errorClass: "invalid",
			errorElement: "div",
			submitHandler: function(form) {
				$.ajax({
					type: `post`,
					url: `send.php`,
					data: $(form).serialize(),
					success: function (response) {
						form.reset();
						alert(`Форма отправлена, мы свяжемся с вами через 10 минут`);

						if ($(form).hasClass('modal__form')) modalClose();
					},
					error: function (jqXHR, textStatus, errorThrown) {
						console.error(`jqXHR: ${jqXHR}, textStatus: ${textStatus}, errorThrown: ${errorThrown}`);
					}
				})
			},
		});
	});

	//phone mask
	$(`[type="tel"]`).mask(`+7 (000) 000-00-00`, {
		placeholder: "+7 (___) ___-__-__"
	});

	// initialize Yandex map
	ymaps.ready(initMap);
	function initMap(){
		// Создание карты.
		let yandexMap = new ymaps.Map("yandex-map", {
			// Координаты центра карты.
			// Порядок по умолчанию: «широта, долгота».
			// Чтобы не определять координаты центра карты вручную,
			// воспользуйтесь инструментом Определение координат.
			center: [47.244734, 39.723227],
			// Уровень масштабирования. Допустимые значения:
			// от 0 (весь мир) до 19.
			zoom: 17
		});

		let decorum = new ymaps.Placemark([47.244734, 39.723227], {}, {
			// iconLayout: 'default#image',
			iconImageHref: 'img/icons/locator.png',
			iconImageSize: [32, 32],
			// iconImageOffset: [-3, -42]
		});

		yandexMap.geoObjects.add(decorum);
	}
});