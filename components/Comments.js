import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
  NativeBaseProvider,
  Image,
  VStack,
  Center,
  HStack,
  Box,
  ScrollView,
  FlatList,
  View,
  Text,
  Modal,
  Divider,
  Input,
} from "native-base";
import React, { useEffect, useState } from "react";
import { createComment, getComments, getUserDataByID, auth } from "../firebase";
import GPC from "../global";
import dayjs from "dayjs";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const profilePicSize = 50;

const Comments = (props) => {
  const [dataReady, setDataReady] = useState(false);
  const [data, setData] = useState([]);
  let comCount = 0;
  let shortNo = Intl.NumberFormat("en", { notation: "compact" });
  let results = [];
  useEffect(() => {
    getComments(props.postProps.id).then((comments) => {
      console.log(comments);

      if (!comments) {
        setDataReady("noComments");
        return;
      }
      comCount = comments.length;
      comments.forEach((comment) => {
        //join user data on comment objects
        getUserDataByID(comment.from).then((usrData) => {
          results = data;
          results.push({
            photo: usrData.photo,
            firstName: usrData.firstName,
            lastName: usrData.lastName,
            ...comment,
          });
          console.log(results);
          setData(results);
          if (data.length == comCount) setDataReady(true);
        });
      });
    });
  }, [props.refresh]);

  if (!dataReady) return <Text>Loading...</Text>;
  if (dataReady == "noComments") return <Text>No comments</Text>;
  if (dataReady && data)
    return (
      <ScrollView height="50%" style={styles.comment}>
        {console.log("data", data)}
        {data.map((comment) => {
          console.log("com", comment);
          return (
            <View key={comment.id}>
              <HStack space={2} mb={2}>
                <Image
                  style={styles.profilePic}
                  source={{
                    uri: comment.photo,
                  }}
                  alt="profile picture"
                ></Image>
                <VStack space={0.2} w="full">
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.name}>
                      {comment.firstName + " " + comment.lastName}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        marginRight: "20%",
                      }}
                    >
                      <Text style={styles.time}>
                        {dayjs(comment.time.toDate()).fromNow(true) + " ago"}
                      </Text>
                      <Entypo
                        name="dots-three-horizontal"
                        size={12}
                        color="black"
                        style={{ marginTop: 3 }}
                      />
                    </View>
                  </View>
                  <View w="90%">
                    <Text style={styles.body}>{comment.body}</Text>
                  </View>
                </VStack>
              </HStack>
              <Divider mb={2}></Divider>
            </View>
          );
        })}
      </ScrollView>
    );
};

export default Comments;

const styles = StyleSheet.create({
  comment: { marginLeft: -15, marginRight: -5, paddingBottom: -150 },
  profilePic: {
    width: profilePicSize,
    height: profilePicSize,
    borderRadius: profilePicSize / 2.5,
    borderColor: "gray",
  },
  name: { fontWeight: "bold", fontSize: 15 },
  time: { textAlign: "right", marginRight: 5 },
});
