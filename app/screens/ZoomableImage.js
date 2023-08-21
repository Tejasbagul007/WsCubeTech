import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';

//local import
import { colors } from '../res/colors';

const ZoomableImage = ({ route }) => {
  const { imageUri } = route.params;

  return (
    <View style={styles.container}>
      <PinchGestureHandler>
        <Image
          source={{ uri: imageUri }}
          resizeMode="contain"
          style={styles.image}
        />
      </PinchGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ZoomableImage;
