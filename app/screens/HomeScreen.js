import React, { useState, useEffect } from "react";
import { Text, FlatList, Image, TouchableOpacity, SafeAreaView, StyleSheet, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hP } from 'react-native-responsive-screen';

//local import
import { colors } from "../res/colors";

const HomeScreen = () => {

  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchStoredData();
  }, []);

  const fetchStoredData = async () => {
    try {
        //retrive Information
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        // If no stored data, fetch new data
        fetchData();
      }
    } catch (error) {
      console.error('Error fetching stored data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();

      // Get the first 10 products and store in AsyncStorage locally
      const limitedProducts = data.products.slice(0, 10);
      await AsyncStorage.setItem('products', JSON.stringify(limitedProducts));

      setProducts(limitedProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

const handleImagePress = (imageUri) => {
    navigation.navigate('ZoomableImage', { imageUri });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.txtHeader}> Product List </Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleImagePress(item.thumbnail)}
          >
           <Text style={styles.txtTitle}>
              {item.title}
            </Text>
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.img}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
   container:{
    flex: 1, 
    backgroundColor: colors.black,
   },
   txtHeader:{
    fontSize: wp(8),
    fontWeight: "bold", 
    margin: Platform.OS === 'android' ? wp(4) : wp(5), 
    color: colors.white,
   },
   btn:{
    padding: wp(4),
    alignItems: "center",
    justifyContent: "center"
   },
   img:{
    resizeMode: 'contain',
    width: wp(80), 
    height: wp(80), 
   },
   txtTitle:{
    color: colors.white,
    margin: Platform.OS === 'android' ? wp(2) : wp(3), 
    fontSize: wp(6),
   },
})