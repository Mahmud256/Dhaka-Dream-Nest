declare module 'aos' {
  interface AOSOptions {
    duration?: number;
    delay?: number;
    offset?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
    disableMutationObserver?: boolean;
    startEvent?: string;
    throttleDelay?: number;
  }

  interface AOS {
    init(options?: AOSOptions): void;
    refresh(): void;
    refreshHard(): void;
  }

  const AOS: AOS;
  export default AOS;
}
