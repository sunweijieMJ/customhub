import { version } from './version';

const makeInstaller = (components: any[] = []) => {
  const install = (Vue: any) => {
    if ((install as any).installed) return;
    (install as any).installed = true;
    components.forEach((component: any) => {
      // 在ts的版本中需要使用component.extendOptions.name，具体原因可以自己log看一下
      Vue.component(component.extendOptions.name, component);
    });
  };

  if (typeof window !== 'undefined' && (window as any).Vue) {
    install((window as any).Vue);
  }

  return {
    version,
    install,
  };
};

export default makeInstaller;
