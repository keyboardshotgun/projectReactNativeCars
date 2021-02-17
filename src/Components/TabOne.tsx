import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Button, ImageBackground, LayoutChangeEvent, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import TabOneBox from './TabOneBox';
import { Box_Width, DEVICE_H, DEVICE_W, PostWidth, WStyle } from "../style";
import {snapPoint} from 'react-native-redash';
import ProcessIndicator from './ProcessIndicator';
import DropDownBox from './DropDownBox';
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import { BACK_IMG_ADD, UPDATE_CAR_DATA } from "../reducer/actionTypes";
import { RootReducerType } from "../store";
import { StackNavigationProp } from "@react-navigation/stack";
import { carsSpecifications } from "./ImageData";
import { OnLoadEvent } from "react-native-fast-image";

const carsAssets = [...carsSpecifications] as const;

type imageOptionType = {
  includeBase64: boolean
  , includeExif: boolean
  , useFrontCamera: boolean
  , mediaType: "photo" | "video" | "any"
  , multiple: boolean
  , compressImageMaxWidth: number
  , compressImageMaxHeight: number
  , compressImageQuality: number //default : android, ios 0.8
  , cropping: boolean
};

const imageOption: imageOptionType = {
  includeBase64: false
  , includeExif: true
  , useFrontCamera: true
  , mediaType: "photo"
  , multiple: false
  , compressImageMaxWidth: 1000
  , compressImageMaxHeight: 1000
  , compressImageQuality: 0.8 //default : android, ios 0.8
  , cropping: true // true => crop image
};

const splitPoints = carsAssets.map((_: object, i: number) => -i * PostWidth);

type tabOneProps = StackNavigationProp<any, 'Home'>;
type Props = { navigation : tabOneProps }

const TabOne = ({ navigation } : Props) => {

  const tranX = useSharedValue(0);
  const BackImg = useSelector((state: RootReducerType) => state.carReducer['backImage']) as { uri : string }[];
  const dispatch = useDispatch();
  const [selectedIndex,setSelectedIndex] = useState(0);
  const [onAndOff, setOnAndOff ] = useState(false);
  const [totLayoutSize, setTotLayoutSize] = useState(0);

  const cleanupAllImages = () => {
    ImagePicker.clean().then(() => {
      console.log('removed tmp images from tmp directory');
    }).catch(err => {
      console.log('removed tmp images from tmp directory fail',err);
    });
  };

  useEffect(()=>{
    console.log('BackImg',BackImg);
    return () => {
      cleanupAllImages();
    }
  },[BackImg])


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection:'row'}}>

          <TouchableOpacity
            style={{
              width: 60, height: 30
              , backgroundColor: "#ba98db"
              , marginRight: 10
              , borderRadius: 10
              , justifyContent: "center"
              , alignItems: "center"
            }}
            onPress={()=>navigation.navigate('GloModal')}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 10, fontWeight: "bold" }}>{"GloModal"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 60, height: 30
              , backgroundColor: "#3c9ddd"
              , marginRight: 10
              , borderRadius: 10
              , justifyContent: "center"
              , alignItems: "center"
            }}
            onPress={()=>navigation.navigate('Pexels')}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 10, fontWeight: "bold" }}>{"PEXELS"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 40, height: 30
              , backgroundColor: "#3cdd84"
              , marginRight: 10
              , borderRadius: 10
              , justifyContent: "center"
              , alignItems: "center"
            }}
            onPress={_callGallery}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }}>{"+"}</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const _callGallery = async () => {
    await ImagePicker.openPicker(imageOption).then(image => {
      // let StringPath = image.path.toString();
      // let mime = image.mime;
      // let thisMediaType = "";
      // const thisFileName = StringPath.substring(StringPath.lastIndexOf("/") + 1);
      //
      // if (mime && mime.toLowerCase().indexOf("video/") !== -1) {
      //   thisMediaType = "video";
      // } else if (mime && mime.toLowerCase().indexOf("image/") !== -1) {
      //   thisMediaType = "image";
      // } else {
      //   thisMediaType = "others";
      // }
      const retDataObject = {
        uri: image.path,
        // width: image.width,
        // height: image.height,
        // mime: image.mime,
        // mediaType: thisMediaType,
        // filename: thisFileName
      };
      dispatch({ type: BACK_IMG_ADD , data : retDataObject });
      //
    }).catch(e => {
      console.log('image error message:', e.message);
      if( e?.message === 'User cancelled image selection'){
        alert('이미지 선택이 취소 되었습니다.');
      }else{
        alert('배경 이미지를 넣기 위해\n[갤러리] 사용권한이 필요합니다.');
      }
    });
  };

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number}
  >({
    onStart: (_, ctx) => {
      ctx.x = tranX.value;
    },
    onActive: ({translationX}, {x}) => {
      tranX.value = x + translationX;
    },
    onEnd: ({velocityX}) => {
      const delta = snapPoint(tranX.value, velocityX * 0.5, splitPoints);
      tranX.value = withTiming(delta);
    },
  });

  useEffect(()=>{
    dispatch({ type: UPDATE_CAR_DATA, data : carsAssets[selectedIndex] })
  },[selectedIndex])

  const TabOneBoxOnPress = useCallback(( index: number, x: number, y: number )=>{
    tranX.value = withSpring(-index * PostWidth);
    setSelectedIndex(index);
    if(!onAndOff){
      updateFromChildren(true);
    };
  },[]);

  const updateFromChildren = (bool:boolean) => {
      setOnAndOff(bool);
  }

  const measureViewLayout = async (evt: LayoutChangeEvent) => {
    const layOutSize = await evt.nativeEvent.layout.width * carsAssets.length - (10 * carsAssets.length);
    await setTotLayoutSize(layOutSize);
  }

  return (
    <View style={WStyle.container}>
      <View style={WStyle.car_container_top} >
        { BackImg.length > 0 && (
              <ImageBackground
                style={{ width: '100%', height: DEVICE_H * 0.65 }}
                source={{ uri : BackImg[0].uri }}
                resizeMode={'contain'}
              />
        )}
      </View>

      <PanGestureHandler
        onGestureEvent={onGestureEvent}>
        <Animated.View
          style={WStyle.car_container_bottom}>
          <View
            onLayout={measureViewLayout}
            style={WStyle.placeholder} />
          {carsAssets.map((car, index) => (
            <TabOneBox
              key={index}
              index={index}
              tranX={tranX}
              onPress={TabOneBoxOnPress}
            />
          ))}
        </Animated.View>
      </PanGestureHandler>

      { (totLayoutSize > 0) &&
        <ProcessIndicator
          tranX={tranX}
          totalWidth={totLayoutSize}
        />
      }

      <DropDownBox
        index={selectedIndex}
        onAndOff={onAndOff}
        onPress={updateFromChildren}
        navigation={navigation}
      />
    </View>
  );
};

export default TabOne;
