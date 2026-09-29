import type { AxiosError } from "axios";

import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

import { nextServer } from "./api";

export type ApiError = AxiosError<{ error: string }>;

const PER_PAGE = 12;

export interface GetNotesParams {
  page: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNoteData {
  title: string;
  content?: string;
  tag: NoteTag;
}

export const fetchNotes = async ({
  page,
  search,
  tag,
}: GetNotesParams): Promise<FetchNotesResponse> => {
  const res = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: PER_PAGE,
      search,
      tag: tag && tag !== "all" ? tag : undefined,
    },
  });
  return res.data;
};

export const fetchNoteById = async (noteId: Note["id"]): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${noteId}`);
  return res.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", noteData);
  return res.data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

// ---- Auth ----

export interface RegisterRequest {
  email: string;
  password: string;
}

export type LoginRequest = RegisterRequest;

export const register = async (payload: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/register", payload);
  return res.data;
};

export const login = async (payload: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/login", payload);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

interface CheckSessionResponse {
  success: boolean;
}

export const checkSession = async (): Promise<boolean> => {
  const res = await nextServer.get<CheckSessionResponse>("/auth/session");
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
};

export interface UpdateUserRequest {
  username?: string;
}

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};
