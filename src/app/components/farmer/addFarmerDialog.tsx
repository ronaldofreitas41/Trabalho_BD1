"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

export const AddFarmerDialog = () => {
  const schema = z.object({
    cpf_prop: z.string().nonempty(),
    nome_prop: z.string().nonempty(),
    datanasc_prop: z.string().nonempty(),
    telefone_prop: z.string().nonempty(),
    endereco_prop: z.string().nonempty(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await fetch("http://localhost:3000/api/farmers", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Fazendeiro cadastrado com sucesso!");
      window.location.reload();
    } else {
      toast.error("Erro ao cadastrar fazendeiro!");
    }
  });

  return (
    <>
      <label htmlFor="my_modal_7" className="btn btn-primary">
        Adicionar Fazendeiro
      </label>

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Adicionar Fazendeiro</h3>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Nome do Fazendeiro</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("nome_prop")}
              />
              {errors.nome_prop && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Data de nascimento</label>
              <input
                type="date"
                className="input w-full input-bordered"
                {...register("datanasc_prop")}
              />
              {errors.datanasc_prop && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Telefone</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("telefone_prop")}
              />
              {errors.telefone_prop && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Endereco</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("endereco_prop")}
              />
              {errors.endereco_prop && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">CPF Produtor</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("cpf_prop")}
              />
              {errors.cpf_prop && (
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
