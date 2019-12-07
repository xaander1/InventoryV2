/*----------------------------------------------------------------------*/
//initialise customers
const init_data = Dexie => {
var db = new Dexie('Data');
db.version(1).stores({
    	 regions: '++id,name',
    	 departments: '++id,name',
    	 os: '++id,name',
    	 ms_office: '++id,name',
    	 tech_name: '++id,name'
    	});
 return db;
 }
 /*--------------------------------------------------------------------*/
 module.exports = {
	init_data
}