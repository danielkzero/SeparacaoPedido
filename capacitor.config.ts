import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hydradigiytal.separacaopedido',
  appName: 'SeparacaoPedido',
  webDir: 'dist',
  server: {
    hostname: 'localhost'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    SplashScreen: {
      autoHide: true
    }
  },
  android: {
    allowMixedContent: true,
  }
};

export default config;