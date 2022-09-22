export function extractEnv<K extends string>(
  keys: readonly K[],
  defaults?: Readonly<Partial<Record<K, string>>>
): Record<K, string> {
  const env: Partial<Record<K, string>> = {};
  for (const key of keys) {
    if (process.env[key] !== undefined && process.env[key] !== '') {
      env[key] = process.env[key];
    } else if (defaults && defaults[key] !== undefined) {
      env[key] = defaults[key];
    } else {
      throw new Error(`env is not set: ${key}`);
    }
  }
  return env as Record<K, string>;
}
