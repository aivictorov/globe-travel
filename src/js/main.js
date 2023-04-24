window.addEventListener('DOMContentLoaded', () => {
	modalWindows();
	alignModalWindows();
	dropdowns()
	dualRangeInputs();
	tabs();
	// carousel();
});

function dropdowns() {
	document.querySelectorAll('button[dropdown-button]').forEach((button) => {
		const dropdown = document.querySelector(`div[dropdown="${button.getAttribute('dropdown-button')}"]`);

		if (dropdown) {
			button.addEventListener('click', (event) => {
				event.stopPropagation();
				dropdown.classList.toggle('active');
			});

			dropdown.addEventListener('click', (event) => {
				event.stopPropagation();
			});

			document.addEventListener('click', () => {
				dropdown.classList.remove('active');
			});

			document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape')	dropdown.classList.remove('active');
			});
		};
	});
};

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

function dualRangeInputs() {
	const dualRangeInputs = document.querySelectorAll('.dual-range-input');
	
	dualRangeInputs.forEach((input) => {
		const rangeOne = input.querySelector('[data-name="range-1"]');
		const rangeTwo = input.querySelector('[data-name="range-2"]');
		const valueOne = input.querySelector('[data-name="value-1"]');
		const valueTwo = input.querySelector('[data-name="value-2"]');
		const minGap = 0;
		const track = input.querySelector('[data-name="track"]');
		const maxValue = rangeOne.max;
	
		slideOne();
		slideTwo();
	
		rangeOne.addEventListener('input', slideOne);
		rangeTwo.addEventListener('input', slideTwo);
	
		function slideOne() {
			if (parseInt(rangeTwo.value) - parseInt(rangeOne.value) <= minGap) {
				rangeOne.value = parseInt(rangeTwo.value) - minGap;
			}
			valueOne.textContent = formatValue(rangeOne.value);
			fillColor();
		};
	
		function slideTwo() {
			if (parseInt(rangeTwo.value) - parseInt(rangeOne.value) <= minGap) {
				rangeTwo.value = parseInt(rangeOne.value) - minGap;
			}
			valueTwo.textContent = formatValue(rangeTwo.value);
			fillColor();
		};
	
		function fillColor() {
			const percent1 = rangeOne.value / maxValue * 100;
			const percent2 = rangeTwo.value / maxValue * 100;
			track.style.background = `linear-gradient(to right, #E1E1E1 ${percent1}%,  #112211 ${percent1}%,
				#112211 ${percent2}%,  #E1E1E1 ${percent2}%)`;
		};
	
		function formatValue(value) {
			return value + '$';
		};
	})
};

function tabs() {
	document.querySelectorAll('[tabs-container]').forEach((tabsContainer) => {
		const tabButtons = tabsContainer.querySelectorAll('[tab-button]')
		tabButtons.forEach((tabButton) => {
			tabButton.addEventListener('click', () => {
				tabButtons.forEach((item)=>{item.classList.remove('active')});
				tabButton.classList.add('active');
				tabsContainer.querySelectorAll('[tab-content]').forEach((tabContent) => {
					tabContent.classList.add('none');
					tabsContainer.querySelector(`[tab-content="${tabButton.getAttribute('tab-button')}"]`).classList.remove('none');
				});
			});
		});
	});
};

// function carousel() {
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