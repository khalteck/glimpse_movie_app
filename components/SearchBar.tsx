import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface IProps {
  onPress?: () => void;
  placeHolder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  className?: string;
  autoFocus?: boolean;
}

const SearchBar = ({
  onPress,
  placeHolder,
  value,
  onChangeText,
  className,
  autoFocus,
}: IProps) => {
  return (
    <View
      className={`flex-row items-center bg-dark-200 rounded-full px-5 py-4 ${className}`}
    >
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#ab8ff"}
      />
      <TextInput
        placeholder={placeHolder}
        placeholderTextColor="#ab8ff"
        className="w-full text-white font-semibold ml-3"
        onPress={onPress}
        onChangeText={onChangeText}
        value={value}
        autoFocus={autoFocus}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
