
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const FireBase_db = getFirestore()


async function IniciarFbaseARCclientes() { // Referencia collección ISE dentro de arc
    const snapshot = await FireBase_db.collection('clientes').get()
    return snapshot
}



module.exports = IniciarFbaseARCclientes