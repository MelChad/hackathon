 function animateText() {
      var textWrapper = document.querySelector(".title");
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

      anime.timeline().add({
          targets: '.title .letter',
          translateY: [200, 0],
          easing: "easeOutExpo",
          opacity: 1,
          duration: 1700,
          delay: (el, i) => 400 + 70 * i
      });

      gsap.from(".subtitle", {
          duration: 1.5,
          delay: 1,
          opacity: 0,
          y: -20,
          ease: "expo.inOut"
      });

      gsap.from(".button-container button", {
          duration: 1.5,
          delay: 1,
          opacity: 0,
          y: 20,
          ease: "expo.inOut",
      });
  }

  function countdown() {
    const now = new Date().getTime();
    const eventDate = new Date("2025-01-09T23:59:59").getTime();
    
    const distance = eventDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    document.getElementById("days").innerText = days < 10 ? `0${days}` : days;
    document.getElementById("hours").innerText = hours < 10 ? `0${hours}` : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? `0${seconds}` : seconds;
  
    if (distance < 0) {
      document.getElementById("days").innerText = "00";
      document.getElementById("hours").innerText = "00";
      document.getElementById("minutes").innerText = "00";
      document.getElementById("seconds").innerText = "00";
    }
  }


  (function ($) {
    $(function () {
  
  
      $(window).on('scroll', function () {
        fnOnScroll();
      });
  
  
      $(window).on('resize', function () {
        fnOnResize();
      });
  
  
      var agTimeline = $('.js-timeline'),
        agTimelineLine = $('.js-timeline_line'),
        agTimelineLineProgress = $('.js-timeline_line-progress'),
        agTimelinePoint = $('.js-timeline-card_point-box'),
        agTimelineItem = $('.js-timeline_item'),
        agOuterHeight = $(window).outerHeight(),
        agHeight = $(window).height(),
        f = -1,
        agFlag = false;
  
      function fnOnScroll() {
        agPosY = $(window).scrollTop();
  
        fnUpdateFrame();
  
        fnAnimateCards();
      }
  
      function fnOnResize() {
        agPosY = $(window).scrollTop();
        agHeight = $(window).height();
  
        fnUpdateFrame();
      }
  
      function fnUpdateWindow() {
        agFlag = false;
  
        agTimelineLine.css({
          top: agTimelineItem.first().find(agTimelinePoint).offset().top - agTimelineItem.first().offset().top,
          bottom: agTimeline.offset().top + agTimeline.outerHeight() - agTimelineItem.last().find(agTimelinePoint).offset().top
        });
  
        f !== agPosY && (f = agPosY, agHeight, fnUpdateProgress());
      }
  
      function fnUpdateProgress() {
        var agTop = agTimelineItem.last().find(agTimelinePoint).offset().top;
  
        i = agTop + agPosY - $(window).scrollTop();
        a = agTimelineLineProgress.offset().top + agPosY - $(window).scrollTop();
        n = agPosY - a + agOuterHeight / 2;
        i <= agPosY + agOuterHeight / 2 && (n = i - a);
        agTimelineLineProgress.css({height: n + "px"});
  
        agTimelineItem.each(function () {
          var agTop = $(this).find(agTimelinePoint).offset().top;
  
          (agTop + agPosY - $(window).scrollTop()) < agPosY + .5 * agOuterHeight ? $(this).addClass('js-ag-active') : $(this).removeClass('js-ag-active');
        })
      }
  
      function fnUpdateFrame() {
        agFlag || requestAnimationFrame(fnUpdateWindow);
        agFlag = true;
      }
  
      function fnAnimateCards() {
        agTimelineItem.each(function () {
          var agTop = $(this).offset().top;
  
          (agTop + agPosY - $(window).scrollTop()) <= agPosY + .9 * agOuterHeight && $(this).hasClass('js-ag-animated') && $(this).addClass('js-ag-show');
        })
      }
  
  
    });
  })(jQuery);
  document.addEventListener('DOMContentLoaded', function() {
    const slideRightElements = document.querySelectorAll('.slide-right');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in'); // Add slide-in class to the intersecting element
          observer.unobserve(entry.target); // Stop observing after it becomes visible
        }
      });
    });

    slideRightElements.forEach(element => {
      observer.observe(element); // Observe each element with slide-right class
    });
  });  
  
 // Select the separator elements by class
const separators = document.getElementsByClassName('separator');

// Convert the HTMLCollection to an array for easier manipulation
const separatorsArray = Array.from(separators);

// Set up the IntersectionObserver to detect when any separator enters the viewport
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // When the separator is in view, animate the width to 100%
      entry.target.style.width = '100%';
    } else {
      // Reset the separator width when it's not in view (scrolling away)
      entry.target.style.width = '0%';
    }
  });
}, { threshold: 0.5 }); // Trigger when 50% of the separator is visible

// Start observing each separator
separatorsArray.forEach(separator => {
  observer.observe(separator);
});


// Initial check and animations
window.onload = () => {
    animateText(); // Call the existing text animation
    setInterval(countdown, 1000);
    AOS.init({
      mirror: true  // No animation on scroll back
    });
};
