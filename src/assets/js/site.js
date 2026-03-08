/**
 * @file
 * A JavaScript file for the site.
 *
 * @copyright Copyright 2020 carl-martens.com
 */

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.site-header__menu');
  const nav = document.querySelector('.site-header__nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.classList.contains('js-open');
      
      if (isOpen) {
        menuButton.classList.remove('js-open');
        nav.classList.remove('js-open');
        menuButton.setAttribute('aria-expanded', 'false');
      } else {
        menuButton.classList.add('js-open');
        nav.classList.add('js-open');
        menuButton.setAttribute('aria-expanded', 'true');
      }
    });

    // Initialize aria-expanded state
    menuButton.setAttribute('aria-expanded', 'false');
  }
});
