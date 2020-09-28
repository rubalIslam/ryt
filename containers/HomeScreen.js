import React, { useSate, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, View, ActivityIndicator } from "react-native";

import axios from "axios";
import RoomCard from "../components/RoomCard";
import {
  FlatList,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";

import { firebase,firebaseLoggedInDetail,firebaseUsers } from "../components/Firebase/firebase";

export default function HomeScreen({name}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  console.log("name: home: "+name);

  useEffect(() => {
    const fetchData = async () => {
      /*
      firebaseUsers.orderByChild("email").equalTo("bedarul@gmail.com").once("value").then((snapshot) => {
        console.log("snapshot:"+snapshot.val());
      })*/

      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room?city=paris"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={data.rooms}
      keyExtractor={item => String(item._id)}
      renderItem={({ item }) => (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Room", { id: item._id })}
        >
          <RoomCard border data={item} />
        </TouchableWithoutFeedback>
      )}
    />
  );
}
