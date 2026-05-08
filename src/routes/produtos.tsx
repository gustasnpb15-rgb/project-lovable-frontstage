import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/produtos")({
  component: ProdutosPage,
});

interface Produto {
  id: string;
  nome: string;
  preco: number;
  estoque: number;
}

const mock: Produto[] = [
  { id: "1", nome: "Camiseta", preco: 79.9, estoque: 24 },
  { id: "2", nome: "Caneca", preco: 39.9, estoque: 12 },
  { id: "3", nome: "Boné", preco: 59.9, estoque: 7 },
  { id: "4", nome: "Adesivo", preco: 9.9, estoque: 120 },
];

function ProdutosPage() {
  const [produtos] = useState<Produto[]>(mock);

  return (
    <PageShell
      title="Produtos"
      description="Catálogo simulado."
      actions={
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Novo produto
        </Button>
      }
    >
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {produtos.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <CardTitle className="text-base">{p.nome}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">
                {p.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <div className="text-xs text-muted-foreground">Estoque: {p.estoque}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
