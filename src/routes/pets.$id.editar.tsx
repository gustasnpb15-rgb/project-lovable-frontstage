import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { PetForm } from "@/components/pet-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { usePets } from "@/lib/pets-store";
import { toast } from "sonner";

export const Route = createFileRoute("/pets/$id/editar")({
  component: EditPetPage,
});

function EditPetPage() {
  const { id } = Route.useParams();
  const petId = Number(id);
  const { getPet, updatePet } = usePets();
  const navigate = useNavigate();
  const pet = getPet(petId);

  if (!pet) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Pet não encontrado.</p>
        <Button className="mt-4" onClick={() => navigate({ to: "/" })}>
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <PageShell
      title={`Editar ${pet.name_pet}`}
      description="Atualize as informações do pet."
      actions={
        <Button asChild variant="outline">
          <Link to="/pets/$id" params={{ id }}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
          </Link>
        </Button>
      }
    >
      <PetForm
        initial={pet}
        submitLabel="Salvar alterações"
        onSubmit={(data) => {
          updatePet(petId, data);
          toast.success("Alterações salvas!");
          navigate({ to: "/pets/$id", params: { id } });
        }}
      />
    </PageShell>
  );
}
