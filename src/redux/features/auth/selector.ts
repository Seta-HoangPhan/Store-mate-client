import type { RootState } from "@redux/store";

export const selectProfile = (state: RootState) => state.auth.profile;
