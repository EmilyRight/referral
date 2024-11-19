import $ from 'jquery';
import { WOW } from './vendor/wow.min';
import detectDevice from './helpers/detectDevice';

import { closeModal, openModal } from './helpers/modal';
import {
  fieldListener, validateFields, keyField, prepField,
} from './helpers/inputs';
import { generateId, getCurrentYear } from './helpers/utils';
import GTMEvents from './helpers/gtmEvents';
import videoTeaser from './helpers/videoTeaser';
import { handleFaqOpening } from './helpers/faq';

const GTM = new GTMEvents();
window.jQuery = window.$ = $;
/// /////// DocReady //////////
document.addEventListener('DOMContentLoaded', () => {
  detectDevice(); // videoTeaser();
  new WOW().init();
  GTM.addEventListeners();
  getCurrentYear();
  goNextSection();
  scrollTeaser(document.querySelector('.section-about'));
  // videoTeaser();
  handleFaqOpening();
  setFriends();
});

function goNextSection() {
  const goNextBtns = document.querySelectorAll('.js-go-next');
  const sectionsList = document.querySelectorAll('section');

  goNextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const btnParentNode = btn.closest('section');
      let sectionToScrollTo;
      sectionsList.forEach((el, index) => {
        if (el === btnParentNode) {
          sectionToScrollTo = sectionsList[index + 1];
          scrollToElement(sectionToScrollTo);
        }
      });
    });
  });
}

function scrollToElement(el) {
  const offs = 0;
  const y = el.getBoundingClientRect().top + window.scrollY + offs;
  window.scrollTo({ top: y, behavior: 'smooth' }); // element.scrollIntoView();
}

// scroll to next if URL contains #about

function scrollTeaser(el) {
  if (window.location.hash === '#about') {
    scrollToElement(el);
  }
}

// animate digit
// animate digit
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) { window.requestAnimationFrame(step); }
  };
  window.requestAnimationFrame(step);
}

function setFriends() {
  $('.selector__controls').on('click', (e) => {
    const $itm = $(e.target);
    const pin = 'control--item'; // class item
    const pinSelected = '_is-selected'; // selected item
    const $line = $('.line__indicator');

    const $pin = ($itm.hasClass(pin)) ? $itm : $itm.closest(`.${pin}`);
    if ($pin.hasClass(pin)) {
      // line
      const idx = $pin.index(); const
        pos = idx * 27;
      (idx === 3) ? $line.css('width', '100%') : $line.css('width', `calc(13% + ${pos}%)`);

      // hearts
      $pin.siblings().addClass(pinSelected);
      $pin.addClass(pinSelected)
        .next().removeClass(pinSelected)
        .next()
        .removeClass(pinSelected)
        .next()
        .removeClass(pinSelected);

      // bonus digits
      setBonus(idx);
    }
  });
}
function setBonus(p) {
  const bonusData = [2000, 6000, 10000, 20000];
  const digits = $('.js-counter-result').get(0);
  const st = parseInt($('.js-counter-result').text());
  animateValue(digits, st, bonusData[p], 600);
}
