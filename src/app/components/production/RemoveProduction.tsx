"use client";

import toast from "react-hot-toast";
import { FiTrash } from "react-icons/fi";

const removeProducton = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/productions/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (res.ok) {
    toast.success("Ordenha removida com sucesso!");
    window.location.reload();
  } else {
    toast.error(res.statusText);
  }
};

export const RemoveProducton = ({ id }: { id: string }) => {
  return (
    <button
      className=" btn btn-ghost"
      onClick={() => {
        removeProducton(id);
      }}
    >
      <FiTrash />
    </button>
  );
};
