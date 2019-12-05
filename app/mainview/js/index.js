//ES6 javascript promises

//nested default tab
const { Tabs,listenForClicks } = require ('./src/tabsrouter.js');
 Tabs(null,'sidebar','./sidebar/home.htm')
.then((reply)=>{
	if(reply=='Success'){
	Tabs(null,'main','./mainview/alexander.htm');
	}
})
.then(()=>{
//listen for click events on sidebar
listenForClicks('.fav');
})
.catch(error=>console.log(error));

function listenForNestedClicks(){
	let headtags = document.querySelectorAll('.header-tab ');
	headtags.forEach(headtag=>{
			headtag.onclick=event=>{
				Tabs(null,'sidebar','./sidebar/'+headtag+'htm')
			 .then((reply)=>{
				 if(reply=='Success'){
				 Tabs(null,'main','./mainview/'+headtag.id+'/alexander.htm');
				 }
			 })
			 .then(()=>{
			 //listen for click events on sidebar
			 listenForClicks('.fav');
			 })
			 .catch(error=>console.log(error));
			}
	});
}
