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
          <div className="space-y-6">
            {data.posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="hover:border-violet-500/50 transition-all cursor-pointer hover:shadow-lg">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-violet-600 transition">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.viewCount} okuma
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-violet-600 opacity-0 group-hover:opacity-100 transition" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
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
