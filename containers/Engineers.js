import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { firebasePlayers, firebaseEngineers } from '../components/Firebase/firebase';
import { firebaseLooper, reverseArray } from '../components/ui/misc';
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/core";

export default function(props) {
    const navigation = useNavigation();
  
    return <Engineers {...props} navigation={navigation} />;
}

class Engineers extends Component {

    state = {
        isloading: true,
        engineers: []
    }

    componentDidMount() {
        firebaseEngineers.once('value').then((snapshot) => {
            const engineers = firebaseLooper(snapshot);

            this.setState({
                isloading: false,
                engineers: reverseArray(engineers)
            })

            //console.log(players);

        })
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={this.styles.container}>
                <Text>
                    Engineers
                </Text>
                { this.state.engineers ?
                    this.state.engineers.map((engineer, i) => (
                        <View>
                            <TouchableOpacity
                                style={this.styles.engineer}
                                onPress={() => {
                                    navigation.navigate("EditEngineers", {engineerId: engineer.id });
                                }}
                            >
                                <Text>{engineer.name} {engineer.lastname}</Text>
                            </TouchableOpacity>
                        </View>
                    )) : null
                }
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
        engineer: {
            width: 390,
            height: 45,
            margin: 0,
            padding: 0,
            justifyContent: "center",
            alignItems: "center",
        },
        button: {
            width: 390,
            height: 45,
            margin: 0,
            padding: 0,
            borderRadius: 5,
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
    }

}
//export default Engineers;