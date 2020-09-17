import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { firebasePlayers,firebase, firebaseEngineers, firebaseDB } from '../components/Firebase/firebase';
import FirebaseUploader from "../components/ui/FirebaseUploader";
import ImageUploader from "../components/ui/ImageUploader";

export default function (props) {
    const route = useRoute();

    return <EditEngineers {...props} route={route} />;
}

class EditEngineers extends Component {
    state = {
        propsId:"",
        engineerId: "",
        formType: "",
        formError: false,
        formSuccess: "",
        defaultImg: "",
        formdata: {
            name: {
                element: "input",
                value: "",
                config: {
                    label: "Engineer Name",
                    name: "name_input",
                    type: "text",
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: "",
                showlabel: true,
            },
            lastname: {
                element: "input",
                value: "",
                config: {
                    label: "Engineer Last name",
                    name: "lastname_input",
                    type: "text",
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: "",
                showlabel: true,
            },
            designation: {
                element: "input",
                value: "",
                config: {
                    label: "Engineer Designation",
                    name: "details_input",
                    type: "text",
                },
                validation: {
                    required: false,
                },
                valid: false,
                validationMessage: "",
                showlabel: true,
            },
            degree: {
                element: "input",
                value: "",
                config: {
                    label: "degree",
                    name: "degree",
                    type: "text",
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: "",
                showlabel: true,
            },
            details: {
                element: "input",
                value: "",
                config: {
                    label: "details",
                    name: "details",
                    type: "text",
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: "",
                showlabel: true,
            },
            image: {
                element: "image",
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
            },
        },
    };

    updateFields = (engineer, engineerId, formType, defaultImg) => {
        const newFormdata = { ...this.state.formdata };

        for (let key in newFormdata) {
            newFormdata[key].value = engineer[key];
            newFormdata[key].valid = true;
        }

        this.setState({
            engineerId,
            defaultImg,
            formType,
            formdata: newFormdata,
        });
    };

    componentDidMount() {
        const engineerId = this.state.propsId;

        if (!engineerId) {
            this.setState({
                formType: "Add engineer",
            });
        } else {
            firebaseDB
                .ref(`engineers/${engineerId}`)
                .once("value")
                .then((snapshot) => {
                    const engineerData = snapshot.val();
                    //console.log(engineerData);

                    firebase
                        .storage()
                        .ref("engineers")
                        .child(engineerData.image)
                        .getDownloadURL()
                        .then((url) => {
                            this.updateFields(engineerData, engineerId, "Edit Engineer", url);
                        })
                        .catch((e) => {
                            this.updateFields(
                                {
                                    ...engineerData,
                                    image: "",
                                },
                                engineerId,
                                "Edit Engineer",
                                ""
                            );
                        });
                });
        }
    }

    updateForm(name, value){
        const newFormdata = {...this.state.formdata}
        const newElement = { ...newFormdata[name]}
        //console.log(newElement);
      
        //console.log(newElement);
      
        if(value === ''){
            newElement.value = value;
        } else {
            newElement.value = value;
        }
        let validData = [true,""];
        if(value.trim() !== ''){
          validData = [true,""];
        }else{
          validData = [false,"This field is required"];
        }
      
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]
      
        newFormdata[name] = newElement;
      
        //console.log(newFormdata);
        this.setState({
            formError: false,
            formdata: newFormdata
        })
      }

    successForm = (message) => {
        this.setState({
            formSuccess: message,
        });
        setTimeout(() => {
            this.setState({
                formSuccess: "",
            });
        }, 2000);
    };

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        if (formIsValid) {
            if (this.state.formType === "Edit Engineer") {
                firebaseDB
                    .ref(`engineers/${this.state.engineerId}`)
                    .update(dataToSubmit)
                    .then(() => {
                        this.successForm("Engineers added");
                    })
                    .catch((e) => {
                        this.setState({ formError: true });
                    });
            } else {
                firebaseEngineers
                    .push(dataToSubmit)
                    .then(() => {
                        this.props.history.push("/dashboard");
                    })
                    .catch((e) => {
                        this.setState({
                            formError: true,
                        });
                    });
            }
        } else {
            this.setState({
                formError: true,
            });
        }
    }

    resetImage = () => {
        const newFormdata = { ...this.state.formdata };
        newFormdata["image"].value = "";
        newFormdata["image"].valid = false;
        //console.log("deleting file");

        this.setState({
            defaultImg: "",
            formdata: newFormdata,
        });
    };

    storeFilename = (filename) => {
        //this.updateForm({ id: "image" }, filename);
        this.updateForm("image", filename);
    };

    render() {
        const { route } = this.props;
        this.state.propsId = route.params.engineerId;
        return (
            <View>
                <Text>
                    Edit Engineers
                </Text>
                <ImageUploader

                />
                <FirebaseUploader
                    dir = "engineers"
                    tag = {"Engineers image"}
                    defaultImg = { this.state.defaultImg }
                    defaultImgName={this.state.formdata.image.value}
                    resetImage={() => this.resetImage()}
                    filename = { (filename) => this.storeFilename(filename)}
                />
                <TextInput
                    style={{
                        height: 35,
                        backgroundColor: "#272723",
                        color: "white",
                        padding: 5,
                        margin: 5,
                    }}
                    id="name"
                    name="name"
                    value={this.state.formdata.name.value}
                    placeholder="Enter your name"
                    onChangeText={(value) => this.updateForm("name",value)}
                //onChange={(event) => this.updateForm({ event, id: "name" })}
                />
                <TextInput
                    style={{
                        height: 35,
                        backgroundColor: "#272723",
                        color: "white",
                        padding: 5,
                        margin: 5,
                    }}
                    id="lastname"
                    name="lastname"
                    value={this.state.formdata.lastname.value}
                    placeholder="Enter your lastname"
                    onChangeText={(value) => this.updateForm("lastname",value)}
                //onChange={(event) => this.updateForm({ event, id: "name" })}
                />
                <Text>Enter B.Tech or M.Tech, etc</Text>
                <TextInput
                    style={{
                        height: 35,
                        backgroundColor: "#272723",
                        color: "white",
                        padding: 5,
                        margin: 5,
                    }}
                    id="designation"
                    name="designation"
                    value={this.state.formdata.designation.value}
                    placeholder="Enter your designation"
                    onChangeText={(value) => this.updateForm("designation",value)}
                //onChange={(event) => this.updateForm({ event, id: "name" })}
                />
                <Text>Enter HVAC or AutoCad, etc</Text>
                <TextInput
                    style={{
                        height: 35,
                        backgroundColor: "#272723",
                        color: "white",
                        padding: 5,
                        margin: 5,
                    }}
                    id="degree"
                    name="degree"
                    value={this.state.formdata.degree.value}
                    placeholder="Enter your degree"
                    onChangeText={(value) => this.updateForm("degree",value)}
                //onChange={(event) => this.updateForm({ event, id: "name" })}
                />
                <Text>Enter Details about Engineer</Text>
                <TextInput
                    style={{
                        height: 35,
                        backgroundColor: "#272723",
                        color: "white",
                        padding: 5,
                        margin: 5,
                    }}
                    id="details"
                    name="details"
                    value={this.state.formdata.details.value}
                    placeholder="Enter your details"
                    onChangeText={(value) => this.updateForm("details",value)}
                //onChange={(event) => this.updateForm({ event, id: "name" })}
                />
                <TouchableOpacity
                    onPress={(event) => this.submitForm(event)}
                >
                    <Text style={{ color: "white" }}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
//export default EditEngineers;