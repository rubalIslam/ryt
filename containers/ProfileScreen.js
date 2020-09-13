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

export default function ProfileScreen({ setToken, setId }) {
  const navigation = useNavigation();

  const handleSubmit = async () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      //navigation.navigate("SignIn");
      setToken(null);
      setId(null);
    }, function(error) {
      // An error happened.
      alert("You are not logged in or you cannot logout right now. Please try after some time!")
    });
  }

  return (
    <View>
      {/*<Button title="sign out" onPress={handleSubmit}
        />*/}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={{ color: "white" }}>Sign out</Text>
      </TouchableOpacity>
      
    </View>
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
