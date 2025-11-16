import { View, ImageSourcePropType, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = {
  imgSource: ImageSourcePropType;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
};

export default function ImageViewer({ imgSource, refReset, onSwipeLeft, onSwipeRight }: Props) {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);

  const resetImage = () => {
      translateX.value = withSpring(0);
      scale.value = withSpring(1);
    };
  if (refReset) refReset.current = resetImage;

  const Press = Gesture.LongPress()
    .onStart(() => {
      scale.value = withSpring(1.01);
    })
    .onEnd(() => {
      scale.value = withSpring(1);
    });

  const drag = Gesture.Pan()
    .onChange(event => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      const threshold = SCREEN_WIDTH / 4;
      if (translateX.value > threshold) {
        translateX.value = withSpring(SCREEN_WIDTH, {}, () => {
          if (onSwipeRight) runOnJS(onSwipeRight)();
        });
      }
      else if (translateX.value < -threshold) {
        translateX.value = withSpring(-SCREEN_WIDTH, {}, () => {
          if (onSwipeLeft) runOnJS(onSwipeLeft)();
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
    ],
    borderRadius: 18,
    width: 320,
    height: 440,
  }));

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GestureDetector gesture={drag}>
        <GestureDetector gesture={Press}>
          <Animated.Image
            source={imgSource}
            resizeMode="cover"
            style={imageStyle}
          />
        </GestureDetector>
      </GestureDetector>
    </View>
  );
}