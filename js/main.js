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
			if (!$('input[name="rdo"]:checked').length) {
				alert('Please select Yes or No before submitting!');
				e.preventDefault();  // prevent form submission
			}
			$('.form-group').removeClass('has-error');
			$('.help-block').remove();

			// get the form data
			var formData = {
				'contact': $('input[name="form-telephone"]').val(),
				'attending': $('input[name="rdo"]:checked').val(),
				'guestCount': $('#attendanceID').val(),
				'guestDetails': getGuestDetails()
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
				if (!data.state) {
					alert("Could not submit the response... Please try again :(")
				} else {
					// display success message
					alert("Submit successful!")
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
		var deadline = 'January 22 2024 9:00:00 GMT+0530';
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
						alert("Please check the number and try again!")
					} else {
						console.log(data.firstNme)
						// 1. Update welcome message
						const welcomeMessage = `Dear, <strong>${data.firstNme} ${data.lastNme}</strong><br> you are codially invited to our wedding!`;
						// document.querySelector('.invitation_welcome_message').textContent = welcomeMessage;
						const welcomeContainer = document.querySelector('.invitation_welcome_message');
						welcomeContainer.innerHTML = welcomeMessage;

						// 2. Update the max attribute for attendanceID
						if (data.seats) {
							let attendanceInput = document.getElementById('attendanceID');
							attendanceInput.setAttribute('max', data.seats);

							// Set the default value
							attendanceInput.value = data.seats;
						}

						// Display the hidden content
						generateGuestTable();
						var divElement = document.querySelector(".hiddenItem");
						divElement.style.display = "block";
						var divElement = document.querySelector(".hiddenItem");
						divElement.style.display = "block";

					}
				},
				error: function (err) {
					console.log(err);
				}
			});
			// var divElement = document.querySelector(".hiddenItem");
			// if (divElement.style.display === "none" || divElement.style.display === "") {
			// 	divElement.style.display = "block";
			// } else {
			// 	divElement.style.display = "none";
			// }
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

	function attendanceHide() {
		$('input[name="rdo"]').change(function () {
			// Get the selected value
			var selectedValue = $(this).val();

			// Add any logic you want here based on the selected value
			if (selectedValue === "Yes") {
				var divElement = document.querySelector(".hiddenItem2");
				divElement.style.display = "block";
			} else if (selectedValue === "No") {
				var divElement = document.querySelector(".hiddenItem2");
				divElement.style.display = "none";
			}
		});
	}

	function addGuest() {
		var addBtn = $('.add-button');
		var guestInput = $('#form-guest-name');
		var guestList = $('.guest-list');

		addBtn.on('click', function () {
			event.preventDefault();
			var guestVal = guestInput.val();
			var appendString = '<div><input class="form-control" type="text" value="' + guestVal + '"/><a href="#" class="remove_field"><i class="fa fa-trash"></i></a></div>';
			if (guestVal == '') {
				guestInput.focus();
			} else {
				guestList.append(appendString);
				guestInput.val('');
			}
		});

		$('.guest-list').on('click', '.remove_field', function (e) {
			e.preventDefault();
			$(this).parent('div').remove();
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

	function generateGuestTable() {
		const guestCount = parseInt(document.getElementById('attendanceID').value);
		const tableBody = document.querySelector('.guest-preferences-table tbody');

		// Clear any existing rows first
		tableBody.innerHTML = '';

		for (let i = 1; i <= guestCount; i++) {
			let row = document.createElement('tr');

			let guestNoCell = document.createElement('td');
			guestNoCell.textContent = i;
			row.appendChild(guestNoCell);

			let alcoholCell = document.createElement('td');
			let alcoholSelect = document.createElement('select');
			alcoholSelect.innerHTML = `
				<option value="no" selected>No</option>
				<option value="yes">Yes</option>
			`;
			alcoholCell.appendChild(alcoholSelect);
			row.appendChild(alcoholCell);

			let mealCell = document.createElement('td');
			let mealSelect = document.createElement('select');
			mealSelect.innerHTML = `
				<option value="non-veg" selected>Non-Veg</option>
				<option value="veg">Veg</option>
			`;
			mealCell.appendChild(mealSelect);
			row.appendChild(mealCell);

			tableBody.appendChild(row);
		}
	}

	function attendanceChange() {
		document.getElementById('attendanceID').addEventListener('change', generateGuestTable);
	}

	// Watch changes on the attendanceID input
	function getGuestDetails() {
		const guestCount = parseInt(document.getElementById('attendanceID').value);
		let guests = [];

		for (let i = 1; i <= guestCount; i++) {
			let row = document.querySelector(`.guest-preferences-table tbody tr:nth-child(${i})`);
			let alcohol = row.querySelector('td:nth-child(2) select').value;
			let meal = row.querySelector('td:nth-child(3) select').value;

			guests.push({
				'guestNo': i,
				'alcohol': alcohol,
				'meal': meal
			});
		}

		return JSON.stringify(guests);
	}

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

	function introCaseda() {
		console.log("Intro Check...")
		console.log("Loaded...")
		let video = document.getElementById('preloadVideo');
		const preloader = document.getElementById('preloader');

		let videoTimeout = setTimeout(fallbackFunction, 60000);  // 10 seconds

		video.addEventListener('playing', function () {
			console.log("Playing...")
			clearTimeout(videoTimeout);  // Clear the timeout if video starts playing
		});

		function fallbackFunction() {
			// Here you can hide the video and display some fallback content or redirect the user, etc.
			$("#preloader").fadeOut();

		}

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
		addGuest();
		loadData();
		isotope();
		contactForm();
		clearOnChange();
		attendanceChange();
		attendanceHide();
		introVid();
	});
}());
