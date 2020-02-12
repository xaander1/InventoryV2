//ES6 javascript promises
const mainProcess = remote.require('./app.js');
//call database
const { init_data} = require('./res/reusable');
var db = init_data(Dexie);
//export import database
const fs = require('fs');
var IDBExportImport = require("indexeddb-export-import");
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


/***********************Export Database ******************************************/
document.querySelector('#export').addEventListener('click',()=>{
  db.open().then(function() {
  var idb_db = db.backendDB(); // get native IDBDatabase object from Dexie wrapper

  // export to JSON, clear database, and import from JSON
  IDBExportImport.exportToJsonString(idb_db, function(err, jsonString) {
    if(err)
      console.error(err);
    else { 
let options={
      title: 'Export Database',
                //defaultPath : '/home/alexander/Desktop',
                buttonLabel:'save',
                 filters: [
                  { name: 'JSON', extensions: ['json'] },
                   ] 
  }
  remote.dialog.showSaveDialog(options).then(response=>{
        if(!response.canceled){
            fs.writeFile(response.filePath,jsonString,err=>{
                  if(err) {
                        return console.log(err);
                      }else{
                         notifier.notify(
          {
            title: 'Export complete',
            message: 'Export completed successfully',
            icon: path.join(__dirname, './icons/icon.png'), 
            sound: true,
            });
                  
                    } 
                });
          
        }

});

     
    }
  });
}).catch(function(e) {
  console.error("Could not connect. " + e);
});
    

});
/***********************Import Database ******************************************/
document.querySelector('#import').addEventListener('click',()=>{ 
let options={
   properties: ['openFile'],
    //defaultPath : '/home/alexander/Desktop',
    buttonLabel:'open',
    properties: ['openFile'],
    filters: [
          { name: 'JSON', extensions: ['json'] }
        ] 
}
remote.dialog.showOpenDialog(options).then(result=>{
  if(!result.canceled){
  const content = fs.readFileSync(result.filePaths[0]).toString();
  db.open().then(function() {
var idb_db = db.backendDB(); // get native IDBDatabase object from Dexie wrapper
IDBExportImport.clearDatabase(idb_db, function(err) {
        if(!err) // cleared data successfully
          IDBExportImport.importFromJsonString(idb_db,content, function(err) {
            if (!err){
          notifier.notify(
          {
            title: 'Import complete',
            message: 'Import completed successfully',
            icon: path.join(__dirname, './icons/icon.png'), 
            sound: true,
            });
          document.querySelector('#add').click();
            }
          });
      });

  }).catch(function(e) {
  console.error("Could not connect. " + e);
});


}
  });

});
/*******************************Save to excel*************************/












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


let desOuterCounter=1;
let lapOuterCounter=1;
let serOuterCounter=1;
let camOuterCounter=1;
let accOuterCounter=1;
let rouOuterCounter=1;
let priOuterCounter=1;
let extOuterCounter=1;

//desktops header
let desktop_names =['Region','Department','PC Model','PC Serial','Monitor Model','Monitor Serial','IP','Keyboard','Mouse','Computer Name','Client','OS','OS status','Processor','RAM','MS Office','MS status','Remaining Storage','Printer Model','Printer Serial','Printer IP','Scanner Model','Scanner Serial','UPS Model','Technician','Date','Log'];
desktop_names.forEach((name,index)=>{
ws_desktops.cell(desOuterCounter,index+1)
.string(name)
.style(head_style);
});

//Laptops header
let laptop_names =['Region','Department','PC Model','PC Serial','Keyboard','Mouse','Computer Name','Client','OS','OS status','Processor','RAM','MS Office','MS status','IP','Remaining Storage','Printer Model','Printer Serial','Printer IP','Scanner Model','Scanner Serial','Technician','Date','Log'];
laptop_names.forEach((name,index)=>{
ws_laptops.cell(lapOuterCounter,index+1)
.string(name)
.style(head_style);
});

