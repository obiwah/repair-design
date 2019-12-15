$(function () {
	const modal = $(`.modal`),
		modalBtn = document.querySelectorAll(`[data-toggle=modal]`),
		closeBtn = document.querySelector('.modal__close'),
		modalClose = () => modal.classList.remove(`modal--visible`);
	console.log(modal);

	modalBtn.forEach(element => {
		element.addEventListener(`click`, () => {
			modal.classList.add(`modal--visible`);

			modal.addEventListener(`click`, (clickEvent) => {
				if (clickEvent.target.classList[0] === `modal`) modalClose();
			});

			document.addEventListener(`keydown`, (keyEvent) => {
				if (keyEvent.key === `Escape`) modalClose();
			});
		});
	});

	closeBtn.addEventListener(`click`, modalClose);
})
