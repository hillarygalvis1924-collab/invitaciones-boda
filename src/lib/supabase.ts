import { createClient } from '@supabase/supabase-js'

export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key || url.includes('TU-PROYECTO')) {
    throw new Error(
      'Supabase no está configurado. Rellena NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local',
    )
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  })
}
