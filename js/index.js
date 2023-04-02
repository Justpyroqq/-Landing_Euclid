import Swiper from '../node_modules/swiper/swiper-bundle.esm.browser.min.js';

const swiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    autoplay: {
        delay: 5000,
    },
});

let animElements = [{
    element: '.zero-block__title',
    child: null,
    effect: 'active-element',
    played: false,
}, {
    element: '.zero-block__subTitle',
    child: null,
    effect: 'active-element-reverse',
    played: false,
}, {
    element: '.zero-block__building-images',
    child: '.zero-block__building-image',
    effect: 'active-child-element',
    childEffect: 'active-child-element-down',
    played: false,
},
{
    element: '.section-design-solutions',
    child: null,
    effect: 'active-element',
    played: false,
}, {
    element: '.section-about-us__sub-title',
    child: null,
    effect: 'active-element-reverse',
    played: false,
}, {
    element: '.section-about-us__example',
    child: null,
    effect: 'active-element',
    played: false,
}, {
    element: '.section-about-us__double-cards',
    child: null,
    effect: 'active-element-reverse',
    played: false,
}, {
    element: '.section-how-we-work__info',
    child: null,
    effect: 'active-element',
    played: false,
}, {
    element: '.section-how-we-work__photo',
    child: null,
    effect: 'active-element-reverse',
    played: false,
}, {
    element: '.section-questions',
    child: '.section-questions__item',
    effect: 'active-child-element',
    childEffect: 'active-child-element',
    played: false,
}];

let animElementsCount = animElements.length;

let openQuestion;

function showHideMenu() {
    document.querySelector('.header__list').classList.toggle('header__list_active');
    document.querySelector('.header__button_burger').classList.toggle('header__button_burger_active');
}

function showElements(elements) {
    for (let item of elements) {
        if (!item.played) {
            let el = document.querySelector(item.element);
            var br = el.getBoundingClientRect();
            let brTop = Math.round(br.top - window.innerHeight) + pageYOffset;
            if (brTop < window.pageYOffset) {
                if (item.child === null) {
                    el.classList.add('active-element');
                    el.classList.add(item.effect);
                } else {
                    el.querySelectorAll(item.child).forEach((e, i) => {
                        e.classList.add('active-element');
                        e.classList.add(`${item.childEffect}-${i + 1}`);
                    });
                }
                item.played = true;
                animElementsCount--;
            }
        } else {
            continue;
        }
    }
}

function scrollToLink(e, el) {
    if (document.querySelector('.header__list').classList.contains('header__list_active')) {
        showHideMenu();
    }

    e.preventDefault();
    let scrollto = el.getAttribute('href');
    const scrollTarget = document.querySelector(scrollto);
    const topOffset = 50;
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;
    window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

function ShowStep(el) {
    const path = el.dataset.path;

    document.querySelectorAll('.section-how-we-work__step').forEach(tabBtn => {
        tabBtn.classList.remove('section-how-we-work__step_active');
    });

    el.classList.add('section-how-we-work__step_active');

    document.querySelectorAll('.section-how-we-work__content').forEach(tabContent => {
        tabContent.classList.remove('section-how-we-work__content_active');
    });

    document.querySelector(`[data-target="${path}"]`).classList.add('section-how-we-work__content_active');

    document.querySelectorAll('.section-how-we-work__image').forEach(tabImage => {
        tabImage.classList.remove('section-how-we-work__image_active');
    });

    document.querySelector(`[data-target-img="${path}"]`).classList.add('section-how-we-work__image_active');
}

function showQuestion(el) {
    let question = el.querySelector('.section-questions__button');

    document.querySelectorAll('.section-questions__button').forEach(item => {
        item.classList.remove('section-questions__button_active');
        item.nextElementSibling.style.maxHeight = null;
    });

    if (el === openQuestion) {
        question.classList.remove('section-questions__button_active');
        question.nextElementSibling.style.maxHeight = null;
        openQuestion = null;
    } else {
        openQuestion = el;
        question.classList.add('section-questions__button_active');
        let answer = question.nextElementSibling;
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    }
}

window.addEventListener('scroll', function () {
    if (animElementsCount > 0) {
        showElements(animElements);
    }
});

document.addEventListener('DOMContentLoaded', function () {

    document.body.classList.remove('body-noScroll');
    document.querySelector('.load-block').classList.add('off');

    showElements(animElements);

    document.querySelector('.header__button_burger').addEventListener('click', showHideMenu);

    document.querySelectorAll('.header__link').forEach(el => {
        el.addEventListener('click', function (e) {
            scrollToLink(e, el);
        });
    });

    document.querySelectorAll('.footer__link').forEach(el => {
        el.addEventListener('click', function (e) {
            scrollToLink(e, el);
        });
    });

    document.querySelectorAll('.section-how-we-work__step').forEach(el => {
        el.addEventListener('click', function () {
            ShowStep(el);
        });
    });

    document.querySelectorAll('.section-questions__item').forEach(el => {
        el.addEventListener('click', function () {
            showQuestion(el);
        });
    });
});