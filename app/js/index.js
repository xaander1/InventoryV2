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
}).then(()=>{


//quit,minimise and maximize
var window = remote.getCurrentWindow();
window.on('maximize',()=>{
  document.querySelector('.accessory').style.display='none';
});
window.on('unmaximize',()=>{
  document.querySelector('.accessory').style.display='block';
});
const max = document.querySelector('#maximize');
max.onclick=()=> {
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



})
.catch(error=>console.log(error));