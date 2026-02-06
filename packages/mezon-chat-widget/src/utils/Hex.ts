export function IsHexColor(input: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(input);
}

export function IsHex6(input: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(input);
}

export function NormalizeHex(hex: string): string {
  if (/^#[0-9a-fA-F]{3}$/.test(hex)) {
    return (
      '#' +
      hex
        .slice(1)
        .split('')
        .map(c => c + c)
        .join('')
    );
  }
  return hex;
}