function l(num) {
    document.getElementById('img1-tooltip').innerText += "loaded #" + num + " image\n";
}
  

document.addEventListener('DOMContentLoaded', function () {

    const mediaScrollers = document.querySelectorAll('.media-scroller');
    let currentScrollerIndex = 0;
    let currentImageIndex = 0;
    const initialHighlighton = mediaScrollers[0].children[0];
    initialHighlighton.classList.add('highlighton');
    const bigPoster = document.getElementById('big');
    const textarea = document.getElementById('img1-tooltip');

    function loadImagesInRange(start, end, scrollerIndex) {
        const imagesInScroller = mediaScrollers[scrollerIndex].children;
        for (let i = start; i <= end; i++) {
            if (i >= 0 && i < imagesInScroller.length) {
                const image = imagesInScroller[i].querySelector('img');
                const dataSrc = image.getAttribute('data-src');
                if (dataSrc) {
                    image.setAttribute('src', dataSrc);
                    image.removeAttribute('data-src');
                }
            }
        }
    }

    function lazyLoadImagesInRange() {
        const imageRange = 4; // Zakres ładowania (1 obraz w każdą stronę)

        const startImage = currentImageIndex - imageRange;
        const endImage = currentImageIndex + imageRange;

        loadImagesInRange(startImage, endImage, currentScrollerIndex);
        loadImagesInRange(startImage, imageRange, currentScrollerIndex+1);
    }

    function measureLoadTime() {
        const startTime = performance.now();
        bigPoster.addEventListener('load', function onLoad() {
            const endTime = performance.now();
            const loadTime = endTime - startTime;
        
            textarea.innerHTML = `Big poster loading time: ${loadTime.toFixed(1)} ms`;

            bigPoster.removeEventListener('load', onLoad);
        });
    }

    // Function to scroll to the currently highlighted element
    function scrollToHighlight() {
        const highlighton = document.querySelector('.highlighton');
        if (highlighton) {
            setTimeout(() => {
                highlighton.scrollIntoView({behavior: 'smooth'});
            },0);    
        }
    }

    // Function to update the big poster with the highlighted image
    function updateBigPoster(src) {
        bigPoster.src = src;
    }

    // Update big poster on arrow key press
    function updateBigPosterOnArrowKeyPress() {
        const newHighlighton = mediaScrollers[currentScrollerIndex].children[currentImageIndex];
        const newImageSrc = newHighlighton.querySelector('img').src;
        updateBigPoster(newImageSrc);
        const startTime = performance.now();
    }

    updateBigPosterOnArrowKeyPress();

    document.addEventListener('keydown', function (event) {
        const key = event.keyCode;
    
        if (key === 37) { // Arrow Left
            currentImageIndex = Math.max(currentImageIndex - 1, 0);
        } else if (key === 39) { // Arrow Right
            currentImageIndex = Math.min(currentImageIndex + 1, mediaScrollers[currentScrollerIndex].children.length - 1);
        } else if (key === 38) { // Arrow Up
            if (currentScrollerIndex > 0) {
                currentScrollerIndex -= 1;
                currentImageIndex = 0;
            }
        } else if (key === 40) { // Arrow Down
            if (currentScrollerIndex < mediaScrollers.length - 1) {
                currentScrollerIndex += 1;
                currentImageIndex = 0;
            }
        } else if (key === 8) { //back to 1st icon
            currentImageIndex = 0;
            currentScrollerIndex = 0;
        }

        // Remove highlighton from all images
        mediaScrollers.forEach((scroller) => {
            scroller.querySelectorAll('.highlighton').forEach((element) => {
                element.classList.remove('highlighton');

            });
        });
        
        // Add highlighton to the current image
        const newHighlighton = mediaScrollers[currentScrollerIndex].children[currentImageIndex];
        newHighlighton.classList.add('highlighton');


        scrollToHighlight();
        measureLoadTime();
        updateBigPosterOnArrowKeyPress();
        lazyLoadImagesInRange();
    });
});