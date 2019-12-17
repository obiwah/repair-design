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

$(function () {
	let $modal =  $(`.modal`),
		$modalBtn = $(`[data-toggle=modal]`),
		$closeBtn = $(`.modal__close`),
		$scrollUpBtn = $(`.scroll-up`);

	function modalClose () {
		$modal.removeClass(`modal--visible`);
	}

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

	$(document).scroll((scrollEvent) => {
		if (scrollEvent.originalEvent.target.defaultView.scrollY > 450 ) {
			$scrollUpBtn.removeClass(`scroll--invisible`)
		} else {
			$scrollUpBtn.addClass(`scroll--invisible`);
		}
	});

	//initialize swiper when document ready
	let mySwiper = new Swiper ('.swiper-container', {
		// Optional parameters
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
		}
	})

	// let next = $
});
