const Tabs = (commonlink,section,page_to_load)=>{
  return new Promise(function(resolve, reject) {
          fetch(page_to_load)
          .then(data => data.text())
          .then(html=> {
          document.getElementById(section).innerHTML = html;
          var scripts = document.getElementById(section).querySelectorAll("script");
          for (var i = 0; i < scripts.length; i++) {
              if (scripts[i].innerText) {
                  eval(scripts[i].innerText);
              } else {
              fetch(scripts[i].src)
              .then(data => { data.text()
              .then(r=> eval(r))});
      }
      // To not repeat the element
      scripts[i].parentNode.removeChild(scripts[i]);
    }
  }).then(()=>{
    if(!commonlink){
      resolve('Success')
    }else{
      let i,tablinks;
          tablinks = document.querySelectorAll(commonlink);
          //console.log(evt);
          for (i = 0; i < tablinks.length; i++) {
              tablinks[i].className = tablinks[i].className.replace(" active", "");
          }
           resolve('Success')
    }
  });
  });
}


function listenForClicks(classX,folder) {
	let tags = document.querySelectorAll(classX);
	tags.forEach(tag=>{
		tag.onclick=event=>{
			 //console.log(event.currentTarget.className);
			//console.log(tablinks = document.querySelectorAll('fav'));
			Tabs(classX,'main','./mainview/'+folder+'/'+tag.id+'.htm')
			.then(reply=>{
				if(reply=='Success'){
				document.getElementById(tag.id).className += " active";
				}
			});
		}
	});
}


function listenForNestedClicks(commonClass,defaultHtml,commonClass2){
	let headtags = document.querySelectorAll(commonClass);
	headtags.forEach(headtag=>{
			headtag.onclick=event=>{
				Tabs(commonClass,'sidebar','./sidebar/'+headtag.id+'.htm')
			 .then((reply)=>{
				 if(reply=='Success'){
				 Tabs(null,'main','./mainview/'+headtag.id+'/'+defaultHtml);
				 }
			 })
			 .then(()=>{
						document.getElementById(headtag.id).className += " active";
			 })
			 .then(()=>{
			 //listen for click events on sidebar
			 listenForClicks(commonClass2,headtag.id);
			 })
			 .catch(error=>console.log(error));
			}
	});
}



module.exports = {
  Tabs,
  listenForClicks,
  listenForNestedClicks
}
