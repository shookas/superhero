import { useState } from "react";
import "./App.css";
import HeroList from "./HeroList";
import CreateHeroModal from "./components/CreateHeroModal";
import Modal from "./components/Modal";

function App() {
  const [modalOpen, openModal] = useState(false);
  const [heroListUpdated, setHeroListUpdated] = useState(0);

  return (
    <>
      <button onClick={() => openModal(() => true)}>Create Hero</button>
      <Modal
        open={modalOpen}
        title="Create New Hero"
        onClose={() => openModal(() => false)}
        children={
          <CreateHeroModal
            onHeroCreated={() => setHeroListUpdated(Date.now())}
          />
        }
      />
      <HeroList heroListUpdated={heroListUpdated} />
    </>
  );
}

export default App;
