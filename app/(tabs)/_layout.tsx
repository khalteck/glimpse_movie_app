import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import TabIcon from "../../components/TabIcon";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0d23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          borderWidth: 1,
          borderColor: "#0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View className="w-full flex items-center justify-center">
                <TabIcon focused={focused} icon={icons.home} title="Home" />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View className="w-full flex items-center justify-center">
                <TabIcon focused={focused} icon={icons.search} title="Search" />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View className="w-full flex items-center justify-center">
                <TabIcon focused={focused} icon={icons.save} title="Saved" />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View className="w-full flex items-center justify-center">
                <TabIcon
                  focused={focused}
                  icon={icons.person}
                  title="Profile"
                />
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
