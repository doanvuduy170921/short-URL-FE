import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Link2, Lock, Calendar, Sparkles, Wand2, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ResultDialog } from "./ResultDialog";

interface Props {
  variant?: "hero" | "compact";
  onCreated?: (data: { shortUrl: string; originalUrl: string }) => void;
}

// Config Base URL Backend Go
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || "http://localhost:8080";

export function ShortenerForm({ variant = "hero", onCreated }: Props) {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(variant === "compact");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ shortUrl: string; originalUrl: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 1. Validate Input
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      toast.error("Paste a URL first");
      return;
    }

    const formattedUrl = trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://") 
      ? trimmedUrl 
      : `https://${trimmedUrl}`;

    try {
      new URL(formattedUrl);
    } catch {
      toast.error("That doesn't look like a valid URL");
      return;
    }

    // Tính toán số giây/ngày cho tham số exp (nếu user có chọn ngày hết hạn)
    let expSeconds = 0;
    if (expiresAt) {
      const expDate = new Date(expiresAt).getTime();
      const now = new Date().getTime();
      expSeconds = Math.max(0, Math.floor((expDate - now) / 1000));
    }

    setLoading(true);

    try {
      // 2. Gọi chính xác API /v1/links/shorten
      const response = await fetch(`${API_BASE_URL}/v1/links/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          url: formattedUrl, // 👈 Chuẩn dto.ShortenReq (field 'url')
          exp: expSeconds,   // 👈 Chuẩn dto.ShortenReq (field 'exp' - int)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Server error (${response.status})`);
      }

      // 3. Backend Go trả về: { "code": "xxxxxxx", "message": "..." }
      // Tạo link redirect bằng endpoint /v1/links/redirect/:code
      const shortCode = data.code;
      const fullShortUrl = `${API_BASE_URL}/v1/links/redirect/${shortCode}`;

      // 4. Update UI State & Bật Dialog
      setResult({ shortUrl: fullShortUrl, originalUrl: formattedUrl });
      onCreated?.({ shortUrl: fullShortUrl, originalUrl: formattedUrl });

      toast.success("Link created successfully!", { description: fullShortUrl });

      // Reset Form
      setUrl("");
      setAlias("");
      setPassword("");
      setExpiresAt("");

    } catch (err: any) {
      console.error("Shorten API Error:", err);
      if (err.name === "TypeError" && err.message === "Failed to fetch") {
        toast.error("Cannot connect to Backend Server", {
          description: "Hãy kiểm tra xem Docker/Backend Go ở port 8080 đang chạy chưa nhé!"
        });
      } else {
        toast.error("Failed to shorten link", {
          description: err.message || "An unexpected error occurred."
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={
          variant === "hero"
            ? "glass rounded-3xl p-3 shadow-[var(--shadow-elegant)]"
            : "glass rounded-2xl p-4"
        }
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Link2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long URL here..."
              disabled={loading}
              className="h-14 rounded-xl border-0 bg-background/40 pl-12 pr-4 text-base placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="h-14 rounded-xl bg-[image:var(--gradient-primary)] px-8 text-base font-semibold shadow-[var(--shadow-glow)] transition-all hover:brightness-110 hover:shadow-[0_0_50px_oklch(0.65_0.24_285/0.5)] disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Shortening
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Shorten
              </>
            )}
          </Button>
        </div>

        {variant === "hero" && (
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="mt-3 flex items-center gap-1.5 px-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Wand2 className="h-3.5 w-3.5" />
            {showAdvanced ? "Hide" : "Show"} advanced options
          </button>
        )}

        {showAdvanced && (
          <div className="mt-4 grid gap-3 border-t border-border/60 pt-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Wand2 className="h-3.5 w-3.5" /> Custom alias
              </Label>
              <div className="flex items-center overflow-hidden rounded-lg border border-border bg-background/40">
                <span className="pl-3 pr-1 text-xs text-muted-foreground">quicklink.io/</span>
                <Input
                  value={alias}
                  onChange={(e) => setAlias(e.target.value.replace(/\s+/g, "-"))}
                  placeholder="my-link"
                  disabled={loading}
                  className="h-10 border-0 bg-transparent px-1 text-sm focus-visible:ring-0 disabled:opacity-50"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Lock className="h-3.5 w-3.5" /> Password
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Optional"
                disabled={loading}
                className="h-10 rounded-lg border-border bg-background/40 text-sm disabled:opacity-50"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> Expires
              </Label>
              <Input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                disabled={loading}
                className="h-10 rounded-lg border-border bg-background/40 text-sm disabled:opacity-50"
              />
            </div>
          </div>
        )}
      </form>

      <ResultDialog
        open={!!result}
        onOpenChange={(o) => !o && setResult(null)}
        shortUrl={result?.shortUrl ?? ""}
        originalUrl={result?.originalUrl ?? ""}
      />
    </>
  );
}