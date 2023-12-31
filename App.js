import * as React from "react";
import { View, Text, Button, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Square from "./components/Square";
import CountdownTimer from "./components/Timer";

function SquareScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d3d3d3",
      }}
    >
      <Square />
      <Button
        title={"Go To Timers"}
        onPress={() => navigation.navigate("Timers")}
      />
    </View>
  );
}

function TimerScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#d3d3d3",
      }}
    >
      <CountdownTimer />
      <Button title={"Go Back"} onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Square"
          component={SquareScreen}
          options={{ title: "hello square" }}
        />
        <Stack.Screen
          name="Timers"
          component={TimerScreen}
          options={{ title: "hello timers" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
