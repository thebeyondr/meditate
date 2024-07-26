import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import beachImage from "@/assets/images/meditation-types/beach.webp";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";

const App = () => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="flex-1"
      >
        <LinearGradient
          className="flex-1"
          colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}
        >
          <SafeAreaView className="flex-1 p-5 justify-between">
            <View>
              <Text className="text-3xl font-bold text-white">MEDDI</Text>
              <Text className="text-white text-lg">
                Meddi-tation made simple
              </Text>
            </View>
            <View>
              <CustomButton
                onPress={() => console.log("tapped")}
                title="Get started"
              />
            </View>
            <StatusBar style="light" />
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default App;
