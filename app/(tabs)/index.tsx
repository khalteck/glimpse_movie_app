import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import SearchBar from "../components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";

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

      <View className="flex-1 px-5">
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
                renderItem={({ item }) => (
                  <Text className="text-white text-sm">{item?.title}</Text>
                )}
              />
            </>
          </View>
        )}
      </View>
    </View>
  );
}
