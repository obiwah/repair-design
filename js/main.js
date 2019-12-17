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
			$modalBtn = $(`[data-toggle=modal]`),
			$closeBtn = $(`.modal__close`),
			$scrollUpBtn = $(`.scroll-up`);

	$modalBtn.click(function() {
		$modal.addClass(`modal--visible`);

		$modal.click((clickEvent) => {
			if (clickEvent.target.classList.contains(`modal`)) modalClose();
		});

		$(document).keydown((keyEvent) => {
			if (keyEvent.key === `Escape`) modalClose();
		});
	});

	$closeBtn.click(modalClose);

	function modalClose () {
		$modal.removeClass(`modal--visible`);
	}

	$(document).scroll((scrollEvent) => {
		if (scrollEvent.originalEvent.target.defaultView.scrollY > 450 ) {
			$scrollUpBtn.removeClass(`scroll--invisible`)
		} else {
			$scrollUpBtn.addClass(`scroll--invisible`);
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

	//initialize swiper
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

	let $next = $('.projects .swiper-button-next'),
			$prev = $('.projects .swiper-button-prev'),
			$bullets = $('.projects .swiper-pagination');

	$bullets.css(`left`, $prev.width() + 30);
	$next.css(`left`, $prev.width() + $bullets.width() + 60);
});
