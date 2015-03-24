var ready = function() {

    var marginTop = 15;
    var classSwitch = true;

    gridSettings = [{
      width: '768px',
      columns: 1
    },{
      width: '992px',
      columns: 4
    },{
      width: '1200px',
      columns: 5
    },{
      width: '',
      columns: 6
    }]

    function add(a, b) { return a + b; }    

    var pinColumns = 1;

    function setColumns(columns) {
      pinColumns = columns;

      if (classSwitch) {
        $('.pins-grid').removeClass(function (index, css) {
          return (css.match (/(^|\s)pins-grid-\S+/g) || []).join(' ');
        });
        $('.pins-grid').addClass('pins-grid-' + columns);        
      }
    }

    function setPinChanger(media, columns) {
      media.addListener(function(changed) {
        if (changed.matches) { 
          setColumns(columns);
          rearrangePinsDelay(); 
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

    var s = gridSettings;
    for ( var i in s ) {      
      if (i == 0) {
        addMaxWidthMedia(s[i].width, s[i].columns);
        continue;
      }

      if (i == gridSettings.length - 1) {
        addMinWidthMedia(s[i-1].width, s[i].columns);
        continue;
      }

      addMinMaxWidthMedia(s[i-1].width, s[i].width, s[i].columns);
    }
    
    function previousN(el, sel, n) {
      var prev = $(el).prev(sel);
      if (prev) {
        for(var i = 1; i < n; i++) {
          prev = prev.prev(sel);
        }
        return prev;
      }
      return null;
    }

    window.getSameItems = function getSameItems(array, column, index) {
      var result = [];
      for(var i = index - column; i >= 0; i = i - column) {
        result.push(array[i]);
      }
      return result;
    }

    function calculateHeightOfPreviousItemsInSameColumn(index) {
      return getSameItems($('.pin'), pinColumns, index)
        .map(function(d) { return $(d).height() + marginTop; })
        .reduce(add, 0);
    }

    function translatePin(el, height) {
        $(el).css({'transform': 'translate(0, '+ height +'px)'});
        setTimeout(function() {
          $(el).css({'opacity': '1'})
        }, 500);      
    }

    function rearrangePins() {
      $('.pin:visible').each(function (i, el) {
        var heightCalculated = calculateHeightOfPreviousItemsInSameColumn(i);
        var height = pinColumns == 1 ? 0 : heightCalculated;
        translatePin(el, height);
      });

      var pins = $('.pin');
      var totalHeight = calculateHeightOfPreviousItemsInSameColumn(pins.length);
      totalHeight = totalHeight + pins.last().height();
      pins.last().parent().css('height', totalHeight);
    }

    function rearrangePinsDelay() {
      setTimeout(rearrangePins, 700);
    }

    $( window ).resize(function() {
      rearrangePins();
    });

    rearrangePins();

};

$(document).ready(ready);
$(document).on('page:load', ready);