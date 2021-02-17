import { Animated, TouchableOpacity, TouchableHighlight } from "react-native";
import FastImage from "react-native-fast-image";
import React from "react";

type ThumbBoxProps = {
  photo : any,
  index: number,
  onPress: (index: number) => void,
  activeIndex : number,
  style: object,
}

const ThumbBox = ({ photo , index, onPress, activeIndex, style } : ThumbBoxProps ) => {

  const returnOnPress = () => {
    onPress(index);
  }

  return (
    <TouchableHighlight
      onPress={returnOnPress}
      style={[ style ,{
        borderColor : (activeIndex === index) ? '#FFFFFF' : '#333333' ,
        opacity: (activeIndex === index) ? 1 : 0.3,
      }]}>
      <FastImage
        style={{width:85, height: 85, borderRadius: 7 }}
        source={{ uri: photo.src.tiny }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableHighlight>
  )
};

export default ThumbBox;
