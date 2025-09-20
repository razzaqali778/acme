export class InvariantError extends Error {}
export function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new InvariantError(msg);
}
