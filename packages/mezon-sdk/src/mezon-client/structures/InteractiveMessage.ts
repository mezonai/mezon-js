import {
  EMessageComponentType,
  InputFieldOption,
  IInteractiveMessageProps,
  SelectFieldOption,
  RadioFieldOption,
  AnimationConfig,
} from "../../interfaces";
import { getRandomColor } from "../utils/helper";

export class InteractiveBuilder {
  private interactive: IInteractiveMessageProps;

  constructor(title?: string) {
    this.interactive = {
      color: getRandomColor(),
      title,
      fields: [],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Powered by Mezon",
        icon_url:
          "https://cdn.mezon.vn/1837043892743049216/1840654271217930240/1827994776956309500/857_0246x0w.webp",
      },
    };
  }

  setAuthor(name: string, icon_url?: string, url?: string) {
    this.interactive.author = { name, icon_url, url };
    return this;
  }

  setDescription(description: string) {
    this.interactive.description = description;
    return this;
  }

  setThumbnail(url: string) {
    this.interactive.thumbnail = { url };
    return this;
  }

  setImage(url: string, width?: string, height?: string) {
    this.interactive.image = {
      url,
      width: width ?? "auto",
      height: height ?? "auto",
    };
    return this;
  }

  addField(name: string, value: string, inline: boolean = false) {
    this.interactive.fields?.push({ name, value, inline });
    return this;
  }

  addInputField(
    id: string,
    name: string,
    placeholder?: string,
    options?: InputFieldOption,
    description?: string
  ) {
    this.interactive.fields?.push({
      name,
      value: description ?? "",
      inputs: {
        id,
        type: EMessageComponentType.INPUT,
        component: {
          id: `${id}-component`,
          placeholder,
          defaultValue: options?.defaultValue ?? "",
          type: options?.type ?? "text",
          textarea: options?.textarea ?? false,
        },
      },
    });
    return this;
  }

  addSelectField(
    id: string,
    name: string,
    options: SelectFieldOption[],
    valueSelected?: SelectFieldOption,
    description?: string
  ) {
    this.interactive.fields?.push({
      name,
      value: description ?? "",
      inputs: {
        id,
        type: EMessageComponentType.SELECT,
        component: {
          options,
          valueSelected,
        },
      },
    });
    return this;
  }

  addRadioField(
    id: string,
    name: string,
    options: RadioFieldOption[],
    description?: string,
    max_options?: number // Apply when use mutiple choice (number of options)
  ) {
    this.interactive.fields?.push({
      name,
      value: description ?? "",
      inputs: {
        id,
        type: EMessageComponentType.RADIO,
        component: options,
        ...(max_options ? { max_options } : {}),
      },
    });
    return this;
  }

  addDatePickerField(id: string, name: string, description?: string) {
    this.interactive.fields?.push({
      name,
      value: description ?? "",
      inputs: {
        id,
        type: EMessageComponentType.DATEPICKER,
        component: {},
      },
    });
    return this;
  }

  addAnimation(
    id: string,
    config: AnimationConfig,
    name?: string,
    description?: string
  ) {
    this.interactive.fields?.push({
      name: name ?? "",
      value: description ?? "",
      inputs: {
        id,
        type: EMessageComponentType.ANIMATION,
        component: config,
      },
    });
    return this;
  }

  build(): IInteractiveMessageProps {
    return this.interactive;
  }
}
