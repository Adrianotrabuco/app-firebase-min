<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { 
Alert, Platform,
Text, TextInput, 
View, KeyboardAvoidingView,
Pressable,
ScrollView,
} from 'react-native';

import { auth, db} from "./src/lib/firebase";

import { 
onAuthStateChanged, 
signInWithEmailAndPassword,
createUserWithEmailAndPassword, 
signOut
} from "firebase/auth";

import { 
addDoc, collection, getDocs, 
limit, orderBy, query, 
serverTimestamp 
} from "firebase/firestore";

type Note = {id: string, text: string};

export default function App() {

const [userEmail, setUserEmail] = useState<string | null>(null);

const [email, setEmail] = useState("");
const [password, setPassword]= useState("");

const [noteText, setNoteText] = useState("");
const [notes, setNotes] = useState<Note[]>([]);

useEffect(()=>{
const unsub = onAuthStateChanged(auth,(u)=>{
setUserEmail(u?.email ?? null);
});
return unsub;
},[])

async function handleRegister(){
try{
const create = await createUserWithEmailAndPassword(auth,email.trim(),password);
Alert.alert("Conta criada", create.user.email ?? "");
}catch(error){
console.log("Register failed",error);
}
}

async function handleLogin(){
try{
const logged = await signInWithEmailAndPassword(auth,email.trim(),password);
Alert.alert("Login OK", logged.user.email ?? "");
}catch(error){
console.log("Login failed",error);
}
}

async function handleLogout(){
try{
await signOut(auth);
Alert.alert("Logout OK");
}catch(error){
console.log("Logout failed",error);
}
}

async function AddNote(){
try{
const docRef = await addDoc(collection(db,"notes"),{
text: noteText,
createdAt: serverTimestamp(),
user: userEmail ?? null,
});

setNoteText("");
await refreshNotes();

}catch(error){
console.log("addNote failed",error);
}
}

async function refreshNotes(){
try{
const response = query(
collection(db,"notes"),
orderBy("createdAt","desc"),
limit(10)
);

const snap = await getDocs(response);

setNotes(
snap.docs.map(n=>({
id:n.id,
text:String(n.data().text ?? "")
}))
);

}catch(error){
console.log("refreshNotes failed",error);
}
}

return(

<KeyboardAvoidingView
style={{flex:1,marginTop:25}}
behavior={Platform.select({ios:"padding",android:"height"})}
>

<ScrollView contentContainerStyle={{padding:16,gap:16}}>

<Text style={{fontSize:22,fontWeight:"700"}}>
Expo + Firebase
</Text>

<View style={{padding:12,borderWidth:1,borderRadius:12,gap:10}}>

<Text style={{fontSize:16,fontWeight:"600"}}>
Auth
</Text>

<Text>Usuário: {userEmail ?? "nenhum"}</Text>

<TextInput
value={email}
onChangeText={setEmail}
placeholder="email"
autoCapitalize="none"
style={{borderWidth:1,borderRadius:10,padding:10}}
/>

<TextInput
value={password}
onChangeText={setPassword}
placeholder="senha"
secureTextEntry
style={{borderWidth:1,borderRadius:10,padding:10}}
/>

<Pressable onPress={handleRegister} style={{padding:10,borderWidth:1,borderRadius:10}}>
<Text>Criar conta</Text>
</Pressable>

<Pressable onPress={handleLogin} style={{padding:10,borderWidth:1,borderRadius:10}}>
<Text>Login</Text>
</Pressable>

<Pressable onPress={handleLogout} style={{padding:10,borderWidth:1,borderRadius:10}}>
<Text>Logout</Text>
</Pressable>

</View>

<View style={{padding:12,borderWidth:1,borderRadius:12,gap:10}}>

<Text style={{fontSize:16,fontWeight:"600"}}>
Notas
</Text>

<TextInput
value={noteText}
onChangeText={setNoteText}
placeholder="Digite uma nota"
style={{borderWidth:1,borderRadius:10,padding:10}}
/>

<View style={{flexDirection:"row",gap:10}}>

<Pressable onPress={AddNote} style={{padding:10,borderWidth:1,borderRadius:10}}>
<Text>Salvar</Text>
</Pressable>

<Pressable onPress={refreshNotes} style={{padding:10,borderWidth:1,borderRadius:10}}>
<Text>Recarregar</Text>
</Pressable>

</View>

<View>
{notes.map(n=>(
<Text key={n.id}>- {n.text}</Text>
))}
</View>

</View>

</ScrollView>

</KeyboardAvoidingView>

);
}
=======
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
>>>>>>> 6d257d798eddffb12c183cdf3add10b9d6603c99
