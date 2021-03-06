import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView
} from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase, firebaseUsers } from "../components/Firebase/firebase";

export default function SingUpScreen({ setToken, setId }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSubmit = async () => {
    try{
      if(password !== confirmPassword){
        alert("Password and Confirm Password is not same!")
      }else{
        firebase.auth().createUserWithEmailAndPassword(email,password).then((response) => {
          //console.log(response.user.uid);
          setToken(response.user.uid);
          //console.log(response.user.email);
          setId(response.user.email);
          firebaseUsers.push({email,name,username,description,password}).then(() => {
            navigation.navigate("SignIn");
            //console.log("signin")
          }).catch(e=>{
            alert("Please enter all the fields(email, name, username, description)");
          })
        }).catch(e=>{
          alert(e.message);
        })
      }
    }catch(error) {
      alert(error.massage);
    }
  }

/*  const handleSubmit = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Les mots de passe ne sont pas identiques");
      } else {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          { email, name, username, description, password }
        );
        console.log(response.data);

        if (response.data.token) {
          setToken(response.data.token);
          setId(response.data.id);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };*/
  return (
    <ScrollView bounces={false} contentContainerStyle={styles.container}>
      <KeyboardAwareScrollView extraScrollHeight={110}>
        <SafeAreaView>
          <View style={styles.inner}>
            <Text style={styles.title}>If you dont have account, Please Register Here</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.textInput}
              placeholder="Email"
              placeholderTextColor="#E1E1E1"
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              placeholderTextColor="#E1E1E1"
              onChangeText={text => setUsername(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              placeholderTextColor="#E1E1E1"
              onChangeText={text => setName(text)}
            />
            <TextInput
              multiline={true}
              numberOfLines={8}
              maxLength={200}
              style={styles.textArea}
              placeholder="Description (Only 200 characters)"
              placeholderTextColor="#E1E1E1"
              onChangeText={text => setDescription(text)}
            />
            <TextInput
              autoCapitalize="none"
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor="#E1E1E1"
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
            />
            <TextInput
              autoCapitalize="none"
              style={styles.textInput}
              placeholder="Confirm password"
              placeholderTextColor="#E1E1E1"
              secureTextEntry={true}
              onChangeText={text => setConfirmPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}> Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.underButton}>
                Already have an account, SignIn
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  inner: {
    padding: 24,
    flex: 1,
    alignItems: "center"
  },
  title: {
    textAlign:"center",
    fontSize: 24,
    color: "white",
    marginVertical: 20
  },
  button: {
    width: 190,
    height: 65,
    borderRadius: 50,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  buttonText: {
    color: "white",
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
    paddingLeft: 15,
    color: "white"
  },
  textArea: {
    width: 330,
    height: 80,
    borderColor: "white",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
    textAlignVertical: "top",
    color: "white",
    marginBottom: 20
  }
});
