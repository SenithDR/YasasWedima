; (function () {
	'use strict';

	$(window).on('load', function () {
		$('.loader').delay(600).fadeOut('slow');
		setTimeout(function () {
			$('.cover .display-tc').addClass('fade-in-up');
		}, 800);
	});

	document.addEventListener("DOMContentLoaded", function () {
		window.addEventListener('scroll', function () {
			if (window.scrollY > 100) {
				document.getElementById('navbar').classList.add('fixed-top');
			} else {
				document.getElementById('navbar').classList.remove('fixed-top');
			}
		});
	});

	// Form
	var contactForm = function () {
		var $form = $('#contact-form');
		const $formInput = $('.form-control');

		$formInput.on('focus blur', (event) => {
			if ($(event.target).val() === '') {
				if (event.type === "focus") {
					$(event.target).next('.control-label').addClass('filled')
				} else if (event.type === "blur") {
					$(event.target).next('.control-label').removeClass('filled')
				}
			}
		});
		$form.submit(function (e) {
			// remove the error class
			if (!$('input[name="church-attendance"]:checked').length || !$('input[name="wedding-attendance"]:checked').length) {
				alert('Please select Yes or No for both church ceremony and wedding before submitting!');
				e.preventDefault();  // prevent form submission
			}
			$('.form-group').removeClass('has-error');
			$('.help-block').remove();

			// get the form data
			var formData = {
				'contact': $('input[name="form-telephone"]').val(),
				'church': $('input[name="church-attendance"]:checked').val(),
				'wedding': $('input[name="wedding-attendance"]:checked').val()
			};
			// process the form
			$.ajax({
				type: 'POST',
				url: 'form.php',
				data: formData,
				dataType: 'json',
				encode: true
			}).done(function (data) {
				// handle errors
				if (!data.success) {
					alert(data.message || "Could not submit the response... Please try again :(")
				} else {
					// display success message
					alert(data.message || "Submit successful! :D")
				}
			}).fail(function (data) {
				// for debug
				// console.log(data);
			});
			e.preventDefault();
		});
	}

	// Content way point
	var contentWayPoint = function () {
		var i = 0;
		$('.animate-box').waypoint(function (direction) {
			if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {
				i++;
				$(this.element).addClass('item-animate');
				setTimeout(function () {
					$('body .animate-box.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fade-in') {
								el.addClass('fade-in animated-fast');
							} else if (effect === 'fade-in-left') {
								el.addClass('fade-in-left animated-fast');
							} else if (effect === 'fade-in-right') {
								el.addClass('fade-in-right animated-fast');
							} else {
								el.addClass('fade-in-up animated-fast');
							}
							el.removeClass('item-animate');
						}, k * 200, 'easeInOutExpo');
					});
				}, 100);
			}
		}, { offset: '85%' });
	};

	// Testimonials
	var testimonialCarousel = function () {
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
		});
	};

	// Counter
	var counter = function () {
		$('.js-counter').countTo({
			formatter: function (value, options) {
				return value.toFixed(options.decimals);
			},
		});
	};

	var counterWayPoint = function () {
		if ($('#counter').length > 0) {
			$('#counter').waypoint(function (direction) {
				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					setTimeout(counter, 400);
					$(this.element).addClass('animated');
				}
			}, { offset: '90%' });
		}
	};

	// Countdown
	var countdown = function () {
		var countdown = document.querySelector('.countdown');

		function getTimeRemaining(endtime) {
			var t = Date.parse(endtime) - Date.parse(new Date());
			var seconds = Math.floor((t / 1000) % 60);
			var minutes = Math.floor((t / 1000 / 60) % 60);
			var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			var days = Math.floor(t / (1000 * 60 * 60 * 24));
			return {
				'total': t,
				'days': days,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
		}

		function initializeClock(id, endtime) {
			var clock = document.getElementById(id);
			var daysSpan = clock.querySelector('.days');
			var hoursSpan = clock.querySelector('.hours');
			var minutesSpan = clock.querySelector('.minutes');
			var secondsSpan = clock.querySelector('.seconds');
			var newChild;

			function updateClock() {
				var t = getTimeRemaining(endtime);
				var daysArr = String(t.days).split('');
				daysSpan.innerHTML = '';
				for (var i = 0; i < daysArr.length; i++) {
					newChild = document.createElement('span');
					newChild.innerHTML = daysArr[i];
					daysSpan.appendChild(newChild);
				}
				var hoursArr = String(('0' + t.hours).slice(-2)).split('');
				hoursSpan.innerHTML = '';
				for (var i = 0; i < hoursArr.length; i++) {
					newChild = document.createElement('span');
					newChild.innerHTML = hoursArr[i];
					hoursSpan.appendChild(newChild);
				}
				var minuteArr = String(('0' + t.minutes).slice(-2)).split('');
				minutesSpan.innerHTML = '';
				for (var i = 0; i < minuteArr.length; i++) {
					newChild = document.createElement('span');
					newChild.innerHTML = minuteArr[i];
					minutesSpan.appendChild(newChild);
				}
				var secondArr = String(('0' + t.seconds).slice(-2)).split('');
				secondsSpan.innerHTML = '';
				for (var i = 0; i < secondArr.length; i++) {
					newChild = document.createElement('span');
					newChild.innerHTML = secondArr[i];
					secondsSpan.appendChild(newChild);
				}
				if (t.total <= 0) {
					clearInterval(timeinterval);
				}
			}
			updateClock();
			var timeinterval = setInterval(updateClock, 1000);
		}
		// set your wedding date here
		var deadline = 'May 17 2025 16:00:00 GMT+0530';
		if (countdown) {
			initializeClock('timer', deadline);
		}
	}

	function loadData() {
		var cntBtn = $('.cnt-button');

		cntBtn.on('click', function () {
			var cntNo = jQuery('input[name=form-telephone]').val()
			console.log(cntNo)
			jQuery.ajax({
				url: "scripts/checkName.php",
				method: "POST",
				data: {
					contact: cntNo
				},
				dataType: 'json',
				success: function (data) {
					console.log(data);
					if (data == null) {
						alert("The number you entered is not in our system. Please try another number or contact Yasas/Puranjana for verification.")
					} else {
						console.log(data.firstNme)
						// 1. Update welcome message
						const welcomeMessage = `Dear, <strong>${data.firstNme} ${data.lastNme}</strong><br> you are cordially invited to our wedding!`;
						const welcomeContainer = document.querySelector('.invitation_welcome_message');
						welcomeContainer.innerHTML = welcomeMessage;

						// 2. Pre-select radio buttons if attendance is already set
						if (data.church && data.church !== 'N/A') {
							$(`input[name="church-attendance"][value="${data.church}"]`).prop('checked', true);
						}
						if (data.wedding && data.wedding !== 'N/A') {
							$(`input[name="wedding-attendance"][value="${data.wedding}"]`).prop('checked', true);
						}

						// Display the hidden content
						var divElement = document.querySelector(".hiddenItem");
						divElement.style.display = "block";
					}
				},
				error: function (err) {
					console.log(err);
				}
			});
		});
	}

	function clearOnChange() {
		var cntField = $('#form-guest-telephone');
		cntField.on('input', function () {
			$('input[name="rdo"]').prop('checked', false);
			var divElement = document.querySelector(".hiddenItem");
			divElement.style.display = "none";
		});
	}

	var isotope = function () {
		var $container = $('.grid');

		$container.imagesLoaded(function () {
			$container.isotope({
				// options
				itemSelector: '.grid-item',
				percentPosition: true,
				masonry: {
					// use element for option
					columnWidth: '.grid-sizer',
				},
				getSortData: {
					moments: '.moments', // text from querySelector
					category: '[data-category]',
					weight: function (itemElem) { // function
						var weight = $(itemElem).find('.weight').text();
						return parseFloat(weight.replace(/[\(\)]/g, ''));
					}
				}
			});
		})

		// filter functions
		var filterFns = {
			// show if number is greater than 50
			numberGreaterThan50: function () {
				var number = $(this).find('.number').text();
				return parseInt(number, 10) > 50;
			},
			// show if name ends with -ium
			ium: function () {
				var name = $(this).find('.name').text();
				return name.match(/ium$/);
			}
		};
		// bind filter button click
		$('.filters-button-group').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			// use filterFn if matches value
			filterValue = filterFns[filterValue] || filterValue;
			$container.isotope({ filter: filterValue });
		});
		// change is-checked class on buttons
		$('.button-group').each(function (i, buttonGroup) {
			var $buttonGroup = $(buttonGroup);
			$buttonGroup.on('click', 'button', function () {
				$buttonGroup.find('.is-checked').removeClass('is-checked');
				$(this).addClass('is-checked');
			});
		});
	}

	// Watch changes on the attendanceID input

	function introVid() {
		$(document).ready(function () {
			var video = document.getElementById("preloadVideo");
			introCaseda();

			video.onended = function () {
				$("#preloader").fadeOut(); // Fade out preloader
				$("#websiteContent").fadeIn(); // Show website content
			};

			$("#unmuteButton").click(function () {
				var video = document.getElementById("preloadVideo");

				if (video.muted) {
					video.muted = false;
					$(this).find("i").removeClass("fa-volume-mute").addClass("fa-volume-up"); // Changes to speaker with sound
				} else {
					video.muted = true;
					$(this).find("i").removeClass("fa-volume-up").addClass("fa-volume-mute"); // Changes to muted speaker
				}
			});

			$("#skipButton").click(function () {
				$("#preloader").fadeOut();
			});
		});

	}

	function videoEnded() {
		// Hide the preloader and show the main content
		document.getElementById('preloader').style.display = 'none';
		document.querySelector('.main').style.display = 'block';

		// Run your animation or any other code here
		// For example, you might want to add a class to trigger the animation:
		document.querySelector('.animation').classList.add('animation');
	}

	$(function () {
		contentWayPoint();
		testimonialCarousel();
		counter();
		counterWayPoint();
		countdown();
		loadData();
		isotope();
		contactForm();
		clearOnChange();
		// attendanceHide();
	});
}());
