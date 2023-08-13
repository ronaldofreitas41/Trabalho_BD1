"use client";

import { Fazenda } from "@/types";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { set } from "react-hook-form";

interface FazendaContextProps {
  fazendas: Fazenda[];
  addFazenda: (fazenda: Fazenda) => void;
  removeFazenda: (cnpj_faz: string) => void;
}

export const FazendaContext = createContext({} as FazendaContextProps);

export const useFazenda = () => {
  return useContext(FazendaContext);
};

export const FazendaProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [fazendas, setFazendas] = useState<Fazenda[]>([]);

  const addFazenda = async (fazenda:Fazenda) => {
    const res = await fetch("http://localhost:3000/api/fazendas", {
      method: "POST",
      body: JSON.stringify(fazenda),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res)
  };

  const removeFazenda = (faz_cnpj: string) => {
    console.log(faz_cnpj);

    //setFazendas(Fazendas.filter((Fazenda) => Fazenda.faz_cnpj !== faz_cnpj));
  };

  useEffect(() => {
    const getFazendas = async () => {
      const res = await fetch("http://localhost:3000/api/fazendas");
      const data = await res.json();
      console.log(data);
      setFazendas(data);
    };

    getFazendas();
  }, []);

  const value = { fazendas, addFazenda, removeFazenda };

  return (
    <FazendaContext.Provider value={value}>{children}</FazendaContext.Provider>
  );
};
