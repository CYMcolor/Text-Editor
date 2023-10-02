import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  // connect to database
  const contentDb = await openDB('jate', 1);
  // create transaction
  const tx = contentDb.transaction('jate', 'readwrite');
  // open desired object store
  const store = tx.objectStore('jate');
  // request to edit info with put method
  const request = store.put({id: 1, value: content});
  // confirmation of req
  const result = await request;
  // tell console was success
  console.log('Data saved to the database', result);

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  // connect to database
  const contentDb = await openDB('jate', 1);
  // create transaction
  const tx = contentDb.transaction('jate', 'readonly');
  // open desired object store
  const store = tx.objectStore('jate');
  // request all information in database with getAll()
  const request = store.getAll();
  // confirmation of req
  const result = await request;
  // tell console was success
  console.log('Information recieved', result);
  // return request
  return result;
};

initdb();
