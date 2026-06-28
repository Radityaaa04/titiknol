import { redirect } from "next/navigation";

export default function RootPage() {
  // Pengalihan otomatis ke rute IDR (Lokal/UMKM) sebagai default
  redirect("/id");
}
