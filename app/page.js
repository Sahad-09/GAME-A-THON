"use client"

import { useState, useEffect } from "react";
import AddNote from './components/AddNote';
import NoteList from './components/NoteList';

async function getData() {
  const res = await fetch("http://localhost:3000/api/post", { cache: 'no-store' });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <main>
      <AddNote />
      <section>
        <NoteList notes={notes} />
      </section>
    </main>
  );
}

export default Home;
