import React from 'react';
import { Pressable, Text } from "react-native";

type RoundCloseButtonProps = {
  cX? : number,
  cY? : number,
  bgBorderSize? : number,
  bgBorderColor? : string,
  bgColor? : string,
  fontColor? : string,
  fontSize? : number,
  onPress : () => void
}

const RoundCloseButton = ({
    cX = 10,
    cY = 10,
    bgBorderSize = 2,
    bgBorderColor = '#8f8f8f',
    bgColor = '#000000',
    fontColor = '#ffffff',
    fontSize = 15,
    onPress,
  } : RoundCloseButtonProps) => {

  return (
    <Pressable
      onPress={onPress}
      style={{
         width:30
        ,height:30
        ,backgroundColor: bgColor
        ,borderRadius: 15
        ,borderWidth : bgBorderSize
        ,borderColor : bgBorderColor
        ,opacity : 0.8
        ,justifyContent:'center'
        ,alignItems: 'center'
        ,position : 'absolute'
        ,right : cX
        ,top : cY
        ,elevation : 4
      }}
    >
      <Text style={{ color:fontColor,fontSize: fontSize}}>X</Text>
    </Pressable>
  )
}

export default RoundCloseButton;
