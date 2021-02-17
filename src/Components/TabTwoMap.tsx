import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {  DEVICE_W } from "../style";
import Animated from "react-native-reanimated";
import { REACT_APP_MAPBOX_API_KEY }  from "@env" ;

MapboxGL.setAccessToken(REACT_APP_MAPBOX_API_KEY);
MapboxGL.setConnected(true);

interface classProps {
  SF_OFFICE_LOCATION: number[],
  DC_OFFICE_LOCATION: number[],
  ZERO_ZERO: number[],
  ZERO_TEN: number[],
  TEN_ZERO: number[],
  navigation: any,
}

type dataType = {
  label: string, data: number[]
}

interface classState {
  location: number[],
  flyToOptions: dataType[],
  index: number;
  zoom : number;
}

class TabTwoMAp extends React.Component<classProps, classState> {

  private SF_OFFICE_LOCATION = [126.9897496437336, 37.48760274336776];
  private DC_OFFICE_LOCATION = [-77.036086, 38.910233];
  private ZERO_ZERO = [-77.036086, 38.910233];
  private ZERO_TEN = [126.923924, 37.506144];
  private TEN_ZERO = [10, 0];
  private _map : any | React.Ref<any>;

  constructor(props: classProps) {
    super(props);
    this.state = {
      location: this.SF_OFFICE_LOCATION,
      flyToOptions: [
        { label: "SF", data: this.SF_OFFICE_LOCATION },
        { label: "DC", data: this.DC_OFFICE_LOCATION },
        { label: "0,0", data: this.ZERO_ZERO },
        { label: "0,10", data: this.ZERO_TEN },
        { label: "10,0", data: this.TEN_ZERO }
      ],
      index: 0,
      zoom : 13,
    };
  }

  onFlyToPress = () => {
    const index = Math.floor(Math.random() * 4);
    this.setState({ location: this.state.flyToOptions[index].data }, () => alert("Fly Done"));
    // this._map.flyTo([])
  }

  zoomHandler = (types: string) => {
     if (types === "up") {
       this.setState({
         ...this.state,
         zoom : this.state.zoom > 18 ? 18 : this.state.zoom + 1
       })
     } else {
       this.setState({
         ...this.state,
         zoom : this.state.zoom <= 0 ? 0 : this.state.zoom - 1
       })
     }
   };

   onRegionDidChange = async () => {
     const mapCenter = await this._map.getCenter();
     const zoomLevel = await this._map.getZoom();
     console.log("get Map center / zoom : ", mapCenter, zoomLevel);
   };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.08, backgroundColor: "#00ebff" }}>
          <View
            style={{
              justifyContent: "flex-start"
              , flexDirection: "row"
              , position: "absolute"
              , left: 10
              , top: 10
              , width: DEVICE_W
              , height: 30
              , marginHorizontal : 10
            }}
          >
            <TouchableOpacity
              style={{
                width: 60,
                height: 30,
                borderRadius: 20,
                backgroundColor: "#00FF00",
                justifyContent: "center",
                alignItems: "center"
                , marginHorizontal : 10
                , elevation : 3
              }}
              onPress={this.onFlyToPress}>
              <Text>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 60,
                height: 30,
                borderRadius: 20,
                backgroundColor: "#00FF00",
                justifyContent: "center",
                alignItems: "center"
                , marginHorizontal : 10
                , elevation : 3
              }}
              onPress={()=>this.zoomHandler('up')}>
              <Text>+ Zoom</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 60,
                height: 30,
                borderRadius: 20,
                backgroundColor: "#00FF00",
                justifyContent: "center",
                alignItems: "center"
                , elevation : 3
              }}
              onPress={()=>this.zoomHandler('down')}>
              <Text>- Zoom</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 60,
                height: 30,
                borderRadius: 20,
                backgroundColor: "#00FF00",
                justifyContent: "center",
                alignItems: "center"
                , marginHorizontal : 10
                , elevation : 3
              }}
              onPress={()=> this.props.navigation.navigate('GloModal') }>
              <Text>GModal</Text>
            </TouchableOpacity>

          </View>
        </View>

        <View style={{ flex: 0.92 }}>
          <MapboxGL.MapView
            ref={(ref)=> this._map = ref }
            style={{ flex: 1 }}
            localizeLabels={true}
            logoEnabled={false}
            styleURL={MapboxGL.StyleURL.Street}
            onRegionDidChange={this.onRegionDidChange}
          >
            <MapboxGL.Camera
              zoomLevel={this.state.zoom}
              animationMode={"flyTo"}
              animationDuration={6000}
              centerCoordinate={this.state.location}
            />

            <Animated.View>
              <MapboxGL.MarkerView
                id={"d-map"}
                coordinate={[126.9897496437336, 37.48760274336776]}>
                <Animated.View style={{
                  backgroundColor: "#0092ff",
                  width: 30,
                  height: 30,
                  borderRadius: 3,
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <Text>{"M"}</Text>
                </Animated.View>
              </MapboxGL.MarkerView>
            </Animated.View>

          </MapboxGL.MapView>
        </View>

      </View>
    );
  }
}

export default TabTwoMAp;

