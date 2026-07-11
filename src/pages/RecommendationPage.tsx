import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchSearch } from "@/services/comicApi";
import { ComicCard, ComicCardSkeleton } from "@/components/ComicCard";
import { BookOpen, Sparkles, ChevronRight } from "lucide-react";

const PAGE_TITLE = "10 Rekomendasi Manhwa Terbaik yang Wajib Dibaca";
const PAGE_DESCRIPTION =
  "Temukan 10 rekomendasi manhwa terbaik yang wajib dibaca. Dari action, romance, fantasy, hingga thriller — baca manhwa Korea gratis tanpa iklan di FmcComic.";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  author: {
    "@type": "Organization",
    name: "FmcComic",
  },
  publisher: {
    "@type": "Organization",
    name: "FmcComic",
    logo: {
      "@type": "ImageObject",
      url: "/icon-512.png",
    },
  },
  datePublished: "2026-07-11",
  dateModified: "2026-07-11",
  inLanguage: "id",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "/rekomendasi-manhwa",
  },
};

export default function RecommendationPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["search", "manhwa", 1],
    queryFn: () => fetchSearch("manhwa", 1),
  });

  const komikList = data?.komikList || [];

  return (
    <div className="space-y-10">
      <Helmet>
        <title>{PAGE_TITLE} | FmcComic</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href="/rekomendasi-manhwa" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content="/rekomendasi-manhwa" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(JSON_LD)}</script>
      </Helmet>

      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          Rekomendasi Manhwa
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight max-w-3xl">
          {PAGE_TITLE}
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Kumpulan komik Korea (manhwa) terpopuler dan terbaik yang bisa kamu
          baca gratis tanpa iklan. Update pilihan editor FmcComic.
        </p>
      </header>

      <article className="prose prose-invert prose-sm md:prose-base max-w-none">
        <p>
          <strong>Manhwa</strong> adalah komik yang berasal dari Korea Selatan.
          Dalam beberapa tahun terakhir, manhwa meledak di pasar global berkat
          gaya seni digital yang tajam, panel berwarna penuh, dan jalan cerita
          yang sering diadaptasi menjadi drama atau anime. Bagi pembaca
          Indonesia, kata kunci seperti <em>baca manhwa</em>,{" "}
          <em>manhwaindo</em>, dan <em>webtoon</em> menjadi gerbang utama untuk
          menemukan judul-judul terbaru.
        </p>

        <h2>Mengapa Manhwa Begitu Populer?</h2>
        <ul>
          <li>
            <strong>Gambar berwarna:</strong> mayoritas manhwa modern sudah
            dirilis dalam format warna, sehingga lebih nyaman dibaca di layar
            ponsel.
          </li>
          <li>
            <strong>Scroll vertikal:</strong> format webtoon membuat pembaca
            bisa menyelusuri cerita tanpa bolak-balik halaman.
          </li>
          <li>
            <strong>Genre lengkap:</strong> dari action, fantasy, romance, isekai,
            hingga thriller psikologis.
          </li>
          <li>
            <strong>Rilis rutin:</strong> banyak judul manhwa terbaik yang update
            setiap minggu.
          </li>
        </ul>

        <h2>10 Pilihan Manhwa Terbaik yang Wajib Dibaca</h2>
        <p>
          Berikut rekomendasi manhwa terbaik pilihan FmcComic. Daftar ini
          menggabungkan judul-judul dengan rating tinggi, cerita menarik, dan
          popularitas besar di kalangan pembaca komik Korea. Klik cover untuk
          langsung membaca chapter terbaru.
        </p>
      </article>

      <section>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-5">
          <BookOpen className="w-5 h-5 text-primary" />
          Top Manhwa Pilihan Editor
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <ComicCardSkeleton key={i} />
              ))
            : komikList.length === 0
            ? (
                <div className="col-span-full text-center text-muted-foreground py-12 bg-card/50 border border-border/50 rounded-2xl">
                  Belum ada data manhwa saat ini. Silakan kembali beberapa saat lagi.
                </div>
              )
            : komikList
                .slice(0, 10)
                .map((item) => <ComicCard key={item.slug} comic={item} />)}
        </div>
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/50 p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-bold">Tips Memilih Manhwa Sesuai Selera</h2>
        <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
          <div>
            <h3 className="text-foreground font-semibold mb-2">Suka aksi & petualangan?</h3>
            <p>
              Cari manhwa dengan genre action, fantasy, atau murim. Biasanya
              punya pertarungan epik dan sistem level yang membuat ketagihan.
            </p>
          </div>
          <div>
            <h3 className="text-foreground font-semibold mb-2">Suka cerita romantis?</h3>
            <p>
              Pilih manhwa romance, drama, atau slice-of-life dengan rating
              tinggi. Banyak di antaranya punya karakter yang mudah dibuat
              terpikat.
            </p>
          </div>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
        >
          Jelajahi koleksi manhwa terbaru <ChevronRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
