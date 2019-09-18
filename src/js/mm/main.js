import "core-js/stable"
import "regenerator-runtime/runtime"
import "./global/toggle.js";
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
                                Element.prototype.webkitMatchesSelector;
  }



  
    
  