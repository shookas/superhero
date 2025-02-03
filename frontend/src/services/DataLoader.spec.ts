import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { SuperheroModel } from "../../../types/api";
import DataLoader from "./DataLoader";

describe("DataLoader", () => {
  let dataLoader: DataLoader;
  let fetchMock: Mock;

  beforeEach(() => {
    dataLoader = new DataLoader();
    fetchMock = vi.fn();
    global.fetch = fetchMock;
  });

  it("should load superheroes successfully", async () => {
    const superheroes: SuperheroModel[] = [
      { name: "Superman", powers: ["flight", "strength"] },
    ];
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(superheroes),
    });

    const result = await dataLoader.loadSuperheroes();

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000/superheroes");
    expect(result).toEqual(superheroes);
  });

  it("should throw an error if the response is not ok", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      statusText: "Not Found",
    });

    await expect(dataLoader.loadSuperheroes()).rejects.toThrow(
      "Error fetching superheroes: Not Found"
    );
    expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000/superheroes");
  });
});
