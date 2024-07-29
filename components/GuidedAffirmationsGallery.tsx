import { GalleryPreviewData } from "@/components/AffirmationCategory";
import { Link } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

interface GuidedAffirmationsGalleryProps {
  title: string;
  path: string;
  previews: GalleryPreviewData[];
}

const GuidedAffirmationsGallery = ({
  title,
  path,
  previews,
}: GuidedAffirmationsGalleryProps) => {
  return (
    <View className="my-5">
      <View className="mb-2">
        <Text className="text-white font-bold text-xl">{title}</Text>
      </View>
      <View className="space-y-2">
        <FlatList
          data={previews}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={`/affirmations/${path}--${item.id}`} asChild>
              <Pressable>
                <View className="h-36 w-36 rounded-lg mr-4 overflow-hidden">
                  <Image
                    source={item.image}
                    resizeMode="cover"
                    className="w-full h-full"
                  />
                </View>
              </Pressable>
            </Link>
          )}
        />
      </View>
    </View>
  );
};

export default GuidedAffirmationsGallery;
