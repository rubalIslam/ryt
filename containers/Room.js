import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/core";
import axios from "axios";
import {
  ScrollView,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
//import RoomCard from "../components/RoomCard";

//import MapView from "react-native-maps";

const Room = () => {
  const { params } = useRoute();
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://airbnb-api.herokuapp.com/api/room/${params.id}`
      );

      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [params.id]);

  return (
    <View>
      <Text>room</Text>
    </View>
  )

  /*return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView>
      <RoomCard border={false} data={data} />
      <TouchableWithoutFeedback
        onPress={() => setViewMore(!viewMore)}
        style={styles.container}
      >
        <Text numberOfLines={viewMore ? null : 4} style={styles.description}>
          {data.description}
        </Text>
      </TouchableWithoutFeedback>
      <View style={{ marginHorizontal: 20 }}>
        <Text>
          MapView
        </Text>
      </View>
    </ScrollView>
  );*/
};

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  description: {
    fontSize: 16
  }
});

export default Room;
