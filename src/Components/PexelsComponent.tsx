import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Pressable,
  Linking,
  PermissionsAndroid,
  Alert,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ToastAndroid
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { GET_PHOTOS } from "../reducer/actionTypes";
import { RootReducerType } from "../store";
import FastImage from 'react-native-fast-image'
import { DEVICE_H, DEVICE_W } from "../style";
import ThumbBox from "./pexels/ThumbBox";
import RNFetchBlob from "rn-fetch-blob/index";
import CircleLoader from "../util/CircleLoader";

const PexelsComponent = () => {
  const dispatch = useDispatch();
  const nowPage  = useSelector((state : RootReducerType) => state.carReducer['photos_page'] )
  const photos = useSelector((state : RootReducerType) => state.carReducer['photos'] ) as [];
  const totPhotos = useSelector((state : RootReducerType) => state.carReducer['photos_total_results'] )
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const topRef : React.Ref<any> = useRef();
  const bottomRef : React.Ref<any> = useRef();
  const ThumbBoxSize : number = 90;
  const [toastOn,setToastOn] = useState(false);
  const [toastMessage,setToastMessage] = useState("");

  const thumbStyle = StyleSheet.create({
    box : {
       width: ThumbBoxSize,
       height: ThumbBoxSize
      ,alignItems: 'center'
      ,justifyContent: 'center'
      ,borderRadius: 7
      ,borderColor : '#FFFFFF'
      ,borderWidth : 2
    }
  })

  useEffect(()=>{
    if(nowPage === null || photos.length === 0){
        console.log('PexelsComponent/get init photos');
        dispatch({
          type : GET_PHOTOS,
          data : { page : 1 }
        });
    };
    return () => {
      console.log('PexelsComponent/clear all photos: 종료가 아니라 다른 앱 갔다와도 발생함.');
      // dispatch({ type: RESET_ALL_PHOTOS });
    }
  },[])

  const loadMorePhotos = () => {
    if ( photos.length <= Math.floor(totPhotos * 0.1) * 10 ){
      dispatch({
        type : GET_PHOTOS,
        data : { page : nowPage + 1 }
      });
    }
  }

  const getPermissionsAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: '권한 요청',
          message: '이 기기에 이미지를 저장하려면 저장소 접근권한이 필요합니다.',
          buttonNegative: '아니오',
          buttonPositive: '예',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }

      Alert.alert(
        '이미지 저장하기 허용',
        '저장소 접근 권한을 허용 하시겠습니까?',
        [{text: '예', onPress: () => console.log('허용 OK')}],
        {cancelable: false},
      );

    }catch(err){
      Alert.alert(
        '이미지 저장하기 실패',
        '저장에 실패했습니다: ' + err.message,
        [{text: '예', onPress: () => console.log('실패 OK')}],
        {cancelable: false},
      );
    }
  }

  useEffect( () => {
    if (toastOn) {
      ToastAndroid.showWithGravity(
        "다운로드가 완료 되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setToastOn(false);
    };
    console.log('toast fired');
  },[toastOn]);

  const downloadImage = async  (src : string) => {

    if(Platform.OS === 'android'){
        const granted = await getPermissionsAndroid();
        if (!granted) {
          return;
        }
    }

    if ( src && src.indexOf('.') > 0 )
    {
      const fileFullName = await src.slice((Math.max(0, src.lastIndexOf("/")) || Infinity) + 1);
      const fileName = fileFullName.split('.')[0];
      const fileExt = fileFullName.split('.')[1].split('?')[0];
      let pathToDestination = RNFetchBlob.fs.dirs.DownloadDir;
            //console.log('pathToDestination', pathToDestination, fileName , fileExt);
            await RNFetchBlob.config({
              trusty : true, // for ssl only
              fileCache : true,
              appendExt : fileExt || 'jpeg', // for template Image extension
              addAndroidDownloads: {
                useDownloadManager: true
                , path: `${pathToDestination}/${fileName}.${fileExt}`
                , notification: true
                , title : 'SuperCarRN : 선택한 이미지 다운로드'
                , description : '선택한 이미지를 다운로드 합니다.'
                , mediaScannable : true,
              },
            })
              .fetch('GET', src)
              .then( (resp) => {
                setToastOn(true);
                console.log('The file saved :', resp.path());
              })
              .catch( (err) => {
                setToastOn(true);
              });
    }//if end
    return;
  }

  const imageRenderTop = ( photo : any) => {
    return (
      <View
        style={{width: DEVICE_W
          , height: DEVICE_H, backgroundColor: photo.avg_color
          , alignItems: 'center'
          , justifyContent:'flex-start'
          , padding: 15
        }}>

        <FastImage
          style={{width: DEVICE_W * 0.95 ,height: DEVICE_H * 0.70 , borderRadius: 15}}
          source={{ uri: photo.src.large }}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View style={{position:'absolute', right:30, top: '3%', width: 150, height: 30, justifyContent: 'center', alignItems: "flex-end" }}>
          <Pressable onPress={()=> downloadImage(photo.src.large) }>
            <Text style={{fontSize: 8, fontWeight: 'bold', color:'#ffffff',marginTop: 5}}>Download</Text>
          </Pressable>
        </View>

        <View style={{position:'absolute', right:30, bottom: '35%', width: 150, height: 30, justifyContent: 'center', alignItems: "flex-end" }}>
          <Pressable onPress={()=> Linking.openURL(photo.photographer_url) }>
            <Text style={{fontSize: 7, fontWeight: 'bold', color:'#ffffff'}}>{`photographer : ${photo.photographer}`}</Text>
          </Pressable>
          <Pressable
            onPress={()=> Linking.openURL('https://www.pexels.com') }>
            <Text style={{fontSize: 7, fontWeight: 'bold', color:'#ffffff',marginTop: 5}}>Provided by Pexels</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  const imageRenderBottom = (photo : any, index: number) => {
    return (
      <ThumbBox
        index={index}
        photo={photo}
        activeIndex={activeIndex}
        onPress={bottomAutoScrollToIndex}
        style={thumbStyle.box}
      />
    )
  };

  const bottomAutoScrollToIndex = (index: number) => {
        // console.log('bottomAutoScrollToIndex/selectedIndex', index);
        setActiveIndex(index);
        bottomRef.current.scrollToIndex({
           animated: true
          ,index : index
        });
  }

  useEffect(()=>{
    if(photos.length > 0){
      topRef.current.scrollToIndex({
        animated: true
        ,index: activeIndex
      });
    }
  },[activeIndex])

  //bottom => Top
  const activeIndexToScroll = (ev: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nowIndex = Math.floor(	ev.nativeEvent.contentOffset.x / 92 );
    console.log('activeIndexToScroll', nowIndex, ev.nativeEvent.contentOffset.x);
    // if(nowIndex >= 0){
    //   setActiveIndex(nowIndex);
    //   topRef.current.scrollToIndex({
    //      animated: true
    //     ,index: nowIndex
    //   });
    // }
  }

  const keyExtractor = useCallback( (el: {id : number }, index: number ) => (el.id + ':' +index), [photos]);

  const HeaderAndSeperator = useCallback(()=> {
      return (
        <View style={{backgroundColor: 'transparent',width: 5,height: ThumbBoxSize }}/>
      )
  },[]);

  const Footer = useCallback(()=> {
    if(photos && photos.length < 120){
      return (
        <View style={{width:ThumbBoxSize,height:ThumbBoxSize, padding: 10}}>
            <CircleLoader
              boxSize={ThumbBoxSize / 2}
              boxColor={'transparent'}
              isCircle={true}
              topColor={'#ffb800'}
              bottomColor={'#ffb800'}
            />
        </View>
      )
    }else{
      return (
        <View style={{width:ThumbBoxSize,height:ThumbBoxSize
          ,backgroundColor:'transparent'
          ,justifyContent:'center'
          ,alignItems:'center'
        }}>
          <Text style={{color:'#FFFFFF',fontSize: 10}}>{'END'}</Text>
        </View>
      )
    }
  },[photos])

  const renderItemsTop = useCallback( ({item}) => imageRenderTop(item), [photos,activeIndex]);
  const renderItemsBottom = useCallback( ({item, index}) => imageRenderBottom(item, index), [photos,activeIndex]);

  return (
    <View style={{flex:1, backgroundColor: '#a8dcff'}}>
      <View
        style={{width: DEVICE_W , height: DEVICE_H, backgroundColor : '#FFFFFF'}}>
        <FlatList
          scrollEnabled={false}
          ref={topRef}
          horizontal={true}
          initialScrollIndex={0}
          pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
          data={photos}
          keyExtractor={keyExtractor}
          initialNumToRender={20}
          maxToRenderPerBatch={10}
          windowSize={10}
          scrollEventThrottle={16}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={30}
          renderItem={renderItemsTop}
          onScrollToIndexFailed={ () => {
            const wait = new Promise(resolve => setTimeout(resolve, 1000));
            wait.then(() => {
              topRef.current?.scrollToIndex({ index: photos.length - 1 , animated: true });
            });
          }}
        />
      </View>

      <FlatList
        ref={bottomRef}
        scrollEnabled={true}
        style={{position:'absolute',left: 0, bottom: 15}}
        horizontal={true}
        pagingEnabled={false}
        onMomentumScrollEnd={activeIndexToScroll}
        onEndReachedThreshold={0.5}
        onEndReached={loadMorePhotos}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
        data={photos}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={HeaderAndSeperator}
        ListHeaderComponent={HeaderAndSeperator}
        ListFooterComponent={Footer}
        scrollEventThrottle={16}
        initialNumToRender={20}
        windowSize={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={30}
        removeClippedSubviews={true}
        renderItem={renderItemsBottom}
        onScrollToIndexFailed={ () => {
          const wait = new Promise(resolve => setTimeout(resolve, 1000));
          wait.then(() => {
            bottomRef.current?.scrollToIndex({ index: photos.length - 1 , animated: true });
          });
        }}
      />
    </View>
  )
};

export default PexelsComponent;
