import 'core-js/stable'
import "./global/toggle.js"
import "./global/tab.js"
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
                                Element.prototype.webkitMatchesSelector;
  }



  
    
  