module.exports = function(toggler,target){
	var thisObject = this;

	this.construct = function(toggler,target){
		if(typeof(toggler) === 'object' && typeof(target) === 'object')
		{
			this.toggler = toggler;
			this.target = target;
			this.expanded = false;
			typeof(this.target.dataset.toggleClass) === 'undefined' ? this.toggleClass = 'toggled' : this.toggleClass = target.dataset.toggleClass;
			this.toggler.setAttribute('aria-controls',this.target.id);
			this.toggler.setAttribute('aria-expanded',this.expanded);
			this.toggler.addEventListener('click',thisObject.toggle)
			return true;
		}
	}

	this.toggle = function(){
		thisObject.expanded = !thisObject.expanded;
		thisObject.toggler.setAttribute('aria-expanded',thisObject.expanded);
		thisObject.target.classList.toggle(thisObject.toggleClass);
	}

	if(this.construct(toggler,target))
	{
	}
}
