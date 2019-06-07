
//toggle function
const toggleNew = (e) => {
    let clicked = e
    const width = document.body.clientWidth;
    const checkClassName = (el, term) => {
        return el.classList && [...el.classList].includes(term);
    }
    const checkElement = (el, selector) => {
        return el === document.querySelector(selector)
    }
    const getCurrDisplay = (el) => {
        return window.getComputedStyle(el).getPropertyValue('display')
    }
    const getCurrSelected = () => {
        const outer = document.querySelector('.header__mainNav--dropdownOuter.show')
        const inner = document.querySelector('.header__mainNav--dropdownInner.show')
        const outerSelected = outer ? outer.previousElementSibling : null
        const innerSelected = inner ? inner.previousElementSibling : null
        return {outerSelected , innerSelected}
    }

    switch (true) {
        case checkClassName(clicked, 'accordion__heading'): // specifically footer accordion
            const expanded = clicked.getAttribute('aria-expanded') === "false" ? true : false;
            clicked.setAttribute('aria-expanded', expanded);
            const contentId = clicked.getAttribute('aria-controls');

            
            let icons = clicked.querySelectorAll('svg');
            const content = document.querySelector('#' + contentId);
            const currAttr = getCurrDisplay(content)
            if (currAttr && currAttr === 'flex' && content.getAttribute('state-animating') === null) {
                icons.forEach((icon) => {
                    swapIcon(icon)
                })
                content.style.height = 0;
                content.setAttribute('state-animating', 'true')
                setTimeout(() => {
                    hide(content)
                    content.removeAttribute('state-animating')
                }, 200)
            } else if(content.getAttribute('state-animating') === null) {
                icons.forEach((icon) => {
                    swapIcon(icon)
                })
                show(content);
                content.setAttribute('state-animating', 'true')
                setTimeout(() => {
                    content.removeAttribute('state-animating')
                }, 200)
                content.style.height = content.scrollHeight+"px";
            }
            break
        case  checkClassName(clicked, 'header__goldBar--moButton'): // specifically gold bar mobile menu
            const goldBarContent = document.querySelector('.header__goldBar--menus')
            const currGoldBarAttr = getCurrDisplay(goldBarContent)

            if (currGoldBarAttr && currGoldBarAttr === 'flex' && goldBarContent.getAttribute('state-animating') === null) {
                goldBarContent.style.height = 0;
                goldBarContent.setAttribute('state-animating', 'true')
                setTimeout(() => {
                    hide(goldBarContent)
                    goldBarContent.removeAttribute('state-animating')
                }, 200)
            } else if(goldBarContent.getAttribute('state-animating') === null) {
                show(goldBarContent);
                goldBarContent.setAttribute('state-animating', 'true')
                setTimeout(() => {
                    goldBarContent.removeAttribute('state-animating')
                }, 200)
                goldBarContent.style.height = `${goldBarContent.scrollHeight}px`
            }
            break
        case checkElement(clicked, '.header__goldBar__findInfoFor button'): // specifically find info for button
            const menu = document.querySelector('#findInfoFor')
            const currDisplayVal = getCurrDisplay(menu)
            const allDropdowns = [...document.querySelectorAll('.header__mainNav--dropdownOuter'), ...document.querySelectorAll('.header__mainNav--dropdownInner'), document.querySelector('#searchDropdown')]
            allDropdowns.map((checkDropdown) => {
                if (checkDropdown !== dropdown) {
                    hide(checkDropdown)
                }
            })
            if (currDisplayVal !== 'none') {
                hide(menu)
            } else {
                show(menu)
            }
            break
        case checkClassName(clicked, 'dropdown-button'):
            const dropdown = clicked.nextElementSibling
            const findInfoForMenu = document.querySelector('#findInfoFor')
            const {outerSelected, innerSelected} = getCurrSelected()
            if (width >= 768) {
                hide(findInfoForMenu)
            }
            if(checkClassName(dropdown, 'header__mainNav--dropdownInner')) {
                const allInnerDropdowns = [...document.querySelectorAll('.header__mainNav--dropdownInner')]
                allInnerDropdowns.map((innerDropdown) => {
                    if (innerDropdown !== dropdown) {
                        hide(innerDropdown)
                        deselect(innerSelected)
                    }
                })
            } else {
                const allDropdowns = [...document.querySelectorAll('.header__mainNav--dropdownOuter'), ...document.querySelectorAll('.header__mainNav--dropdownInner'), document.querySelector('#searchDropdown')]
                allDropdowns.map((checkDropdown) => {
                    if (checkDropdown !== dropdown) {
                        hide(checkDropdown)
                        deselect(outerSelected)
                        deselect(innerSelected)
                    }
                })
            }
            const dropdownDisplayVal = getCurrDisplay(dropdown)
            if (dropdownDisplayVal !== 'none') {
                deselect(clicked)
                hide(dropdown)
            } else {
                if (width < 768) {
                    select(clicked)
                }
                show(dropdown)
            }
            break
        case checkClassName(clicked, 'header__goldBar__search'): // search bar
            const searchDropdown = document.querySelector('#searchDropdown')
            const searchDisplayVal = getCurrDisplay(searchDropdown)
            if( width >=768 ) {
                const otherDropdowns = [...document.querySelectorAll('.header__mainNav--dropdownOuter'), ...document.querySelectorAll('.header__mainNav--dropdownInner'), document.querySelector('#findInfoFor')]
                otherDropdowns.map((checkDropdown) => {
                    if (checkDropdown !== dropdown) {
                        hide(checkDropdown)
                    }
                })
                if (searchDisplayVal !== 'none') {
                    hide(searchDropdown)
                } else {
                    show(searchDropdown)
                }
            } else if( width < 768 ) {
                if (searchDisplayVal && searchDisplayVal === 'flex' && searchDropdown.getAttribute('state-animating') === null) {
                    searchDropdown.style.height = 0;
                    searchDropdown.setAttribute('state-animating', 'true')
                    setTimeout(() => {
                        hide(searchDropdown)
                        searchDropdown.removeAttribute('state-animating')
                    }, 100)
                } else if(searchDropdown.getAttribute('state-animating') === null) {
                    show(searchDropdown);
                    searchDropdown.setAttribute('state-animating', 'true')
                    setTimeout(() => {
                        searchDropdown.removeAttribute('state-animating')
                    }, 100)
                    searchDropdown.style.height = `${searchDropdown.scrollHeight + 24}px`
                }
            }

            break
        case checkElement(clicked, '#mainNavMo'): // Main nav mobile
            const closeAllDropdowns = [...document.querySelectorAll('.header__mainNav--dropdownInner'), ...document.querySelectorAll('.header__mainNav--dropdownOuter')]
            resetStyles(closeAllDropdowns)
            const mainNavMenu = document.querySelector('.header__mainNav--main')
            const mainNavDisplay = getCurrDisplay(mainNavMenu)
            if( width < 768 ) {
                if (mainNavDisplay && mainNavDisplay === 'flex' && mainNavMenu.getAttribute('state-animating') === null) {
                    mainNavMenu.style.height = `${mainNavMenu.scrollHeight}px` 
                    setTimeout(() => {
                        mainNavMenu.style.height = 0;
                    }, 50)
                    mainNavMenu.setAttribute('state-animating', 'true')
                    setTimeout(() => {
                        hide(mainNavMenu)
                        const moDropdowns = [...document.querySelectorAll('.header__mainNav--dropdownOuter'), ...document.querySelectorAll('.header__mainNav--dropdownInner')]
                        resetStyles(moDropdowns)
                        mainNavMenu.removeAttribute('state-animating')
                    }, 200)
                } else if(mainNavMenu.getAttribute('state-animating') === null) {
                    show(mainNavMenu);
                    mainNavMenu.setAttribute('state-animating', 'true')
                    setTimeout(() => {
                        mainNavMenu.removeAttribute('state-animating')
                        mainNavMenu.style.height = 'auto' 
                    }, 200)
                    mainNavMenu.style.height = `${mainNavMenu.scrollHeight}px` 
                }
            }

            break
        default:
            const allDropdownsDefault = [...document.querySelectorAll('.header__mainNav--dropdownInner'), ...document.querySelectorAll('.header__mainNav--dropdownOuter'), document.querySelector('#findInfoFor')]
            if (width >= 768) {
                allDropdownsDefault.map((dropdown) => {
                    hide(dropdown)
                })
            }

            break
    }
}
// Hide an element
const hide = function (elem) {
    elem.classList.add('hide');
    elem.classList.remove('show');
};
// show an element
const show = function (elem) {
    elem.classList.add('show');
    elem.classList.remove('hide');
};
// add selected class to element
const select = function (elem) {
    elem.classList.add('selected');
};
// remove selected class to element
const deselect = function (elem) {
    
    if (elem) {
        elem.classList.remove('selected');
    }
};
//Reset visibility
const resetStyles = function (elems) {
    for (const elem of elems) {
        elem.classList.remove('hide', 'show', 'selected')
        elem.removeAttribute('style');
    }
};
//Change element display
const swapIcon = (el) => {
    const currAttr = window.getComputedStyle(el).getPropertyValue('display');
    if (currAttr && currAttr === 'block') {
        hide(el);
    } else {
        show(el);
    }
}
//Collapse footer  and show icon at the beginning on small screen
const width = document.body.clientWidth;
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
[...document.querySelectorAll('.header__mainNav-dropDownInner'), ...document.querySelectorAll('.header__mainNav-dropDownOuter')].forEach((el) => {
    if (width < 768) {
        hide(el)
    }
});

