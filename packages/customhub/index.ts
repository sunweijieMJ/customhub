import installer from './defaults';

export * from '@customhub/components';
export * from '@customhub/directives';
export * from '@customhub/mixins';

export { default as makeInstaller } from './make-installer';

/* eslint no-restricted-exports: off */
export { default } from './defaults';

export const install = installer.install;
export const version = installer.version;
