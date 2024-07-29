import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import AFFIRMATION_GALLERY from "@/constants/affirmations-gallery";
import AppGradientWrapper from "@/components/AppGradientWrapper";
import { AntDesign } from "@expo/vector-icons";

const Affirmation = () => {
  const { itemId } = useLocalSearchParams();
  const router = useRouter();

  const ErrorDisplay = (
    <View>
      <Text>Affirmation</Text>
      <Text>Try another affirmation</Text>
    </View>
  );

  if (!itemId || !AFFIRMATION_GALLERY) {
    return ErrorDisplay;
  }

  const affirmationPath = (itemId as string).split("--")[0];
  const affirmationId = (itemId as string).split("--")[1];

  const fetchAffirmationById = (id: string, path: string) => {
    const data = AFFIRMATION_GALLERY.find((aff) => aff.path === path)?.data;
    return data?.find((aff) => aff.id === Number(id));
  };

  const currentAffirmation = fetchAffirmationById(
    affirmationId,
    affirmationPath
  );

  if (!currentAffirmation) {
    return ErrorDisplay;
  }

  const affirmationSentences = currentAffirmation.text.split(".");

  return (
    <View className="flex-1">
      <ImageBackground
        source={currentAffirmation?.image}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradientWrapper colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]}>
          <Pressable
            onPress={() => router.back()}
            className="rounded-full bg-white/30 p-2 self-start"
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </Pressable>

          <ScrollView className="mt-8">
            <View>
              {affirmationSentences.map((sentence, index) => (
                <Text
                  key={index}
                  className="mb-8 text-xl font-medium text-white"
                >
                  {sentence.trim()}
                  {index < affirmationSentences.length - 1 ? "." : ""}
                </Text>
              ))}
            </View>
          </ScrollView>
        </AppGradientWrapper>
      </ImageBackground>
    </View>
  );
};

export default Affirmation;
