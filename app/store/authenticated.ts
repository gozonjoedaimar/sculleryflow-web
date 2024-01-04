import { atomWithStorage } from "jotai/utils";

const authenticatedAtom = atomWithStorage<boolean|null>("client-authenticated", null);

export default authenticatedAtom;