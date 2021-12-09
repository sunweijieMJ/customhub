import { setConfig } from '@linehub/utils/config';
import { localeContextKey, localeProviderMaker } from '@linehub/hooks';
import type { App, Plugin } from 'vue';
import type { ComponentSize } from '@linehub/utils/types';
import type { InstallOptions } from '@linehub/utils/config';
import { version } from './version';

const makeInstaller = (components: Plugin[] = []) => {
  const apps: App[] = [];

  const install = (app: App, opts: InstallOptions) => {
    const defaultInstallOpt: InstallOptions = {
      size: '' as ComponentSize,
      zIndex: 2000,
    };

    const option = Object.assign(defaultInstallOpt, opts);
    if (apps.includes(app)) return;
    apps.push(app);

    components.forEach((c) => {
      app.use(c);
    });

    if (option.locale) {
      const localeProvides = localeProviderMaker(opts.locale);
      app.provide(localeContextKey, localeProvides);
    }

    app.config.globalProperties.$ELEMENT = option;
    // app.provide() ? is this better? I think its not that flexible but worth implement
    setConfig(option);
  };

  return {
    version,
    install,
  };
};

export default makeInstaller;
