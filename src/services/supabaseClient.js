import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } catch (e) {
    console.error('Failed to initialize Supabase client:', e)
  }
} else {
  console.warn('Supabase URL or Anon Key is missing. Database features will be disabled. Please check your .env file.')
}

export default supabase
