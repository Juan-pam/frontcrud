import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const ShineButton = ({ title, onPress, style, color = '#3988E9', textStyle }) => {
  const shineAnim = useRef(new Animated.Value(-100)).current;
  const [isPressed, setIsPressed] = useState(false);

  const startShine = () => {
    setIsPressed(true);
    Animated.timing(shineAnim, {
      toValue: 200,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      shineAnim.setValue(-100);
      setIsPressed(false);
    });
  };

  return (
    <View style={[styles.cont, style]}>
      <TouchableOpacity 
        onPressIn={startShine}
        onPress={onPress}
        activeOpacity={0.7}
        style={[styles.button, { backgroundColor: color }]}
      >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        {isPressed && (
          <Animated.View
            style={[
              styles.brillo,
              {
                transform: [
                  { skewX: '10deg' },
                  { translateX: shineAnim }
                ]
              }
            ]}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    overflow: 'hidden',
    borderRadius: 12,
    marginVertical: 8,
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Raleway',
  },
  brillo: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 45,
    height: '100%',
  }
});

export default ShineButton;