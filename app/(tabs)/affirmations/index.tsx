import { View, Text, ScrollView } from "react-native";
import React from "react";
import AppGradientWrapper from "@/components/AppGradientWrapper";
import AFFIRMATION_GALLERY from "@/constants/affirmations-gallery";
import GuidedAffirmationsGallery from "@/components/GuidedAffirmationsGallery";

const Affirmations = () => {
  return (
    <View className="flex-1">
      <AppGradientWrapper colors={["#2e1f58", "#54426b", "#a790af"]}>
        <ScrollView showsVerticalScrollIndicator={false} className="space-y-6">
          <Text className="text-zinc-50 text-3xl font-bold">
            Empower your mind with affirmations
          </Text>

          <View>
            {AFFIRMATION_GALLERY.map((affirmation) => (
              <GuidedAffirmationsGallery
                key={affirmation.title}
                title={affirmation.title}
                path={affirmation.path}
                previews={affirmation.data}
              />
            ))}
          </View>
        </ScrollView>
      </AppGradientWrapper>
    </View>
  );
};

export default Affirmations;
