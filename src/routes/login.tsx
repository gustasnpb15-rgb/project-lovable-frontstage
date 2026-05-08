import { createFileRoute, Link, useNavigate, Navigate } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PawPrint } from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ login_user: "", password_user: "" });
  const [error, setError] = useState("");

  if (isAuthenticated) return <Navigate to="/" />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.login_user || !form.password_user) {
      setError("Preencha login e senha.");
      return;
    }
    if (login(form.login_user, form.password_user)) {
      toast.success("Bem-vindo de volta!");
      navigate({ to: "/" });
    } else {
      setError("Credenciais inválidas.");
    }
  };

  return (
    <div className="auth-bg min-h-screen flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md rounded-3xl p-8 shadow-elegant animate-scale-in">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-14 w-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-soft animate-float">
            <PawPrint className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-semibold mt-4">Bem-vindo</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Acesse sua conta do Petshop
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login_user">Login</Label>
            <Input
              id="login_user"
              name="login_user"
              autoComplete="username"
              value={form.login_user}
              onChange={(e) => setForm({ ...form, login_user: e.target.value })}
              placeholder="seu.usuario"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password_user">Senha</Label>
            <Input
              id="password_user"
              name="password_user"
              type="password"
              autoComplete="current-password"
              value={form.password_user}
              onChange={(e) => setForm({ ...form, password_user: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full shadow-soft" size="lg">
            Entrar
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link to="/cadastro" className="text-primary font-medium hover:underline">
              Criar conta
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
