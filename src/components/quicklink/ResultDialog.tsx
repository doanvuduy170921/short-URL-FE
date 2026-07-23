import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Copy, Check, Download, ExternalLink, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shortUrl: string;
  originalUrl: string;
}

export function ResultDialog({ open, onOpenChange, shortUrl, originalUrl }: Props) {
  const [copied, setCopied] = useState(false);
  const fullUrl = `https://${shortUrl}`;

  const copy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 1600);
  };

  const downloadQR = () => {
    const canvas = document.getElementById("result-qr") as HTMLCanvasElement | null;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${shortUrl.split("/").pop()}-qr.png`;
    a.click();
    toast.success("QR code downloaded");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass max-w-md rounded-3xl border-border/60 sm:rounded-3xl">
        <DialogHeader className="items-center text-center">
          <div className="mb-2 grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-neon)] shadow-[var(--shadow-neon)]">
            <Sparkles className="h-6 w-6 text-background" />
          </div>
          <DialogTitle className="text-2xl">Your link is ready</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Share it anywhere or download the QR code below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
            <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">Short link</p>
            <div className="flex items-center gap-2">
              <span className="flex-1 truncate font-mono text-lg font-semibold text-gradient">
                {shortUrl}
              </span>
              <Button size="icon" variant="secondary" onClick={copy} className="shrink-0 rounded-lg">
                {copied ? <Check className="h-4 w-4 text-[color:var(--neon)]" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="mt-2 truncate text-xs text-muted-foreground">
              → {originalUrl}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-background/40 p-5">
            <div className="rounded-xl bg-white p-3">
              <QRCodeCanvas id="result-qr" value={fullUrl} size={160} level="H" />
            </div>
            <div className="flex w-full gap-2">
              <Button onClick={downloadQR} variant="secondary" className="flex-1 rounded-xl">
                <Download className="mr-2 h-4 w-4" /> QR Code
              </Button>
              <Button asChild variant="outline" className="flex-1 rounded-xl">
                <a href={fullUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Test
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
