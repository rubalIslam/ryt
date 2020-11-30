import React, { useState, Component } from "react";
import { useNavigation } from "@react-navigation/core";
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    Button,
    Image,
    Platform,
    SafeAreaView
} from "react-native";



export default function Welcome({ setToken, setId }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/*<Image
                style={styles.logo}
                source={require('../assets/yt.png')}
            />*/}
            <Text style={styles.yt}>
                Rubal YT Downloader
            </Text>
            <Text style={styles.ytheading}>
                Simple and Ad-Free Youtube Downloader
                Only for the loved ones!
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
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: "center"
    },
    yt:{
        color: "red",
        fontSize: 40,
        fontWeight: "bold",
        marginTop:0
    },
    ytheading: {
        textAlign:"center",
        color:"white",
        fontSize:20
    },
    logo: {
        flex: 1,
        width: 200,
        height: 50,
        resizeMode: 'contain',
        padding: 0,
        margin: 0
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
  
