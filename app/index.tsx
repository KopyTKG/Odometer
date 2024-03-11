import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { Button, Text } from 'react-native-paper';
import { useState } from 'react';

export default function TabOneScreen() {
  const [Data, setData] = useState({"id":0,"name":"","fuelType":"","lastMilage":0,"licensePlate":"","updatedAt":"","createdAt":""})
  async function GetCar() {
    let data = await fetch(process.env.EXPO_PUBLIC_API_PATH + "/odometer/cars?id=2", {
      method: 'GET',
      headers: {
       accept: 'application/json',
       Authorization:`bearrer ${process.env.EXPO_PUBLIC_PRIVATE_TOKEN}`,
      }
    })
    if(data) {
      const parsed = await data.json()
      console.log(`bearrer ${process.env.EXPO_PUBLIC_PRIVATE_TOKEN}`)
      console.log(parsed)
      setData(parsed?.data)
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button mode='contained' onPress={async () => { GetCar()}}>
        Press me
      </Button>
      <Text>{Data.name || ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
