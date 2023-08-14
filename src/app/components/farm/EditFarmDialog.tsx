"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { Fazenda } from "@/types";
interface Props {
  farm: Fazenda;
}

export const EditFarmDialog = ({ farm }: Props) => {
  const schema = z.object({
    cnpj_faz: z.string().nonempty(),
    endereco_faz: z.string().nonempty(),
    nome_faz: z.string().nonempty(),
    area_faz: z.string().nonempty(),
    prop_cpf: z.string().nonempty(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome_faz:farm.nome_faz,
      cnpj_faz:farm.cnpj_faz,
      area_faz:farm.area_faz,
      endereco_faz:farm.endereco_faz,
      prop_cpf:farm.prop_cpf,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch(
      `http://localhost:3000/api/farms/${data.cnpj_faz}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      toast.success("Fazendeiro editado com sucesso!");
      window.location.reload();
    } else {
      toast.error("Erro ao editar fazendeiro!");
    }
  });

  return (
    <>
      <label htmlFor="my_modal_1" className="btn btn-ghost">
        <FaRegEdit />
      </label>

      <input type="checkbox" id="my_modal_1" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Adicionar Fazenda</h3>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Nome da Fazenda</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("nome_faz")}
              />
              {errors.nome_faz && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Endereco da Fazenda</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("endereco_faz")}
              />
              {errors.endereco_faz && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">CNPJ da Fazenda</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("cnpj_faz")}
              />
              {errors.cnpj_faz && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Area da Fazenda</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("area_faz")}
              />
              {errors.area_faz && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">CPF do proprietário</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("prop_cpf")}
              />
              {errors.prop_cpf && (
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
