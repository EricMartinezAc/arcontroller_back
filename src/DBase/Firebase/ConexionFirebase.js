const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
var serviceAccount = require("./arc-cloud-26daa-firebase-adminsdk-9bvq7-755ef983aa.json");
//const { async } = require('@firebase/database-types/node_modules/@firebase/util');

//creando propio servidor firebase
initializeApp({
    credential: cert(serviceAccount)
});
