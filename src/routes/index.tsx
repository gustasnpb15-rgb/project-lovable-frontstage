import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, ShoppingCart, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const stats = [
  { label: "Clientes", value: "128", icon: Users },
  { label: "Produtos", value: "342", icon: Package },
  { label: "Pedidos", value: "57", icon: ShoppingCart },
  { label: "Receita", value: "R$ 12.4k", icon: TrendingUp },
];

function Dashboard() {
  return (
    <PageShell title="Dashboard" description="Visão geral do sistema (dados simulados).">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.label}
              </CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Use o menu lateral para navegar entre as páginas. Toda a navegação e os
          dados exibidos são simulados no front-end.
        </CardContent>
      </Card>
    </PageShell>
  );
}
