import { createFileRoute, Link, useNavigate, Navigate } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PawPrint } from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { toast } from "sonner";

export const Route = createFileRoute("/cadastro")({
  component: RegisterPage,
});

function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name_user: "",
    email_user: "",
    login_user: "",
    password_user: "",
    address_user: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (isAuthenticated) return <Navigate to="/" />;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name_user.trim()) e.name_user = "Nome obrigatório";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email_user)) e.email_user = "E-mail inválido";
    if (form.login_user.length < 3) e.login_user = "Mínimo 3 caracteres";
    if (form.password_user.length < 6) e.password_user = "Mínimo 6 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    register(form);
    toast.success("Conta criada com sucesso!");
    navigate({ to: "/" });
  };

  return (
    <div className="auth-bg min-h-screen flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-lg rounded-3xl p-8 shadow-elegant animate-scale-in">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-14 w-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-soft animate-float">
            <PawPrint className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-semibold mt-4">Criar conta</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Junte-se ao nosso Petshop
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="name_user">Nome completo</Label>
            <Input
              id="name_user"
              name="name_user"
              value={form.name_user}
              onChange={(e) => setForm({ ...form, name_user: e.target.value })}
            />
            {errors.name_user && <p className="text-xs text-destructive">{errors.name_user}</p>}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="email_user">E-mail</Label>
            <Input
              id="email_user"
              name="email_user"
              type="email"
              value={form.email_user}
              onChange={(e) => setForm({ ...form, email_user: e.target.value })}
            />
            {errors.email_user && <p className="text-xs text-destructive">{errors.email_user}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="login_user">Login</Label>
            <Input
              id="login_user"
              name="login_user"
              value={form.login_user}
              onChange={(e) => setForm({ ...form, login_user: e.target.value })}
            />
            {errors.login_user && <p className="text-xs text-destructive">{errors.login_user}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password_user">Senha</Label>
            <Input
              id="password_user"
              name="password_user"
              type="password"
              value={form.password_user}
              onChange={(e) => setForm({ ...form, password_user: e.target.value })}
            />
            {errors.password_user && (
              <p className="text-xs text-destructive">{errors.password_user}</p>
            )}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="address_user">Endereço</Label>
            <Input
              id="address_user"
              name="address_user"
              value={form.address_user}
              onChange={(e) => setForm({ ...form, address_user: e.target.value })}
            />
          </div>

          <div className="sm:col-span-2 mt-2 space-y-3">
            <Button type="submit" className="w-full shadow-soft" size="lg">
              Cadastrar
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Já tem conta?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
