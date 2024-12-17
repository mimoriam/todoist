import { useClerk, useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '~/constants/Colors';

export default function Home() {
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { top } = useSafeAreaInsets();
  const { signOut } = useClerk();

  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await googleAuth();
      console.log('~ googleOAuth ~ ', createdSessionId);

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  const openLink = async () => {
    await WebBrowser.openBrowserAsync('https://google.com');
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Image source={require('~/assets/images/todoist-logo.png')} style={styles.loginImage} />

      <Image source={require('~/assets/images/login.png')} style={styles.banner} />

      <Text style={styles.title}>Organize your work and life, finally.</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.btn]} onPress={handleGoogleLogin}>
          <Ionicons name="logo-google" size={24} />
          <Text style={[styles.btnText]}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn]} onPress={() => signOut()}>
          <Ionicons name="logo-edge" size={24} />
          <Text style={[styles.btnText]}>Continue with Email</Text>
        </TouchableOpacity>

        <Text style={styles.description}>
          By continuing you agree to Todoist's{' '}
          <Text style={styles.link} onPress={openLink}>
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={openLink}>
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 40,
    marginTop: 20,
  },
  loginImage: {
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  banner: {
    height: 280,
    resizeMode: 'contain',
  },
  title: {
    marginHorizontal: 50,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 40,
  },
  btn: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 6,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.lightBorder,
    borderWidth: StyleSheet.hairlineWidth,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '500',
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.lightText,
  },
  link: {
    color: Colors.lightText,
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
