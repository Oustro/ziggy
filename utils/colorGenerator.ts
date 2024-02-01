export default function generateTailwindGradient(): string {

  const colors: string[] = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink', 'fuchsia', 'cyan', 'teal', 'emerald', 'lime', 'amber', 'orange', 'rose'];
  const shades: string[] = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

  const randomSelect = (items: string[]): string => items[Math.floor(Math.random() * items.length)];

  const fromColor: string = randomSelect(colors);
  const toColor: string = randomSelect(colors);
  const fromShade: string = randomSelect(shades);
  const toShade: string = randomSelect(shades);

  const gradient: string = `from-${fromColor}-${fromShade} to-${toColor}-${toShade}`;

  return gradient;
}