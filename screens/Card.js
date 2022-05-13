import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Swiper from "react-native-deck-swiper";

const Card = () => {
  return (
    <View>
      <Swiper
        cards={["DO", "MORE", "OF", "WHAT", "MAKES", "YOU", "HAPPY"]}
        renderCard={(card) => {
          return (
            <View style={styles.card}>
              <Text style={styles.text}>{card}</Text>
            </View>
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
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
});
