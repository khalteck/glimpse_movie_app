import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { getMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

const MovieIno = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) => (
  <View className="flex-col items-start justify-center mt-7">
    <Text className="text-light-200 font-normal text-md">{label}</Text>
    <Text className="text-light-100 font-bold text-md mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    error,
    loading,
  } = useFetch({
    fetchFunction: () => getMovieDetails({ movie_id: id as string }),
  });

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-2xl">{movie?.title}</Text>
          <View className="flex-row gap-x-2 *:items-center mt-2">
            <Text className="text-light-200 text-md">
              {movie?.release_date?.split("-")?.[0]}
            </Text>
            <Text className="text-light-200 text-md">{movie?.runtime}m</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white text-md">
              {Math.round(movie?.vote_average) ?? 0}/10
            </Text>
            <Text className="text-light-200 text-md">
              {movie?.vote_count} votes
            </Text>
          </View>

          <MovieIno label="Overview" value={movie?.overview} />
          <MovieIno
            label="Genres"
            value={movie?.genres?.map((g: any) => g.name).join(" - ") || "N/A"}
          />
          <View className="flex-row justify-start gap-10 w-full">
            <MovieIno
              label="Budget"
              value={
                movie?.budget ? `$${movie?.budget / 1_000_000} million` : "N/A"
              }
            />

            <MovieIno
              label="Revenue"
              value={
                movie?.revenue
                  ? `$${Math.round(
                      movie?.revenue / 1_000_000
                    )?.toLocaleString()} million`
                  : "N/A"
              }
            />
          </View>

          <MovieIno
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((c: any) => c.name)
                .join(" - ") || "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={router.back}
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt=0.5 rotate-180"
          tintColor={"#fff"}
        />
        <Text className="text-white font-semi-bold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
