import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

interface IProps {
  item: any;
  onPress?: () => void;
}

const MovieCard = ({ item }: IProps) => {
  return (
    <Link href={`/movies/${item?.id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: item?.poster_path
              ? `https://image.tmdb.org/t/p/w500${item?.poster_path}`
              : `https://placeholder.com/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-ful h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-lg text-white font-bold mt-2" numberOfLines={1}>
          {item?.title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white text-xs font-bold uppercase">
            {Math.round(item?.vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-sx text-light-300 font-medium">
            {item?.release_date?.split("-")[0]}
          </Text>

          <Text className="text-sx text-light-300 font-medium uppercase">
            movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;

const styles = StyleSheet.create({});
