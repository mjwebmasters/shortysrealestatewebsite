db = db.getSiblingDB('realestate');

// Create admin user
db.createUser({
  user: 'admin',
  pwd: 'admin123',
  roles: [
    { role: 'userAdminAnyDatabase', db: 'admin' },
    { role: 'readWriteAnyDatabase', db: 'admin' }
  ]
});

// Create application user
db.createUser({
  user: 'appuser',
  pwd: 'app123',
  roles: [
    { role: 'readWrite', db: 'realestate' }
  ]
});

// Create collections
db.createCollection('users');
db.createCollection('properties');
db.createCollection('mortgages');
db.createCollection('contacts');

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.properties.createIndex({ location: '2dsphere' });
db.properties.createIndex({ price: 1 });
db.properties.createIndex({ type: 1 }); 