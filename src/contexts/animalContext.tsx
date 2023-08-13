"use client";

import { Animal } from "@/types";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { set } from "react-hook-form";

interface AnimalContextProps {
  animals: Animal[];
  addAnimal: (animal: Animal) => void;
  removeAnimal: (brinco_gado: string) => void;
}

export const AnimalContext = createContext({} as AnimalContextProps);

export const useAnimal = () => {
  return useContext(AnimalContext);
};

export const AnimalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [animals, setAnimals] = useState<Animal[]>([]);

  const addAnimal = async (animal:Animal) => {
    const res = await fetch("http://localhost:3000/api/animals", {
      method: "POST",
      body: JSON.stringify(animal),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res)
  };

  const removeAnimal = (brinco_gado: string) => {
    console.log(brinco_gado);

    //setAnimals(animals.filter((animal) => animal.brinco_gado !== brinco_gado));
  };

  useEffect(() => {
    const getAnimals = async () => {
      const res = await fetch("http://localhost:3000/api/animals");
      const data = await res.json();
      console.log(data);
      setAnimals(data);
    };

    getAnimals();
  }, []);

  const value = { animals, addAnimal, removeAnimal };

  return (
    <AnimalContext.Provider value={value}>{children}</AnimalContext.Provider>
  );
};
