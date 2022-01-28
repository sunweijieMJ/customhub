// GlobalComponents for Volar
declare module 'vue' {
  export interface GlobalComponents {
    CustomSwitch: typeof import('customhub')['CustomSwitch'];
    CustomImage: typeof import('customhub')['CustomImage'];
  }
}

export {};
