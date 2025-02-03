import { SuperheroModel } from "../../../types/api";

class DataLoader {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:3000/superheroes";
  }

  async loadSuperheroes(): Promise<SuperheroModel[]> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error(`Error fetching superheroes: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to load superheroes:", error);
      throw error;
    }
  }

  async deleteHero(name: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${name}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting hero: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to delete hero:", error);
      throw error;
    }
  }

  async saveHero(hero: SuperheroModel): Promise<void> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hero),
      });
      if (!response.ok) {
        throw new Error(`Error saving hero: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to save hero:", error);
      throw error;
    }
  }
}

export default DataLoader;
