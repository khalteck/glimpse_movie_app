import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

interface IProps {
  item: any;
  onPress?: () => void;
}

const MovieCard = ({ item, onPress }: IProps) => {
  return (
    <Link href={`/movie/${item?.id}`} asChild>
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

        <Text className="text-sm text-white font-bold mt-2">{item?.title}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;

const styles = StyleSheet.create({});
