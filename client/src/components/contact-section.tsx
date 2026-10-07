import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";

const formSchema = insertContactMessageSchema.extend({
  name: insertContactMessageSchema.shape.name,
  email: insertContactMessageSchema.shape.email,
  subject: insertContactMessageSchema.shape.subject,
  message: insertContactMessageSchema.shape.message,
});

export function ContactSection() {
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Mesajınız Alındı",
        description: "En kısa sürede sizinle iletişime geçeceğiz.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)]">
        <div>
          <p className="section-label" data-testid="badge-contact">İletişim</p>
          <h2 className="font-display mt-3 text-3xl leading-[1.08] text-ink sm:text-4xl" data-testid="text-contact-heading">
            Projenizi <span className="marker">konuşalım</span>
          </h2>
          <p className="mt-4 text-ink-soft" data-testid="text-contact-description">
            Yeni bir fikriniz mi var, mevcut sistemlerinizi mi geliştirmek istiyorsunuz? Yazın, birlikte değerlendirelim.
          </p>

          <dl className="mt-8 space-y-5 border-t border-line pt-6 text-sm">
            <div className="flex items-start gap-3" data-testid="card-email">
              <Mail className="mt-0.5 h-4 w-4 text-faint" aria-hidden />
              <div>
                <dt className="text-faint" data-testid="text-email-label">E-posta</dt>
                <dd>
                  <a href="mailto:info@i-novaria.com" className="font-semibold text-ink hover:underline" data-testid="text-email-value">
                    info@i-novaria.com
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3" data-testid="card-address">
              <MapPin className="mt-0.5 h-4 w-4 text-faint" aria-hidden />
              <div>
                <dt className="text-faint" data-testid="text-address-label">Konum</dt>
                <dd className="font-semibold text-ink" data-testid="text-address-value">Ankara, Türkiye</dd>
              </div>
            </div>
          </dl>

          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm text-ink-soft" data-testid="card-cta">
            <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden />
            <span data-testid="text-support-status">Yeni projeler kabul ediyoruz · genellikle 24 saatte dönüş</span>
          </p>
        </div>

        <div>
          <Card className="rounded-[14px] border-line shadow-none" data-testid="card-contact-form">
            <CardContent className="p-6 sm:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ad Soyad *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Adınız Soyadınız"
                              {...field}
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-posta *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="ornek@sirket.com"
                              {...field}
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+90 5XX XXX XX XX"
                              {...field}
                              value={field.value ?? ""}
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Şirket / Proje Adı</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Şirket veya Proje Adı"
                              {...field}
                              value={field.value ?? ""}
                              data-testid="input-company"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konu *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="select-subject">
                              <SelectValue placeholder="Hizmet seçin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="vibe-coding">Vibe Coding</SelectItem>
                            <SelectItem value="digital-transformation">Dijital Dönüşüm Danışmanlığı</SelectItem>
                            <SelectItem value="web-design">Web Sitesi Tasarımı</SelectItem>
                            <SelectItem value="ecommerce">E-Ticaret Sistemi</SelectItem>
                            <SelectItem value="mobile-game">Mobil Oyun Geliştirme</SelectItem>
                            <SelectItem value="other">Diğer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mesajınız *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Projeniz veya ihtiyaçlarınız hakkında kısaca bilgi verin..."
                            rows={5}
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto"
                    disabled={contactMutation.isPending}
                    data-testid="button-submit"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Mesaj gönder
                      </>
                    )}
                  </button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
