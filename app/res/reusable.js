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
    	 megapixels: '++id,name',
    	 desktops:'++id,region,department,pc_model,pc_serial,monitor_model,monitor_serial,keyboard,mouse,comp_name,os,os_status,processor,ram,ms_office,ms_status,rem_storage,printer_model,printer_serial,scanner_model,scanner_serial,ups_model,tech_name,date,log',
    	 dvrs:'++id,region,department,type,channels,model,serial,storage,tech_name,date',
    	 cam_ext1:'++id,cam_model,resolution,focal_length,mp,type,type2,number',
    	 cam_ext2:'++id,cam_model,resolution,focal_length,mp,type,type2,number',
    	 cam_ext3:'++id,cam_model,resolution,focal_length,mp,type,type2,number',
    	 cam_ext4:'++id,cam_model,resolution,focal_length,mp,type,type2,number',
    	 cam_ext5:'++id,cam_model,resolution,focal_length,mp,type,type2,number',
    	 cam_ext6:'++id,cam_model,resolution,focal_length,mp,type,type2,number',
    	 cam_ext7:'++id,cam_model,resolution,focal_length,mp,type,type2,number',
    	 cam_ext8:'++id,cam_model,resolution,focal_length,mp,type,type2,number',
    	 cam_ext9:'++id,cam_model,resolution,focal_length,mp,type,type2,number',
    	 cam_ext10:'++id,cam_model,resolution,focal_length,mp,type,type2,number',
    	 cam_ext11:'++id,cam_model,resolution,focal_length,mp,type,type2,number',
    	 cam_ext12:'++id,cam_model,resolution,focal_length,mp,type,type2,number',
    	 cam_ext13:'++id,cam_model,resolution,focal_length,mp,type,type2,number',
    	 cam_ext14:'++id,cam_model,resolution,focal_length,mp,type,type2,number',
    	 cam_ext15:'++id,cam_model,resolution,focal_length,mp,type,type2,number',
    	});
 return db;
 }
 /*--------------------------------------------------------------------*/
 module.exports = {
	init_data
}