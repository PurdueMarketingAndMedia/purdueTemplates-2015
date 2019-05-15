
//toggle gold bar
const toggleMenu = (e, identifier, goldBarMobile) => {
    e = e.target
    const expanded = e.getAttribute('aria-expanded') === "false" ? true : false
    e.setAttribute('aria-expanded', expanded)

    const el = document.querySelector(identifier)
    const currAttr = (window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle).display
    if (currAttr && currAttr === 'flex') {
        el.removeAttribute('style')
    } else {
        el.style.display = 'flex'
    }

    if (goldBarMobile) {
        let height = (window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle).maxHeight
        if (height === '48px') {
            el.style.maxHeight = '900px'
        } else if (height == '900px') {
            el.style.maxHeight = height === '48px'
        }
        setTimeout(() => {
            height = (window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle).maxHeight
        }, 1000)
    }
}
document.querySelector(".header__goldBar--inner>button").addEventListener('click', (e) => { toggleMenu(e, `.header__goldBar--inner`, true) })
document.querySelector(".header__goldBar__findInfoFor>button").addEventListener('click', (e) => { toggleMenu(e, `#findInfoFor`, true) })
//toggle function

const toggle = (e) => {
    let clicked = e.currentTarget
    const className = (term) => {
        return clicked.classList.contains(term);
    }
    switch (true) {
        case className('dropdown-button'):
            const dropTarget = clicked.parentNode.children[1]
            if (dropTarget.classList[0] !== 'header__mainNav--dropdown2') {
                const outerDropdowns = document.querySelectorAll('.header__mainNav--dropdown1')
                const innerDropdowns = document.querySelectorAll('.header__mainNav--dropdown2')
                const dropdowns = [...outerDropdowns, ...innerDropdowns]
                for (const dropdown of dropdowns) {
                    if (dropdown !== dropTarget) {
                        dropdown.removeAttribute('style')
                    }
                }
            } else if (dropTarget.classList[0] === 'header__mainNav--dropdown2') {
                const innerDropdowns = document.querySelectorAll('.header__mainNav--dropdown2')
                for (const dropdown of innerDropdowns) {
                    if (dropdown !== dropTarget) {
                        dropdown.removeAttribute('style')
                    }
                }
            }
            let display = (window.getComputedStyle ? getComputedStyle(dropTarget, null) : dropTarget.currentStyle).display
            if (display === "flex") {
                dropTarget.removeAttribute('style')
            } else {
                dropTarget.style.display = 'flex'
            }
            break

        default:
            switch (clicked.id) {
                case "mainNavMo":
                    console.log('clicked')
                    const dropTarget = clicked.parentNode.children[1]
                    let height = (window.getComputedStyle ? getComputedStyle(dropTarget, null) : dropTarget.currentStyle).maxHeight
                    if (height === '0px') {
                        dropTarget.style.maxHeight = '1900px'
                    } else if (height !== '0px') {
                        dropTarget.style.maxHeight = '0px'
                    }
                    break
                default:
                    break
            }
            break
    }
    const dropTarget = e.target.parentNode.children[1]
}

//Toggle drop-downs on the top nav bar
const navDropdowns = document.querySelectorAll(`.dropdown-button`)

for (const dropdown of navDropdowns) {
    dropdown.addEventListener('click', (e) => { toggle(e) })
}

document.addEventListener('click', (e) => {
    if (e.target.tagName !== "A" && e.target.tagName !== "BUTTON") {
        const outerDropdowns = document.querySelectorAll('.header__mainNav--dropdown1')
        const innerDropdowns = document.querySelectorAll('.header__mainNav--dropdown2')
        const dropdowns = [...outerDropdowns, ...innerDropdowns]
        for (const dropTarget of dropdowns) {
            dropTarget.removeAttribute('style')
        }
    }
})

document.querySelector('#mainNavMo').addEventListener('click', (e) => { toggle(e) })

