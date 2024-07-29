import AppGradientWrapper from "@/components/AppGradientWrapper";
import { MEDITATION_DATA } from "@/constants/meditation-data";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";

const NatureMeditate = () => {
  return (
    <AppGradientWrapper colors={["#161b2e", "#0a4d4a", "#766e67"]}>
      <Text className="text-xl font-bold text-white mb-3">
        Start your meddi today
      </Text>
      <View className="mb-4">
        <FlatList
          data={MEDITATION_DATA}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/meditate/${item.id}`)}
              className="h-32 mb-2 rounded-lg overflow-hidden border-0.5 border-white/30"
            >
              <ImageBackground
                source={MEDITATION_IMAGES[item.id - 1]}
                resizeMode="cover"
                className="flex-1"
              >
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.6)"]}
                  className="flex-1 justify-end items-start p-4"
                >
                  <Text className="font-medium text-center text-white text-2xl shadow-md">
                    {item.title}
                  </Text>
                </LinearGradient>
              </ImageBackground>
            </Pressable>
          )}
        />
      </View>
      <StatusBar barStyle={"light-content"} />
    </AppGradientWrapper>
  );
};

export default NatureMeditate;
