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
    ScrollView,
    TextInput,
    Button
} from "react-native";


export default function ProfileScreen({ setToken, setId, setName }) {
    const navigation = useNavigation();

    return (
        <ScrollView style={{backgroundColor:"black"}}>
            {/*<Button title="sign out" onPress={handleSubmit}
        />*/}
            <Text style={{fontSize:20, color:"white"}}>1. Register if You have not Registered yet, Then Login</Text>
            <Image source={require("../assets/page1.jpeg")} style={styles.pageImage} />
            <Text style={{fontSize:20, color:"white"}}>2. Open the video from youtube that you want to download, Click on share Button</Text>
            <Image source={require("../assets/page6.jpeg")} style={styles.pageImage} />
            <Text style={{fontSize:20, color:"white"}}>3. Copy the Link to Clipboard</Text>
            <Image source={require("../assets/page7.jpeg")} style={styles.pageImage} />
            <Text style={{fontSize:20, color:"white"}}>3. Paste in the Text Input Box provided</Text>
            <Image source={require("../assets/page3.jpeg")} style={styles.pageImage} />
            <Text style={{fontSize:20, color:"white"}}>3. Click on the format you want to Download (say song)</Text>
            <Image source={require("../assets/page3.jpeg")} style={styles.pageImage} />
            <Text style={{fontSize:20, color:"white"}}>3. Open the Link with Chrome browser.</Text>
            <Image source={require("../assets/page4.jpeg")} style={styles.pageImage} />
            <Text style={{fontSize:20, color:"white"}}>3. Click on the three dots.</Text>
            <Image source={require("../assets/page8.jpg")} style={styles.pageImage} />
            <Text style={{fontSize:20, color:"white"}}>3. Click on Download. and it will start downloading the file.</Text>
            <Image source={require("../assets/page5.jpeg")} style={styles.pageImage} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center"
        // flex: 1
    },
    pageImage: {
        //flex: 1,
        textAlign:"left",
        width: 400,
        height: 500,
        resizeMode: 'contain',
        paddingRight: 20,
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
