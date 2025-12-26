// 自动处理 RTL (从右向左) 语言的布局
(function() {
    const rtlLanguages = ['ar', 'fa', 'he', 'ur'];
    const currentLang = document.documentElement.getAttribute('lang');

    if (rtlLanguages.includes(currentLang)) {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.classList.add('is-rtl');

        const style = document.createElement('style');
        style.innerHTML = `
            /* --- 核心修复：导航栏位置 --- */
            /* 在 RTL 中，我们需要 margin-right: auto 来把元素推到最左边 */
            .is-rtl .navbar-end {
                margin-left: 0 !important;
                margin-right: auto !important;
            }

            /* 如果 navbar-start 将来有内容，也需要对应的反转 */
            .is-rtl .navbar-start {
                margin-right: 0 !important;
                margin-left: auto !important;
            }

            /* --- 其他视觉细节修复 --- */
            .is-rtl .icon { margin-left: 0.3rem !important; margin-right: 0 !important; }
            .is-rtl .navbar-item .icon { margin-left: 0.3rem; margin-right: 0; }
            .is-rtl .highlight-list li { border-left: none; border-right: 4px solid #3273dc; }
            .is-rtl .citation-prompt { border-left: none; border-right: 5px solid #3273dc; }
            .is-rtl .has-text-left { text-align: right !important; }
            .is-rtl .has-text-right { text-align: left !important; }
            
            /* 修正面包屑或路径导航的箭头方向 (如果有) */
            .is-rtl .breadcrumb li + li::before { transform: rotate(180deg); }
        `;
        document.head.appendChild(style);
    }
})();

window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})
