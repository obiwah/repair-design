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

	$modalBtns.click(function() {
		$modal.removeClass(`animated faster fadeOut`)
					.addClass(`animated faster fadeIn`)
					.addClass(`modal--visible`);

		$modal.click((clickEvent) => {
			if (clickEvent.target.classList.contains(`modal`)) modalClose();
		});

		$(document).keydown((keyEvent) => {
			if (keyEvent.key === `Escape`) modalClose();
		});
	});

	$closeBtn.click(modalClose);

	function modalClose () {
		$modal.removeClass(`animated faster fadeIn`)
					.addClass(`animated faster fadeOut`)
					.removeClass(`modal--visible`);
	}

	//visibility and animation options for .scroll-up element
	$(document).scroll((scrollEvent) => {
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

	new WOW().init();

	// modal buttons animation
	$modalBtns.each((i, btn) => {
		$(btn).hover(() => {
			$(btn).addClass(`animated pulse`);
		}, () => {
			$(btn).removeClass(`animated pulse`);
		});
	});

});
