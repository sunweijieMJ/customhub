import { use, i18n } from '@customhub/locale';
import { version } from './version';

export interface InstallationOptions {
  locale: any;
  i18n: any;
}

const makeInstaller = (components: any[] = []) => {
  const install = (Vue: any, opts: Partial<InstallationOptions> = {}) => {
    if ((install as any).installed) return;
    (install as any).installed = true;

    use(opts.locale);
    i18n(opts.i18n);

    components.forEach((component: any) => {
      // 在ts的版本中需要使用component.extendOptions.name
      Vue.component(component.extendOptions.name, component);
    });
  };

  if (typeof window !== 'undefined' && (window as any).Vue) {
    install((window as any).Vue);
  }

  const compnentsMap: Record<string, any> = {};
  components.forEach((item) => {
    compnentsMap[item.extendOptions.name] = item;
  });

  return {
    version,
    locale: use,
    i18n,
    install,
    ...compnentsMap,
  };
};

export default makeInstaller;
