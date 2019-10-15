const tab = (e) => {
    let clicked = e;
    let parent = getClosest(clicked, "tabs")   
    let contents = parent.querySelectorAll(".tabs__content");
    let buttons = parent.querySelectorAll(".tabs__button");
    let activeId = clicked.href.split("#").pop();
    let activeContent = document.querySelector("#"+activeId);
    contents.forEach((con)=>{
        con.classList.remove('fadeIn');
    })
    buttons.forEach((bu)=>{
        bu.classList.remove('active');
    })
    e.classList.add('active');
    activeContent.classList.add('fadeIn');    
}
//find closest parent
let getClosest = function (e, selector) {
	for ( ; e && e !== document; e = e.parentNode ) {
		if ( e.classList && e.classList.contains(selector) ) return e;
	}
	return null;
};

let tabButton = [...document.querySelectorAll('.tabs__button')]
tabButton.forEach((bu) => {
    bu.addEventListener('click', (e) =>{
        e.preventDefault();
        e = e.target;
        tab(e);
    })
})