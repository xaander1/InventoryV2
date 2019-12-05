//ES6 javascript promises

//nested default tab
const { Tabs,listenForClicks,listenForNestedClicks } = require ('./src/tabsrouter.js');
//load default tabs
 Tabs(null,'tabs','./tabs/add.htm')
.then((reply)=>{
	if(reply=='Success'){
  //Then load default mainview
	Tabs(null,'main','./mainview/add/default.htm');
	}
})
.then(()=>{
    //Code for listenening for clicks
	listenForClicks('.tab','add');
  listenForNestedClicks('.header-tab','default.htm','.tab');
})
.catch(error=>console.log(error));

//quit,minimise and maximize
const max = document.querySelector('#maximize');
max.onclick=()=> {
  var window = remote.getCurrentWindow();
  if(window.isMaximized()) {
    window.unmaximize();
  } else {
    window.maximize();
  }
}
const min = document.querySelector('#minimize');
min.onclick=()=>{
  remote.getCurrentWindow().minimize();
}
const quit = document.querySelector('#quit');
quit.onclick=()=>{
  remote.getCurrentWindow().close();
}
