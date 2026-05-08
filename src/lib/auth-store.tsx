import { createContext, useContext, useState, ReactNode } from "react";

// Compatível com a tabela `usuarios` do banco futuro
export interface User {
  id_user: number;
  name_user: string;
  email_user: string;
  login_user: string;
  password_user: string;
  address_user: string;
  obs: string;
  status: "ativo" | "inativo";
}

interface AuthCtx {
  user: User | null;
  isAuthenticated: boolean;
  login: (login_user: string, password_user: string) => boolean;
  register: (data: Omit<User, "id_user" | "obs" | "status">) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (login_user: string, _password_user: string) => {
    // Simulação visual: aceita qualquer login não vazio
    if (!login_user) return false;
    setUser({
      id_user: 1,
      name_user: login_user,
      email_user: `${login_user}@petshop.com`,
      login_user,
      password_user: "",
      address_user: "",
      obs: "",
      status: "ativo",
    });
    return true;
  };

  const register: AuthCtx["register"] = (data) => {
    setUser({
      ...data,
      id_user: Date.now(),
      obs: "",
      status: "ativo",
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
