import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase, firebaseUsers, firebaseLoggedInDetail } from "../components/Firebase/firebase";

export default function AdminLogin({ setAdminId, setAdminToken }) {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        //const loginToken;
        //const loginId;
        let today = new Date();
        let dateTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let userMail = "";
        try {
            if (email == "admin@gmail.com" && password == "admin123") {
                firebase.auth()
                    .signInWithEmailAndPassword(
                        email,
                        password
                    ).then(() => {
                        firebase.auth().onAuthStateChanged((user) => {
                            setAdminToken(user.uid);
                            //console.log(user);
                            setAdminId(user.email);
                            console.log(user.email + " Logged in at :" + dateTime);
                            userMail = user.email;
                            firebaseLoggedInDetail.push({ userMail, dateTime }).then(() => {
                                console.log("user Looggged in at" + dateTime);
                                navigation.navigate("Tab", { screen: "Dashboard" });
                            })
                        })
                    })
            } else {
                alert("you are not an admin! Please go back and login as user!")
            }
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
                        <Text style={styles.buttonText}>AdminLogin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("SignUp");
                        }}
                    >
                        <Text style={styles.underButton}>Go back to Login as user</Text>
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
