ToggleAccordion = require('./toggle-accordion.js');
ToggleDisclosure = require('./toggle-disclosure.js');

module.exports = function(){
	this.togglers = document.querySelectorAll('[data-toggle-targets]');

	this.accordions = [];
	if(this.togglers.length > 0)
	{
		for(var i = 0;i<this.togglers.length;i++)
		{
			var targetIds = this.togglers[i].dataset.toggleTargets.split(" ");
			var togglerTargets = [];
			for(var j = 0;j<targetIds.length;j++){
				var togglerTarget = document.getElementById(targetIds[j]);
				if(togglerTarget !== null)
				{
					togglerTargets.push(togglerTarget);
				}
			}
			if(togglerTargets.length > 0)
			{
				var type = this.togglers[i].dataset.toggleType.toLowerCase().trim();
				if(typeof type === "string"){
					switch(type){
						case 'accordion':
							var accordion = new ToggleAccordion(this.togglers[i],togglerTargets);
							break;
						case 'disclosure':
							var disclosure = new ToggleDisclosure(this.togglers[i],togglerTargets);
							break;
					}
				}
			}
		}
	}
}
