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
	const modal =  $(`.modal`),
		modalBtn = $(`[data-toggle=modal]`),
		closeBtn = $(`.modal__close`),
		modalClose = () => modal.removeClass(`modal--visible`);

	modalBtn.click(function() {
		modal.addClass(`modal--visible`);

		modal.click((clickEvent) => {
			if (clickEvent.target.classList[0] === `modal`) modalClose();
		});

		$(document).keydown((keyEvent) => {
			if (keyEvent.key === `Escape`) modalClose();
		});
	});

	closeBtn.click(modalClose);
});
