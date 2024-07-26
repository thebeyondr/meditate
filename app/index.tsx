import { StatusBar } from "expo-status-bar";
import React from "react";
import { ImageBackground, Text, View } from "react-native";

import beachImage from "@/assets/images/meditation-types/beach.webp";
import AppGradientWrapper from "@/components/AppGradientWrapper";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const router = useRouter();
  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradientWrapper
          colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}
        >
          <SafeAreaView className="flex-1 justify-between">
            <View>
              <Text className="text-3xl font-bold text-white">MEDDI</Text>
              <Text className="text-white text-lg">
                Meddi-tation made simple
              </Text>
            </View>
            <View>
              <CustomButton
                onPress={() => router.push("/nature-meditate")}
                title="Get started"
              />
            </View>
            <StatusBar style="light" />
          </SafeAreaView>
        </AppGradientWrapper>
      </ImageBackground>
    </View>
  );
};

export default App;
