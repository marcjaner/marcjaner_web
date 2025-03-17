/// <reference types="vite/client" />

interface ImportMeta {
  glob<T = unknown>(
    pattern: string,
    options?: { eager?: boolean }
  ): Record<string, T>;
}
