import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Eye, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPage() {
  const { data, isLoading, isError } = useQuery<{ success: boolean; posts: BlogPost[] }>({
    queryKey: ["/api/blog"],
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
          <p className="text-muted-foreground">
            Vibe coding, yapay zeka ve modern yazılım geliştirme üzerine yazıları.
          </p>
        </div>

        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        )}

        {isError && (
          <Card className="border-destructive/50">
            <CardContent className="pt-6">
              <p className="text-destructive">Blog yazıları yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>
            </CardContent>
          </Card>
        )}

        {data?.posts && data.posts.length > 0 ? (
          <div className="space-y-8">
            {data.posts.map((post) => {
              const readTime = Math.ceil(post.content.split(/\s+/).length / 200);
              return (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="group border border-border/50 hover:border-violet-500/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-background to-muted/20">
                    <CardContent className="p-8">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                        <div className="flex-1">
                          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 group-hover:text-violet-600 transition duration-300 leading-tight">
                            {post.title}
                          </h2>
                          <p className="text-muted-foreground mb-4 line-clamp-3 text-base leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <ArrowRight className="w-6 h-6 text-violet-600 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition duration-300" />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition">
                          <Eye className="w-4 h-4" />
                          <span>{post.viewCount} okuma</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 text-xs font-medium">
                          ⏱️ {readTime} dk okuma
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          !isLoading && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Henüz blog yazısı yok. Yakında yayınlanacak!</p>
              </CardContent>
            </Card>
          )
        )}
      </main>
      <Footer />
    </div>
  );
}
