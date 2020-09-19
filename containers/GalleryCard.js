import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions, Image, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";
import { firebaseGallery, firebase } from "../components/Firebase/firebase";
import { firebaseLooper } from "../components/ui/misc";
import { Promise } from "core-js";


export default function (props) {
    const navigation = useNavigation();
    const route = useRoute();

    return <GalleryCard {...props} route={route} navigation={navigation} />;
}

class GalleryCard extends Component {
    state = {
        loading: true,
        gallerys: [],
        comments: [],
        bedrooms: 2,
        formdata: {
            name: {
                element: "input",
                value: "",
                config: {
                    name: "name_input",
                    type: "text",
                },
                validation: {
                    required: true,
                },
                valid: true,
                validationMessage: "",
                showlabel: true,
            },
        }
    };

    componentDidMount() {
        //sconsole.log("Gallery: " + this.props);
        firebaseGallery.once("value").then((snapshot) => {
            const gallerys = firebaseLooper(snapshot);
            let promises = [];
            //console.log(gallerys);

            for (let key in gallerys) {
                promises.push(
                    new Promise((resolve, reject) => {
                        firebase
                            .storage()
                            .ref("gallery")
                            .child(gallerys[key].image)
                            .getDownloadURL()
                            .then((image) => {
                                gallerys[key].image = image;
                                resolve();
                            });
                    })
                );
            }

            Promise.all(promises).then(() => {
                this.setState({
                    loading: false,
                    gallerys,
                });
            });
        });
    }

    sendComment(event, route, navigation) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;
        let commentData = {
            name:"",
            message:""
        };

        for (let key in this.state.formdata) {
           // dataToSubmit[key] = this.state.formdata[key].value;
           commentData.message = this.state.formdata[key].value;
           commentData.name = "rubal"; 
            console.log(dataToSubmit[key]);
            formIsValid =
                this.state.formdata[key].valid && formIsValid;
        }
        //console.log(formIsValid);
        if (formIsValid) {
            //console.log(dataToSubmit);
            firebase.database().ref("gallery/"+route.params.id+"/comments").push(commentData).then(()=>{
                console.log("datatosubmit" + commentData);
                window.location.reload(false);
            }).catch(e=>{
                this.setState({
                    formError: true
                })
            })
            /*firebase.database().ref("gallery/"+route.params.id).push(dataToSubmit).then(() => {
                this.props.navigation.navigate('GalleryCard')
                //  console.log(dataToSubmit);
            }).catch(e => {
                this.setState({
                    formError: true
                })
            })*/

        } else {
            this.setState({
                formError: true
            })
        }
    }

    updateForm(name, value) {
        const newFormdata = { ...this.state.formdata }
        const newElement = { ...newFormdata[name] }
        //console.log(newElement);

        //console.log(newElement);

        if (value === '') {
            newElement.value = value;
        } else {
            newElement.value = value;
        }
        let validData = [true, ""];
        if (value.trim() !== '') {
            validData = [true, ""];
        } else {
            validData = [false, "This field is required"];
        }

        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        newFormdata[name] = newElement;

        console.log("newFormdata: "+newFormdata);
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    render() {
        const { navigation } = this.props;
        const { route } = this.props;
        //this.state.comments = firebaseLooper(route.params.gallery.comments);
        //this.state.comments = route.params.gallery.comments;
        //console.log(this.state.comments+": "+this.state.comments.type);
        return (
            <ScrollView>
                <View>
                    <Text style={this.styles.textHeading}>
                        {route.params.gallery.heading}
                    </Text>
                    <View style={this.styles.centerAlign}>
                        <Image
                            style={this.styles.galleryImage}
                            source={{ uri: route.params.gallery.image }}
                        />
                    </View>
                    <Text>Construction Cost: ₹ {route.params.gallery.cost}</Text>
                    <Text>{route.params.gallery.cost}</Text>
                    <Text>{route.params.gallery.bhk}</Text>
                    <Text>{route.params.gallery.details}</Text>

                    <Text>Comments</Text>
                    {console.log(route.params.gallery)}
                    {/*
                        this.state.comments?
                        Object.keys(this.state.comments).map((comment,i) => (
                                <Text>{comment.message}</Text>
                            ))
                        :null
                    */}
                    {
                        route.params.gallery.comments?
                            Object.keys(route.params.gallery.comments).map((comment,i) => (
                            <Text key={i}>{route.params.gallery.comments[comment].name} : {route.params.gallery.comments[comment].message}</Text>
                            ))
                        :null
                    }
                
                    <TextInput
                        style={{
                            height: 35,
                            backgroundColor: "#272723",
                            color: "white",
                            padding: 5,
                            margin: 0,
                            marginBottom: 0,
                            paddingBottom: 0
                        }}
                        id="name"
                        name="name"
                        //value = {this.state.formdata.name.value}
                        placeholder="Enter your name"
                        onChangeText={(value) => this.updateForm("name", value)}
                    /*onChange={(event) => this.updateForm({ event, id: "name" })}*/
                    />

                    <TouchableOpacity style={this.styles.commentButton} onPress={(event) => this.sendComment(event,route, navigation)}>
                        <Text>Send</Text>
                    </TouchableOpacity>

                    {console.log("props: "+this.props)}

                </View>
            </ScrollView>
        );
    }
    styles = {
        textHeading: {
            fontSize: 20,
            padding: 15
        },
        centerAlign: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        container: {
            flex: 1,
            backgroundColor: "#F35960",
            alignItems: "center",
            justifyContent: "center"
        },
        galleryCard: {
            width: Dimensions.get('screen').width,
            height: Dimensions.get("screen").width + 200
        },
        galleryImage: {
            textAlign: "center",
            width: Dimensions.get('window').width - 30,
            height: Dimensions.get('window').width - 80
        },
        rightAlign: {
            justifyContent: 'right',
            alignItems: 'right',
            padding: 0,
            margin: 0
        },
        commentButton: {
            width: 50,
            height: 25,
            margin: 0,
            padding: 0,
            margin: 0,
            marginTop: 5,
            paddingTop: 0,
            borderRadius: 5,
            backgroundColor: "tomato",
            justifyContent: "center",
            alignItems: "center",
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