//server header
let server_names =['Region','Department','PC Model','PC Serial','Monitor Model','Monitor Serial','IP','Keyboard','Mouse','Computer Name','Client','OS','OS status','Processor','RAM','MS Office','MS status','Remaining Storage','UPS Model','Technician','Date','Log'];
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
/***************************************************************************/
//work on Cameras sheet
db.dvrs.each(device=>{
camOuterCounter+=3;
//Cameras
let camera_names =['Region','Department','Type','Channels','Model','Serial','IP','Storage','Technician','Date'];
camera_names.forEach((name,index)=>{
ws_cameras.cell(camOuterCounter,index+1)
.string(name)
.style(head_style);
});
//Work on dvr
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

//Function to work on cameras
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

//Working on Cameras
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
/***************************************************************************/

//work on routers sheet
db.routers.each(device=>{
let innerCounter=1;
rouOuterCounter++;
 for (const key of Object.keys(device)) {
  if(key == '__proto__' || key == 'id'){continue}
  else if(typeof device[key] == 'string'){
  ws_routers.cell(rouOuterCounter,innerCounter)
  .string(device[key])
  .style(normal);
  innerCounter++;
}else if(typeof device[key] == 'number'){
ws_routers.cell(rouOuterCounter,innerCounter)
  .number(device[key])
  .style(normal);
  innerCounter++;
}else{ innerCounter++; }
}
});

//work on accesspoints sheet
db.accesspoints.each(device=>{
let innerCounter=1;
accOuterCounter++;
 for (const key of Object.keys(device)) {
  if(key == '__proto__' || key == 'id'){continue}
  else if(typeof device[key] == 'string'){
  ws_accesspoints.cell(accOuterCounter,innerCounter)
  .string(device[key])
  .style(normal);
  innerCounter++;
}else if(typeof device[key] == 'number'){
ws_accesspoints.cell(accOuterCounter,innerCounter)
  .number(device[key])
  .style(normal);
  innerCounter++;
}else{ innerCounter++; }
}
});

//work on printers sheet
db.printers.each(device=>{
let innerCounter=1;
priOuterCounter++;
 for (const key of Object.keys(device)) {
  if(key == '__proto__' || key == 'id'){continue}
  else if(typeof device[key] == 'string'){
  ws_printers.cell(priOuterCounter,innerCounter)
  .string(device[key])
  .style(normal);
  innerCounter++;
}else if(typeof device[key] == 'number'){
ws_printers.cell(priOuterCounter,innerCounter)
  .number(device[key])
  .style(normal);
  innerCounter++;
}else{ innerCounter++; }
}
});

//work on extras sheet
db.extras.each(device=>{
let innerCounter=1;
extOuterCounter++;
 for (const key of Object.keys(device)) {
  if(key == '__proto__' || key == 'id'){continue}
  else if(typeof device[key] == 'string'){
  ws_extras.cell(extOuterCounter,innerCounter)
  .string(device[key])
  .style(normal);
  innerCounter++;
}else if(typeof device[key] == 'number'){
ws_extras.cell(extOuterCounter,innerCounter)
  .number(device[key])
  .style(normal);
  innerCounter++;
}else{ innerCounter++; }
}
});

//end of transaction
}).then(()=>{
 let options={
      title: 'Save to excel',
      //defaultPath : '/home/alexander/Desktop',
      buttonLabel:'save excel',
       filters: [
        { name: 'excel', extensions: ['xlsx','xls'] },
         ]
  }
  remote.dialog.showSaveDialog(options).then(response=>{
        if(!response.canceled){
          wb.write(response.filePath); 
           notifier.notify(
          {
            title: 'Excel Saved',
            message: 'Excel workbook saved successfully',
            icon: path.join(__dirname, './icons/icon.png'), 
            sound: true,
            });
           //remote.shell.openItem(response.filePath);
        }

});

});


//end of your code
}); 


})
.catch(error=>console.log(error));