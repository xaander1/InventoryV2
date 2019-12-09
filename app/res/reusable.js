/*----------------------------------------------------------------------*/
//initialise customers
const init_data = Dexie => {
var db = new Dexie('Data');
db.version(1).stores({
    	 regions: '++id,name',
    	 departments: '++id,name',
    	 os: '++id,name',
    	 ms_office: '++id,name',
    	 tech_name: '++id,name',
    	 resolutions: '++id,name',
    	 focals: '++id,name',
    	 desktops:'++id,region,department,pc_model,pc_serial,monitor_model,monitor_serial,keyboard,mouse,comp_name,os,os_status,processor,ram,ms_office,ms_status,rem_storage,printer_model,printer_serial,scanner_model,scanner_serial,ups_model,tech_name,date,log'
    	});
 return db;
 }
 /*--------------------------------------------------------------------*/
 module.exports = {
	init_data
}