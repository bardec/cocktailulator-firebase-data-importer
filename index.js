const md5 = require('md5')

const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./service-key.json");

const seed_liquors = require("./cleaned_liquor.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),  
    databaseURL: "https://cocktailulator-c7d81.firebaseio.com"
});

seed_liquors.forEach(liquor => {
  admin.firestore()
    .collection('liquors')
    .doc(md5(liquor.title))
    .set(liquor)
    .catch((error) => {
      console.error("Error writing document: ", error);
    })
})

