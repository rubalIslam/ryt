import React, { Component, useState } from "react";
import { View, Button, Text, TouchableOpacity, TextInput, Linking, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import ytdl from "react-native-ytdl";
//import { LogLevel, RNFFmpeg } from "react-native-ffmpeg";
//import { Button } from "react-native-paper";
//import verdots from "../assets/verdotspng.jpg";
import * as DocumentPicker from "expo-document-picker";

export default function (props) {
    const navigation = useNavigation();

    return <FfmpegConverter {...props} navigation={navigation} />;
}

class FfmpegConverter extends Component {
  
    state = {
        youtubeUrl: "",
        downloadUrls: "",
        videoLocation:"",
        videoName:"",
        urlValue:""
    }
    componentDidMount(){
        this.setState({
            youtubeUrl:""
        })
    }

    setUrl = (ytUrl) => {
        let newUrl = this.state.youtubeUrl

        if(ytUrl ===''){
            newUrl = "please enter something"
        }else{
            newUrl = ytUrl
            if (ytUrl){
                this.setState({
                    youtubeUrl: newUrl
                })
            }
        }
        //console.log(ytUrl);
    }
    handleFormat = async () => {
        yUri = dateFromYoutube[0].url
        if(dataFromYoutube[0].url){
            this.setState({
                downloadUrls:dataFromYoutube[0].url
            })
        }   
    }

    async getYoutubeData(yUrl,vidQuality) {
    //async getYoutubeData(vidQuality){

        yUrl = this.state.youtubeUrl
        
        //console.log(yUrl)
        let uri = "" 
        //let info = await ytdl.getInfo(yUrl);
        //console.log("info: ");
        /*ytdl.getInfo(yUrl, {}, (err, info) => {
            const format = ytdl.chooseFormat(info.formats, {quality: 'highest'});
              
            RNFetchBlob
              .config({
                  addAndroidDownloads: {
                      useDownloadManager: true,
                      mime: format.type
                  }
              })
              .fetch('GET', format.url)
              .then((resp) => {
                resp.path()
            })
        })*/
        let dataFromYoutube = [];
        let openedLink = "";

        if (vidQuality == "hd"){
            console.log("called hd")
            dataFromYoutube = await ytdl(yUrl, { quality: 'highestvideo'})
            //dataFromYoutube = ytdl(yUrl, {quality: 'highestvideo'})
            console.log(dataFromYoutube)
            if(dataFromYoutube[0].url){
                this.setState({
                    downloadUrls:dataFromYoutube[0].url
                })
                openedLink = this.openLink(this.state.downloadUrls)
                yUrl = null
                this.setState({
                    downloadUrls:"",
                    youtubeUrl: "",
                    urlValue:""
                })
                return
            }
        }
       else if(vidQuality == "sd") {
            console.log("called 720")
            dataFromYoutube = await ytdl(yUrl, { quality: 'lowest'})
            if(dataFromYoutube[0].url){
                this.setState({
                    downloadUrls:dataFromYoutube[0].url
                })
                console.log("d:"+this.state.downloadUrls)    
                openedLink = this.openLink(dataFromYoutube[0].url)
                this.setState({
                    downloadUrls:""
                })
                return null
            }
        }
        else if(vidQuality == "low") {
            console.log("called low")
            dataFromYoutube = await ytdl(yUrl, { quality: 'highest'})
            if(dataFromYoutube[0].url){
                this.setState({
                    downloadUrls:dataFromYoutube[0].url
                })
                console.log("d:"+this.state.downloadUrls)    
                openedLink = this.openLink(dataFromYoutube[0].url)
                this.setState({
                    downloadUrls:""
                })
                return null
            }
        }else if(vidQuality == 'mp3') {
            console.log("called mp3")
            console.log(yUrl)
            dataFromYoutube = await ytdl(yUrl, { filter: 'audioonly'})
            console.log("dataFromYoutube",dataFromYoutube)
            console.log("running")
            if(dataFromYoutube[0].url){
                this.setState({
                    downloadUrls:dataFromYoutube[0].url
                })
                //console.log("d:"+this.state.downloadUrls)    
                openedLink = this.openLink(dataFromYoutube[0].url)
                this.setState({
                    downloadUrls:""
                })
                return null
            }
        }
        //const dataFromYoutube = await ytdl(yUrl, { quality: 'highest' });
        //const dataFromYoutube = await ytdl(yUrl,{filter: 'audioonly'});
        //const dataFromYoutube = await ytdl(yUrl,{filter: format => format.container === 'mp3'})
        //console.log(dataFromYoutube);
        //console.log(dataFromYoutube[0].url);
        uri = dataFromYoutube[0].url
    //console.log(url)
    }

    openLink = (u) => {
        Linking.openURL(u)
        return "opened";
    }
    clearLink = () => {
        console.log("clear called")
        if(this.textInput){
            this.textInput.clear()
        }
    }

    handleSubmitHD = (vidQuality) => {
        console.log("handlesubmit called")
        //console.log(this.state.youtubeUrl);
        const yUrl = this.state.youtubeUrl;
        let downloadYoutubeUrl = ""
        
        if (this.state.youtubeUrl !=="") {
            downloadYoutubeUrl = this.getYoutubeData(yUrl,"hd")
            //this.func()
            //this.textInput.clear()
            return
            this.setState({
                youtubeUrl: "",
                urlValue:""
            })
            //console.log("got:"+downloadYoutubeUrl)
        }
        return
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
    handleSubmitSD = () => {
        const yUrl = this.state.youtubeUrl;
        let downloadYoutubeUrl = ""
        
        if (this.state.youtubeUrl !=="") {
            downloadYoutubeUrl = this.getYoutubeData(yUrl,"sd")
            //this.func()
            //this.textInput.clear()
            return
            this.setState({
                youtubeUrl: "",
                urlValue:""
            })
            //console.log("got:"+downloadYoutubeUrl)
        }
        return
    }
    handleSubmitSong = () => {
        const yUrl = this.state.youtubeUrl;
        let downloadYoutubeUrl = ""
        
        if (this.state.youtubeUrl !=="") {
            downloadYoutubeUrl = this.getYoutubeData(yUrl,"mp3")
            //this.func()
            //this.textInput.clear()
            //return
            this.setState({
                youtubeUrl: "",
                urlValue:""
            })
            //console.log("got:"+downloadYoutubeUrl)
        }
        //return
    }
    

    pickVideo = async () => {
        let result = await DocumentPicker.getDocumentAsync({})
        console.log(result);
        this.setState({
            videoLocation: result.uri,
            videoName: result.name,
        })
        console.log(this.state.videoLocation)
        if(this.state.videoLocation){

        }
    }
    

    render() {
        const { navigation } = this.props;
        return (
            <View style={this.styles.container}>
                <Text style={this.styles.youtubeText}>Rubal's Yt Downloader</Text>
                <TextInput
                    autoCapitalize="none"
                    style={this.styles.textInput}
                    placeholder="Paste your Youtube Url Here!"
                    placeholderTextColor="#E1E1E1"
                    onChangeText={ytUrl => this.setUrl(ytUrl)}
                    //value={this.state.urlValue}
                    ref={input => { this.textInput = input }}
                />
                {/*<TouchableOpacity style={this.styles.smallButton} onPress={this.clearLink()}>
                    <Text style={this.styles.smallbuttonText}>Clear</Text>
        </TouchableOpacity>*/}
                <TouchableOpacity style={this.styles.smallButton} onPress = {this.clearLink}>
                    <Text style={this.styles.smallbuttonText}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.styles.button} onPress = {this.handleSubmitHD}>
                    <Text style={this.styles.buttonText}>Download HD 1080p</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.styles.button} onPress = {this.handleSubmitSD}>
                    <Text style={this.styles.buttonText}>Download SD 720p</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.styles.button} onPress = {this.handleSubmitSong}>
                    <Text style={this.styles.buttonText}>Download Song</Text>
                </TouchableOpacity>
                
                <Image source={require("../assets/page8.jpg")} style={this.styles.pageImage} />
                <Text style={{color:"lightgreen"}}>Click on the three dots to download the file.</Text>
                {/*
                <TouchableOpacity style={this.styles.button} onPress={this.handleSubmit("hd")}>
                    <Text style={this.styles.buttonText}>Download HD 1080p</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={this.styles.button} onPress={this.handleSubmit("hd")}>
                    <Text style={this.styles.buttonText}>Download HD 1080p</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.styles.button} onPress={this.handleSubmit("shd")}>
                    <Text style={this.styles.buttonText}>Download 720p</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.styles.button} onPress={this.handleSubmit("mp3")}>
                    <Text style={this.styles.buttonText}>Download Song</Text>
                </TouchableOpacity>*/}
                <Text style={{color:"white",textAlign:"center",paddingTop:30}}>Please ensure to rename the file name from songName.webm to songName.mp3</Text>
                <Text style={{color:"white",textAlign:"center"}}>If you prefer to play the song from your default player</Text>
                
                {/*<Button
                    title="Select Video"
                    onPress = {this.pickVideo}
                />*/}
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
        pageImage: {
            //flex: 1,
            textAlign:"left",
            width: 300,
            height: 150,
            resizeMode: 'contain',
            paddingRight: 20,
            margin: 0
        },
        clearButton:{
            backgroungColor:"rgba(52, 52, 52, 0.8)"
        },
        downloadButton:{
            backgroundColor:"black",
            width:50
        },
        youtubeText: {
            textAlign:"center",
            color: "red",
            fontSize: 40,
            fontWeight: "bold"
        },
        smallButton:{
            width:"100%",
            height:30,
            color:"white",
            textAlign: "right"
        },
        smallbuttonText:{
            color:"white",
            fontsize:10,
            //alignSelf: "flex-end"
            paddingLeft:0,
            paddingRight:"8%",
            textAlign: "right"
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
            marginTop: 10
        },
        buttonText: {
            color: "white",
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
/*
https://r4---sn-p5qlsnz6.googlevideo.com/videoplayback?expire=1605914793&ei=Sfy3X6r5DcH3oAOa4qOwAQ&ip=117.203.178.179&id=o-AG6NDHtezfDLcSkL3_sN9H9J-ZFxOvrDdqtHghFXN_Fq&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ns=05rMkOWYVtB7B4otDHy34iUF&gir=yes&clen=13831340&ratebypass=yes&dur=247.292&lmt=1604184545613440&fvip=4&c=WEB&txp=5532434&n=Vu1fKP7gB3S8BBS&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAKHqKLybemj-eYKL5OTQczf8jbN_KmCjrScDsmDD7aOmAiAvs_QUmHDln5hNyjXCU7OLRsBiUtY0n27tygsNKszw5w%3D%3D&rm=sn-cnoa-b50e7e,sn-bvvbax-jj0e7z&req_id=d5213ac0be40a3ee&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mh=ba&mip=147.135.77.241&mm=29&mn=sn-p5qlsnz6&ms=rdu&mt=1605893086&mv=m&mvi=4&pl=22&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAPUCrUiEkrnqGdn0dboyXGJU1jmsd4aSfyyWWt469YlEAiAjlqkdVPMXPk89iLavq-JqV4iNPY2ldf220kK3PJbDcQ%3D%3D
https://r4---sn-p5qlsnz6.googlevideo.com/videoplayback?expire=1605914793&ei=Sfy3X6r5DcH3oAOa4qOwAQ&ip=117.203.178.179&id=o-AG6NDHtezfDLcSkL3_sN9H9J-ZFxOvrDdqtHghFXN_Fq&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ns=05rMkOWYVtB7B4otDHy34iUF&gir=yes&clen=13831340&ratebypass=yes&dur=247.292&lmt=1604184545613440&fvip=4&c=WEB&txp=5532434&n=Vu1fKP7gB3S8BBS&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAKHqKLybemj-eYKL5OTQczf8jbN_KmCjrScDsmDD7aOmAiAvs_QUmHDln5hNyjXCU7OLRsBiUtY0n27tygsNKszw5w%3D%3D&rm=sn-cnoa-b50e7e,sn-bvvbax-jj0e7z&req_id=d5213ac0be40a3ee&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mh=ba&mip=147.135.77.241&mm=29&mn=sn-p5qlsnz6&ms=rdu&mt=1605893086&mv=m&mvi=4&pl=22&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAPUCrUiEkrnqGdn0dboyXGJU1jmsd4aSfyyWWt469YlEAiAjlqkdVPMXPk89iLavq-JqV4iNPY2ldf220kK3PJbDcQ%3D%3D
https://r1---sn-cnoa-b50e.googlevideo.com/videoplayback?expire=1605914793&ei=Sfy3X6r5DcH3oAOa4qOwAQ&ip=117.203.178.179&id=o-AG6NDHtezfDLcSkL3_sN9H9J-ZFxOvrDdqtHghFXN_Fq&itag=18&source=youtube&requiressl=yes&mh=ba&mm=31%2C29&mn=sn-cnoa-b50e%2Csn-bvvbax-jj0e&ms=au%2Crdu&mv=m&mvi=1&pl=22&nh=%2CIgppcjAxLmNjdTAxKg8xMTcuMjE5LjIzNS4yNTM&initcwndbps=368750&vprv=1&mime=video%2Fmp4&ns=05rMkOWYVtB7B4otDHy34iUF&gir=yes&clen=13831340&ratebypass=yes&dur=247.292&lmt=1604184545613440&mt=1605893083&fvip=4&c=WEB&txp=5532434&n=Vu1fKP7gB3S8BBS&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAKHqKLybemj-eYKL5OTQczf8jbN_KmCjrScDsmDD7aOmAiAvs_QUmHDln5hNyjXCU7OLRsBiUtY0n27tygsNKszw5w%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cnh%2Cinitcwndbps&lsig=AG3C_xAwRQIhALtJiagt2FcKR4U25E8Q220lCYoyobhn6pdxtJXit9iIAiBEGuYgAeFeJDqim6qkDxQyKvkhsmRt-TlwIIGTw_FfGg%3D%3D

*/