//Reset
window.addEventListener('resize', () => {
    const width = document.body.clientWidth;

    const resetLg = [...document.querySelectorAll('.footer__resources--column>h3>button>svg'), ...document.querySelectorAll('.accordion__content--footer'), document.querySelector('.header__goldBar--menus'), document.querySelector('.header__goldBar--inner'), document.querySelector('.header__mainNav--main'), ...document.querySelectorAll('.dropdown-button')]

    const resetSm = [document.querySelector('#findInfoFor'), document.querySelector('#searchDropdown')]

    if( width >= 768) {
        resetStyles(resetLg)
    } else if (width < 768) {
        resetStyles(resetSm)
    }

    document.querySelectorAll('.accordion__heading--footer').forEach((el) => {
        let content = document.querySelector('#' + el.getAttribute('aria-controls'));
        const currAttr = window.getComputedStyle(content).getPropertyValue('display');
        if (width >= 768) {
           el.setAttribute('aria-expanded', true);
        }else if(currAttr === "block"){
            el.setAttribute('aria-expanded', true);
        }else{
            el.setAttribute('aria-expanded', false);
        }
    });
});

const assignListeners = () => {
    document.addEventListener('click', (e) => {
        e = e.target
        if (e.classList && e.classList.contains('accordion__heading')) {
            let width = document.body.clientWidth;
            if (width < 768) {
                toggleNew(e);
            }
        } else if (
            e.classList && (
                (
                    e.classList.contains('header__goldBar--moButton') || 
                    e.classList.contains('dropdown-button') ||
                    e.classList.contains('header__goldBar__search')
                ) || 
                (
                    e === document.querySelector('.header__goldBar__findInfoFor button') ||
                    e === document.querySelector('#mainNavMo')
                )
            )
        ) {
            toggleNew(e)
        } else {
            toggleNew(e)
        }
    })
}

assignListeners()
