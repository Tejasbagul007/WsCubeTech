import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//local import
import HomeScreen from './screens/HomeScreen';
import ZoomableImage from './screens/ZoomableImage';

const Stack = createStackNavigator();

export default function Route() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
        initialRoutes={true}
      />
      <Stack.Screen name="ZoomableImage" component={ZoomableImage} options={{headerShown: false}}
        initialRoutes={false}/>
    </Stack.Navigator>
  );
}
