import { atomWithStorage } from "jotai/utils";

const tokenAtom = atomWithStorage<string | null>('auth-token', null);

export default tokenAtom;