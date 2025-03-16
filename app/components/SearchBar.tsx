import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface IProps {
  onPress?: () => void;
  placeHolder: string;
}

const SearchBar = ({ onPress, placeHolder }: IProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#ab8ff"}
      />
      <TextInput
        placeholder={placeHolder}
        placeholderTextColor="#ab8ff"
        className="text-secondary text-base font-semibold ml-3"
        onPress={onPress}
        onChangeText={(text) => console.log(text)}
        value=""
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
