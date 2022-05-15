import { StyleSheet } from "react-native";
import React from "react";
import Swiper from "react-native-deck-swiper";
import { NativeBaseProvider, Image, View, Text, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const profilePicSize = 250;
const jsonData = require("../data/profiles.json");

const Card = () => {
  return (
    <View>
      <Swiper
        cards={jsonData}
        renderCard={(card) => {
          return (
            <NativeBaseProvider>
              <View style={styles.card}>
                <Image
                  source={{
                    uri: card.photo,
                  }}
                  style={styles.profilePic}
                  alt="Profile picture"
                ></Image>

                <Text bold style={styles.nameLabel}>
                  {card.firstName} {card.lastName}
                </Text>

                <Text style={styles.location}>
                  <MaterialIcons name="location-pin" size={24} color="black" />
                  {card.location}
                </Text>
                <VStack space={2}>
                  <Text style={styles.label}>About</Text>
                  <Text style={styles.profileText}>{card.about}</Text>
                  <Text style={styles.label}>Offering</Text>
                  <Text style={styles.profileText}>{card.offering}</Text>
                  <Text style={styles.label}>Seeking</Text>
                  <Text style={styles.profileText}>{card.seeking}</Text>
                  <Text style={styles.label}>Profession</Text>
                  <Text style={styles.profileText}>{card.profession}</Text>
                  <Text style={styles.label}>Speaks</Text>
                  <Text style={styles.profileText}>{card.languages}</Text>
                </VStack>
              </View>
            </NativeBaseProvider>
          );
        }}
        onSwiped={(cardIndex) => {
          console.log(cardIndex);
        }}
        onSwipedAll={() => {
          console.log("onSwipedAll");
        }}
        onSwipedLeft={() => {
          console.log("No");
        }}
        onSwipedRight={() => {
          console.log("Yes");
        }}
        cardIndex={0}
        backgroundColor={"#4FD0E9"}
        stackSize={3}
      ></Swiper>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "white",
    alignItems: "center",
  },

  profilePic: {
    marginTop: 3,
    width: profilePicSize,
    height: profilePicSize,
    borderRadius: profilePicSize / 3.5,
    borderColor: "gray",
    borderWidth: 1,
  },
  location: {
    fontSize: 17,
  },

  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  nameLabel: {
    fontSize: 20,
  },
  label: { fontWeight: "bold" },
  profileText: {},
});
