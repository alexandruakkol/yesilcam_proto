import { StyleSheet, Text } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import Swiper from "react-native-deck-swiper";
import { NativeBaseProvider, Image, View, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts, Jost_600SemiBold } from "@expo-google-fonts/jost";
import { LobsterTwo_700Bold_Italic } from "@expo-google-fonts/lobster-two";
import GPC from "../global";
import { getUserData, swipeRight, getRightSwipes, auth } from "../firebase";

const profilePicSize = 250;
const arrOfProfilesToShow = [];
let jsonData;
const Deck = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getUserData()
      .then((r) => {
        console.log("SERVERR:", r);
        jsonData = r;
      })
      .finally(() => {
        //convert object of objects to array of objects (cards accept arrays only)
        Object.keys(jsonData).forEach((key) => {
          if (jsonData[key].id != auth.currentUser.uid)
            arrOfProfilesToShow.push(jsonData[key]);
        });
        setData(arrOfProfilesToShow);
      });
  }, []);

  console.log("showing the following cards: ", arrOfProfilesToShow);

  let [fontsLoaded] = useFonts({
    LobsterTwo_700Bold_Italic,
    Jost_600SemiBold,
  });

  if (!fontsLoaded || !data) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Swiper
          cards={arrOfProfilesToShow}
          cardVerticalMargin={2}
          verticalSwipe={false}
          renderCard={(card) => {
            console.log("card:", card);
            let prop = card;
            return (
              <NativeBaseProvider>
                <View style={styles.card}>
                  <Image
                    source={{
                      uri: prop.photo,
                    }}
                    style={styles.profilePic}
                    alt="Profile picture"
                  ></Image>

                  <Text style={styles.nameLabel}>
                    {prop.firstName} {prop.lastName}
                  </Text>

                  <Text style={styles.location}>
                    <MaterialIcons
                      name="location-pin"
                      size={16}
                      color="black"
                    />
                    {prop.location}
                  </Text>
                  <VStack marginLeft="2" space={2}>
                    <Text style={styles.label}>About</Text>
                    <Text style={styles.profileText}>{prop.about}</Text>
                    <Text style={styles.label}>Offering</Text>
                    <Text style={styles.profileText}>{prop.offering}</Text>
                    <Text style={styles.label}>Seeking</Text>
                    <Text style={styles.profileText}>{prop.seeking}</Text>
                    <Text style={styles.label}>Profession</Text>
                    <Text style={styles.profileText}>{prop.profession}</Text>
                    <Text style={styles.speaks}>Speaks: {prop.languages}</Text>
                  </VStack>
                </View>
              </NativeBaseProvider>
            );
          }}
          onSwiped={(cardIndex) => {}}
          onSwipedAll={() => {
            console.log("onSwipedAll");
          }}
          onSwipedLeft={(cardIndex) => {
            console.log("Swiped NO on", arrOfProfilesToShow[cardIndex]);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("swiped right on", arrOfProfilesToShow[cardIndex].id);
            swipeRight(arrOfProfilesToShow[cardIndex].id);
          }}
          cardIndex={0}
          backgroundColor={"#4FD0E9"}
          stackSize={3}
        ></Swiper>
      </View>
    );
  }
};

export default Deck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },

  card: {
    height: "84%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "white",
    alignItems: "center",
  },

  profilePic: {
    marginTop: 5,
    width: profilePicSize,
    height: profilePicSize,
    borderRadius: profilePicSize / 3.5,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
  },

  location: {
    fontSize: 15,
    marginTop: 5,
  },

  nameLabel: {
    fontSize: 23,
    fontWeight: "bold",
    fontFamily: "Jost_600SemiBold",
  },

  label: { fontSize: 16, fontWeight: "bold", width: "100%" },
  speaks: { fontSize: 16, width: "100%" },
  profileText: { fontSize: 15 },
});
