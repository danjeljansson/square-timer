import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CountdownTimer = () => {
  const [timers, setTimers] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const addTimer = () => {
    const randomTime = Math.floor(Math.random() * 16) + 5;
    setTimers([...timers, { time: randomTime, paused: false }]);
  };

  function togglePause(index) {
    const updatedTimers = [...timers];
    updatedTimers[index].paused = !updatedTimers[index].paused;
    setTimers(updatedTimers);
  }

  useEffect(() => {
    if (timers.length > 0) {
      storeTimers();
    }
  }, [timers]);

  useEffect(() => {
    loadTimers();
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const timerInterval = setInterval(() => {
        setTimers((prevTimers) =>
          prevTimers.map((timer) =>
            timer.paused
              ? timer
              : { ...timer, time: timer.time > 0 ? timer.time - 1 : 0 }
          )
        );
      }, 1000);

      return () => {
        clearInterval(timerInterval);
        storeTimers();
      };
    }
  }, []);

  function storeTimers() {
    AsyncStorage.setItem("timers", JSON.stringify(timers))
      .then(() => {})
      .catch((error) => {
        console.error("Error saving timers:", error);
      });
  }

  function loadTimers() {
    AsyncStorage.getItem("timers")
      .then((value) => {
        if (value !== null) {
          setTimers(JSON.parse(value));
        }
      })
      .catch((error) => {
        console.error("Error loading timers:", error);
      });
  }

  return (
    <ScrollView>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Countdown Timers</Text>
      {timers.map((timer, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "lightblue",
            margin: 6,
          }}
        >
          <Text style={{ marginRight: 10 }}>
            {timer.time === 0 ? "Done" : timer.time}
          </Text>
          <TouchableOpacity onPress={() => togglePause(index)}>
            <Text style={{ color: "black", paddingHorizontal: 2 }}>
              {timer.paused ? "Play" : "Pause"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <Button onPress={addTimer} title={"add timer"}>
        {/*<Text*/}
        {/*  style={{*/}
        {/*    alignItems: "center",*/}
        {/*    justifyContent: "center",*/}
        {/*    margin: 16,*/}
        {/*    paddingVertical: 12,*/}
        {/*    paddingHorizontal: 32,*/}
        {/*    backgroundColor: "steelblue",*/}
        {/*    fontSize: 16,*/}
        {/*    lineHeight: 21,*/}
        {/*    fontWeight: "bold",*/}
        {/*    letterSpacing: 0.25,*/}
        {/*    color: "white",*/}
        {/*  }}*/}
        {/*></Text>*/}
      </Button>
    </ScrollView>
  );
};

export default CountdownTimer;
