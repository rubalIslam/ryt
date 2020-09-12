import React, { useState, Component } from "react";
import { useNavigation } from "@react-navigation/core";
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    Button,
    Platform,
    SafeAreaView
} from "react-native";



export default function Welcome({ setToken, setId }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>
                Welcome
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate("SignIn");
                }}
            >
                <Text style={{color:"white"}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate("SignUp");
                }}
            >
                <Text style={{color:"white"}}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate("AdminLogin");
                }}
            >
                <Text style={{color:"white"}}>AdminLogin</Text>
            </TouchableOpacity>
            {/*<Button title="Login" onPress={navigation.navigate("SignIn")} />
            <Button title="Register" onPress={navigation.navigate("SignUp")} />
    <Button title="AdminLogin" onPress={navigation.navigate("AdminLogin")} />*/}
        </View>
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
      width: 390,
      height: 45,
      margin: 0,
      padding: 0,
      borderRadius: 5,
      backgroundColor: "#263238",
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
  
