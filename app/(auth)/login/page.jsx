"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { AuthService } from "@/services/auth-service";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

const onSubmit = async (data) => {
  try {
    const user = await AuthService.login(data);
    login(user);
    router.push(user.role === "PRINCIPAL" ? "/principal" : "/teacher");
  } catch (error) {
    console.error("Login failed",error);
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-auto max-w-md shadow-lg border-none ring-1 ring-slate-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Login</CardTitle>
          <CardDescription className="">
            Enter your credentials to access the broadcasting system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input
                {...register("email")}
                type="email"
                placeholder="name@school.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p>Hint: use "admin@test.com" for Principal role</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}