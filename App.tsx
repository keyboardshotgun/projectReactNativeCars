import React from "react";
import { Text, StatusBar, TouchableOpacity, View, Button, SafeAreaView, Pressable } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabOne from "./src/Components/TabOne";
import TabTowMap from "./src/Components/TabTwoMap";
import PexelsComponent from "./src/Components/PexelsComponent";
import GModalScreen from "./src/Components/modal/GModalScreen";

import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./src/store/index";
import createSagaMiddleware from "redux-saga";

import watchSaga from "./src/saga/index";
import { Provider } from "react-redux";

//saga settings
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(watchSaga);

type StackListType = {
  Home: undefined;
  MapView: undefined;
  Pexels: undefined;
};

type GloModalType = {
  GModalScreen : React.ComponentType
}

type RootStackParamList = {
  Main :StackListType,
  GloModal : GloModalType,
}

const Stack = createStackNavigator<StackListType>();
const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen
          name={"Home"}
          options={{
            title: "Super Car"
          }}
          component={TabOne}
        />

        <Stack.Screen
          name={"MapView"}
          options={{
            title: "CarsMap"
          }}
          component={TabTowMap}
        />

        <Stack.Screen
          name={"Pexels"}
          options={{
            title: "Image Gallery"
          }}
          component={PexelsComponent}
        />
      </Stack.Navigator>
    </>
  );
};

const CombineStack = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator mode={"modal"}>
          <RootStack.Screen
            name={"Main"}
            component={App}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name={"GloModal"}
            component={GModalScreen}
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default CombineStack;