// Functional ===> Laggy
// const TabTwoMAp = () => {
//   const [isGranted, setGranted] = useState(false);
//   const mapRef = useRef(undefined);
//   const [zoom, setZoom] = useState(13);
//   const [selectedLoc, setSelectedLoc] = useState<MapStateType>({
//     lat: 126.923924,
//     lng: 37.506144,
//     screenPointX: null,
//     screenPointY: null
//   });
//
//   useEffect(() => {
//     console.log("Changed user's location permission", isGranted);
//     console.log("zoom level changed", zoom);
//   }, [isGranted, zoom]);
//
//   useEffect(() => {
//     MapboxGL.setTelemetryEnabled(false);
//     userLocationPermissionCheck()
//       .then((isGranted) => setGranted(isGranted))
//       .catch((err) => {
//         console.log("userLocationPermissionCheck/err", err);
//       });
//   }, []);
//
//   const userLocationPermissionCheck = async () => {
//     const isGranted = await MapboxGL.requestAndroidLocationPermissions();
//     //console.log('isGranted', isGranted); true / false return;
//     return isGranted;
//   };
//
//   const mapOnPress = (event: any) => {
//     const { geometry, properties } = event;
//     const selectedLocation = {
//       lat: geometry.coordinates[0],
//       lng: geometry.coordinates[1],
//       screenPointX: properties.screenPointX,
//       screenPointY: properties.screenPointY
//     };
//     setSelectedLoc(selectedLocation);
//     console.log("selectedLocation", selectedLocation);
//   };
//
//   const onRegionDidChange = async () => {
//     const mapCenter = await mapRef.current.getCenter();
//     const zoomLevel = await mapRef.current.getZoom();
//     console.log("get Map center / zoom : ", mapCenter, zoomLevel);
//   };
//
//   const zoomHandler = (types: string) => {
//     let nowZoom = zoom;
//     if (types === "up") {
//       setZoom(nowZoom >= 18 ? 18 : nowZoom + 1);
//     } else {
//       setZoom(nowZoom <= 3 ? 3 : nowZoom - 1);
//     }
//   };
//
//   const jumpTo = async () => {
//     await console.log('mapRef', mapRef);
//     //.flyTo([-77.036086, 38.910233], 6000);
//     //alert('Complete to Jump');
//   }
//
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#9cdeff" }}>
//
//       <View style={{
//         flex: 0.15
//         , justifyContent: "flex-start"
//         , flexDirection: "row"
//         , position: "absolute"
//         , left: 10
//         , top: 10
//         , width: DEVICE_W
//         , height: 30
//         , backgroundColor: "transparent"
//       }}>
//         <TouchableOpacity
//           style={{
//             width: 60,
//             height: 30,
//             backgroundColor: "#FFFFFF",
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: 15,
//             marginHorizontal : 10,
//           }}
//           onPress={() => zoomHandler("down")}>
//           <Text>{"zoom -"}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{
//             width: 60,
//             height: 30,
//             backgroundColor: "#FFFFFF",
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: 15,
//             marginHorizontal : 10,
//           }}
//           onPress={() => zoomHandler("up")}>
//           <Text>{"zoom +"}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{
//             width: 60,
//             height: 30,
//             backgroundColor: "#FFFFFF",
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: 15,
//             marginHorizontal : 10,
//           }}
//           onPress={jumpTo}>
//           <Text>{"Go 종로"}</Text>
//         </TouchableOpacity>
//       </View>
//
//       <View style={{ width: DEVICE_W, flex: 0.85, backgroundColor: "tomato" }}>
//
//         <MapboxGL.MapView
//           ref={mapRef}
//           onRegionDidChange={onRegionDidChange}
//           onPress={mapOnPress}
//           style={{ flex: 1 }}
//           styleURL={MapboxGL.StyleURL.Street}
//           logoEnabled={false}
//           localizeLabels={true}>
//
//           <MapboxGL.Camera
//             //heading={0}
//             //followUserLocation={true}
//             //followUserMode={'normal'}
//             zoomLevel={zoom}
//             animationMode={"flyTo"}
//             animationDuration={1100}
//             centerCoordinate={[selectedLoc.lat, selectedLoc.lng]}
//           />
//
//             <MapboxGL.PointAnnotation
//               coordinate={[selectedLoc.lat, selectedLoc.lng]}
//               id="pt-ann">
//               <View style={{
//                 backgroundColor: "#ffd500",
//                 width: 30,
//                 height: 30,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: 15
//               }}>
//                 <Text>{"A"}</Text>
//               </View>
//             </MapboxGL.PointAnnotation>
//
//           <Animated.View>
//             <MapboxGL.MarkerView
//               id={"d-map"}
//               coordinate={[126.9897496437336, 37.48760274336776]}>
//               <Animated.View style={{
//                 backgroundColor: "#0092ff",
//                 width: 30,
//                 height: 30,
//                 borderRadius: 3,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}>
//                 <Text>{"M"}</Text>
//               </Animated.View>
//             </MapboxGL.MarkerView>
//           </Animated.View>
//
//         </MapboxGL.MapView>
//       </View>
//     </View>
//   );
// };
//
// export default TabTwoMAp;
