import { StyleSheet, TouchableWithoutFeedback, FlatList } from "react-native";
import {
  NativeBaseProvider,
  Image,
  VStack,
  Center,
  HStack,
  Box,
  ScrollView,
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
  let shortNo = Intl.NumberFormat("en", { notation: "compact" });

  useEffect(() => {
    //init for refresh mechanism
    console.log("new effect");
    let comCount = 0;
    setDataReady(false);
    setData([]);
    let results = [];
    getComments(props.postProps.id).then((comments) => {
      console.log(comments)
      if (!comments || comments.length==0) {
        setDataReady("noComments");
        return;
      }
      comCount = comments.length;

      comments.forEach((comment) => {
        //join user data on comment objects

        getUserDataByID(comment.from).then((usrData) => {
          results.push({
            photo: usrData.photo,
            firstName: usrData.firstName,
            lastName: usrData.lastName,
            ...comment,
          });

          if (results.length == comCount) {
            setData(results);
            setDataReady(true);
            return;
          }
        });
      });
    });
  }, [props.postProps.refresh]); //on pseudorefresh side-effect

  if (!dataReady) return <Text>Loading...</Text>;
  if (dataReady == "noComments") return <Text>No comments</Text>;
  if (dataReady && data)
    return (
      <FlatList
        data={data}
        renderItem={(comment) => (
          <View>
            <HStack space={2} mb={2}>
              <Image
                style={styles.profilePic}
                source={{
                  uri: comment.item.photo,
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
                    {comment.item.firstName + " " + comment.item.lastName}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      marginRight: "20%",
                    }}
                  >
                    <Text style={styles.time}>
                      {dayjs(comment.item.time.toDate()).fromNow(true) + " ago"}
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
                  <Text style={styles.body}>{comment.item.body}</Text>
                </View>
              </VStack>
            </HStack>
            <Divider mb={2}></Divider>
          </View>
        )}
      />
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
