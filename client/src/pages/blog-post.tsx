import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Eye, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data, isLoading, isError } = useQuery<{ success: boolean; post: BlogPost }>({
    queryKey: ["/api/blog", slug],
    enabled: !!slug,
  });

  const post = data?.post;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1">
          <div className="flex items-center justify-center h-96">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1">
          <Link href="/blog">
            <button className="flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-8 transition">
              <ArrowLeft className="w-4 h-4" /> Tüm Yazılara Dön
            </button>
          </Link>
          <Card className="border-destructive/50">
            <CardContent className="pt-6">
              <p className="text-destructive">Blog yazısı bulunamadı.</p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1">
        <Link href="/blog">
          <button className="flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-8 transition">
            <ArrowLeft className="w-4 h-4" /> Tüm Yazılara Dön
          </button>
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>
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
          </header>

          <div className="prose prose-invert max-w-none mb-8">
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground" {...props} />,
                p: ({ node, ...props }) => <p className="mb-4 text-foreground leading-relaxed" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 text-foreground space-y-2" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 text-foreground space-y-2" {...props} />,
                li: ({ node, ...props }) => <li className="mb-2 text-foreground" {...props} />,
                table: ({ node, ...props }) => <table className="w-full border-collapse border border-muted my-4" {...props} />,
                th: ({ node, ...props }) => <th className="border border-muted p-2 bg-muted text-foreground text-left" {...props} />,
                td: ({ node, ...props }) => <td className="border border-muted p-2 text-foreground" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-violet-600 pl-4 py-2 my-4 italic text-foreground"
                    {...props}
                  />
                ),
                code: ({ node, inline, ...props }: any) =>
                  inline ? (
                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground" {...props} />
                  ) : (
                    <code className="bg-muted p-4 rounded block font-mono text-sm overflow-x-auto text-foreground" {...props} />
                  ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
