import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.3;
const JOYSTICK_SIZE = CIRCLE_SIZE * 0.4;

const VirtualJoystick = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const gesture = Gesture.Pan()
    .onStart(() => {
      scale.value = withSpring(1.2);
    })
    .onUpdate((event) => {
      const maxDistance = (CIRCLE_SIZE - JOYSTICK_SIZE) / 2;
      const distance = Math.sqrt(event.translationX ** 2 + event.translationY ** 2);
      const angle = Math.atan2(event.translationY, event.translationX);

      if (distance > maxDistance) {
        translateX.value = Math.cos(angle) * maxDistance;
        translateY.value = Math.sin(angle) * maxDistance;
      } else {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
      }

      const dx = translateX.value / maxDistance;
      const dy = translateY.value / maxDistance;

      console.log('Movement:', { dx, dy });
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <Image
        source={require('~/assets/images/bg-mobile-legend.jpg')}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      />
      <View style={styles.joystickContainer}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.joystick, animatedStyle]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joystickContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#294a50,',
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 102,
    left: 26,
  },
  joystick: {
    width: JOYSTICK_SIZE,
    height: JOYSTICK_SIZE,
    borderRadius: JOYSTICK_SIZE / 2,
    backgroundColor: '#418b9e',
    position: 'absolute',
  },
});

export default VirtualJoystick;
