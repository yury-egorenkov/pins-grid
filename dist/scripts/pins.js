'use strict';

var ready = function() {

    var inited = false;

    var marginTop = 15;
    var classSwitch = true;
    var zoom = 0;

    var settings;

    var defaultSettings = {
      classSwitch: true,
      zoomable: true,
      resolutions: [{
          width: '768px',
          columns: 1
        },{
          width: '992px',
          columns: 3
        },{
          width: '1200px',
          columns: 4
        },{
          width: '',
          columns: 5
        }]
    };

    function add(a, b) { return a + b; }

    var pinColumns = 1;

    function removeClassByWildcard(el, wildcard) {
      $(el).removeClass(function (index, css) {
          var regex = new RegExp('(^|\\s)' + wildcard + '\\S+', 'g');
          return (css.match (regex) || []).join(' ');
        });
    }

    function setColumns(columns) {
      pinColumns = columns + zoom;
      pinColumns = pinColumns < 1 ? 1 : pinColumns;

      if (classSwitch) {
        removeClassByWildcard('.pins-grid', 'pins-grid-');
        $('.pins-grid').addClass('pins-grid-' + pinColumns);        
      }
    }

    function setPinChanger(media, columns) {
      media.addListener(function(changed) {
        if (changed.matches) { 
          setColumns(columns);
          rearrangePins(); 
      }});        
    }

    function addMediaQueryAction(query, columns) {
      var media = window.matchMedia(query);
      if (media.matches) {
        setColumns(columns);
      }
      setPinChanger(media, columns);        
    }

    function addMaxWidthMedia(max, columns) {
      var query = '(max-width: ' + max + ')';
      addMediaQueryAction(query, columns);
    }

    function addMinWidthMedia(min, columns) {
      var query = '(min-width: ' + min + ')';
      addMediaQueryAction(query, columns);
    }

    function addMinMaxWidthMedia(min, max, columns) {
      var query = '(min-width: ' + min + ') and (max-width: ' + max + ')';
      addMediaQueryAction(query, columns);
    }

    function initSettings(settings) {
      var s = settings;

      for ( var i in s ) {     
        var columns = s[i].columns;
        
        if (i == 0) {
          addMaxWidthMedia(s[i].width, columns);
          continue;
        }

        if (i == s.length - 1) {
          addMinWidthMedia(s[i-1].width, columns);
          continue;
        }

        addMinMaxWidthMedia(s[i-1].width, s[i].width, columns);
      }      
    }
    
    
    function previousN(el, n) {
      var prev = $(el).prev();
      if (prev.length > 0) {
        for(var i = 1; i < n; i++) {
          prev = prev.prev();
        }
        return prev;
      }
      return [];
    }

    window.getSameItems = function getSameItems(array, column, index) {
      var result = [];
      for(var i = index - column; i >= 0; i = i - column) {
        result.push(array[i]);
      }
      return result;
    }

    function calculateHeightOfPreviousItemsInSameColumn(index) {
      return getSameItems($('.pins-grid .pin'), pinColumns, index)
        .map(function(d) { return $(d).height() + marginTop; })
        .reduce(add, 0);
    }

    function translatePin(el, height) {
        $(el).css({'transform': 'translate(0, '+ height +'px)'});     
    }

    function rearrangePin(el) {
      var gridTop = $('.pins-grid').offset().top,
          gridPadding = $('.pins-grid').css('padding-top').replace(/[^-\d\.]/g, '');
      var prev = previousN(el, pinColumns);

      var height = 0;

      if (prev.length > 0) {
        height = prev.offset().top + prev.height() + marginTop - gridTop - gridPadding;
      } 

      var height = pinColumns === 1 ? 0 : height;

      translatePin(el, height);

      var globalOffset = $('.pins-grid').offset().top
      var last = $('.pins-grid .pin').last();
      $('.pins-grid').css('height', last.offset().top + last.height() - globalOffset);
    }

    function rearrangePins() {
      $('.pins-grid .pin:visible').each(function (i, el) {
        rearrangePin(el);        
      });

      // var pins = $('.pins-grid .pin');
      // var totalHeight = calculateHeightOfPreviousItemsInSameColumn(pins.length);
      // totalHeight = totalHeight + pins.last().height();
      // pins.last().parent().css('height', totalHeight);
    }

    var killImageTimeout = null;    

    $('.pins-grid img').on('load', function() {
      var image, img, pin, ratio;

      img = $(this);
      image = new Image();
      image.src = img.attr("src");
      pin = img.closest('.pin');

      if (image.naturalWidth < 300) {
        removePin(img);
        return;
      }
      
      ratio = 1.0 * image.naturalHeight / image.naturalWidth * 100;
      img.closest('.image').css('padding-bottom', ratio + '%');
      
      rearrangePin(pin);
      
      pin.css('z-index', '0');

      img.css('opacity', '1');
      pin.css('opacity', '1');

      loadPinImage();
    });

    function removePin(img) {
      var pin = $(img).closest('.pin');
      pin.remove();
      loadPinImage();      
    }

    function loadPinImage() {      
      clearTimeout(killImageTimeout);

      $('.pins-grid img[data-src]').slice(0, 1).each(function(i, d) {
        
        $(d).error(function() {
          removePin(d);
        });
        
        $(d).attr('src', $(d).attr('data-src'));
        $(d).removeAttr('data-src');

        killImageTimeout = setTimeout(function() {
          removePin(d);
        }, 5000);

      });
    };

    $( window ).resize(function() {
      rearrangePins();
    });

    window.pinGrid = function pinGrid(settings) {
      inited = true;
      classSwitch = settings.classSwitch;

      initSettings(settings.resolutions);

      if (settings.zoomable) {
        $('.pins-grid-controls').css('display', 'block');
        $('.zoom-in').on('click', function() { pinGrid.zoom(-1); });
        $('.zoom-out').on('click', function() { pinGrid.zoom(+1); });
      }

      loadPinImage();
    }

    window.pinGrid.zoom = function(newZoom) {
      zoom = newZoom;
      setColumns(pinColumns);
      rearrangePins();
    }

    setTimeout(function() {
      if (!inited) {
        pinGrid(defaultSettings);
      }
    }, 300);

};

$(document).ready(ready);
$(document).on('page:load', ready);



