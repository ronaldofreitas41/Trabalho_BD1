import { Animal } from "@/types";
import { EditAnimalDialog } from "./EditAnimalDialog";
import { RemoveAnimal } from "./RemoveAnimal";

const getAnimals = async () => {
  const res = await fetch("http://localhost:3000/api/animals",{
  cache: "no-cache",
  });
  const animals: Animal[] = await res.json();

  return animals;
};

export const AnimalTable = async () => {
  const animals = await getAnimals();

  return (
    <div className="bg-white p-4 border-2 rounded-md">
      <h3 className="text-xl">Lista de Animais Cadastrados</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>Raça</th>
              <th>Sexo</th>
              <th>Brinco</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal, id) => (
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{animal.nome_gado}</td>
                <td>{animal.datanasci_gado}</td>
                <td>{animal.raca_gado}</td>
                <td>{animal.sexo_gado}</td>
                <td>{animal.brinco_gado}</td>
                <td className="flex gap-2">
                  <EditAnimalDialog animal={animal}/>
                  <RemoveAnimal id={animal.brinco_gado} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
