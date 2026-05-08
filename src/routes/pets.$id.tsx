import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Pencil, PawPrint, Heart } from "lucide-react";
import { usePets } from "@/lib/pets-store";

export const Route = createFileRoute("/pets/$id")({
  component: PetDetailPage,
});

function PetDetailPage() {
  const { id } = Route.useParams();
  const { getPet } = usePets();
  const navigate = useNavigate();
  const pet = getPet(Number(id));

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
    <div className="relative min-h-full animate-fade-in">
      {/* Hero blurred background */}
      <div
        className="absolute inset-0 h-80 overflow-hidden"
        aria-hidden="true"
      >
        {pet.picture_pet && (
          <img
            src={pet.picture_pet}
            alt=""
            className="h-full w-full object-cover blur-xl scale-110 opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      <div className="relative p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button asChild variant="outline" className="bg-card/80 backdrop-blur">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
            </Link>
          </Button>
          <Button asChild className="shadow-soft">
            <Link to="/pets/$id/editar" params={{ id }}>
              <Pencil className="h-4 w-4 mr-2" /> Editar
            </Link>
          </Button>
        </div>

        <Card className="overflow-hidden shadow-elegant border-0 bg-card/90 backdrop-blur">
          <div className="grid md:grid-cols-[420px_1fr]">
            <div className="aspect-square md:aspect-auto bg-muted relative">
              {pet.picture_pet ? (
                <img
                  src={pet.picture_pet}
                  alt={pet.name_pet}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                  <PawPrint className="h-16 w-16" />
                </div>
              )}
            </div>

            <CardContent className="p-8 md:p-10 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Heart className="h-4 w-4 fill-current" />
                  <span className="text-xs uppercase tracking-widest font-medium">
                    Perfil do pet
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                  {pet.name_pet}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {pet.race_pet}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Info label="Idade" value={`${pet.age_pet} ${pet.age_pet === 1 ? "ano" : "anos"}`} />
                <Info label="Peso" value={`${pet.weight_pet} kg`} />
                <Info label="Cor" value={pet.color_pet || "—"} />
                <Info label="Raça" value={pet.race_pet} />
                <Info label="Dono" value={pet.owner_pet} className="col-span-2" />
              </div>

              {pet.obs && (
                <div className="pt-2">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Observações
                  </div>
                  <p className="text-sm leading-relaxed bg-muted/50 rounded-xl p-4 border border-border">
                    {pet.obs}
                  </p>
                </div>
              )}
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Info({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`rounded-xl bg-muted/40 border border-border p-4 ${className}`}>
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="text-base font-medium mt-1">{value}</div>
    </div>
  );
}
