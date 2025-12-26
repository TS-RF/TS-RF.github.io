// 自动处理 RTL (从右向左) 语言的布局
(function() {
    // 定义 RTL 语言列表
    const rtlLanguages = ['ar', 'fa', 'he', 'ur'];
    
    // 获取当前页面 html 标签上的 lang 属性
    const currentLang = document.documentElement.getAttribute('lang');
    
    // 如果当前语言在列表中
    if (rtlLanguages.includes(currentLang)) {
        // 1. 设置 dir="rtl" 属性，这是最关键的一步
        document.documentElement.setAttribute('dir', 'rtl');
        
        // 2. (可选) 添加一个类名，方便在 CSS 中做特殊修正
        document.documentElement.classList.add('is-rtl');
        
        // 3. 修正 Bulma 框架在 RTL 下可能出现的问题 (动态注入 CSS)
        const style = document.createElement('style');
        style.innerHTML = `
            /* 修正图标间距：原本在右边的 margin 现在应该在左边 */
            .is-rtl .icon { margin-left: 0.3rem !important; margin-right: 0 !important; }
            .is-rtl .navbar-item .icon { margin-left: 0.3rem; margin-right: 0; }
            
            /* 修正列表边框：原本在左边的边框现在应该在右边 */
            .is-rtl .highlight-list li { border-left: none; border-right: 4px solid #3273dc; }
            
            /* 修正引用块的边框 */
            .is-rtl .citation-prompt { border-left: none; border-right: 5px solid #3273dc; }
            
            /* 确保文字对齐跟随方向 (通常 dir="rtl" 会自动处理，但有时候需要强制) */
            .is-rtl .has-text-left { text-align: right !important; }
            .is-rtl .has-text-right { text-align: left !important; }
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
