import AppGradientWrapper from "@/components/AppGradientWrapper";
import { ImageBackground, Pressable, Text, View } from "react-native";

import MEDITATION_IMAGES from "@/constants/meditation-images";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { AUDIO_FILES, MEDITATION_DATA } from "@/constants/meditation-data";

const Meditate = () => {
  const { id } = useLocalSearchParams();
  const [secondsRemaining, setSecondsRemaining] = useState<number>(10);
  const [isMeditating, setIsMeditating] = useState(false);
  const [meditationAudio, setMeditationAudio] = useState<Audio.Sound>();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    if (!isMeditating) return;

    if (secondsRemaining === 0) {
      setIsMeditating(false);
      toggleMeditationAudio();
      return;
    }

    let timerId: NodeJS.Timeout;

    timerId = setTimeout(
      () => setSecondsRemaining((prevSeconds) => prevSeconds - 1),
      1000
    );

    return () => clearTimeout(timerId);
  }, [secondsRemaining, isMeditating]);

  useEffect(() => {
    return () => {
      meditationAudio?.unloadAsync();
    };
  }, [meditationAudio]);

  const formattedRemainingMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");

  const formattedRemainingSeconds = String(
    Math.floor(secondsRemaining % 60)
  ).padStart(2, "0");

  const toggleMeditationStatus = async () => {
    if (secondsRemaining === 0) setSecondsRemaining(10);
    setIsMeditating((prevMed) => !prevMed);
    await toggleMeditationAudio();
  };

  const toggleMeditationAudio = async () => {
    const audio = meditationAudio
      ? meditationAudio
      : await startMeditationAudio();

    const audioState = await audio?.getStatusAsync();

    if (audioState?.isLoaded && !isAudioPlaying) {
      await audio?.playAsync();
      setIsAudioPlaying(true);
    } else {
      audio?.pauseAsync();
      setIsAudioPlaying(false);
    }
  };

  const startMeditationAudio = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setMeditationAudio(sound);
    return sound;
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDITATION_IMAGES[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradientWrapper colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable
            onPress={() => router.back()}
            className="rounded-full bg-white/30 p-2 self-start backdrop-blur-lg"
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto w-60 h-60 bg-white/25 rounded-full justify-center items-center">
              <Text
                className="text-6xl font-medium text-white pt-1"
                textBreakStrategy="simple"
              >
                {formattedRemainingMinutes}:{formattedRemainingSeconds}
              </Text>
            </View>
          </View>
          <View className="mb-5">
            <CustomButton
              title={isMeditating ? "Pause meditation" : "Start meditation"}
              onPress={toggleMeditationStatus}
            />
          </View>
        </AppGradientWrapper>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
