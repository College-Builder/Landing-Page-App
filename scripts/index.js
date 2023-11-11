(() => {
	const button = window.document.querySelector('button[menu-button]');
	const buttonOff = window.document.querySelector('button[menu-button--off]');
	const menu = window.document.querySelector('div[menu-container]');
	const menuHeight = window.getComputedStyle(menu).height;

	menu.style.height = '0px';

	let state = false;

	button.addEventListener('click', () => handleDrawerAction());
	buttonOff.addEventListener('click', () => handleDrawerAction());

	window.document.querySelector('he');
	window.document.querySelectorAll('a[content-link]').forEach((a) => {
		a.addEventListener('click', (e) => {
			e.preventDefault();
			handleClickScroll(a.getAttribute('href'));
		});
	});

	menu.querySelectorAll('a').forEach((a) => {
		a.addEventListener('click', () => {
			handleDrawerAction();
		});
	});

	function handleClickScroll(objectRef) {
		const object = window.document.querySelector(
			`[id='${objectRef.replace('#', '')}']`,
		);

		if (!object) {
			return;
		}

		const rect = object.getBoundingClientRect();
		const yCoordinate = rect.top + window.scrollY;
		const screenHeight = window.innerHeight;

		if (rect.height < screenHeight && window.innerWidth > 1300) {
			// If object height is less than screen height, scroll to center of the screen
			const centerYCoordinate = yCoordinate - (screenHeight - rect.height) / 2;
			window.scrollTo({
				behavior: 'smooth',
				top: centerYCoordinate,
				left: 0,
			});
		} else {
			// If object height is greater than screen height, scroll to the beginning of the object
			window.scrollTo({
				behavior: 'smooth',
				top: yCoordinate - 50,
				left: 0,
			});
		}
	}

	function handleDrawerAction() {
		if (state) {
			menu.style.height = '0px';
			buttonOff.classList.remove('--on');
			button.classList.remove('--on');
		} else {
			menu.style.height = menuHeight;
			buttonOff.classList.add('--on');
			button.classList.add('--on');
		}

		state = !state;
	}
})();

(() => {
	const projectsContainer = window.document.querySelector(
		'div[projects-container]',
	);
	const numberOfProjects = projectsContainer.querySelectorAll('a').length;
	const nextButtons = window.document.querySelectorAll(
		'button[section-projects__next-button]',
	);

	nextButtons[0].classList.add('--off');

	if (numberOfProjects === 1) {
		nextButtons[1].classList.add('--off');
		return;
	}

	let index = 0;

	let left = false;
	let time = 6000;

	let run = true;
	let runSet = false;
	let runAgain;

	nextButtons.forEach((button, index) => {
		button.addEventListener('click', () => {
			run = false;

			if (runAgain) {
				runSet = false;
				clearTimeout(runAgain);
			}

			if (index === 0) {
				moveLeft();
			} else {
				moveRight();
			}
		});
	});

	setInterval(() => {
		if (!run) {
			if (!runSet) {
				runSet = true;

				runAgain = setTimeout(() => {
					run = true;
					runSet = false;
				}, time * 5);
			}

			return;
		}

		if (left) {
			moveLeft();
		} else {
			moveRight();
		}

		if (index === numberOfProjects - 1) {
			left = true;
		}

		if (index === 0) {
			left = false;
		}
	}, time);

	window.addEventListener('resize', () => {
		nextButtons[0].classList.add('--off');
		nextButtons[1].classList.remove('--off');

		projectsContainer.scrollTo({
			behavior: 'smooth',
			left: 0,
		});
	});

	function moveLeft() {
		const projectsContainerWidth =
			window.getComputedStyle(projectsContainer).width;

		index--;

		if (index === 0) {
			nextButtons[0].classList.add('--off');
		}

		nextButtons[1].classList.remove('--off');

		projectsContainer.scrollTo({
			behavior: 'smooth',
			left:
				projectsContainer.scrollLeft -
				Number(projectsContainerWidth.replace('px', '')),
		});
	}

	function moveRight() {
		const projectsContainerWidth =
			window.getComputedStyle(projectsContainer).width;

		index++;

		if (index === numberOfProjects - 1) {
			nextButtons[1].classList.add('--off');
		}

		nextButtons[0].classList.remove('--off');

		projectsContainer.scrollTo({
			behavior: 'smooth',
			left:
				projectsContainer.scrollLeft +
				Number(projectsContainerWidth.replace('px', '')),
		});
	}
})();

(() => {
	const button = window.document.querySelector('button[image-carousel-button]');
	const images = button.querySelectorAll('img');
	let imageIndex = 0;
	let goRight = true;
	let wait = false;
	let interval = setInterval(() => handleScroll(), 8000);

	button.addEventListener('click', () => handleScroll());

	window.addEventListener('resize', () => {
		imageIndex = 0;
		goRight = true;
		button.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	});

	function handleScroll() {
		if (wait) {
			return;
		}

		wait = true;

		setTimeout(() => {
			wait = false;
		}, 600);

		clearInterval(interval);
		interval = setInterval(() => handleScroll(), 8000);

		let left;

		if (goRight) {
			left =
				button.scrollLeft +
				Number(window.getComputedStyle(button).width.replace('px', ''));

			imageIndex++;
		} else {
			left =
				button.scrollLeft -
				Number(window.getComputedStyle(button).width.replace('px', ''));

			imageIndex--;
		}

		if (imageIndex === 0) {
			goRight = true;
		}

		if (imageIndex === images.length - 1) {
			goRight = false;
		}

		button.scrollTo({
			top: 0,
			left,
			behavior: 'smooth',
		});
	}
})();
