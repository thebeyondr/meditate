import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import SafeAreaContent from "@/components/SafeAreaContent";

const AppGradientWrapper = ({
  children,
  colors,
}: {
  children: any;
  colors: string[];
}) => {
  return (
    <LinearGradient className="flex-1" colors={colors}>
      <SafeAreaContent>{children}</SafeAreaContent>
    </LinearGradient>
  );
};

export default AppGradientWrapper;
