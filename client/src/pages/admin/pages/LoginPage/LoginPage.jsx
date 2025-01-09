import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, AlertCircle, EyeOff, Eye, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import { signInFailure, signInStart, signInSuccess } from "@/redux/adminSlice";
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state) => state.admin);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Veuillez remplir tous les champs");
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/admin/auth/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      const data = await res.json();

      // if (!res.ok) {
      //   throw new Error(data.message || "Une erreur est survenue");
      // }
      if (data.success === false) {
        dispatch(signInFailure(data));
        toast.error(data.message || "Il ya une erreur de connexion");
        return;
      }
      dispatch(signInSuccess(data));

      toast.success("Connexion réussie");

      // Redirection après connexion
      const redirectUrl = localStorage.getItem("redirectAfterLogin");
      if (redirectUrl && redirectUrl.startsWith("/")) {
        navigate(redirectUrl);
        localStorage.removeItem("redirectAfterLogin");
      } else {
        navigate("/admin/dashboard/");
      }
    } catch (error) {
      dispatch(signInFailure(error));

      toast.error(error.message || "il y a eu une erreur de connexion");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toaster position="top-right" />
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <Link
            to={"/admin/dashboard/"}
            className="flex items-center justify-center mb-4"
          >
            <Lock className="h-8 w-8 text-primary" />
          </Link>
          <CardTitle className="text-2xl text-center">Administration</CardTitle>
          <CardDescription className="text-center">
            Connectez-vous à votre compte administrateur
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="*****"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Se souvenir de moi
                </Label>
              </div>
              <Link to={"/"} className="text-sm font-normal">
                Retour Accueil
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
            {/* <Button
              variant="link"
              className="text-sm text-muted-foreground"
              type="button"
            >
              Mot de passe oublié ?
            </Button> */}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
