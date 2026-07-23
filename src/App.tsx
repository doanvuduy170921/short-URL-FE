
import { Zap, BarChart3, Target, ArrowRight, Check } from "lucide-react";
import { Logo } from "./components/quicklink/Logo";
import { ShortenerForm } from "./components/quicklink/ShortenerForm";
import { Button } from "./components/ui/button";

export default function App() {
  return <Landing />
}

const features = [
  {
    icon: Zap,
    title: "Fast Redirects",
    body: "Edge-cached routing under 20ms worldwide. Your visitors never wait.",
    accent: "from-[oklch(0.7_0.24_285)] to-[oklch(0.75_0.2_250)]",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    body: "Real-time clicks, referrers, devices and geo — visualized beautifully.",
    accent: "from-[oklch(0.85_0.19_195)] to-[oklch(0.7_0.24_285)]",
  },
  {
    icon: Target,
    title: "Smart Targeting",
    body: "Route iOS, Android, or specific countries to different destinations.",
    accent: "from-[oklch(0.75_0.2_320)] to-[oklch(0.85_0.19_195)]",
  },
];

function Landing() {
  return (
    <div className="bg-hero min-h-screen">
      {/* Nav */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</a>
          <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Pricing</a>
          <a href="#docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Docs</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <a href="#shorten-section">Sign in</a>
          </Button>
          <Button asChild className="rounded-xl bg-[image:var(--gradient-primary)] font-semibold shadow-[var(--shadow-glow)] hover:brightness-110">
           <a href="#shorten-section">Get started</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 text-center sm:pt-24">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-xs font-medium backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--neon)] shadow-[0_0_12px_var(--neon)]" />
          Now with edge analytics · 100% free to start
        </div>
        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          Shorten links.<br />
          <span className="text-gradient">Own the click.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          QuickLink turns any URL into a fast, trackable short link with QR codes, password protection,
          expiration dates and pixel-perfect analytics.
        </p>

        <div className="mx-auto mt-12 max-w-3xl">
          <ShortenerForm variant="hero" />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {["No signup required", "Custom aliases", "Password protect", "QR codes"].map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[color:var(--neon)]" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-[color:var(--neon)]">Features</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need. Nothing you don't.
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-8 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--ring)] hover:shadow-[var(--shadow-glow)]"
            >
              <div className={`mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${f.accent} shadow-lg transition-transform duration-500 group-hover:scale-110`}>
                <f.icon className="h-7 w-7 text-background" strokeWidth={2.2} />
              </div>
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[image:var(--gradient-neon)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="glass relative overflow-hidden rounded-3xl p-12 text-center sm:p-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,oklch(0.65_0.24_285/0.3),transparent_70%)]" />
          <div className="relative">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Ready for the <span className="text-gradient">full picture?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Create a free account to unlock the analytics dashboard, custom domains, smart targeting
              and unlimited QR codes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-xl bg-[image:var(--gradient-primary)] font-semibold shadow-[var(--shadow-glow)] hover:brightness-110">
                <a href="/dashboard">
                  Open dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl">
                <a href="#features">See features</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <Logo />
          <p className="text-xs text-muted-foreground">© 2026 QuickLink. Built for speed.</p>
          <div className="flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Twitter" className="transition-colors hover:text-foreground"></a>
            <a href="#" aria-label="GitHub" className="transition-colors hover:text-foreground"></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
