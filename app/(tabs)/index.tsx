import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ImageViewer from '../components/ImageViewer';
import Button from '../components/Button';

const PlaceholderImage = require('../../assets/images/patrick.png');

export default function index() {
  const imageRef = useRef<() => void>(null);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer imgSource={PlaceholderImage} refReset={imageRef} />
        </View>
        <View style={styles.footerContainer}>
          <Button label="Reset Image" onReset={() => imageRef.current?.()} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
