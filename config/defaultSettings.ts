import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'light',
  // 薄暮红
  primaryColor: '#ff7875',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: true,
  title: '智慧党建系统',
  pwa: false,
  iconfontUrl: '',
};

export type { DefaultSettings };

export default proSettings;
