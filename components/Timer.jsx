import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Button } from "react-native";
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

  function loadTimers(navigation) {
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
      {timers.map((timer, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            margin: 8,
            backgroundColor: "#000000",
            justifyContent: "space-between",
            padding: 6,
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              alignItems: "center",
              color: "black",
              backgroundColor: "#eeeeee",
              width: 50,
              height: 30,
              padding: 4,
              borderRadius: 5,
              overflow: "hidden",
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            {timer.time === 0 ? "Done" : timer.time}
          </Text>

          <View>
            <Pressable
              onPress={() => togglePause(index)}
              style={{
                backgroundColor: "#979797",
                padding: 2,
                borderRadius: 4,
                height: 30,
                width: 50,
              }}
            >
              <Text
                style={{
                  padding: 4,
                  color: "black",
                }}
              >
                {timer.paused ? "Play" : "Pause"}
              </Text>
            </Pressable>
          </View>
        </View>
      ))}

      <Pressable
        onPress={addTimer}
        style={{
          marginTop: 10,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 4,
          elevation: 3,
          backgroundColor: "#0088cc",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            lineHeight: 21,
            fontWeight: "bold",
            letterSpacing: 0.25,
            color: "white",
          }}
        >
          Add Timer
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default CountdownTimer;
