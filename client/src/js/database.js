import { openDB } from 'idb';

const initdb = async () =>
//create new database called jate version 1
  openDB('jate', 1, {
    //add db schema if not already initialized 
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      //create new object store for data
      //give key name and increments auto
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
//exports functionto update data in object store in db
export const putDb = async (content) => {
console.log('PUT to the jateDB');

//waits to create connection to jate db version 1
const jateDb = await openDB('jate', 1);

//creates transaction and specfies which db and data privleges
const tx = jateDb.transaction('jate', 'readwrite');

//targets jate object store for transaction
const store = tx.objectStore('jate');

//use the .put() to update the content
const request = store.put({content});

//confirms request
const result = await request;
console.log('🚀 - data saved to the database', result);
};

console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
