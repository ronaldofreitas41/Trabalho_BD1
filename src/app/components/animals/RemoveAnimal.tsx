"use client";

import { toast } from "react-hot-toast";
import { FiTrash } from "react-icons/fi";

const removeAnimal = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/animals/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    toast.success("Animal removido com sucesso!");
    window.location.reload();
  } else {
    toast.error(res.statusText);
  }
};

export const RemoveAnimal = ({ id }: { id: string }) => {
  return (
    <button
      className=" btn btn-ghost"
      onClick={() => {
        removeAnimal(id);
        
      }}
    >
      <FiTrash />
    </button>
  );
};
