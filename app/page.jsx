import React from "react";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <main>
      <p>Welkom op de BiljartLine website, momenteel is deze website nog in ontwikkeling</p>
      <p>Als je de beschikbare functionaliteiten wilt verkennen, klik dan op de onderstaande knop:</p>

      <Button
        as={Link}
        href="/bonden/1"
        color="primary"
        variant="solid"
      >
        Ga naar Competities
      </Button>
    </main>
  )
}
