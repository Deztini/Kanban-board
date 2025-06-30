export function isEmail(value: unknown): value is string {
  return typeof value === "string" && value.includes("@");
}

export function isNotEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "";
}

export function isEqual(value: unknown, otherValue: unknown): boolean {
  return typeof value === "string" && value === otherValue;
}

export function hasMinLength(value: unknown, minLength: number): value is string {
  return typeof value === "string" && value.length >= minLength;
}
