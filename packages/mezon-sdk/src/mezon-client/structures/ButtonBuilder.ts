import { EButtonMessageStyle, EMessageComponentType } from "../../interfaces";

export class ButtonBuilder {
  private components: any[] = [];

  addButton(id: string, label: string, style: EButtonMessageStyle) {
    this.components.push({
      id,
      type: EMessageComponentType.BUTTON,
      component: { label, style },
    });
    return this;
  }

  build() {
    return this.components;
  }
}