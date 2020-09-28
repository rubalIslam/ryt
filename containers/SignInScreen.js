import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
  StyleSheet,
  SafeAreaView
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase,firebaseLoggedInDetail,firebaseUsers } from "../components/Firebase/firebase";

export default function SignInScreen({ setToken, setId, setName }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    //const loginToken;
    //const loginId;
    let today = new Date();
    let dateTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let userMail = "";
    try {
     firebase.auth()
            .signInWithEmailAndPassword(
                email,
                password
            ).then(()=>{
              firebase.auth().onAuthStateChanged((user) => {
                setToken(user.uid);
                //console.log("user:"+user);
                setId(user.email);
                userMail = user.email;
                //console.log(user.email);
                firebaseUsers.orderByChild("email").equalTo(userMail).on("value",(snapshot)=>{
                  console.log(snapshot.val());
                  snapshot.forEach((child)=>{
                    console.log(child.val().name);
                    setName(child.val().name);
                  })
                })
                
                /*
                firebaseUsers.orderByChild("email").equalTo("bedarul@gmail.com").on("value").then((snapshot)=>{
                  console.log(snapshot);
                }).catch(e){
                  console.log(e);
                }
                })*/

                firebaseLoggedInDetail.push({ userMail, dateTime }).then(() => {
                  //console.log("userLooggged in at" + dateTime);
                })
              })
            })
            //console.log("signinSuccessful");
     /* const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        { email: email, password: password }
      if (response.data.token) {
        setToken(response.data.token);
        setId(response.data.id);
      } else {
        alert("Please Enter valid username and password!");
      }*/
    } catch (error) {
      alert(error.message);
    }
  };
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={110}
      contentContainerStyle={styles.container}
    >
      <SafeAreaView style={{ alignItems: "center" }}>
        <MaterialCommunityIcons name="home-outline" size={150} color="white" />
        <View style={styles.form}>
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            placeholder="email"
            placeholderTextColor="#E1E1E1"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.textInput}
            placeholder="password"
            placeholderTextColor="#E1E1E1"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.underButton}>Didnt have account! Register</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F35960",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: 190,
    height: 65,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  buttonText: {
    color: "#F35960",
    fontSize: 24
  },
  underButton: {
    marginTop: 15,
    color: "white",
    textDecorationLine: "underline"
  },
  textInput: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 330,
    height: 45,
    marginBottom: 30,
    color: "white"
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  }
});
