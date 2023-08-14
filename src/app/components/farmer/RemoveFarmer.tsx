"use client";

import toast from "react-hot-toast";
import { FiTrash } from "react-icons/fi";

const removeFazendeiro = async (cpf: string) => {
  const res = await fetch(`http://localhost:3000/api/farmers/${cpf}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (res.ok) {
    toast.success("Fazendeiro removido com sucesso!");
    window.location.reload();
  } else {
    toast.error(res.statusText);
  }
};

export const RemoveFarmer = ({ cpf }: { cpf: string }) => {
  return (
    <button
      className=" btn btn-ghost"
      onClick={() => {
        removeFazendeiro(cpf);
      }}
    >
      <FiTrash />
    </button>
  );
};
