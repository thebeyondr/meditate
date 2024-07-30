import AppGradientWrapper from "@/components/AppGradientWrapper";
import { FlatList, ImageBackground, Pressable, Text, View } from "react-native";

import MEDITATION_IMAGES from "@/constants/meditation-images";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { AUDIO_FILES, MEDITATION_DATA } from "@/constants/meditation-data";
import { ScrollView } from "react-native-gesture-handler";

const durationOptions: { label: string; duration: number }[] = [
  {
    label: "10s",
    duration: 10,
  },
  {
    label: "5m",
    duration: 5 * 60,
  },
  {
    label: "10m",
    duration: 10 * 60,
  },
  {
    label: "20m",
    duration: 20 * 60,
  },
  {
    label: "1h",
    duration: 60 * 60,
  },
  {
    label: "1h30m",
    duration: 90 * 60,
  },
];

const Meditate = () => {
  const { id } = useLocalSearchParams();
  const [secondsRemaining, setSecondsRemaining] = useState<number>(10);
  const [selectedDuration, setSelectedDuration] = useState("10s");
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

  // const handleAdjustDuration = () => {
  //   if (isMeditating) toggleMeditationStatus();
  //   router.push("(modal)/meditation-duration");
  // };

  const handleDurationSelect = (duration: number) => {
    if (isMeditating) toggleMeditationStatus();
    const currentOptionLabel = durationOptions?.find(
      (option) => option.duration === duration
    )?.label;
    setSelectedDuration(currentOptionLabel ?? "10s");
    setSecondsRemaining(duration);
  };

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
            <View className="mt-10">
              <Text className="text-white font-medium text-lg">
                Adjust duration
              </Text>
              <View className="mt-4">
                <FlatList
                  data={durationOptions}
                  renderItem={({ item }) => (
                    <Pressable
                      className={`h-12 w-20 rounded-full bg-gray-400 text-white mr-2 justify-center items-center ${
                        item.label === selectedDuration
                          ? "bg-blue-500 text-black"
                          : null
                      }`}
                      onPress={() => handleDurationSelect(item.duration)}
                    >
                      <Text className="text-white text-lg">{item.label}</Text>
                    </Pressable>
                  )}
                  keyExtractor={(item) => item.duration.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    borderRadius: 8,
                  }}
                />
              </View>
            </View>
          </View>
          <View className="mb-5">
            <CustomButton
              title={isMeditating ? "Pause meditation" : "Start meditation"}
              onPress={toggleMeditationStatus}
            />
            {/* <CustomButton
              title="Change duration"
              containerStyles="bg-transparent border-[1.5px] border-white mt-2"
              textStyles="text-white"
              onPress={handleAdjustDuration}
            /> */}
          </View>
        </AppGradientWrapper>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
