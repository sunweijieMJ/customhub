// GlobalComponents for Volar
declare module 'vue' {
  export interface GlobalComponents {
    LineSwitch: typeof import('customhub')['LineSwitch'];
    LineImage: typeof import('customhub')['LineImage'];
  }
}

export {};
