import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPFSXgDuImIWkh1hOe00cASR4rQ-m-HhA",
  authDomain: "todoapp-676fe.firebaseapp.com",
  databaseURL: "https://todoapp-676fe.firebaseio.com",
  projectId: "todoapp-676fe",
  storageBucket: "todoapp-676fe.appspot.com",
  messagingSenderId: "945113536266",
  appId: "1:945113536266:web:be2ac5927c3dd4937d4cf3"
}

class Fire {
  constructor(callback){
    this.init(callback);
  }

  init(callback){
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged(user => {
      if(user){
        callback(null, user);
      }else{
        firebase
          .auth()
          .signInAnonymously()
          .catch(error => {
            callback(error);
          })
      }
    })
  }

  getLists(callback){
    let ref = this.ref.orderBy("name");

    this.unsubscribe = ref.onSnapshot(snapshot => {
      lists = [];

      snapshot.forEach(doc => {
        lists.push({id: doc.id, ...doc.data()});
      });

      callback(lists);
    })
  }

  addList(list) {
    let ref = this.ref

    ref.add(list);
  }

  updateList(list) {
    let ref = this.ref;

    ref.doc(list.id).update(list);
  }

  updateTodo(list, name) {
    let ref = this.ref;

    ref.doc(list.id).update(name);
  }

  removeList(list) {
    let ref = this.ref;

    ref.doc(list.id).delete();
  }

  get ref(){
    return firebase
    .firestore()
    .collection("users")
    .doc(this.userId)
    .collection("lists");
  }

  get userId(){
    return firebase.auth().currentUser.uid;
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;