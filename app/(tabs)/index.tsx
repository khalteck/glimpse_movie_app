import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    error,
    loading,
  } = useFetch({
    fetchFunction: () => fetchMovies({ query: "" }),
  });

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView className="flex-1 px-5">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {loading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        )}

        {error && (
          <Text className="text-red-500/80 mt-10">Error: {error?.message}</Text>
        )}

        {!loading && !error && (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeHolder="Search for a movie"
            />

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3 px-2">
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
                  paddingRight: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
