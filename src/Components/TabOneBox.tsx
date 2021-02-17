import React, { useEffect } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue, withSpring,
  withTiming
} from "react-native-reanimated";
import CarsElement from './ImageData';
import {PostWidth, WStyle} from '../style';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import SplashScreen from "react-native-splash-screen";

type oneBoxProps = {
  index: number;
  tranX: Animated.SharedValue<number>;
  onPress: (index: number, x: number, y: number) => void | undefined;
};

const TabOneBox = ({index, tranX, onPress}: oneBoxProps) => {

  //console.log('keys :', process.env.REACT_APP_PIXELS_API_KEY);

  const scaleValue = useSharedValue(1);
  const inputRange = [
    -PostWidth * (index + 1),
    -PostWidth * index,
    -PostWidth * (index - 1),
  ];

  const panStyle = useAnimatedStyle(() => {
    const angle = interpolate(
      tranX.value,
      inputRange,
      [Math.PI / 4, Math.PI / 2, Math.PI / 8],
      Extrapolate.CLAMP,
    );
    const translateY = -100 * Math.cos(angle);
    const scale = Math.sin(angle);
    return {
      transform: [
        {translateX: tranX.value},
        {scale: scale},
        {translateY: translateY},
      ],
    };
  });

  const onTapGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onStart: () => {
        scaleValue.value = withSpring(15);
      },
      onActive: ({absoluteX: x, absoluteY: y}) => {
        runOnJS(onPress)(index, x, y);
      },
      onFinish: () => {
        scaleValue.value = withTiming(1);
      },
    },
  );

  const tapStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleValue.value}],
    };
  });

  //splash-screen off
  useEffect(()=>{
    setTimeout( () => {
      SplashScreen.hide();
    },1000);
  },[])

  return (
    <TapGestureHandler onGestureEvent={onTapGestureEvent}>
      <Animated.View style={[panStyle, WStyle.sub_container]}>
        <Animated.View
          style={[
            tapStyle,
            {
              width: 5,
              height: 5,
              borderRadius: 5,
              backgroundColor: '#fffe00',
              opacity: 1,
              position: 'absolute',
              left: '50%',
              top: '50%',
            },
          ]}
        />
        <CarsElement index={index} />
      </Animated.View>
    </TapGestureHandler>
  );
};

export default TabOneBox;
