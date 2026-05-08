import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/pedidos")({
  component: PedidosPage,
});

interface Pedido {
  id: string;
  cliente_id: string;
  cliente_nome: string;
  total: number;
  status: "pendente" | "pago" | "enviado" | "cancelado";
  criado_em: string;
}

const mock: Pedido[] = [
  { id: "#1001", cliente_id: "1", cliente_nome: "Ana Souza", total: 159.8, status: "pago", criado_em: "2025-04-10" },
  { id: "#1002", cliente_id: "2", cliente_nome: "Bruno Lima", total: 79.9, status: "pendente", criado_em: "2025-04-12" },
  { id: "#1003", cliente_id: "3", cliente_nome: "Carla Dias", total: 249.7, status: "enviado", criado_em: "2025-04-15" },
];

const statusVariant: Record<Pedido["status"], "default" | "secondary" | "destructive" | "outline"> = {
  pendente: "outline",
  pago: "default",
  enviado: "secondary",
  cancelado: "destructive",
};

function PedidosPage() {
  const [pedidos] = useState<Pedido[]>(mock);

  return (
    <PageShell title="Pedidos" description="Pedidos simulados.">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pedidos.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.id}</TableCell>
                <TableCell>{p.cliente_nome}</TableCell>
                <TableCell>
                  {p.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[p.status]}>{p.status}</Badge>
                </TableCell>
                <TableCell>{p.criado_em}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </PageShell>
  );
}
