declare module "vue3-roulette" {
  import type { DefineComponent } from "vue";

  interface RouletteItem {
    id: number;
    name: string;
    htmlContent?: string;
    textColor?: string;
    background?: string;
  }

  const Roulette: DefineComponent<{
    items: RouletteItem[];
    size?: number;
    displayIndicator?: boolean;
    wheelResultIndex?: number;
    resultVariation?: number;
  }>;

  export { Roulette };
}
