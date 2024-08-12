// See https://kit.svelte.dev/docs/types#app

import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient;
      safeGetSession: () => Promise<{ session: any; user: any }>
    }
    interface PageData {
      session: Session | null;
      user?: User | null;
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export { };
