/**
 * This file contains all Drupal behaviours of the Apia theme.
 *
 * Created by ralph on 05.01.14.
 */

(function ($) {

    var headerHeight = 180;

    /**
     * Allows full size clickable items.
     */
    Drupal.behaviors.fullSizeClickableItems = {
        attach: function () {
            var $clickableItems = $('.view-werk-isotope .isotope-item .views-field-field-images .group-hover-text');
            if ($clickableItems.length <= 0) return;

            $clickableItems.once('click', function () {
                $clickableItems.on('click', function () {
                    window.location = $(this).find("a:first").attr("href");
                    return false;
                });
            });
        }
    };

  /**
   * A floating project menu  that is positioned according to the scroll position.
   */
  Drupal.behaviors.floatingProjectMenu = {
    attach: function () {
      var $pageContainer = $('#page'),
        $projectMenuCont = $pageContainer.find('.sub-menu-container');

      //
      // animate project menu, if visible
      if ($projectMenuCont.is(':visible')) {
        //
        // position project menu during scrolling
        $(window).on('scroll resize', function() {
          var scrollPos = $(window).scrollTop();

          //
          // define position of anchor menu
          if ($(window).width() < 1024) {
            //  menu position on top of page
            $projectMenuCont.css({'position': 'static'});
          }
          else {
            // animate menu to position
            $projectMenuCont.css({'position': 'absolute'});
            $projectMenuCont.animate({'top': scrollPos-60}, {duration:300, queue:false, easing:'swing'});
          }
        });
      }
    }
  };

  /**
     * Scrolls smoothly to the url anchor, when menu is clicked.
     */
    Drupal.behaviors.smoothScrollingToAnchor = {
        attach: function () {
            var $contactMenu = $('a#menu-contact'),
                $aboutMenu = $('a#menu-about-us'),
                $introText = $('.view-werk-isotope .view-header .werk-intro-container'),
                _animatedScrollTo = function(anchor) {
                    $('html, body').stop().animate({
                        scrollTop: $(anchor).offset().top - headerHeight
                    }, 600);
                };

            // contact menu click (same page active)
            $contactMenu.once('click', function () {
                $contactMenu.on('click', function () {
                    // deactivate about-us-menu
                    $aboutMenu.removeClass("active");

                    //Animate
                    var anchor = "#" + $(this).attr('href').split("#")[1];
                    _animatedScrollTo(anchor);
                    return false;
                });
            });
            // contact menu click (other page active)
            $(window).on('load', function() {
                if(document.location.hash.length > 0){
                    _animatedScrollTo(document.location.hash);

                    // remove active from about menu, if contact-menu is active
                    if ($contactMenu.hasClass("active-trail")) {
                        $aboutMenu.removeClass("active");
                        $contactMenu.addClass('active');
                    }
                }
            });

            // intro text click
            $introText.once('click', function () {
                $introText.on('click', function () {
                    var anchor = $(this).find("a:first").attr("href");
                    _animatedScrollTo(anchor);
                    return false;
                });
            });

            // remove active from contact menu, if about-menu is active
            if ($aboutMenu.hasClass("active")) {
                $contactMenu.removeClass("active");
            }
        }
    }

    /**
     * Replaces the link of the map with the google map link.
     */
    Drupal.behaviors.replaceMapLink = {
        attach: function () {
            var $map = $(".node-about-page .field-name-field-karte a")
                mapLink = "https://www.google.ch/maps/place/Binzstrasse+12,+8045+Z%C3%BCrich/@47.3629534,8.5158087,16z/data=!4m2!3m1!1s0x479009f34545e157:0x5283bd06b251cca3?hl=de";

            $map.attr({
                "href": mapLink,
                'target': '_blank'
            });
        }
    }

    /**
     * Click on image in colorbox closes it.
     */
    Drupal.behaviors.colorboxClick = {
        attach: function () {
            var $cboxContent = $("#cboxContent");

            $cboxContent.once('click', function () {
               $cboxContent.on('click', function () {
                   $cboxContent.find("#cboxClose").click();
               });
            });
        }
    }

    /**
     * Open file links in its own tab. The file field doesn't implement this behaviour right away.
     */
    Drupal.behaviors.openDocumentsInTab = {
        attach: function () {
            $(".field-name-field-documents").find(".field-item a").attr('target', '_blank');
        }
    }



})(jQuery);
