import "core-js/stable"
import "regenerator-runtime/runtime"

import "./templates/blank.js";
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
                                Element.prototype.webkitMatchesSelector;
  }



  
    
  