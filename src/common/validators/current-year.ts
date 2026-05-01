/** Upper bound for launch year validation (evaluated at process start). */
export function currentYear(): number {
  return new Date().getFullYear();
}
