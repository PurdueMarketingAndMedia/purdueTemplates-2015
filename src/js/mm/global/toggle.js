// Hide an element
const hide = (elem) => {
    const toggler = elem.previousElementSibling;
    if (toggler) toggler.setAttribute('aria-expanded', 'false');
    elem.classList.add('hide');
    elem.classList.remove('show');
  };
  // show an element
  const show = (elem) => {
    const toggler = elem.previousElementSibling;
    if (toggler) toggler.setAttribute('aria-expanded', 'true');
    elem.classList.add('show');
    elem.classList.remove('hide');
  };
  // Hide an footer element
  const hideFooter = (elem) => {
    if (elem.classList) {
      elem.classList.add('hide');
      elem.classList.remove('show');
    } else if (elem.nodeName === 'svg') {
      if (elem.getAttribute('class').indexOf('hide') <= -1) {
        elem.setAttribute('class', `${elem.getAttribute('class')} hide`);
      }
      if (elem.getAttribute('class').indexOf('show') > -1) {
        elem.setAttribute('class', elem.getAttribute('class').replace('show', ''));
      }
    }
  };
  // show an footer element
  const showFooter = (elem) => {
    if (elem.classList) {
      elem.classList.add('show');
      elem.classList.remove('hide');
    } else if (elem.nodeName === 'svg') {
      if (elem.getAttribute('class').indexOf('show') <= -1) {
        elem.setAttribute('class', `${elem.getAttribute('class')} show`);
      }
      if (elem.getAttribute('class').indexOf('hide') > -1) {
        elem.setAttribute('class', elem.getAttribute('class').replace('hide', ''));
      }
    }
  };
  // add selected class to element
  const select = (elem) => {
    elem.classList.add('selected');
  };
  // remove selected class to element
  const deselect = (elem) => {
    if (elem) {
      elem.classList.remove('selected');
    }
  };
  
  // Reset visibility
  const resetStyles = (elems) => {
    /* eslint-disable */
    for (const elem of elems) {
      if ([...elem.classList].includes('dropdown-button')) elem.setAttribute('aria-expanded', 'false');
      elem.classList.remove('hide', 'show', 'selected');
      const relatedMenu = elem.nextElementSibling;
      if (relatedMenu) relatedMenu.classList.remove('hide', 'show', 'selected');
      elem.removeAttribute('style');
    }
    /* eslint-enable */
  };
  // Change element display
  const swapIcon = (el) => {
    const currAttr = window.getComputedStyle(el).getPropertyValue('display');
    if (currAttr && currAttr === 'block') {
      hideFooter(el);
    } else {
      showFooter(el);
    }
  };
  
  // toggle function
  const toggle = (e) => {
    const clicked = e;
    const width = document.body.clientWidth;
    const checkClassName = (el, term) => el.classList
    && [...el.classList].includes(term);
    const checkElement = (el, selector) => el.target === document.querySelector(selector);
    const getCurrDisplay = (el) => window.getComputedStyle(el).getPropertyValue('display');
    const getCurrSelected = () => {
      const outer = document.querySelector('.header__mainNav--dropdownOuter.show');
      const inner = document.querySelector('.header__mainNav--dropdownInner.show');
      const side = document.querySelector('.dropdown-content.show');
      const outerSelected = outer ? outer.previousElementSibling : null;
      const innerSelected = inner ? inner.previousElementSibling : null;
      const sideSelected = side ? side.previousElementSibling : null;
      return { outerSelected, innerSelected, sideSelected };
    };
  
    switch (true) {
      // specifically footer accordion
      case checkClassName(clicked.target, 'accordion__heading--footer'): {
        document.querySelectorAll('.accordion__heading--footer').forEach((el) => {
          const contentId = el.getAttribute('aria-controls');
          const icons = el.querySelectorAll('.accordion__icon');
          const plusIcon = el.querySelector('.accordion__icon__plus');
          const minusIcon = el.querySelector('.accordion__icon__minus');
          const content = document.querySelector(`#${contentId}`);
          const currAttr = getCurrDisplay(content);
          if (el.getAttribute('aria-expanded') && el !== clicked) {
            el.setAttribute('aria-expanded', 'false');
            if (content.getAttribute('state-animating') === null) {
              hideFooter(minusIcon);
              showFooter(plusIcon);
              content.style.height = 0;
              content.setAttribute('state-animating', 'true');
              setTimeout(() => {
                hideFooter(content);
                content.removeAttribute('state-animating');
              }, 200);
            }
          } else if (el === clicked) {
            const expanded = clicked.getAttribute('aria-expanded') === 'false';
            clicked.setAttribute('aria-expanded', expanded);
            if (currAttr && currAttr === 'flex' && content.getAttribute('state-animating') === null) {
              icons.forEach((icon) => {
                swapIcon(icon);
              });
              content.style.height = 0;
              content.setAttribute('state-animating', 'true');
              setTimeout(() => {
                hideFooter(content);
                content.removeAttribute('state-animating');
              }, 200);
            } else if (content.getAttribute('state-animating') === null) {
              icons.forEach((icon) => {
                swapIcon(icon);
              });
              showFooter(content);
              content.setAttribute('state-animating', 'true');
              setTimeout(() => {
                content.removeAttribute('state-animating');
              }, 200);
              content.style.height = `${content.scrollHeight}px`;
            }
          }
        });
        break;
      }
      // accordion
      case checkClassName(clicked.target, 'accordion__heading'): {
        const contentId = clicked.getAttribute('aria-controls');
        const icons = clicked.querySelectorAll('.accordion__icon');
        const content = document.querySelector(`#${contentId}`);
        const currAttr = getCurrDisplay(content);
        const expanded = clicked.getAttribute('aria-expanded') === 'false';
        clicked.setAttribute('aria-expanded', expanded);
        if (currAttr && currAttr === 'flex' && content.getAttribute('state-animating') === null) {
          icons.forEach((icon) => {
            swapIcon(icon);
          });
          content.style.height = 0;
          content.setAttribute('state-animating', 'true');
          setTimeout(() => {
            hideFooter(content);
            content.removeAttribute('state-animating');
          }, 200);
        } else if (content.getAttribute('state-animating') === null) {
          icons.forEach((icon) => {
            swapIcon(icon);
          });
          showFooter(content);
          content.setAttribute('state-animating', 'true');
          setTimeout(() => {
            content.removeAttribute('state-animating');
            content.style.height = 'auto';
          }, 200);
          content.style.height = `${content.scrollHeight}px`;
        }
        break;
      }
      // specifically gold bar mobile menu
      case checkClassName(clicked.target, 'header__goldBar--moButton'): {
        const goldBarContent = document.querySelector('.header__goldBar--menus');
        const currGoldBarAttr = getCurrDisplay(goldBarContent);
  
        if (currGoldBarAttr && currGoldBarAttr === 'flex' && goldBarContent.getAttribute('state-animating') === null) {
          goldBarContent.style.height = 0;
          goldBarContent.setAttribute('state-animating', 'true');
          setTimeout(() => {
            hide(goldBarContent);
            goldBarContent.removeAttribute('state-animating');
          }, 200);
        } else if (goldBarContent.getAttribute('state-animating') === null) {
          show(goldBarContent);
          goldBarContent.setAttribute('state-animating', 'true');
          setTimeout(() => {
            goldBarContent.removeAttribute('state-animating');
          }, 200);
          goldBarContent.style.height = `${goldBarContent.scrollHeight}px`;
        }
        break;
      }
      // specifically find info for button
      case checkElement(clicked, '.header__goldBar__findInfoFor button'): {
        const menu = document.querySelector('#findInfoFor');
        const findInfoSelectedObj = getCurrSelected();
        const findInfoOutSelectedObj = findInfoSelectedObj.outerSelected;
        const findInfoInSelectedObj = findInfoSelectedObj.innerSelected;
        const findInfoSiSelectedObj = findInfoSelectedObj.sideSelected;
        const allDropdowns = [...document.querySelectorAll('.header__mainNav--dropdownOuter'), ...document.querySelectorAll('.header__mainNav--dropdownInner'), document.querySelector('#searchDropdown'), ...document.querySelectorAll('.dropdown-content')];
        allDropdowns.forEach((checkDropdown) => {
          if (checkDropdown !== menu) {
            hide(checkDropdown);
            deselect(findInfoOutSelectedObj);
            deselect(findInfoInSelectedObj);
            deselect(findInfoSiSelectedObj);
          }
        });
        // Rather than using the element CSS, use the classNames to toggle visability
        if ([...menu.classList].includes('hide')) {
          hide(menu);
        } else {
          show(menu);
        }
        break;
      }
      case checkClassName(clicked.target, 'dropdown-button'): {
        const dropdown = clicked.target.nextElementSibling;
        const findInfoForMenu = document.querySelector('#findInfoFor');
        const { outerSelected, innerSelected, sideSelected } = getCurrSelected();
        if (width >= 768) {
          hide(findInfoForMenu);
        }
        if (checkClassName(dropdown, 'header__mainNav--dropdownInner')) {
          const allInnerDropdowns = [...document.querySelectorAll('.header__mainNav--dropdownInner')];
          allInnerDropdowns.forEach((innerDropdown) => {
            if (innerDropdown !== dropdown) {
              hide(innerDropdown);
              deselect(innerSelected);
            }
          });
        } else {
          const allDropdowns = [...document.querySelectorAll('.header__mainNav--dropdownOuter'), ...document.querySelectorAll('.header__mainNav--dropdownInner'), document.querySelector('#searchDropdown'), ...document.querySelectorAll('.dropdown-content')];
          allDropdowns.forEach((checkDropdown) => {
            if (checkDropdown !== dropdown) {
              hide(checkDropdown);
              deselect(outerSelected);
              deselect(innerSelected);
              deselect(sideSelected);
            }
          });
        }
        // Rather than trying to look at the document CSS, why not use the classes already there.
        if ([...dropdown.classList].includes('hide')) {
          deselect(clicked.target);
          hide(dropdown);
        } else {
          select(clicked.target);
          show(dropdown);
        }
        break;
      }
      // search bar
      case checkClassName(clicked.target, 'fa-search'): {
        const searchDropdown = document.querySelector('#searchDropdown');
        const searchDisplayVal = getCurrDisplay(searchDropdown);
        const searchSelectedObj = getCurrSelected();
        const searchOutSelectedObj = searchSelectedObj.outerSelected;
        const searchInSelectedObj = searchSelectedObj.innerSelected;
        const searchSiSelectedObj = searchSelectedObj.sideSelected;
        if (width >= 768) {
          const otherDropdowns = [...document.querySelectorAll('.header__mainNav--dropdownOuter'), ...document.querySelectorAll('.header__mainNav--dropdownInner'), document.querySelector('#findInfoFor'), ...document.querySelectorAll('.dropdown-content')];
          otherDropdowns.forEach((checkDropdown) => {
            if (checkDropdown !== searchDropdown) {
              hide(checkDropdown);
              deselect(searchOutSelectedObj);
              deselect(searchInSelectedObj);
              deselect(searchSiSelectedObj);
            }
          });
          if (searchDisplayVal !== 'none') {
            hide(searchDropdown);
          } else {
            show(searchDropdown);
          }
        } else if (width < 768) {
          if (searchDisplayVal && searchDisplayVal === 'flex' && searchDropdown.getAttribute('state-animating') === null) {
            searchDropdown.style.height = 0;
            searchDropdown.setAttribute('state-animating', 'true');
            setTimeout(() => {
              hide(searchDropdown);
              searchDropdown.removeAttribute('state-animating');
            }, 100);
          } else if (searchDropdown.getAttribute('state-animating') === null) {
            show(searchDropdown);
            searchDropdown.setAttribute('state-animating', 'true');
            setTimeout(() => {
              searchDropdown.removeAttribute('state-animating');
            }, 100);
            searchDropdown.style.height = `${searchDropdown.scrollHeight + 24}px`;
          }
        }
  
        break;
      }
      // Main nav mobile
      case checkElement(clicked, '#mainNavMo'): {
        const closeAllDropdowns = [...document.querySelectorAll('.header__mainNav--dropdownInner'), ...document.querySelectorAll('.header__mainNav--dropdownOuter'), ...document.querySelectorAll('.dropdown-button')];
        resetStyles(closeAllDropdowns);
        const mainNavMenu = document.querySelector('.header__mainNav--main');
        const mainNavDisplay = getCurrDisplay(mainNavMenu);
        if (width < 991) {
          if (mainNavDisplay && mainNavDisplay === 'flex' && mainNavMenu.getAttribute('state-animating') === null) {
            mainNavMenu.style.height = `${mainNavMenu.scrollHeight}px`;
            setTimeout(() => {
              mainNavMenu.style.height = 0;
            }, 50);
            mainNavMenu.setAttribute('state-animating', 'true');
            setTimeout(() => {
              hide(mainNavMenu);
              const moDropdowns = [...document.querySelectorAll('.header__mainNav--dropdownOuter'), ...document.querySelectorAll('.header__mainNav--dropdownInner')];
              resetStyles(moDropdowns);
              mainNavMenu.removeAttribute('state-animating');
            }, 200);
          } else if (mainNavMenu.getAttribute('state-animating') === null) {
            show(mainNavMenu);
            mainNavMenu.setAttribute('state-animating', 'true');
            setTimeout(() => {
              mainNavMenu.removeAttribute('state-animating');
              mainNavMenu.style.height = 'auto';
            }, 200);
            mainNavMenu.style.height = `${mainNavMenu.scrollHeight}px`;
          }
        }
  
        break;
      }
      default: {
        const currSelectedObj = getCurrSelected();
        const outSelected = currSelectedObj.outerSelected;
        const inSelected = currSelectedObj.innerSelected;
        const siSelected = currSelectedObj.sideSelected;
        const allDropdownsDefault = [...document.querySelectorAll('.header__mainNav--dropdownInner'), ...document.querySelectorAll('.header__mainNav--dropdownOuter'), document.querySelector('#findInfoFor')];
        const sideDropdownsDefault = [...document.querySelectorAll('.dropdown-content')];
        deselect(outSelected);
        deselect(inSelected);
        deselect(siSelected);
        sideDropdownsDefault.forEach((dropdown) => {
          hide(dropdown);
        });
        if (width >= 768) {
          allDropdownsDefault.forEach((dropdown) => {
            hide(dropdown);
          });
        }
  
        break;
      }
    }
  };
  
  // Collapse footer  and show icon at the beginning on small screen
  const width = document.body.clientWidth;
  document.querySelectorAll('.accordion__heading--footer').forEach((el) => {
    if (width < 768) {
      el.setAttribute('aria-expanded', false);
      el.setAttribute('aria-disabled', false);
    }
  });
  document.querySelectorAll('.accordion__content--footer').forEach((el) => {
    if (width < 768) {
      hideFooter(el);
    }
  });
  document.querySelectorAll('.accordion__heading--footer>.accordion__icon__plus').forEach((el) => {
    if (width < 768) {
      showFooter(el);
    }
  });
  document.querySelectorAll('.accordion__heading--footer>.accordion__icon__minus').forEach((el) => {
    if (width < 768) {
      hideFooter(el);
    }
  });
  [...document.querySelectorAll('.header__mainNav-dropDownInner'), ...document.querySelectorAll('.header__mainNav-dropDownOuter')].forEach((el) => {
    if (width < 768) {
      hide(el);
    }
  });
  
  // inner dropdown hover handlers
  const enterHandler = (e) => {
    if (e.target.matches('.dropdown-button--inner')) {
      const innerRelated = e.relatedTarget;
      const attributes = [...innerRelated.attributes];
  
      let fromInnerMenu = false;
  
      attributes.forEach((item) => {
        if (item.localName === 'role' && item.nodeValue === 'menuitem') {
          fromInnerMenu = true;
        }
      });
  
      // e = e.target; // I don't think this is needed, shouldn't reassign params
      const parentMenu = innerRelated.parentElement.offsetParent;
  
      if (!fromInnerMenu || (parentMenu && [...parentMenu.classList].includes('header__mainNav--dropdownOuter')) || (parentMenu !== e.target.nextElementSibling)) {
        toggle(e.target);
      }
    }
  };
  
  const leaveHandler = (e) => {
    if (e.target.matches('.dropdown-button--inner')) {
      const { relatedTarget } = e;
      const attributes = [...relatedTarget.attributes];
  
      let toInnerMenu = false;
  
      attributes.forEach((item) => {
        if (item.localName === 'role' && item.nodeValue === 'menuitem') {
          toInnerMenu = true;
        }
      });
  
      // e = e.target; // Don't think this should be done, not a good idea to reassign params
  
      if (!toInnerMenu || (relatedTarget.offsetParent.offsetParent && [...relatedTarget.offsetParent.offsetParent.classList].includes('header__mainNav--dropdownOuter'))) {
        toggle(e.target);
      } else {
        const innerDropdownMenu = document.querySelector('.header__mainNav--dropdownInner.show');
        const innerLeaveHandler = (inner) => {
          const outerRelated = inner.relatedTarget;
  
          if (!([...outerRelated.classList].includes('dropdown-button')) || outerRelated !== e.target) {
            toggle(e.target);
          }
          innerDropdownMenu.removeEventListener('mouseleave', innerLeaveHandler);
        };
        innerDropdownMenu.addEventListener('mouseleave', innerLeaveHandler);
      }
    }
  };
  
  const toggleInnerDropdownListeners = (addListeners) => {
    if (addListeners) {
      document.addEventListener('mouseover', enterHandler);
      document.addEventListener('mouseout', leaveHandler);
    } else if (!addListeners) {
      document.removeEventListener('mouseover', enterHandler);
      document.removeEventListener('mouseout', leaveHandler);
    }
  };
  
  const assignListeners = () => {
    const clientwidth = document.body.clientWidth;
    document.addEventListener('click', (event) => {
      toggle(event);
    });
  
    if (clientwidth >= 991) {
      toggleInnerDropdownListeners(true);
    }
  };
  
  let resizeTimer;
  
  // Reset
  window.addEventListener('resize', () => {
    const clientwidth = document.body.clientWidth;
  
    const resetLg = [document.querySelector('.header__goldBar--menus'), document.querySelector('.header__goldBar--inner')];
  
    const resetSm = [document.querySelector('#findInfoFor'), document.querySelector('#searchDropdown')];
  
    const resetNav = [document.querySelector('.header__mainNav--main'), ...document.querySelectorAll('.dropdown-button')];
  
    if (clientwidth >= 768 && clientwidth >= 991) {
      resetStyles(resetNav);
    } else if (clientwidth >= 768) {
      resetStyles(resetLg);
    } else if (clientwidth < 768) {
      resetStyles(resetSm);
    }
    document.querySelectorAll('.accordion__heading--footer').forEach((el) => {
      const content = document.querySelector(`#${el.getAttribute('aria-controls')}`);
      const icons = el.querySelectorAll('.accordion__icon');
      const currAttr = window.getComputedStyle(content).getPropertyValue('display');
      if (clientwidth >= 768) {
        el.setAttribute('aria-expanded', true);
        el.setAttribute('aria-disabled', true);
        icons.forEach((iconel) => {
          if (iconel.getAttribute('class').indexOf('hide') > -1) {
            iconel.setAttribute('class', iconel.getAttribute('class').replace('hide', ''));
          }
          if (iconel.getAttribute('class').indexOf('show') > -1) {
            iconel.setAttribute('class', iconel.getAttribute('class').replace('show', ''));
          }
        });
        content.classList.remove('hide', 'show');
        content.removeAttribute('style');
      } else if (currAttr === 'flex') {
        el.setAttribute('aria-expanded', true);
        el.setAttribute('aria-disabled', false);
      } else {
        el.setAttribute('aria-expanded', false);
        el.setAttribute('aria-disabled', false);
      }
    });
  
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (clientwidth >= 991) {
        toggleInnerDropdownListeners(true);
      } else if (clientwidth < 991) {
        toggleInnerDropdownListeners(false);
      }
    }, 250);
  });
  
  assignListeners();
  