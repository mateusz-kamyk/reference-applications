# Lazy loading reference app

This app shows how to optimize lazy loading in the web application.
Implemented lazy loading method ('loadImagesInRange' and 'lazyLoadImagesInRange' functions in script.js) has been tested for WPE WebKit (branch 2.22 and 2.28). It does not cause problems such as:
- Reflow (especially of images)
- Increased memory utilization
- Flickering of images
- Slow loading of the page
