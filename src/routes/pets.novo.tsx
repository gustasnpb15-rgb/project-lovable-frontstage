import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { PetForm } from "@/components/pet-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { usePets } from "@/lib/pets-store";
import { toast } from "sonner";

export const Route = createFileRoute("/pets/novo")({
  component: NewPetPage,
});

function NewPetPage() {
  const { addPet } = usePets();
  const navigate = useNavigate();

  return (
    <PageShell
      title="Cadastrar novo pet"
      description="Preencha as informações do amiguinho."
      actions={
        <Button asChild variant="outline">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
          </Link>
        </Button>
      }
    >
      <PetForm
        submitLabel="Cadastrar pet"
        onSubmit={(data) => {
          const pet = addPet(data);
          toast.success(`${pet.name_pet} foi cadastrado!`);
          navigate({ to: "/pets/$id", params: { id: String(pet.id_pet) } });
        }}
      />
    </PageShell>
  );
}
