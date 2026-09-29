import { cookies } from "next/headers";

import type { Note } from "@/types/note";
import type { User } from "@/types/user";

import { nextServer } from "./api";
import type {
  GetNotesParams,
  FetchNotesResponse,
} from "./clientApi";

const PER_PAGE = 12;

export const fetchNotes = async ({
  page,
  search,
  tag,
}: GetNotesParams): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const res = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: PER_PAGE,
      search,
      tag: tag && tag !== "all" ? tag : undefined,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const fetchNoteById = async (noteId: Note["id"]): Promise<Note> => {
  const cookieStore = await cookies();

  const res = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const res = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

interface CheckSessionResponse {
  success: boolean;
}

// Returns the full axios response (not just the boolean) so the Proxy
// can read any refreshed Set-Cookie headers off it.
export const checkSession = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get<CheckSessionResponse>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};
