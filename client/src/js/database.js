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
  const request = store.put({id: id, value: content})
  // confirmation of req
  const result = await request;
  // tell console was success
  console.log('Data saved to the database', result);
  //if error
  console.error('putDb not implemented');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
