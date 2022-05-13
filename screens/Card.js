import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GestureDetector } from "react-native-gesture-handler";

const Card = () => {
  return (
    <gestureHandlerRootHOC>
      <View>
        <Text>Card</Text>
      </View>
    </gestureHandlerRootHOC>
  );
};

export default Card;

const styles = StyleSheet.create({});
