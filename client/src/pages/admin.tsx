import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  MessageSquare,
  Lock,
  ArrowLeft,
  Inbox,
  Loader2
} from "lucide-react";
import type { ContactMessage } from "@shared/schema";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: async (password: string) => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Giriş başarısız");
      }
      return res.json();
    },
    onSuccess: (data) => {
      setAuthToken(data.token);
      setIsAuthenticated(true);
      setError("");
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const { data: messages, isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact"],
    enabled: isAuthenticated && !!authToken,
    queryFn: async () => {
      const res = await fetch("/api/contact", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error("Mesajlar alınamadı");
      return res.json();
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(password);
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSubjectLabel = (subject: string) => {
    const labels: Record<string, string> = {
      demo: "Demo Talebi",
      pricing: "Fiyat Bilgisi",
      support: "Teknik Destek",
      other: "Diğer",
    };
    return labels[subject] || subject;
  };

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      demo: "bg-green-500/10 text-green-600",
      pricing: "bg-blue-500/10 text-blue-600",
      support: "bg-orange-500/10 text-orange-600",
      other: "bg-gray-500/10 text-gray-600",
    };
    return colors[subject] || "bg-gray-500/10 text-gray-600";
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-violet-600" />
            </div>
            <CardTitle>Admin Paneli</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Şifre"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="input-admin-password"
                />
                {error && (
                  <p className="text-sm text-destructive mt-2">{error}</p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loginMutation.isPending}
                data-testid="button-admin-login"
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Giriş yapılıyor...
                  </>
                ) : (
                  "Giriş Yap"
                )}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <a href="/" className="text-sm text-muted-foreground inline-flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Ana Sayfaya Dön
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="i-novaria" className="w-8 h-8 rounded-md" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Paneli</h1>
                <p className="text-sm text-muted-foreground">İletişim Mesajları</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Ana Sayfa
                </Button>
              </a>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsAuthenticated(false)}
              >
                Çıkış
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">
              Toplam {messages?.length || 0} mesaj
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Yükleniyor...</p>
          </div>
        ) : messages && messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((msg) => (
              <Card key={msg.id} data-testid={`card-message-${msg.id}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center">
                        <span className="text-violet-600 font-semibold">
                          {msg.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{msg.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          <a href={`mailto:${msg.email}`} className="hover:underline">
                            {msg.email}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getSubjectColor(msg.subject)}>
                        {getSubjectLabel(msg.subject)}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(msg.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                    {msg.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${msg.phone}`} className="hover:underline">
                          {msg.phone}
                        </a>
                      </div>
                    )}
                    {msg.company && (
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {msg.company}
                      </div>
                    )}
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <p className="text-foreground whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Henüz mesaj yok</h3>
              <p className="text-muted-foreground">
                İletişim formundan gelen mesajlar burada görünecek.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
