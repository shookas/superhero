import React, { useState } from "react";
import DataLoader from "../services/DataLoader";

const CreateHeroModal: React.FC<{ onHeroCreated: () => void }> = ({
  onHeroCreated,
}) => {
  const [name, setName] = useState("");
  const [powers, setPowers] = useState<string[]>([""]);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    validateForm(newName, powers);
  };

  const handlePowerChange = (index: number, value: string) => {
    const newPowers = [...powers];
    newPowers[index] = value;
    setPowers(newPowers);
    validateForm(name, newPowers);
  };

  const addPowerField = () => {
    setPowers([...powers, ""]);
  };

  const validateForm = (name: string, powers: string[]) => {
    const isValid =
      name.trim() !== "" && powers.every((power) => power.trim() !== "");
    setIsFormValid(isValid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      const loader = new DataLoader();
      await loader.saveHero({ name, powers });
      onHeroCreated();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="powers">Powers:</label>
          {powers.map((power, index) => (
            <input
            id="powers"
              key={index}
              type="text"
              value={power}
              onChange={(e) => handlePowerChange(index, e.target.value)}
            />
          ))}
          <button type="button" onClick={addPowerField}>
            Add Power
          </button>
        </div>
        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateHeroModal;
