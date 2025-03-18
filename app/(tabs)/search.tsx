import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { updateSearchCount } from "@/services/appwrite";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    error,
    loading,
    reFetch,
    reset,
  } = useFetch({
    fetchFunction: () => fetchMovies({ query: searchQuery }),
    autoFetch: false,
  });

  useEffect(() => {
    //debounce search
    const timeOutId = setTimeout(async function fetchData() {
      if (searchQuery?.trim()) {
        const res = await reFetch();

        if (res && res?.[0]) {
          await updateSearchCount(searchQuery, res?.[0]);
        }
      } else {
        reset();
      }
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <View className="flex-1 px-5">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        <View className="flex-1 mt-5">
          <SearchBar
            placeHolder="Search for a movie"
            value={searchQuery}
            onChangeText={(text: string) => setSearchQuery(text)}
            autoFocus={true}
          />

          {loading && (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-10 self-center"
            />
          )}

          {error && (
            <Text className="text-red-500/80 mt-10">
              Error: {error?.message}
            </Text>
          )}

          {!loading && !error && (
            <>
              {(movies?.length as number) > 0 && searchQuery?.trim() && (
                <Text className="text-lg text-white font-bold mt-5 mb-3 px-2">
                  Search results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}

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
                showsVerticalScrollIndicator={false}
                className="mt-2"
                ListEmptyComponent={
                  !loading && !error ? (
                    <View className="mt-10 px-5">
                      <Text className="text-center text-gray-500">
                        {searchQuery?.trim()
                          ? "No movies found"
                          : "Search for a movie"}
                      </Text>
                    </View>
                  ) : null
                }
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default search;

const styles = StyleSheet.create({});
