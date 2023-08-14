"use client";

import toast from "react-hot-toast";
import { FiTrash } from "react-icons/fi";

const removeFarm = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/farms/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (res.ok) {
    toast.success("Fazenda removido com sucesso!");
    window.location.reload();
  } else {
    toast.error(res.statusText);
  }
};

export const RemoveFarm = ({ id }: { id: string }) => {
  return (
    <button
      className=" btn btn-ghost"
      onClick={() => {
        removeFarm(id);
      }}
    >
      <FiTrash />
    </button>
  );
};
