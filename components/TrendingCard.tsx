import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";

const TrendingCard = ({
  item,
  index,
}: {
  item: ITrendingMovie;
  index: number;
}) => {
  return (
    <Link href={`/movies/${item?.movie_id}`} asChild>
      <TouchableOpacity className="w-32 h-[214px] relative">
        <Image
          source={{ uri: item?.poster_url }}
          className="w-32 h-[187px] rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute w-full bottom-5 -left-5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <Text className="text-lg font-bold text-white mt-2" numberOfLines={2}>
          {item?.title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
