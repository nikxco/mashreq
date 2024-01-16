import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mashreqbank.app',
  appName: 'Mashreq',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
