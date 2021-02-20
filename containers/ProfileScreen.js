import React, { useEffect, useState, useCallback } from "react";
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Button
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions"; // pour obtenir permission
import { ScrollView } from "react-native-gesture-handler";
import { firebase } from "../components/Firebase/firebase";

export default function ProfileScreen({ setToken, setId, setName }) {
  const navigation = useNavigation();

  const handleSubmit = async () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      //navigation.navigate("SignIn");
      setToken(null);
      setId(null);
      setName(null);
    }, function(error) {
      // An error happened.
      alert("You are not logged in or you cannot logout right now. Please try after some time!")
    });
  }

  return (
    <ScrollView style={{backgroundColor:"black"}}>
      {/*<Button title="sign out" onPress={handleSubmit}
        />*/}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={{ color: "white" }}>Sign out</Text>
      </TouchableOpacity>
      <Text style={{color: "red", paddingTop:20}}>
          Terms and Service from Youtube: "You shall not download any content unless you see a 'download' or similar link displayed by YouTube on the Service for that content. You shall not copy, reproduce, distribute, transmit, broadcast, display, sell, license, or otherwise exploit any content for any other purposes without the prior written consent of YouTube or the respective licensors of the content."
      </Text>
      <Text style={{color: "tomato", paddingTop:20}}>
        This is just a project for the educational purpose, Don't use it for commercial purpose.
      </Text>
      <Text style={{color: "lightgreen", paddingTop:40}}>
        Contact the Developer or have a complaint: 
      </Text>
      <Text style={{color: "lightgreen", paddingTop:40}}>
        Bedarul Islam Laskar, Software Engineer, Bangalore, 560068
      </Text>
      <Text style={{color: "white", paddingTop:20}}>
        rubalislamlaskar@gmail.com
      </Text>
      <Text style={{color: "white", paddingTop:20}}>
        github.com/rubalIslam
      </Text>
      <Text style={{color: "orange", paddingTop:20}}>
        OpenSource project, Feel Free to contribute
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center"
    // flex: 1
  },
  button: {
    width: 390,
    height: 45,
    margin: 0,
    padding: 0,
    borderRadius: 5,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
},
  image: {
    height: 140,
    width: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#F35960"
  },
  textInput: {
    borderBottomColor: "#F35960",
    borderBottomWidth: 1,
    height: 45,
    width: "80%",
    paddingLeft: 15,
    marginVertical: 20,
    marginHorizontal: "10%"
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#F35960",
    width: "80%",
    height: 80,
    paddingHorizontal: 15,
    paddingTop: 15,
    textAlignVertical: "top",
    marginBottom: 20,
    marginHorizontal: "10%",
    borderRadius: 5
  },
  updateButton: {
    width: 150,
    height: 55,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#F35960",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  logoutButton: {
    width: 150,
    height: 55,
    borderRadius: 50,
    backgroundColor: "#F35960",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  logoutButtonText: {
    color: "white"
  },
  updateButtonText: {
    color: "#F35960"
  }
});
