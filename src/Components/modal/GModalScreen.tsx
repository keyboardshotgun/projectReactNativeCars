import { View } from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import RoundCloseButton from "../Buttons/RoundCloseButton";
import CircleLoader from "../../util/CircleLoader";

type GModalScreenProps = StackNavigationProp<any, 'GModal'>
type Props = {  navigation  : GModalScreenProps  }

const GModalScreen = ({ navigation } : Props ) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <RoundCloseButton onPress={ ()=> navigation.goBack() } />
      <CircleLoader
          boxSize={150}
          boxColor={'transparent'}
          isCircle={true}
          topColor={'#ffb800'}
          bottomColor={'#ffb800'}
      />
    </View>
  );
};

export default GModalScreen;
