import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch({ fetchFunction: () => getTrendingMovies() });

  const {
    data: movies,
    error,
    loading,
  } = useFetch({
    fetchFunction: () => fetchMovies({ query: "" }),
  });

  const isLoading = loading || trendingLoading;

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView className="flex-1 px-5">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        )}

        {error && (
          <Text className="text-red-500/80 mt-10">Error: {error?.message}</Text>
        )}

        {!isLoading && !error && (
          <View className="flex-1 mt-5">
            <View className="relative w-full">
              <SearchBar placeHolder="Search for a movie" className="z-0" />
              <TouchableOpacity
                className="w-full h-full absolute top-0 left-0 z-10"
                onPress={() => router.push("/search")}
              ></TouchableOpacity>
            </View>

            {(trendingMovies?.length as number) > 0 && (
              <View className="mt-10 mb-5">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>

                <FlatList
                  data={trendingMovies}
                  keyExtractor={(item) => item?.movie_id}
                  renderItem={({ item, index }) => (
                    <TrendingCard item={item} index={index} />
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={<View className="w-5" />}
                  className="pl-5"
                />
              </View>
            )}

            <>
              <Text className="text-lg text-white font-bold mt-5">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                keyExtractor={(item) => item?.id}
                numColumns={3}
                renderItem={({ item }) => <MovieCard item={item} />}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  marginVertical: 12,
                }}
                contentContainerStyle={{ paddingBottom: 120 }}
                className="mt-2"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
