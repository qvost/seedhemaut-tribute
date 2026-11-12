declare module 'lenis' {
  export default class Lenis {
    constructor(options: { duration: number; smoothWheel: boolean });
    on(event: 'scroll', callback: () => void): void;
    raf(time: number): void;
    destroy(): void;
  }
}
