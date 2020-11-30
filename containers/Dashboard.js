import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function(props) {
    const navigation = useNavigation();
  
    return <Dashboard {...props} navigation={navigation} />;
  }

class Dashboard extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={this.styles.container}>
                <Text>
                    Dashboard
                </Text>
                <TouchableOpacity
                    style={this.styles.button}
                    onPress={() => {
                        navigation.navigate("Engineers");
                    }}
                >
                    <Text style={{ color: "white" }}>Engineers</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={this.styles.button}
                    onPress={() => {
                        navigation.navigate("YoutubeDownloader");
                    }}
                >
                    <Text style={{ color: "white" }}>YoutubeDownloader</Text>
                </TouchableOpacity>
            </View>
        );
    }
    styles = {
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
    }

}


//export default Dashboard;