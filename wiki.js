$( document ).ready(function() {
  // Wiki logo link
  $('#p-views').wrap('<a href="http://www.wikipedia.org"></a>');

  // TOC setup
  var menu = $('#right-navigation #p-views');
  var menuClone = $('#right-navigation #p-views')
      .clone()
      .addClass('override no-display')
      .prependTo('.mediawiki #mw-navigation #mw-head #right-navigation');
      
  var toc = $('.toc'),
      cT = toc.offset().top,
      cH = toc.outerHeight();
  var tocClone = $('.toc')
      .clone()
      .addClass('override no-display')
      .prependTo('.mediawiki #content #bodyContent #mw-content-text');

  var tocFixed = $('.toc.override'),
      menuBars = $('#p-views.override');

  // Toggle menu bars
  function toggleMenu() {
    var y_scroll_pos = window.pageYOffset;

    if (y_scroll_pos > (cT+cH)) {
      menu.addClass('no-display');
      menuBars.removeClass('no-display');
    } else {
      menu.removeClass('no-display');
      menuBars.addClass('no-display');
      tocFixed.addClass('no-display');
    }
  }
  toggleMenu();

  // Smooth scroll
  $('.toc a').click(function() {
    tocFixed.addClass('no-display');
    
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 75
        }, 1000);
        return false;
      }
    }
  });

  // Scroll behavior
  $(window).on('scroll', function() {
    toggleMenu();
  });

  // Toggle TOC
  menuBars.click(function() {
    tocFixed.toggleClass('no-display');
    return false;
  });
});




