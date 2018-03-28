import Vue from 'vue'
import VueFire from 'vuefire'
import * as firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyBy8pzK05spPoc04wPc0hazewLwILCYj-g",
    authDomain: "hersonpc-firebase.firebaseapp.com",
    databaseURL: "https://hersonpc-firebase.firebaseio.com",
    projectId: "hersonpc-firebase",
    storageBucket: "",
    messagingSenderId: "82429653000"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();

export const unidadesDB = db.ref('hdt/cadastros/unidades');
export const atendimentosDB = db.ref('hdt/atendimentos');

export const eventosDB = db.ref('hdt/nisp/eventos-adversos');
// eventosDB.on('child_added', snap => {
//   console.info('child_added - on eventosDB')
//   // snapshot.val().create_at = new Date().toJSON().slice(0,19).replace(/-/g,'/').replace(/T/g,' ');
//   console.log(snap.val())
// });

export const nispIncidentesDB = db.ref('hdt/nisp/cadastros/incidentes');
export const nispDeteccaoDB = db.ref('hdt/nisp/cadastros/deteccao');
export const nispGrauDanoDB = db.ref('hdt/nisp/cadastros/grau-dano');
export const nispCaracterizacaoDB = db.ref('hdt/nisp/cadastros/caracterizacao-clinica');

// namesRef.on('child_added', snap => {
//   console.info('child_added - on namesRef')
//   // snapshot.val().create_at = new Date().toJSON().slice(0,19).replace(/-/g,'/').replace(/T/g,' ');
//   console.log(snap.val())
// });

export const usersRef = db.ref('users');


Vue.use(VueFire)
Vue.prototype.$firebase = firebase;
console.log(firebase)