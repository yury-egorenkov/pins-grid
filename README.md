pins-grid.js
============

This is small library which implements Pinterest layout. Filling the grid goes from left to right. Count of columns can be customized in config for each resolution. Columns adaptive changes on resize.

WHAT IN RESULT
--------------

You can fast and easy create Pinterest like layout on your site.
Like this.

![alt tag](https://raw.github.com/yury-egorenkov/pins-grid/branch/master/pinsgrid.jpg)

HOW TO USE IT
-------------

All you need to use is in dist directory.

```html
  <link href="dist/scripts/pins.css" media="all" rel="stylesheet">
  <script src="dist/scripts/pins.js" type="text/javascript" ></script>
```

```html
  ...
  <div class="pins-grid">

    <div class="pin">
      <div class="image">
        <img src="images/image1.jpg"/>
      </div>
      <div class="description">
        Sample image
      </div>
      <div class="credits">
        Sample credits
      </div>        
    </div>

    ...
  </div>  
```

That's it. By default you will have 5, 4, 3, 1 columns on standard lg, md, sm, xs resolutions from bootstrap. 

If you whant to change it init pins grid after document ready.   

```js
  $(document).ready(function() {
    pinGrid([
      {
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
      }]);
  });
```

EXAMPLES AND OTHER LEARNING RESOURCES
-------------------------------------
