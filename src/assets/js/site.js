/**
 * @file
 * A JavaScript file for the site.
 *
 * @copyright Copyright 2020 carl-martens.com
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:

(function ($) {

  $(document).ready(function() {

    $('.site-header__menu').on('click', function() {
      if ($(this).hasClass('js-open')) {
        $(this).removeClass('js-open');
        $('.site-header__nav').removeClass('js-open');
      } else {
        $(this).addClass('js-open');
        $('.site-header__nav').addClass('js-open');
      }
    });

    $('.featured-media__inner, .media').fitVids();

  });

})(jQuery);
