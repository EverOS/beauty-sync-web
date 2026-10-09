"use client"; // Avisa o Next.js que esta tela roda no navegador do usuário (precisa de interatividade)

import { useRouter } from "next/navigation";
import { useState } from "react";
const API_URL = "http://localhost:3333";

export default function LoginPage() {
  const router = useRouter();
  // O nosso "caderninho" para guardar o que o usuário digita
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // A função que roda quando clicamos em "Entrar"
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          response.status === 401
            ? "E-mail ou senha incorretos."
            : "Algo deu errado. Tente novamente.",
        );
        return;
      }

      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (error) {
      setError("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-zinc-800 p-8 shadow-2xl">

        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            BeautySync
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Acesse sua conta para gerenciar os agendamentos.
          </p>
        </div>

        {/* Adicionamos o evento onSubmit no formulário */}
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                value={email} // Conecta o campo ao estado
                onChange={(e) => setEmail(e.target.value)} // Atualiza o estado a cada tecla digitada
                className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                Senha
              </label>
              <input
                id="password"
                type="password"
                required
                value={password} // Conecta o campo ao estado
                onChange={(e) => setPassword(e.target.value)} // Atualiza o estado a cada tecla digitada
                className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>

          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          <div>
            <button
              type="submit" // Mudamos para 'submit' para acionar o form
              className="flex w-full justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            >
              Entrar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}