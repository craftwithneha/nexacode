export type ClassValue = string | number | null | boolean | undefined | ClassValue[] | { [key: string]: boolean };

function clsx(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      classes.push(clsx(...input));
    } else if (typeof input === "object") {
      for (const key in input) {
        if (input[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(" ");
}

function twMerge(classNames: string): string {
  // Minimal stub: just return the input for now.
  // You can implement more advanced merging if needed.
  return classNames;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
