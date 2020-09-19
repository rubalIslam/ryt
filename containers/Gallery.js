import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions,Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";
import { firebaseGallery, firebase } from "../components/Firebase/firebase";
import { firebaseLooper } from "../components/ui/misc";
import { Promise } from "core-js";

export default function (props) {
    const navigation = useNavigation();
    const route = useRoute();

    return <Gallery {...props} route={route} navigation={navigation} />;
}

class Gallery extends Component { 
    state = {
        loading: true,
        gallerys: [],
        bedrooms: 2,
    };

    componentDidMount() {
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

    render() {
        const { navigation } = this.props;
        return (
            <ScrollView>
                <View>
                    <Text>
                        Gallery
                    </Text>
                    {
                    this.state.gallerys?  
                    this.state.gallerys.map((gallery, i) => (
                        <TouchableOpacity
                            style={this.styles.galleryCard}
                            onPress={() => {
                                navigation.navigate("GalleryCard", {gallery: gallery, id: gallery.id });
                            }}
                        >
                            <Image 
                                    style={this.styles.galleryImage} 
                                    source={{ uri: gallery.image }} 
                            />
                            <Text>{gallery.heading}</Text>
                            <Text>Size: {gallery.bhk}</Text>
                            <Text>{gallery.bhk.charAt(0)} Bedroom, 1 Bathroom, 1 Kitchen</Text>
                            <Text>Construction Cost: ₹{gallery.cost}</Text>
                            
                        </TouchableOpacity>
                    )):null
                    }
                    
                </View>
            </ScrollView>
        );
    }
    styles = {
        container: {
            flex: 1,
            backgroundColor: "#F35960",
            alignItems: "center",
            justifyContent: "center"
        },
        galleryCard: {
            width: Dimensions.get('screen').width,
            height: Dimensions.get("screen").width+200
        },
        galleryImage: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width-60
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