import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/clientes")({
  component: ClientesPage,
});

// Estrutura de campos compatível com futura tabela `clientes`
interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  criado_em: string;
}

const mock: Cliente[] = [
  { id: "1", nome: "Ana Souza", email: "ana@exemplo.com", telefone: "(11) 99999-0001", criado_em: "2025-01-12" },
  { id: "2", nome: "Bruno Lima", email: "bruno@exemplo.com", telefone: "(11) 99999-0002", criado_em: "2025-02-03" },
  { id: "3", nome: "Carla Dias", email: "carla@exemplo.com", telefone: "(11) 99999-0003", criado_em: "2025-03-21" },
];

function ClientesPage() {
  const [clientes] = useState<Cliente[]>(mock);

  return (
    <PageShell
      title="Clientes"
      description="Listagem simulada de clientes."
      actions={
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Novo cliente
        </Button>
      }
    >
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Criado em</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.nome}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.telefone}</TableCell>
                <TableCell>{c.criado_em}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </PageShell>
  );
}
