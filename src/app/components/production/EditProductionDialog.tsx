"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Producao } from "@/types";
import { FaRegEdit } from "react-icons/fa";

interface Props {
  production: Producao;
}

export const EditProductionDialog = ({ production }: Props) => {
  const schema = z.object({
    id_ord: z.string().nonempty(),
    ano_ord: z.string().nonempty(),
    mes_ord: z.string().nonempty(),
    dia_ord: z.string().nonempty(),
    qntLeite_ord: z.string().nonempty(),
    gado_brinco: z.string().nonempty(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      ano_ord: production.ano_ord,
      dia_ord: production.dia_ord,
      gado_brinco: production.gado_brinco,
      id_ord: production.id_ord,
      mes_ord: production.mes_ord,
      qntLeite_ord: production.qntLeite_ord,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch(
      `http://localhost:3000/api/productions/${data.id_ord}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      toast.success("Ordenha editado com sucesso!");
      window.location.reload();
    } else {
      toast.error("Erro ao editar Ordenha!");
    }
  });

  return (
    <>
      <label htmlFor="edit_modal" className="btn btn-ghost">
        <FaRegEdit />
      </label>

      <input type="checkbox" id="edit_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Adicionar Ordenha</h3>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Id Ordenha</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("id_ord")}
              />
              {errors.id_ord && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Ano</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("ano_ord")}
              />
              {errors.ano_ord && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Mês</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("mes_ord")}
              />
              {errors.mes_ord && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Dia</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("dia_ord")}
              />
              {errors.dia_ord && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Produção</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("qntLeite_ord")}
              />
              {errors.qntLeite_ord && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Brinco Animal</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("gado_brinco")}
              />
              {errors.gado_brinco && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>

            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="edit_modal">
          Close
        </label>
      </div>
    </>
  );
};
