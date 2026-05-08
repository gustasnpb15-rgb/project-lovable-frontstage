import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/configuracoes")({
  component: ConfiguracoesPage,
});

function ConfiguracoesPage() {
  const [form, setForm] = useState({
    nome_empresa: "Minha Empresa",
    email_contato: "contato@empresa.com",
    notificacoes_ativas: true,
  });

  return (
    <PageShell title="Configurações" description="Preferências do sistema (simulado).">
      <Card>
        <CardHeader>
          <CardTitle>Dados da empresa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome_empresa">Nome da empresa</Label>
            <Input
              id="nome_empresa"
              name="nome_empresa"
              value={form.nome_empresa}
              onChange={(e) => setForm({ ...form, nome_empresa: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email_contato">E-mail de contato</Label>
            <Input
              id="email_contato"
              name="email_contato"
              type="email"
              value={form.email_contato}
              onChange={(e) => setForm({ ...form, email_contato: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notificacoes_ativas">Receber notificações</Label>
            <Switch
              id="notificacoes_ativas"
              checked={form.notificacoes_ativas}
              onCheckedChange={(v) => setForm({ ...form, notificacoes_ativas: v })}
            />
          </div>
          <Button onClick={() => console.log("salvar (simulado)", form)}>Salvar</Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}
