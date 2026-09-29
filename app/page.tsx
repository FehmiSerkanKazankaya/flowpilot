"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    description: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Bir hata oluştu.");
      }

      setStatus("success");
      setMessage("Talebiniz başarıyla kaydedildi.");

      setForm({
        name: "",
        email: "",
        service: "",
        description: "",
      });
    } catch (error) {
      setStatus("error");

      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Talebiniz kaydedilemedi.");
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold text-blue-600">FlowPilot</h1>

          <a
            href="#contact"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Talep Oluştur
          </a>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          İş Otomasyonu
        </span>

        <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
          Tekrarlayan işleri ekibiniz yerine
          <span className="text-blue-600"> FlowPilot </span>
          yapsın.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Raporlama, e-posta takibi ve veri aktarımı gibi zaman alan süreçleri
          otomatikleştirerek ekibinizin daha önemli işlere odaklanmasını
          sağlıyoruz.
        </p>

        <a
          href="#contact"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Ücretsiz Ön Görüşme Talep Et
        </a>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Neleri otomatikleştiriyoruz?</h2>

            <p className="mt-3 text-slate-600">
              Tekrarlayan operasyonel süreçlerinizi daha hızlı ve sürdürülebilir
              hale getiriyoruz.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Raporlama Otomasyonu</h3>
              <p className="mt-3 text-slate-600">
                Excel ve farklı veri kaynaklarından düzenli olarak hazırlanan
                raporları otomatik hale getirin.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">E-posta Otomasyonu</h3>
              <p className="mt-3 text-slate-600">
                Tekrarlayan bilgilendirme, takip ve bildirim e-postalarını
                otomatikleştirin.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Veri Entegrasyonu</h3>
              <p className="mt-3 text-slate-600">
                Farklı uygulamalar arasında manuel veri aktarma ihtiyacını
                azaltın.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Nasıl çalışır?</h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-lg font-bold text-blue-600">01</p>
              <h3 className="mt-2 text-xl font-semibold">Süreci Anlıyoruz</h3>
              <p className="mt-2 text-slate-600">
                Zaman alan ve tekrarlanan işleri birlikte belirliyoruz.
              </p>
            </div>

            <div>
              <p className="text-lg font-bold text-blue-600">02</p>
              <h3 className="mt-2 text-xl font-semibold">Çözümü Tasarlıyoruz</h3>
              <p className="mt-2 text-slate-600">
                İhtiyacınıza uygun otomasyon akışını oluşturuyoruz.
              </p>
            </div>

            <div>
              <p className="text-lg font-bold text-blue-600">03</p>
              <h3 className="mt-2 text-xl font-semibold">Devreye Alıyoruz</h3>
              <p className="mt-2 text-slate-600">
                Çözümü test ederek kullanılabilir hale getiriyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-slate-900 py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold">
              Sürecinizi birlikte otomatikleştirelim.
            </h2>

            <p className="mt-4 text-slate-300">
              İhtiyacınızı kısaca anlatın. Size uygun çözümü değerlendirelim.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl bg-white p-7 text-slate-900"
          >
            <div>
              <label htmlFor="name" className="mb-2 block font-medium">
                İsim
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                minLength={2}
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                placeholder="Deniz Test"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block font-medium">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                placeholder="deniz.test@example.com"
              />
            </div>

            <div>
              <label htmlFor="service" className="mb-2 block font-medium">
                Hizmet
              </label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="">Hizmet seçin</option>
                <option value="reporting">Raporlama Otomasyonu</option>
                <option value="email">E-posta Otomasyonu</option>
                <option value="integration">Veri Entegrasyonu</option>
                <option value="custom">Özel Otomasyon</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="mb-2 block font-medium">
                Açıklama
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={1000}
                rows={5}
                className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                placeholder="Otomatikleştirmek istediğiniz süreci kısaca anlatın..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Gönderiliyor..." : "Talep Gönder"}
            </button>

            {status === "success" && (
              <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                {message}
              </p>
            )}

            {status === "error" && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {message}
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="bg-black py-8 text-center text-sm text-slate-400">
        FlowPilot — Demo teknoloji hizmeti
      </footer>
    </main>
  );
}