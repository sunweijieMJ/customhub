// GlobalComponents for Volar
declare module 'vue' {
  export interface GlobalComponents {
    LineSwitch: typeof import('linehub')['LineSwitch'];
  }
}

export {};
