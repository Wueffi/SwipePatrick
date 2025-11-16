import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  onReset?: () => void;
};

export default function Button({ label, onReset }: Props) {
  return (
    <View
      style={[
        styles.buttonContainer,
        { borderWidth: 4, borderColor: '#C9C0B9', borderRadius: 18 },
      ]}>
      <Pressable
        style={styles.button}
        onPress={() => {
          if (onReset) onReset();
        }}>
        <FontAwesome name="picture-o" size={18} color="#fff" style={styles.buttonIcon} />
        <Text style={[styles.buttonLabel, { color: '#fff' }]}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 4,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
