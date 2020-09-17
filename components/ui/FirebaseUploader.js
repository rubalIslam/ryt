import React, { Component } from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
//import { ImagePicker } from 'expo';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Button, Image, TouchableOpacity } from 'react-native';
//var width = Dimensions.get("window").width;
//var height = Dimensions.get("window").height;
//
// Don't forget to initialize firebase!!!
//

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#333",
        textAlign: "center",
        maxWidth: 150
    }
});

class FirebaseUploader extends Component {

    state = {
        name: '',
        isUploading: false,
        fileURL: ''
    }

    static getDerivedStateFromProps(props, state) {
        if (props.defaultImg) {
            return state = {
                name: props.defaultImgName,
                fileURL: props.defaultImg
            }
        }
        return null
    }

    uriToBlob = (uri) => {

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();

            xhr.onload = function () {
                // return the blob
                resolve(xhr.response);
            };

            xhr.onerror = function () {
                // something went wrong
                reject(new Error('uriToBlob failed'));
            };

            // this helps us get a blob
            xhr.responseType = 'blob';

            xhr.open('GET', uri, true);
            xhr.send(null);

        });

    }

    uploadToFirebase = (blob, filename) => {

        console.log(this.props.dir+" : "+this.props.dir.type);
        return new Promise((resolve, reject) => {

            
            var storageRef = firebase.storage().ref().child("engineers/"+filename);

            //var storageRef = firebase.storage().ref();

            storageRef.put(blob, {
                contentType: 'image/jpeg'
            }).then((snapshot) => {

                this.setState({
                    name: filename,
                    isUploading: false
                });
                firebase.storage().ref(this.props.dir)
                    .child(filename).getDownloadURL()
                    .then(url => {
                        this.setState({ fileURL: url })
                    })
                console.log(filename);
                this.props.filename(filename)

                //blob.close();

                //resolve(snapshot);

            }).catch((error) => {
                reject(error);

            });

        });


    }


    nameGenerator(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    handleOnPress = () => {

        const name = this.nameGenerator(10);

        ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images"
        }).then((result) => {
            console.log("result"+result);
            if (!result.cancelled) {
                // User picked an image
                const { height, width, type, uri } = result;
                console.log("uri"+uri);
                return this.uriToBlob(uri);

            }

        }).then((blob) => {

            return this.uploadToFirebase(blob, name);

        }).then((snapshot) => {

            console.log("File uploaded");

        }).catch((error) => {

            throw error;

        });

    }

    uploadAgain = () => {
        this.setState({
            name:'',
            isUploading:false,
            fileURL:''
        });
        this.props.resetImage();
    }

    render() {
        return (
            <View style={this.styles.container}>
                {console.log("file url"+this.state.fileURL)}
                {   !this.state.fileURL ?
                    <View>
                        <Text>Select your Image</Text>
                        {console.log("props"+this.props)}
                        <Button
                            style={{ width: 100, height: 30 }}
                            title="UPLOAD"
                            onPress={this.handleOnPress}
                        />
                    </View>
                    : null
                }
                {
                    this.state.isUploading ?
                        <Text>Loading...</Text>
                        : null
                }
                {
                    this.state.fileURL ?
                        <View>
                            <Image style={this.styles.engineerImage} source={{ uri: this.state.fileURL }} />
                            <TouchableOpacity
                                onPress={() => this.uploadAgain()}
                                style={{textAlign: "right", paddingRight: 20}}
                            >
                                <Text style={{ color: "white" }}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                        : null
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
        engineerImage: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width
        }
    }


    /*{
    
      var button = <View 
        style={[styles.button]}
        onPress={this.handleOnPress}
      >
        <Text>Choose Photo</Text>
      </View> 
  
      return (button);
      
    }*/

}

export default FirebaseUploader;