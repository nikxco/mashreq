import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mashreqbank.app',
  appName: 'web',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
