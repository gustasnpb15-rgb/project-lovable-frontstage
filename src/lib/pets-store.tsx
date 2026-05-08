import { createContext, useContext, useState, ReactNode, useCallback } from "react";

// Estrutura compatível com a tabela `animais` do banco de dados futuro
export interface Pet {
  id_pet: number;
  name_pet: string;
  race_pet: string;
  age_pet: number;
  weight_pet: number;
  color_pet: string;
  owner_pet: string;
  picture_pet: string; // base64 / url
  obs: string;
  status: "ativo" | "inativo";
}

export type PetInput = Omit<Pet, "id_pet" | "status">;

const seed: Pet[] = [
  {
    id_pet: 1,
    name_pet: "Thor",
    race_pet: "Golden Retriever",
    age_pet: 3,
    weight_pet: 28,
    color_pet: "Dourado",
    owner_pet: "Mariana Lopes",
    picture_pet:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
    obs: "Muito dócil, adora brincar com bolinhas.",
    status: "ativo",
  },
  {
    id_pet: 2,
    name_pet: "Mel",
    race_pet: "Persa",
    age_pet: 2,
    weight_pet: 4,
    color_pet: "Cinza",
    owner_pet: "Rafael Mendes",
    picture_pet:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
    obs: "Tímida com estranhos, mas carinhosa em casa.",
    status: "ativo",
  },
  {
    id_pet: 3,
    name_pet: "Luna",
    race_pet: "Husky Siberiano",
    age_pet: 4,
    weight_pet: 22,
    color_pet: "Branco e cinza",
    owner_pet: "Camila Duarte",
    picture_pet:
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&q=80",
    obs: "Cheia de energia, precisa de exercícios diários.",
    status: "ativo",
  },
  {
    id_pet: 4,
    name_pet: "Bento",
    race_pet: "Shih Tzu",
    age_pet: 5,
    weight_pet: 7,
    color_pet: "Caramelo",
    owner_pet: "Eduardo Silva",
    picture_pet:
      "https://images.unsplash.com/photo-1527078553122-579ad4b3e8eb?w=800&q=80",
    obs: "Companheiro fiel, adora colo.",
    status: "ativo",
  },
];

interface PetsCtx {
  pets: Pet[];
  getPet: (id: number) => Pet | undefined;
  addPet: (data: PetInput) => Pet;
  updatePet: (id: number, data: PetInput) => void;
  removePet: (id: number) => void;
}

const PetsContext = createContext<PetsCtx | null>(null);

export function PetsProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Pet[]>(seed);

  const getPet = useCallback((id: number) => pets.find((p) => p.id_pet === id), [pets]);

  const addPet = useCallback((data: PetInput) => {
    const newPet: Pet = {
      ...data,
      id_pet: Date.now(),
      status: "ativo",
    };
    setPets((prev) => [newPet, ...prev]);
    return newPet;
  }, []);

  const updatePet = useCallback((id: number, data: PetInput) => {
    setPets((prev) =>
      prev.map((p) => (p.id_pet === id ? { ...p, ...data } : p)),
    );
  }, []);

  const removePet = useCallback((id: number) => {
    setPets((prev) => prev.filter((p) => p.id_pet !== id));
  }, []);

  return (
    <PetsContext.Provider value={{ pets, getPet, addPet, updatePet, removePet }}>
      {children}
    </PetsContext.Provider>
  );
}

export function usePets() {
  const ctx = useContext(PetsContext);
  if (!ctx) throw new Error("usePets must be used within PetsProvider");
  return ctx;
}
