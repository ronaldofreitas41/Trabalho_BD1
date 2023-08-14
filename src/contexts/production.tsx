"use client";

import { Producao } from "@/types";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { set } from "react-hook-form";

interface ProducaoContextProps {
  producao: Producao[];
  addProducao: (producao: Producao) => void;
  removeProducao: (id_ord: string) => void;
}

export const ProducaoContext = createContext({} as ProducaoContextProps);

export const useProducao = () => {
  return useContext(ProducaoContext);
};

export const ProducaoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [producao, setProducoes] = useState<Producao[]>([]);

  const addProducao = async (producao:Producao) => {
    const res = await fetch("http://localhost:3000/api/productions", {
      method: "POST",
      body: JSON.stringify(producao),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res)
  };

  const removeProducao = (id_ord: string) => {
    console.log(id_ord);

    //setAnimals(animals.filter((animal) => animal.id_ord !== id_ord));
  };

  useEffect(() => {
    const getProducoes = async () => {
      const res = await fetch("http://localhost:3000/api/productions");
      const data = await res.json();
      console.log(data);
      setProducoes(data);
    };

    getProducoes();
  }, []);

  const value = { producao, addProducao, removeProducao };

  return (
    <ProducaoContext.Provider value={value}>{children}</ProducaoContext.Provider>
  );
};
