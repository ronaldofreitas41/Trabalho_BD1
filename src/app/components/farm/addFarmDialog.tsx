"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAnimal } from "@/contexts/animalContext";



export const AddAnimalDialog = () => {
  const { addAnimal } = useAnimal();

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
    faz_cnpj: z.string().nonempty()
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    addAnimal(data);
  });

  return (
    <>
      <label htmlFor="my_modal_7" className="btn btn-primary">
        Adicionar animal
      </label>

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Adicionar animal</h3>
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
