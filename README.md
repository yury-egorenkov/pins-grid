pins-grid.js
============

This is small library which implements Pinterest layout. Filling the grid goes from left to right. Count of columns can be customized in config for each resolution. Columns adaptive changes on resize. Image can be at up or down of pin.

WHAT IN RESULT
--------------

You can fast and easy create Pinterest like layout on your site.
Like this.

![alt tag](https://raw.githubusercontent.com/yury-egorenkov/pins-grid/master/app/images/pinsgrid.jpg)

HOW TO USE IT
-------------

All you need to use is in dist directory.

```html
  <link href="dist/scripts/pins.min.css" media="all" rel="stylesheet">
  <script src="dist/scripts/pins.min.js" type="text/javascript" ></script>
```

```html
  ...
  <div class="pins-grid">

    <div class="pin">
      <div class="image">
        <img data-src="images/image1.jpg"/>
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

Image img tag should always be wrapped by image div. It can be placed anywhere at top, bottom, middle. Other div classes can be any.

That's it. By default you will have 5, 4, 3, 1 columns on standard lg, md, sm, xs resolutions from bootstrap. 

If you want to change it, init pins grid after document ready.

```js
  $(document).ready(function() {
    pinGrid({
      classSwitch: true,
      zoomable: false,
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
    });
```

Zooming
--------

If you want change columns count dynamicly like zoom in - zoom out,
just add following code to your html page and change zoomable value in config to true.

```html
  <div class="pins-grid-controls">
    <div class="zoom-in">
      <span class="fa fa-search-plus"></span>
    </div>
    <div class="zoom-out">
      <span class="fa fa-search-minus"></span>
    </div>
  </div>
```

Don't forget add [awesome font](http://fortawesome.github.io/Font-Awesome/) if you want use fa-search-*.


EXAMPLES AND OTHER LEARNING RESOURCES
-------------------------------------
[DEMO](http://pinsgrid.yury.co/)


## License
The MIT License (MIT). See license text in [LICENSE](LICENSE).

## Contacts
  Feel free to write me: yury.egorenkov@gmail.com
