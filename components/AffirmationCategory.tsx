import { View, Text } from "react-native";
import React from "react";

export interface GalleryPreviewData {
  id: number;
  text: string;
  image: any;
}

export interface AffirmationCategoryProps {
  title: string;
  data: GalleryPreviewData[];
}

const AffirmationCategory = () => {
  return (
    <View>
      <Text>AffirmationCategory</Text>
    </View>
  );
};

export default AffirmationCategory;
