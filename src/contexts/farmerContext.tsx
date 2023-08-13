"use client";

import { Fazendeiro } from "@/types";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { set } from "react-hook-form";

interface FazendeiroContextProps {
  fazendeiros: Fazendeiro[];
  addFazendeiro: (fazendeiro: Fazendeiro) => void;
  removeFazendeiro: (cpf_prop: string) => void;
}

export const FazendeiroContext = createContext({} as FazendeiroContextProps);

export const useFazendeiro = () => {
  return useContext(FazendeiroContext);
};

export const FazendeiroProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [fazendeiros, setFazendeiros] = useState<Fazendeiro[]>([]);

  const addFazendeiro = async (Fazendeiro:Fazendeiro) => {
    const res = await fetch("http://localhost:3000/api/fazendeiros", {
      method: "POST",
      body: JSON.stringify(Fazendeiro),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res)
  };

  const removeFazendeiro = (cpf_prop: string) => {
    console.log(cpf_prop);

    //setFazendeiros(fazendeiros.filter((Fazendeiro) => fazendeiro.cpf_prop !== cpf_prop));
  };

  useEffect(() => {
    const getFazendeiros = async () => {
      const res = await fetch("http://localhost:3000/api/fazendeiros");
      const data = await res.json();
      console.log(data);
      setFazendeiros(data);
    };

    getFazendeiros();
  }, []);

  const value = { fazendeiros, addFazendeiro, removeFazendeiro };

  return (
    <FazendeiroContext.Provider value={value}>{children}</FazendeiroContext.Provider>
  );
};
