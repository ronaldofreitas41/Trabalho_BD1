"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Animal } from "@/types";
interface Props {
  animal: Animal;
}

export const EditAnimalDialog = ({ animal }: Props) => {
  const schema = z.object({
    nome_gado: z.string().nonempty(),
    datanasci_gado: z.string().nonempty(),
    raca_gado: z.string().nonempty(),
    brinco_gado: z.string().nonempty(),
    // M or F select
    sexo_gado: z
      .string()
      .nonempty()
      .regex(/^[MF]$/),
    faz_cnpj: z.string().nonempty(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      brinco_gado: animal.brinco_gado,
      datanasci_gado: animal.datanasci_gado,
      faz_cnpj:animal.faz_cnpj,
      nome_gado:animal.nome_gado,
      raca_gado:animal.raca_gado,
      sexo_gado:animal.sexo_gado,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch(
      `http://localhost:3000/api/animals/${data.brinco_gado}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      toast.success("Animal editado com sucesso!");
      window.location.reload();
    } else {
      toast.error(res.statusText);
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
          <h3 className="text-lg font-bold">Editar animal</h3>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Nome</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("nome_gado")}
              />
              {errors.nome_gado && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Data de nascimento</label>
              <input
                type="date"
                className="input w-full input-bordered"
                {...register("datanasci_gado")}
              />
              {errors.datanasci_gado && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Raça</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("raca_gado")}
              />
              {errors.raca_gado && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Brinco</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("brinco_gado")}
              />
              {errors.brinco_gado && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Sexo</label>
              <select
                {...register("sexo_gado")}
                className="select select-bordered w-full"
              >
                <option value="">Selecione</option>
                <option value="M">Macho</option>
                <option value="F">Fêmea</option>
              </select>
              {errors.sexo_gado && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">CNPJ da Fazenda</label>
              <input
                type="text"
                className="input w-full input-bordered"
                {...register("faz_cnpj")}
              />
              {errors.faz_cnpj && (
                <span className="text-xs text-red-500">Campo obrigatório</span>
              )}
            </div>

            <button className="btn btn-primary">Editar</button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_1">
          Close
        </label>
      </div>
    </>
  );
};
