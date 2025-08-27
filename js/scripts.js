console.log('The scripts file is connected!');

const buttonToggler = document.getElementById('nav-toggler');

const expanded = buttonToggler.getAttribute('aria-expanded');
if (window.innerWidth < 800 && expanded === 'false') {
  const navigationList = document.querySelector('.top-nav');
  navigationList.style.display = 'none';
}

buttonToggler.addEventListener('click', () => {
  const navigationList = document.querySelector('.top-nav');
  const curValue = window.getComputedStyle(navigationList).display;
  navigationList.style.display = curValue === 'none' ? 'flex' : 'none';
});

window.addEventListener('resize', (event) => {
  const navigationList = document.querySelector('.top-nav');
  if (event.target.innerWidth >= 800) {
    navigationList.style.display = 'flex';
  } else if (event.target.innerWidth < 800 && expanded === 'false') {
    navigationList.style.display = 'none';
  }
});
