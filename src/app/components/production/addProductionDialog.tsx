"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export const AddProductionDialog = () => {
  const schema = z.object({
    id_ord: z.string().nonempty(),
    ano_ord: z.string().nonempty(),
    mes_ord: z.string().nonempty(),
    dia_ord: z.string().nonempty(),
    qntleite_ord: z.string().nonempty(),
    gado_brinco: z.string().nonempty(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch(
      `http://localhost:3000/api/productions/${data.gado_brinco}`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      toast.success("Ordenha adicionada com sucesso!");
      window.location.reload();
    } else {
      if (res.status === 403) {
        toast.error("Machos não produzem Leite");
      } else {
        toast.error("Erro ao adicionar ordenha!");
      }
    }
  });

  return (
    <>
      <label htmlFor="my_modal_7" className="btn btn-primary">
        Adicionar Ordenha
      </label>

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
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
                {...register("qntleite_ord")}
              />
              {errors.qntleite_ord && (
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
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
};