const reset = (oldWidth) => {
    const footerHeadings = document.querySelectorAll(".footer__info-links--column>h3>button.accordion__heading--footer");
    const width = document.body.clientWidth;
    const goldBarDisplay = document.querySelector(".header__goldBar--menus")
    const goldBarHeight = document.querySelector(".header__goldBar--inner")
    const findInfoFor = document.querySelector("#findInfoFor")

    if (width > 768) {
        goldBarDisplay.removeAttribute('style')
        goldBarHeight.removeAttribute('style')
        document.querySelector('.header__mainNav--main').removeAttribute('style')
    } else {
        findInfoFor.removeAttribute('style')
    }
}

window.addEventListener('resize', () => {
    reset(width);
    let timer;
    clearInterval(timer);
    timer = setTimeout(() => {
        width = document.body.clientWidth
    }, 250);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Below are functions used for footer

//toggle function
const toggleNew = (e) => {
    let clicked = e.currentTarget
    const checkClassName = (term) => {
        return clicked.classList.contains(term);
    }
    console.log(clicked)
    switch (true) {
        case checkClassName('accordion__heading'):
            const expanded = clicked.getAttribute('aria-expanded') === "false" ? true : false;
            clicked.setAttribute('aria-expanded', expanded);
            const contentId = clicked.getAttribute('aria-controls');

            let icons = clicked.querySelectorAll('svg');
            icons.forEach((icon) => {
                swapIcon(icon)
            })
            let content = document.querySelector('#' + contentId);
            const currAttr = window.getComputedStyle(content).getPropertyValue('display');
            if (currAttr && currAttr === 'block') {
                content.style.height = 0;
                setTimeout(() => {hide(content)}, 500)
            } else {
                show(content);
                content.style.height = content.scrollHeight+"px";
            }
            break

    }
}
// Hide an element
var hide = function (elem) {
    elem.classList.add('hide');
    elem.classList.remove('show');
};
// show an element
var show = function (elem) {
    elem.classList.add('show');
    elem.classList.remove('hide');
};
//Reset visibility
var removeStyle = function (elem) {
    elem.classList.remove('hide', 'show');
    elem.removeAttribute('style');
};
//Change element display
const swapIcon = (el) => {
    const currAttr = window.getComputedStyle(el).getPropertyValue('display');
    if (currAttr && currAttr === 'block') {
        hide(el);
        el.setAttribute('aria-hidden', true);
    } else {
        show(el);
        el.setAttribute('aria-hidden', false);
    }
}
//Collapse footer  and show icon at the beginning on small screen
var width = document.body.clientWidth;
document.querySelectorAll('.accordion__heading--footer').forEach((el) => {
    if (width < 768) {
       el.setAttribute('aria-expanded', false);
    }
});
document.querySelectorAll('.accordion__content--footer').forEach((el) => {
    if (width < 768) {
        hide(el);
        el.setAttribute('data-collapsed', true);
    }
});
document.querySelectorAll('.accordion__heading--footer>svg.fa-plus').forEach((el) => {
    if (width < 768) {
        show(el)
    }
});
document.querySelectorAll('.accordion__heading--footer>svg.fa-minus').forEach((el) => {
    if (width < 768) {
        hide(el)
    }
});
//Toggle footer accordion
document.querySelectorAll('.footer__info-links--column>h3>button').forEach((accordion) => {
    accordion.addEventListener('click', (e) => {
        let width = document.body.clientWidth;
        if (width < 768) {
            toggleNew(e);
        }
    })
})
//Reset
window.addEventListener('resize', () => {
    var width = document.body.clientWidth;
    document.querySelectorAll('.footer__info-links--column>h3>button>svg').forEach((el) => {
        if (width >= 768) {
            removeStyle(el);
            el.setAttribute('aria-hidden', true);
        }

    });
    document.querySelectorAll('.accordion__content--footer').forEach((el) => {
        if (width >= 768) {
            removeStyle(el);
        }
    });
    document.querySelectorAll('.accordion__heading--footer').forEach((el) => {
        let content = document.querySelector('#' + el.getAttribute('aria-controls'));
        const currAttr = window.getComputedStyle(content).getPropertyValue('display');
        console.log(currAttr)
        if (width >= 768) {
           el.setAttribute('aria-expanded', true);
        }else if(currAttr === "block"){
            el.setAttribute('aria-expanded', true);
        }else{
            el.setAttribute('aria-expanded', false);
        }
    });

});
