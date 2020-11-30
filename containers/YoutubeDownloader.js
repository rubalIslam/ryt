import React, { Component, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Linking, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import ytdl from "react-native-ytdl";
//import { Button } from "react-native-paper";

export default function (props) {
    const navigation = useNavigation();

    return <YoutubeDownloader {...props} navigation={navigation} />;
}

class YoutubeDownloader extends Component {
    state = {
        youtubeUrl: "",
        downloadUrls: ""
    }

    setUrl = (ytUrl) => {
        this.setState({
            youtubeUrl: ytUrl
        })
        console.log(ytUrl);
    }

    async getYoutubeData(yUrl) {
        //console.log(yUrl)
        let uri = "" 
        const dataFromYoutube = await ytdl(yUrl, { quality: 'highest' });
        //console.log(dataFromYoutube[0].url);
        uri = dataFromYoutube[0].url
       //console.log(url)
        if(dataFromYoutube[0].url){
            this.setState({
                downloadUrls:dataFromYoutube[0].url
            })
            Linking.openURL(uri)
        }
        console.log("d:"+this.state.downloadUrls)
        return uri;
    }

    handleSubmit = () => {
        //console.log(this.state.youtubeUrl);
        const yUrl = this.state.youtubeUrl;
        let downloadYoutubeUrl = ""
        if (this.state.youtubeUrl) {
            downloadYoutubeUrl = this.getYoutubeData(yUrl)
            //console.log("got:"+downloadYoutubeUrl)
        }
        //console.log(downloadYoutubeUrl);
        //console.log("downloadUrl:"+this.state.downloadUrls)
       /* if (downloadYoutubeUrl) {
            //console.log(dataFromYoutube.url);
            this.setState({
                downloadUrls:downloadYoutubeUrl
            })
            console.log("downloadUrl: "+this.state.downloadUrls);
        }*/
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={this.styles.container}>
                <Text style={this.styles.youtubeText}>ytDownloader</Text>
                <TextInput
                    autoCapitalize="none"
                    style={this.styles.textInput}
                    placeholder="Paste your Youtube Url Here!"
                    placeholderTextColor="#E1E1E1"
                    onChangeText={ytUrl => this.setUrl(ytUrl)}
                //value={text}
                />
                <TouchableOpacity style={this.styles.button} onPress={this.handleSubmit}>
                    <Text style={this.styles.buttonText}>Download</Text>
                </TouchableOpacity>
                <Text style={{color: "white"}}>Please open the Download link in chrome browser.</Text>
                
                {/*<Button icon="dots-vertical"/>*/}
                <Text style={{color: "white"}}>
                    Then click three dots 
                </Text>
                <Image source="../assets/verdotspng.jpg" style={{width:10, height: 10}}/>
                <Text style={{color: "white"}}>
                    and then click download to download the file
                </Text>


                {/*(<View style={this.styles.container}>
                <Text style={{ color: "red", fontSize: "40px", fontWeight: "bold" }}>
                    YoutubeDownloader
                </Text>
                
                    <TextInput
                        autoCapitalize="none"
                        style={this.styles.textInput}
                        placeholder="Paste your Youtube Url Here!"
                        placeholderTextColor="#E1E1E1"
                        onChangeText={ytUrl => this.setUrl(ytUrl)}
                    //value={text}
                    />
                    <TouchableOpacity style={this.styles.button} onPress={this.handleSubmit}>
                        <Text style={this.styles.buttonText}>Download</Text>
                    </TouchableOpacity>
                

            </View>*/}
            </View>
        );
    }
    styles = {
        container: {
            flex: 1,
            backgroundColor: "black",
            alignItems: "center",
            justifyContent: "center"
        },
        threeDots:{
            padding:0,
            paddingTop:3,
            margin:0,
            marginTop:3
            
        },
        youtubeText: {
            color: "red",
            fontSize: 40,
            fontWeight: "bold"
        },
        button: {
            width: 390,
            height: 45,
            margin: 0,
            padding: 0,
            borderRadius: 5,
            backgroundColor: "teal",
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