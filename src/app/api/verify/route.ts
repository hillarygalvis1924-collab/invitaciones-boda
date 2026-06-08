import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // solo servidor, salta RLS
);

export async function POST(req: NextRequest) {
  const { token, deviceId } = await req.json();
  if (!token || !deviceId)
    return NextResponse.json({ allowed: false, reason: "missing" }, { status: 400 });

  const { data: inv, error } = await supabase
    .from("invitations").select("*").eq("token", token).single();
  if (error || !inv)
    return NextResponse.json({ allowed: false, reason: "not_found" }, { status: 404 });

  const guest = { name: inv.guest_name, message: inv.mensaje ?? "", cupos: inv.party_size };

  if (!inv.device_id) { // nunca abierta → este dispositivo la reclama
    await supabase.from("invitations").update({
      device_id: deviceId, first_opened_at: new Date().toISOString(), open_count: 1,
    }).eq("id", inv.id);
    return NextResponse.json({ allowed: true, guest });
  }
  if (inv.device_id === deviceId) { // mismo dispositivo → permitido
    await supabase.from("invitations").update({ open_count: inv.open_count + 1 }).eq("id", inv.id);
    return NextResponse.json({ allowed: true, guest });
  }
  // otro dispositivo → bloqueo suave
  return NextResponse.json({ allowed: false, reason: "other_device", guest: { name: inv.guest_name } });
}
