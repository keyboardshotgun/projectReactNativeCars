import React, { FunctionComponent, useCallback } from "react";
import { Text, View } from "react-native";
import { carsSpecificationsProps } from "./ImageData";
import { DEVICE_W } from "../style";

interface CarSpecificationsInfoProps {
  carData : carsSpecificationsProps;
};

const CarSpecificationsInfo: FunctionComponent<CarSpecificationsInfoProps> = ({ carData }) => {

  const TextInfo = useCallback(() => {
    return Object.keys(carData).map( (key , index : number) => {
      return (key !== 'id')
        && (key !== 'name')
        && (key !== 'Manufacturer')
        && (key !== 'Year')
        && (key !== 'Top_speed')
        && (key !== 'MSRP')
        && (key !== 'Zero_100')
        && (
          <Text
            key={ carData.id +':'+index}
            style={{ color: "#777777", fontSize: 10 }}>
            { key + " : " + carData[key as keyof carsSpecificationsProps] }
          </Text>
        )
    })
  },[carData]);

  if(carData && carData.name !== null){
    return (
      <View style={{
        width: DEVICE_W,
        height: '20%',
        backgroundColor: "transparent",
        padding : 10
      }}>
        { TextInfo() }
      </View>
    );
  }else{
    return (
      <View style={{
        width: DEVICE_W,
        height: '20%',
        backgroundColor: "transparent",
        padding : 10
      }} />
    )
  }
};

export default CarSpecificationsInfo;
