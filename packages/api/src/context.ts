export async function createContext(_opts: { req: Request }) {
  return {};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
