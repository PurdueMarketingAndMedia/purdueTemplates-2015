module.exports = function(toggler,targets){
	var thisObject = this;

	this.construct = function(toggler,targets){
		if(typeof(toggler) === 'object' && typeof(targets) === 'object')
		{
			this.toggler = toggler;
			this.targets = targets;
			this.expanded = false;
			this.toggleClasses = [];
			for(var i=0;i<targets.length;i++)
			{
				typeof(this.targets[i].dataset.toggleClass) === 'undefined' ? this.toggleClasses.push('toggled') : this.toggleClasses.push(targets[i].dataset.toggleClass);
				this.toggler.setAttribute('aria-controls',this.toggler.getAttribute('aria-controls')+' '+this.targets[i].id);
			}
			this.toggler.addEventListener('click',thisObject.toggle)
			return true;
		}
	}

	this.toggle = function(){
		thisObject.expanded = !thisObject.expanded;
		thisObject.toggler.setAttribute('aria-expanded',thisObject.expanded);
		for(var i=0;i<thisObject.targets.length;i++)
		{
			thisObject.targets[i].classList.toggle(thisObject.toggleClasses[i]);
		}
	}

	if(this.construct(toggler,targets))
	{
	}
}
