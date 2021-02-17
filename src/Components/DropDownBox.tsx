import React, { useEffect } from "react";
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { DEVICE_W } from "../style";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import CarsElement from "./ImageData";
import { RootReducerType } from "../store";
import CarSpecificationsInfo from "./CarSpecificationsInfo";
import TextCustom from "./TextCustom";

type DropDownBoxType = {
  onAndOff: boolean,
  index: number,
  onPress: (bool:boolean) => void,
  navigation : any
}

const DropDown = ({ navigation, onAndOff, index, onPress }: DropDownBoxType) => {

  const carData = useSelector((state : RootReducerType ) => state.carReducer['carData']['selected']);
  const heightAnimated = useSharedValue(0);

  useEffect(() => {
    onAndOff ? openWindow() : closeWindow();
  }, [onAndOff]);

  const openWindow = () => {
    heightAnimated.value = withTiming(65);
  };

  const closeWindow = () => {
    heightAnimated.value = withTiming(0);
    onPress(false);
  };

  const windowStyle = useAnimatedStyle(() => {
    const opacity = interpolate(heightAnimated.value,
      [25, 50],
      [0, 1],
      Extrapolate.CLAMP
    );
    return {
      height: heightAnimated.value + "%",
      opacity: opacity
    };
  }, [heightAnimated]);

  return (
    <Animated.View
      style={[windowStyle, {
        position: "absolute",
        left: 0,
        top: 0,
        width: DEVICE_W,
        height: "0%",
        backgroundColor: "#000000",
        elevation: 1,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        opacity: 0
      }]}>

      <CarSpecificationsInfo carData={carData} />

      <View style={{ width: DEVICE_W, height: '51%', padding: 30}}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={()=> navigation.navigate('MapView') }>
          <CarsElement index={index} />
        </TouchableOpacity>
      </View>

        <View style={{
          width: DEVICE_W,
          height: '25%',
          paddingHorizontal: 10,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: 'flex-end'}}>

            <Text style={{ color: "#FFFFFF", fontSize: 18 }}>
              {
                carData['Year'] ? carData['name'] + ", " + carData['Year'] : carData['name']
              }
            </Text>

           <TextCustom
                text={carData['Manufacturer']}
                style={{ color: "#FFFFFF", fontSize: 12 }} />

            <TextCustom
                text={carData['MSRP']}
                style={{ color: "#999999", fontSize: 12 }} />

            <TextCustom
                text={carData['Top_speed']}
                style={{ color: "#999999", fontSize: 12 }} />

            <TextCustom
                text={ carData['Zero_100'] ? 'ZeroToSixtyTwo' + ': ' + carData['Zero_100'] : null}
                style={{ color: "#999999", fontSize: 12 }} />

        </View>

      <TouchableOpacity
        style={{
            width: DEVICE_W, height: 16
          , borderBottomLeftRadius: 10 , borderBottomRightRadius : 10
          , backgroundColor: "#ff9900", justifyContent: "center", alignItems: "center"
        }}
        onPress={closeWindow}>
        <View>
          <Text style={{ color: "#000000", fontSize: 10, fontWeight: "bold" }}>{"CLOSE"}</Text>
        </View>
      </TouchableOpacity>

    </Animated.View>
  );

};

export default DropDown;
