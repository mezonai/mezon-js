import { MezonTheme } from "../types";

class ThemeRegistryImpl {
  private themes = new Map<string, MezonTheme>();

  register(theme: MezonTheme) {
    this.themes.set(theme.name, theme);
  }

  get(name: string): MezonTheme | undefined {
    return this.themes.get(name);
  }

  has(name: string): boolean {
    return this.themes.has(name);
  }

  getAll(): MezonTheme[] {
    return [...this.themes.values()];
  }
}

export const ThemeRegistry = new ThemeRegistryImpl();
