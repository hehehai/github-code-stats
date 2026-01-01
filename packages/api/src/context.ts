export async function createContext({ req }: { req: Request }) {
  return {};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
