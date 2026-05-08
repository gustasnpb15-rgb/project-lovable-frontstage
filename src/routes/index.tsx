import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Plus, Eye, Pencil, Trash2, PawPrint } from "lucide-react";
import { usePets } from "@/lib/pets-store";
import { useAuth } from "@/lib/auth-store";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { pets, removePet } = usePets();
  const [query, setQuery] = useState("");
  const [confirmId, setConfirmId] = useState<number | null>(null);

  // Sem auth → manda para login (simulação)
  if (!isAuthenticated) {
    navigate({ to: "/login" });
    return null;
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pets;
    return pets.filter(
      (p) =>
        p.name_pet.toLowerCase().includes(q) ||
        p.race_pet.toLowerCase().includes(q) ||
        p.owner_pet.toLowerCase().includes(q),
    );
  }, [pets, query]);

  const handleDelete = () => {
    if (confirmId !== null) {
      removePet(confirmId);
      toast.success("Pet removido");
      setConfirmId(null);
    }
  };

  return (
    <PageShell
      title="Nossos pets"
      description="Listagem dos amiguinhos cadastrados no sistema."
      actions={
        <Button asChild size="lg" className="shadow-soft">
          <Link to="/pets/novo">
            <Plus className="h-4 w-4 mr-2" />
            Novo pet
          </Link>
        </Button>
      }
    >
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar por nome, raça ou dono..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 bg-card/80 backdrop-blur"
        />
      </div>

      {filtered.length === 0 ? (
        <Card className="shadow-soft">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <PawPrint className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Nenhum pet encontrado.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((pet) => (
            <Card
              key={pet.id_pet}
              className="overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                {pet.picture_pet ? (
                  <img
                    src={pet.picture_pet}
                    alt={pet.name_pet}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                    <PawPrint className="h-10 w-10" />
                  </div>
                )}
              </div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg leading-tight">{pet.name_pet}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {pet.race_pet} · {pet.age_pet} {pet.age_pet === 1 ? "ano" : "anos"}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
                  Dono: <span className="text-foreground font-medium">{pet.owner_pet}</span>
                </div>
                <div className="flex gap-1.5 pt-1">
                  <Button asChild size="sm" variant="default" className="flex-1">
                    <Link to="/pets/$id" params={{ id: String(pet.id_pet) }}>
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      Ver
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="secondary">
                    <Link to="/pets/$id/editar" params={{ id: String(pet.id_pet) }}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setConfirmId(pet.id_pet)}
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={confirmId !== null} onOpenChange={(o) => !o && setConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir este pet?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O registro será removido permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageShell>
  );
}
