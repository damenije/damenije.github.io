var flag = false;
var gallery = false;
var size;
var slideIndex = 1;

document.onreadystatechange = () => {
    setTimeout(() => {
        document.querySelector('.preloader-wrapper').style.display = 'none';
    }, 3000);
}

$(function() {

    setScroll('fullPage');

    menuButtonAnimation(flag);

    $('.day').append(getDate());

    showSlides(slideIndex);

    $('#goToHome').click(() => {
        $.fn.fullpage.moveTo('homeSection');
        $('.menuBtn').click();
    });
    $('#goToAbout').click(() => {
        $.fn.fullpage.moveTo('aboutSection');
        $('.menuBtn').click();
    });
    $('#goToGallery').click(() => {
        $.fn.fullpage.moveTo('gallerySection');
        $('.menuBtn').click();
    });
    $('#goToEvents').click(() => {
        $.fn.fullpage.moveTo('eventsSection');
        $('.menuBtn').click();
    });
    $('#goToLocation').click(() => {
        $.fn.fullpage.moveTo('locationSection');
        $('.menuBtn').click();
    });

    $.getJSON("../img/gallery.json", (data) => {
        size = data.length;
        for(var i = 0; i < data.length; i++) {
            $('.galleryContainer').append('<img src=' + data[i].img + ' alt="">');
        }

        for(var i = 0; i < 8; i++) {
            $('.galleryContainer').children()[i].style.display = "block";
        }
    });

    $('.galleryBtn').click(() => {

        gallery = !gallery;

        if(gallery === true) {
            $('.galleryBtn').text("Прикажи мање");
            for(var i = 8; i < size; i++) {
                $('.galleryContainer').children()[i].style.display = "block";
            }
        } else {
            $('.galleryBtn').text("Прикажи више");
            for(var i = 8; i < size; i++) {
                $('.galleryContainer').children()[i].style.display = "none";
            }
        }

        $.fn.fullpage.reBuild();
    });

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
      });
      $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        centerMode: true,
        focusOnSelect: true
    });
});

this.plusSlides = (n) => {
    showSlides(slideIndex += n);
}

this.showSlides = (n) => {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        $(slides[i]).css({ "display": 'none' });
    }
    $(slides[slideIndex-1]).css({ "display": 'block' });
}

this.setScroll = (selector) => {
    $('.' + selector).fullpage({
        css3: false,
        anchors:['homeSection', 'aboutSection', 'gallerySection', 'eventsSection', 'locationSection'],
        scrollingSpeed: 1000,
        scrollOverflow: true,
        parallax: true,
        dragAndMove: true,
        onLeave: function(index, nextIndex, direction) {
            console.log('onLeave: ' + index);
            fadeOut();
        },
        afterLoad: function(anchorLink, index) {
            console.log('afterLoad: ' + index);
            if(index === 2 || index === 5) {
                textBlack();
            } else {
                textWhite();
            }
            fadeIn();
        }
        // menu: '#menu',
		// lockAnchors: false,
		// anchors:['firstPage', 'secondPage'],
		// navigation: false,
		// navigationPosition: 'right',
		// navigationTooltips: ['firstSlide', 'secondSlide'],
		// showActiveTooltip: false,
		// slidesNavigation: false,
		// slidesNavPosition: 'bottom',

		// //Scrolling
		// css3: true,
		// scrollingSpeed: 700,
		// autoScrolling: true,
		// fitToSection: true,
		// fitToSectionDelay: 1000,
		// scrollBar: false,
		// easing: 'easeInOutCubic',
		// easingcss3: 'ease',
		// loopBottom: false,
		// loopTop: false,
		// loopHorizontal: true,
		// continuousVertical: false,
		// continuousHorizontal: false,
		// scrollHorizontally: false,
		// interlockedSlides: false,
		// dragAndMove: false,
		// offsetSections: false,
		// resetSliders: false,
		// fadingEffect: false,
		// normalScrollElements: '#element1, .element2',
		// scrollOverflow: false,
		// scrollOverflowReset: false,
		// scrollOverflowOptions: null,
		// touchSensitivity: 15,
		// normalScrollElementTouchThreshold: 5,
		// bigSectionsDestination: null,

		// //Accessibility
		// keyboardScrolling: true,
		// animateAnchor: true,
		// recordHistory: true,

		// //Design
		// controlArrows: true,
		// verticalCentered: true,
		// sectionsColor : ['#ccc', '#fff'],
		// paddingTop: '3em',
		// paddingBottom: '10px',
		// fixedElements: '#header, .footer',
		// responsiveWidth: 0,
		// responsiveHeight: 0,
		// responsiveSlides: false,
		// parallax: false,
		// parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},

		// //Custom selectors
		// sectionSelector: '.section',
		// slideSelector: '.slide',

		// lazyLoading: true,

		// //events
		// onLeave: function(index, nextIndex, direction){},
		// afterLoad: function(anchorLink, index){},
		// afterRender: function(){},
		// afterResize: function(){},
		// afterResponsive: function(isResponsive){},
		// afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
		// onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
    });
}

this.menuButtonAnimation = (flag) => {

    $('.menuBtn').click(() => {

        flag = !flag;
        if(flag === true) {
            $('.menuBtn span:nth-child(1)').css({ 'top': '7px', 'transform': 'rotateZ(45deg)' });
            $('.menuBtn span:nth-child(2)').css({ 'left': '-30px', 'opacity': '0' });
            $('.menuBtn span:nth-child(3)').css({ 'top': '-7px', 'transform': 'rotateZ(-45deg)' });
            $('.menu').css({'top': '0'});
            textWhite();
        } else {
            $('.menuBtn span:nth-child(1)').css({ 'top': '0px', 'transform': 'rotateZ(0deg)' });
            $('.menuBtn span:nth-child(2)').css({ 'left': '0px', 'opacity': '1' });
            $('.menuBtn span:nth-child(3)').css({ 'top': '0px', 'transform': 'rotateZ(0deg)' });
            $('.menu').css({'top': '-100vh'});
            if($('.fp-section.active').find('.fp-slide.active').prevObject[0].id == 'about' || $('.fp-section.active').find('.fp-slide.active').prevObject[0].id == 'location') {
                textBlack();
            }
        }

    });

}

this.getDate = () => {
    days = ['09:00-02:00 (Недеља)', '07:00-00:00 (Понедељак)', '07:00-00:00 (Уторак)', '07:00-00:00 (Сриједа)', '07:00-01:00 (Четвртак)', '07:00-02:00 (Петак)', '09:00-02:00 (Субота)'];
    var d = new Date().getDay();

    return days[d];
}

this.fadeOut = () => {
    $('nav').css({ 'top': '-50px', 'opacity': '0' });
    $('.bottom2').css({ 'bottom': '-50px', 'opacity': '0' });
}

this.fadeIn = () => {
    $('nav').css({ 'top': '0px', 'opacity': '1' });
    $('.bottom2').css({ 'bottom': '0px', 'opacity': '1' });
}

this.textBlack = () => {
    $('nav').css({ 'color': 'black' });
    $('nav .menuBtn span').css({ 'background-color': 'black' });
    $('.bottom2').css({ 'color': 'black' });
    $('.bottom2 a').css({ 'color': 'black' });
}

this.textWhite = () => {
    $('nav').css({ 'color': 'white' });
    $('nav .menuBtn span').css({ 'background-color': 'white' });
    $('.bottom2').css({ 'color': 'white' });
    $('.bottom2 a').css({ 'color': 'white' });
}