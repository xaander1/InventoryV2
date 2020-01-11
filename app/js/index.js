//ES6 javascript promises
const mainProcess = remote.require('./app.js');
var stateQuery="";
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

//run save pdf
document.querySelector('#print_to_pdf').addEventListener('click', () => { 
mainProcess.pdfSave();
});

//run save pdf max
document.querySelector('#print_to_pdf_hidden').addEventListener('click', () => { 
mainProcess.pdfMaxSave();

});

//Event listener
ipcRenderer.on('show-notification', (event, title, body) => {
notifier.notify(
  {
    title: title,
    message: body,
    icon: path.join(__dirname, './icons/icon.png'), 
    sound: true,
  });

});

document.querySelector('#create_excel').addEventListener('click',()=>{
    // Require library
var xl = require('excel4node');
 
// Create a new instance of a Workbook class
var wb = new xl.Workbook();

// Create a reusable style
var head_style = wb.createStyle({
  font: {
  bold: true,
  color: '#000000',
  size: 12,
  },
  numberFormat: '$#,##0.00; ($#,##0.00); -',
});
var normal = wb.createStyle({
  font: {
  color: '#000000',
  size: 12,
  },
  numberFormat: '$#,##0.00; ($#,##0.00); -',
});

//Create Workbooks
var ws_desktops = wb.addWorksheet('Desktops');
var ws_laptops = wb.addWorksheet('Laptops');
var ws_servers = wb.addWorksheet('Servers');
var ws_cameras = wb.addWorksheet('Cameras');
var ws_routers = wb.addWorksheet('Routers');
var ws_accesspoints = wb.addWorksheet('Access Points');
var ws_printers = wb.addWorksheet('Printers');
var ws_extras = wb.addWorksheet('Other Devices');
//call database
const { init_data} = require('./res/reusable');
var db = init_data(Dexie);
let desOuterCounter=1;
let lapOuterCounter=1;
let serOuterCounter=1;
let camOuterCounter=1;
let accOuterCounter=1;
let rouOuterCounter=1;
let priOuterCounter=1;
let extOuterCounter=1;

//desktops header
let desktop_names =['Region','Department','PC Model','PC Serial','Monitor Model','Monitor Serial','IP','Keyboard','Mouse','Computer Name','OS','OS status','Processor','RAM','MS Office','MS status','Remaining Storage','Printer Model','Printer Serial','Printer IP','Scanner Model','Scanner Serial','UPS Model','Technician','Date','Log'];
desktop_names.forEach((name,index)=>{
ws_desktops.cell(desOuterCounter,index+1)
.string(name)
.style(head_style);
});

//Laptops header
let laptop_names =['Region','Department','PC Model','PC Serial','Keyboard','Mouse','Computer Name','OS','OS status','Processor','RAM','MS Office','MS status','IP','Remaining Storage','Printer Model','Printer Serial','Printer IP','Scanner Model','Scanner Serial','Technician','Date','Log'];
laptop_names.forEach((name,index)=>{
ws_laptops.cell(lapOuterCounter,index+1)
.string(name)
.style(head_style);
});

//server header
let server_names =['Region','Department','PC Model','PC Serial','Monitor Model','Monitor Serial','IP','Keyboard','Mouse','Computer Name','OS','OS status','Processor','RAM','MS Office','MS status','Remaining Storage','UPS Model','Technician','Date','Log'];
server_names.forEach((name,index)=>{
ws_servers.cell(serOuterCounter,index+1)
.string(name)
.style(head_style);
});



//Routers
let router_names =['Region','Department','Router Model','Router Serial','IP','UPS Model','Technician','Date','Log'];
router_names.forEach((name,index)=>{
ws_routers.cell(rouOuterCounter,index+1)
.string(name)
.style(head_style);
});
//Access Points
let accessP_names =['Region','Department','AP Model','AP Serial','IP','UPS Model','Technician','Date','Log'];
accessP_names.forEach((name,index)=>{
ws_accesspoints.cell(accOuterCounter,index+1)
.string(name)
.style(head_style);
});
//Printers
let printer_names =['Region','Department','Printer Model','Printer Serial','IP','Technician','Date','Log'];
printer_names.forEach((name,index)=>{
ws_printers.cell(priOuterCounter,index+1)
.string(name)
.style(head_style);
});
//Extras
let extra_names =['Region','Department','Name','Model','Serial','IP','Technician','Date','Log'];
extra_names.forEach((name,index)=>{
ws_extras.cell(extOuterCounter,index+1)
.string(name)
.style(head_style);
});

//set transaction
db.transaction('rw',db.desktops,db.laptops,db.servers,db.dvrs,db.printers,db.routers,db.accesspoints,db.extras,db.cam_ext1,db.cam_ext2,db.cam_ext3,db.cam_ext4,db.cam_ext5,db.cam_ext6,db.cam_ext7,db.cam_ext8,db.cam_ext9,db.cam_ext10,db.cam_ext11,db.cam_ext12,db.cam_ext13,db.cam_ext14,db.cam_ext15, function () {
//do my thing

//work on desktop sheet
db.desktops.each(device=>{
let innerCounter=1;
desOuterCounter++;
 for (const key of Object.keys(device)) {
  if(key == '__proto__' || key == 'id'){continue}
  else if(typeof device[key] == 'string'){
  ws_desktops.cell(desOuterCounter,innerCounter)
  .string(device[key])
  .style(normal);
  innerCounter++;
}else if(typeof device[key] == 'number'){
ws_desktops.cell(desOuterCounter,innerCounter)
  .number(device[key])
  .style(normal);
  innerCounter++;
}else{ innerCounter++; }
}
});

//work on laptops sheet
db.laptops.each(device=>{
let innerCounter=1;
lapOuterCounter++;
 for (const key of Object.keys(device)) {
  if(key == '__proto__' || key == 'id'){continue}
  else if(typeof device[key] == 'string'){
  ws_laptops.cell(lapOuterCounter,innerCounter)
  .string(device[key])
  .style(normal);
  innerCounter++;
}else if(typeof device[key] == 'number'){
ws_laptops.cell(lapOuterCounter,innerCounter)
  .number(device[key])
  .style(normal);
  innerCounter++;
}else{ innerCounter++; }
}
});
//work on servers sheet
db.servers.each(device=>{
let innerCounter=1;
serOuterCounter++;
 for (const key of Object.keys(device)) {
  if(key == '__proto__' || key == 'id'){continue}
  else if(typeof device[key] == 'string'){
  ws_servers.cell(serOuterCounter,innerCounter)
  .string(device[key])
  .style(normal);
  innerCounter++;
}else if(typeof device[key] == 'number'){
ws_servers.cell(serOuterCounter,innerCounter)
  .number(device[key])
  .style(normal);
  innerCounter++;
}else{ innerCounter++; }
}
});
//work on Cameras sheet
db.dvrs.each(device=>{

//Cameras
let camera_names =['Region','Department','Type','Channels','Model','Serial','IP','Storage','Technician','Date'];
camera_names.forEach((name,index)=>{
ws_cameras.cell(camOuterCounter,index+1)
.string(name)
.style(head_style);
});


let innerCounter=1;
camOuterCounter++;
 for (const key of Object.keys(device)) {
  if(key == '__proto__' || key == 'id'){continue}
  else if(typeof device[key] == 'string'){
  ws_cameras.cell(camOuterCounter,innerCounter)
  .string(device[key])
  .style(normal);
  innerCounter++;
}else if(typeof device[key] == 'number'){
ws_cameras.cell(camOuterCounter,innerCounter)
  .number(device[key])
  .style(normal);
  innerCounter++;
}else{ innerCounter++; }
}
camOuterCounter++;
let cam_exts =['#','Model', 'Resolution','Focal Length', 'MP', 'Type 1','Type 2','Number'];
cam_exts.forEach((name,index)=>{
ws_cameras.cell(camOuterCounter,index+1)
.string(name)
.style(head_style);
});


let setCameraTableRow = (identity,database,current_id)=>{
db[database].where('id').equals(identity).each(camera=>{
if(camera['cam_model'] ||camera['number'] ){
  let innerCounter=1;
  camOuterCounter++;
   ws_cameras.cell(camOuterCounter,innerCounter)
  .string(current_id)
  .style(normal);
   innerCounter++;
  
  for (const key of Object.keys(camera)) {
  if(key == '__proto__' || key == 'id'){continue}
  else if(typeof camera[key] == 'string'){
  ws_cameras.cell(camOuterCounter,innerCounter)
  .string(camera[key])
  .style(normal);
  innerCounter++;
}else if(typeof camera[key] == 'number'){
ws_cameras.cell(camOuterCounter,innerCounter)
  .number(camera[key])
  .style(normal);
  innerCounter++;
}else{ innerCounter++; }
}

}
});
}

setCameraTableRow(device['id'],'cam_ext1','1');
setCameraTableRow(device['id'],'cam_ext2','2');
setCameraTableRow(device['id'],'cam_ext3','3');
setCameraTableRow(device['id'],'cam_ext4','4');
setCameraTableRow(device['id'],'cam_ext5','5');
setCameraTableRow(device['id'],'cam_ext6','6');
setCameraTableRow(device['id'],'cam_ext7','7');
setCameraTableRow(device['id'],'cam_ext8','8');
setCameraTableRow(device['id'],'cam_ext9','9');
setCameraTableRow(device['id'],'cam_ext10','10');
setCameraTableRow(device['id'],'cam_ext11','11');
setCameraTableRow(device['id'],'cam_ext12','12');
setCameraTableRow(device['id'],'cam_ext13','13');
setCameraTableRow(device['id'],'cam_ext14','14');
setCameraTableRow(device['id'],'cam_ext15','15');

});



//end of transaction
}).then(()=>{
wb.write('/home/alexander/Desktop/test.xlsx');  
})


db.desktops.each(desktop=>{
  //initialise header
  


})




}); 


})
.catch(error=>console.log(error));