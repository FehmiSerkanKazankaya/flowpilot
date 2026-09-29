import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const allowedServices = [
  "reporting",
  "email",
  "integration",
  "custom",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const service = body.service;
    const description = body.description?.trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "İsim en az 2 karakter olmalıdır." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Geçerli bir e-posta adresi girin." },
        { status: 400 }
      );
    }

    if (!allowedServices.includes(service)) {
      return NextResponse.json(
        { error: "Geçerli bir hizmet seçin." },
        { status: 400 }
      );
    }

    if (
      !description ||
      description.length < 10 ||
      description.length > 1000
    ) {
      return NextResponse.json(
        { error: "Açıklama 10 ile 1000 karakter arasında olmalıdır." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("service_requests")
      .insert({
        name,
        email,
        service,
        description,
      });

    if (error) {
      console.error("Supabase insert error:", error);

      return NextResponse.json(
        { error: "Talebiniz kaydedilemedi. Lütfen tekrar deneyin." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Talebiniz başarıyla kaydedildi." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Request error:", error);

    return NextResponse.json(
      { error: "Beklenmeyen bir hata oluştu." },
      { status: 500 }
    );
  }
}