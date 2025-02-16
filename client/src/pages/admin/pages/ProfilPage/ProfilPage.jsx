import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Camera,
  CheckCircle2,
  User,
  Lock,
  Bell,
  Shield,
  Loader2,
  LogOut,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { signOut, updateAdminFailure, updateAdminStart, updateAdminSuccess } from "@/redux/adminSlice";

const ProfilPage = () => {
  const { currentAdmin } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: currentAdmin?.username || "",
    tel: currentAdmin?.tel || "",
    email: currentAdmin?.email || "",
    password: "",
    oldPassword:""
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  
  const handleSave = async () => {
    setIsSaving(true);

    try {
      dispatch(updateAdminStart());
      const res = await fetch("/api/admin/update-profile", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        
        const data = await res.json();  
        const errorMessage = data.message || "Il y a une erreur";  
        toast.error(errorMessage);  
        throw new Error(errorMessage);
      }

      const updatedAdmin = await res.json();
      if (updatedAdmin.success === false) {
        dispatch(updateAdminFailure(updatedAdmin));
        toast.error(updatedAdmin.message);
        return;
      }
      dispatch(updateAdminSuccess(updatedAdmin));
      toast.success("Profil mis à jour avec succès.");
      
    } catch (error) {
      dispatch(updateAdminFailure(error.message));
      toast.error(error.message);
    }  finally {
      setIsSaving(false);
    }

  };




  const handleSignOut = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        await fetch("/api/admin/auth/signout", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(signOut());
        navigate("/");
        toast.success("Vous êtes déconnecté avec succès !");
      } catch (error) {
        toast.error(
          error.message || "Une erreur est survenue. Veuillez réessayer."
        );
      } finally {
        setLoading(false);
      }
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Toaster position="top-right" />
      {/* En-tête du profil */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={
                "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.webp" ||
                currentAdmin.profil
              }
              alt="Sov Etude"
            />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          {/* <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
          <Camera className="h-4 w-4" />
        </Button> */}
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{currentAdmin.username}</h1>
          <p className="text-muted-foreground">Administrateur Principal</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Général
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>
                Mettez à jour vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      name="username"
                      onChange={handleInputChange}
                      defaultValue={currentAdmin.username}
                    />
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" defaultValue="Dubois" />
                  </div> */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      onChange={handleInputChange}
                      defaultValue={currentAdmin.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tel">Téléphone</Label>
                    <Input
                      id="tel"
                      type="tel"
                      name="tel"
                      onChange={handleInputChange}
                      defaultValue={currentAdmin.tel}
                    />
                  </div>
                </div>
                <Button type="submit"  onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                " Mettre à jour le profil"
              )}

                  </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>
                Gérez vos paramètres de sécurité et mots de passe
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Changer le mot de passe</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="oldPassword">Mot de passe actuel</Label>
                    <Input 
                    id="oldPassword"  
                    type="password" 
                    name="oldPassword"
                    onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Nouveau mot de passe</Label>
                    <Input 
                    id="password" 
                    type="password" 
                    name="password"
                    onChange={handleInputChange}
                    />
                  </div>
                  
                </div>
                <Button type="submit" onClick={handleSave} disabled={isSaving} >
                {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                "Mettre à jour le mot de passe"
              )}

                 
                  </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">
                  Authentification à deux facteurs
                </h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p>
                      Protégez votre compte avec l&apos;authentification 2FA
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Ajoute une couche de sécurité supplémentaire à votre
                      compte
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Sessions actives</h3>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Paris, France</p>
                        <p className="text-sm text-muted-foreground">
                          Dernière activité: Il y a 2 minutes
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={handleSignOut}
                        size="sm"
                        className="text-red-600"
                      >
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <LogOut className="mr-2 h-4 w-4" />
                        )}
                        <span>Se déconnecter</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configurez vos préférences de notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Notifications par email</p>
                    <p className="text-sm text-muted-foreground">
                      Recevez des mises à jour par email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Notifications de sécurité</p>
                    <p className="text-sm text-muted-foreground">
                      Alertes concernant la sécurité de votre compte
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Notifications marketing</p>
                    <p className="text-sm text-muted-foreground">
                      Recevez des offres et mises à jour
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilPage;
