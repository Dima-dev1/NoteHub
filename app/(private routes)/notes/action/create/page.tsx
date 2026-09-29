import type { Metadata } from "next";

import NoteForm from "@/components/NoteForm/NoteForm";

import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create note | NoteHub",
  description: "Create a new note and keep your ideas organized in NoteHub.",
  openGraph: {
    title: "Create note | NoteHub",
    description: "Create a new note and keep your ideas organized in NoteHub.",
    url: "https://09-auth-nine-gilt.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}