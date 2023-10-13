const firebaseConfig = {
    apiKey: "AIzaSyCG6pcJI9JV8G6gW8F8HAhfEGJvw8vhXDY",
    authDomain: "bancodedados-a7591.firebaseapp.com",
    databaseURL: "https://bancodedados-a7591-default-rtdb.firebaseio.com",
    projectId: "bancodedados-a7591",
    storageBucket: "bancodedados-a7591.appspot.com",
    messagingSenderId: "741882138538",
    appId: "1:741882138538:web:ac252fba2cb841cc39e5d3",
    measurementId: "G-6BRRPEZT5Y"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Faz a ligação com o HTML
var passarosList = document.getElementById("passaros-list");

// Inicializa o Firebase (se ainda não estiver inicializado)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var database = firebase.database();
var passarosRef = database.ref("temperatura");


passarosRef.on("child_added", function(childSnapshot) {
  var valor = childSnapshot.val();

 
  var listItem = document.createElement("li");
  listItem.textContent = "Valor: " + valor;

 
  passarosList.appendChild(listItem);
});

passarosRef.once("value") 
  .then(function(snapshot) {
    if (!snapshot.exists()) {
      console.log("Nenhum dado encontrado para temperatura.");
    }
  })
  .catch(function(error) {
    console.error("Erro ao recuperar dados: " + error.message);
  });