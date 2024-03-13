import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { Button, Chip, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native";

export default function TabOneScreen() {
  const [Data, setData] = useState<Object[]>([]);
  async function GetCar() {
    let data = await fetch(
      process.env.EXPO_PUBLIC_API_PATH + "/odometer/cars",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${process.env.EXPO_PUBLIC_PRIVATE_TOKEN}`,
        },
      }
    );
    if (data) {
      const parsed = await data.json();

      setData(parsed?.data);
    }
  }

  useEffect(() => {
    GetCar();
  }, [Data]);

  return (
    <View style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {Data.map((item: any) => (
        <TouchableHighlight
          key={item.id}
          onPress={() => {
            console.log(item);
          }}
        >
          <View style={styles.row}>
            <Text variant="titleMedium">{item.name}</Text>
            <Text>{item.lastMilage}</Text>
            <Chip mode="flat">{item.licensePlate}</Chip>
            <Chip mode="flat">{item.fuelType}</Chip>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  dump: {
    color: "blue",
  },
});
