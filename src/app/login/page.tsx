"use client";
/**
 * TODO:
 * - Valider email/password (Zod)
 * - Créer un token façade, le stocker (sessionStorage)
 * - Rediriger vers /products
 */
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setToken } from "@/lib/auth";
import * as z from "zod";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();

  const loginSchema = z.object({
    email: z
      .string()
      .min(1, "Veuillez saisir votre adresse e-mail.")
      .email("Veuillez saisir un adresse e-mail valide."),
    password: z.string().min(1, "Veuillez saisir votre mot de passe"),
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const newError: { email?: string; password?: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === "email") {
          newError.email = issue.message;
        } else if (issue.path[0] === "password") {
          newError.password = issue.message;
        }
      });
      setError(newError);
      return;
    }
    setError({});
    setToken(email);
    router.push("/products");
  }

  return (
    <div className="min-h-screen flex items-center justify-center gap-5 bg-muted/30">
      <div className="card w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-3">Connexion</h2>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="label">Email</label>
            <input
              className="input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error.email)
                  setError((prev) => ({ ...prev, email: undefined }));
              }}
            />
          </div>
          {error.email && <p className="text-red-600 text-sm">{error.email}</p>}
          <div>
            <label className="label">Mot de passe</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error.password)
                  setError((prev) => ({ ...prev, password: undefined }));
              }}
            />
          </div>
          {error.password && (
            <p className="text-red-600 text-sm">{error.password}</p>
          )}
          <button className="btn btn-primary" type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
