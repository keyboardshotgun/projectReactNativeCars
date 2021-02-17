import React,{ useEffect } from "react";
import {StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated";

type CircleLoaderProps = {
  boxSize? : number,
  boxColor? : string,
  topColor? : string,
  bottomColor? : string,
  isCircle? : boolean
}

const CircleLoader = ({   boxSize = 20
                        , boxColor = 'transparent'
                        , topColor = '#FFFFFF'
                        , bottomColor = '#000000'
                        , isCircle = true
} : CircleLoaderProps ) => {

  const rotateValue = useSharedValue(180);
  const borderRadius =  isCircle ? boxSize / 2 : 0;
  const circleRatio = 0.9;
  const circleTop = 0.9 * 0.05;

  const Style = StyleSheet.create({
    box : {
      width: boxSize,
      height: boxSize,
      backgroundColor: boxColor,
      justifyContent: 'center',
      alignItems:'center',
    },
    hiddenBox: {
      width: boxSize,
      height: boxSize / 2,
      backgroundColor: 'transparent',
      overflow:'hidden',
      justifyContent: 'center',
      alignItems:'center',
    },
    circleTop : {
      position :'absolute',
      top : boxSize * circleTop,
      width: boxSize * circleRatio,
      height: boxSize * circleRatio,
      borderRadius: borderRadius,
      backgroundColor: topColor
    },
    circleBottom : {
      position :'absolute',
      top : boxSize * circleTop,
      width: boxSize * circleRatio,
      height: boxSize * circleRatio,
      borderRadius: borderRadius,
      backgroundColor: bottomColor
    }
  });

  const startAnimation = () => {
    'worklet';
    rotateValue.value =  withRepeat(withTiming(150 , {
        duration: 500,
        easing: Easing.cubic
      })
      ,32, true);
  }

  useEffect(()=>{
    startAnimation();
    return () => {
      rotateValue.value = 180;
    }
  },[])

  const rotateTop = useDerivedValue(()=>{
    return 180 - rotateValue.value;
  },[rotateValue]);


  const rotateAnimationTop = useAnimatedStyle(()=>{
    const MathSign = isCircle ? 1 : -1;
    return {
      transform : [
        { rotate : MathSign * rotateTop.value + 'deg' }
      ]
    }
  });

  const rotateAnimationBottom = useAnimatedStyle(()=>{
    return {
      transform : [
        { rotate : rotateValue.value + 'deg' }
      ]
    }
  });

  return (
    <Animated.View style={Style.box}>
      <Animated.View style={[rotateAnimationTop, Style.hiddenBox]}>
        <Animated.View style={[Style.circleTop]}/>
      </Animated.View>
      <Animated.View style={[rotateAnimationBottom, Style.hiddenBox]}>
        <Animated.View style={[Style.circleBottom]}/>
      </Animated.View>
    </Animated.View>
  )
}

export default CircleLoader;
