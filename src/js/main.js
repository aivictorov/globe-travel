window.addEventListener('DOMContentLoaded', () => {
	modalWindows();
	alignModalWindows();
	// tabs();
	// clientsCarousel();
	// partnersCarousel();
});

function modalWindows() {
	document.querySelectorAll('button[modal-button]').forEach((button) => {
		const modal = document.querySelector(`div[modal-window="${button.getAttribute('modal-button')}"]`);

		if (modal) {
			const content = modal.querySelector('.modal__content');

			button.addEventListener('click', () => {
				modal.classList.add('active');
				document.body.classList.add('no-scroll');
			});

			content.addEventListener('click', (event) => {
				event.stopPropagation();
			});

			modal.addEventListener('click', () => {
				modal.classList.remove('active');
				document.body.classList.remove('no-scroll');
			});
		};
	});
};

function alignModalWindows() {
	align();
	window.addEventListener('resize', align);

	function align() {
		document.querySelectorAll('div[modal-window]').forEach((modal) => {
			const content = modal.querySelector('.modal__content');
			if (content.clientHeight <= window.innerHeight - 80) {
				content.classList.add('center');
			} else {
				content.classList.remove('center');
			};
		});
	};
};

// function tabs() {
// 	document.querySelectorAll('.tab').forEach((tab) => {
// 		const button = tab.querySelector('.tab__button');
// 		const icon = tab.querySelector('.tab__icon');
// 		const content = tab.querySelector('.tab__content');

// 		button.addEventListener('click', () => {
// 			icon.classList.toggle('active');
// 			content.classList.toggle('active');
// 		});
// 	});
// };

// function clientsCarousel() {
// 	const owl = $(".clients .owl-carousel");
// 	const btnPrev = $(".clients .slider__btn-prev");
// 	const btnNext = $(".clients .slider__btn-next");

// 	owl.owlCarousel(
// 		{
// 			loop: true,
// 			items: 6,
// 			nav: false,
// 			dots: false,
// 			responsive: {
// 				0: {
// 					items: 2,
// 				},
// 				600: {
// 					items: 3,
// 				},
// 				900: {
// 					items: 4,
// 				},
// 				1200: {
// 					items: 6,
// 				}
// 			}
// 		}
// 	);

// 	btnPrev.click(() => owl.trigger('prev.owl.carousel'));
// 	btnNext.click(() => owl.trigger('next.owl.carousel'));
// };