import Ember from 'ember';

const {Component, inject, on, $} = Ember;

export default Component.extend({
	layout: inject.service(),
	classNames: ['Header'],

	detail: on('didInsertElement', function() {
		this.actions();

		//@todo: create a component out of it
		var pinImg = document.querySelector('.js-pin-it');

	    pinImg.addEventListener('mouseenter', function(e) {

	    	// Return if the link has already been generated and added
			var pinImgActive = document.querySelector('.js-pin-it-active');

	    	if(pinImgActive) {

	    		return;
	    	}


	    	this.classList.add('js-pin-it-active');

	    	e.target.insertAdjacentHTML('beforebegin', '<a href="http://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(window.location.href) + '&media=' + encodeURIComponent(e.target.currentSrc) + '&description=' + encodeURIComponent(e.target.title) + '" target="_blank" class="pinterest-anchor js-pin-icon"><div class="icon icon-pinterest icon-pinterest--big"> </div></a>');
	    });

	}),

	// open subNav + add active state on the target
	_showNavRecipe(event) {

		var target = event.currentTarget;
		var subNav = document.querySelector('.js-nav-recipes');

		target.classList.add('is-active');
		subNav.classList.add('is-active');

		$(target).on('mouseleave', event => this._hideNav(event));

	},

	// close subNav + remove active state on the target
	_showNavTravel(event) {

		var target = event.currentTarget;
		var subNav = document.querySelector('.js-nav-travel');

		target.classList.add('is-active');
		subNav.classList.add('is-active');

		$(target).on('mouseleave', event => this._hideNav(event));

	},

	// hideNav subNav Dropdown
	_hideNav(event) {

		event.preventDefault();

		var target = event.currentTarget;
		var subNav = $('.NavSub.is-active');

		$(subNav).removeClass('is-active');
		target.classList.remove('is-active');

	},

	// hide menu overlay on nav-item click
	_linkHandler() {
		// console.log('link handler');
	},

	_mobileNav() {
		var headerMobile = $('.Header');

		if (headerMobile.hasClass('on-mobile')) {
			headerMobile.removeClass('on-mobile');
		}
	},

	actions() {

		var buttonRecipes = document.querySelectorAll('.js-navToggleRecipes');
		var buttonTravel = document.querySelectorAll('.js-navToggleTravelOverview');

		$(buttonRecipes).on('mouseenter', event => this._showNavRecipe(event));
		$(buttonTravel).on('mouseenter', event => this._showNavTravel(event));
		$('.Nav a').on('click', event => this._mobileNav(event));

	}
});

		// get events data attribute and check if another elemnt has the same
		// $('.Nav a').on('mouseenter', function(event) {
		// 	var target = $(event.currentTarget);
		// 	var targetVal = target.attr('data-target');
		// 	var targetParent = target.parents('.Nav');
		// 	var targetSub = targetParent.find('.NavSub-content');
		// 	console.log(targetSub);
		// 	if (targetSub.attr('data-target') === targetVal) {
		// 		console.log('SAME SAME');
		// 	}
		// })
