import { AuthResponse, OAuthResponse, UserResponse, createClient } from '@supabase/supabase-js'
import { Database, Row, InsertDto, UpdateDto } from './SupabaseTypes'
const baseUrl = "http://localhost:3000"

export const supabase = createClient<Database>("https://qaizoawxwaawilfvmhdm.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhaXpvYXd4d2Fhd2lsZnZtaGRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQzNzcyNjMsImV4cCI6MjAwOTk1MzI2M30.pj_dyra5RtrphnfApxRp82txRRmQ95Eaiq_-V6DxdRA")

export async function signUp (email: string, password: string): Promise<AuthResponse> {
    return await supabase.auth.signUp({
        email: email,
        password: password,
    })
}

export async function signIn (email: string, password: string): Promise<AuthResponse> {
    return await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
}

export async function googleButton (): Promise<OAuthResponse> {
    return await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: baseUrl + '/dashboard',
          },
      })
}

export async function getSession (): Promise<any> {
    return await supabase.auth.getSession()
}

export async function logout () {
   await supabase.auth.signOut()
}

export async function sendResetEmail(email: string): Promise<any> {
   return await supabase.auth.resetPasswordForEmail(email, { redirectTo: baseUrl + '/resetpassword'})
}

export async function resetPassword(new_password: string): Promise<UserResponse> {
    return await supabase.auth.updateUser({ password: new_password })
}

export async function getEntities(): Promise<Row<'Entities'>[]> {
    let { data, error } = await supabase
        .from('Entities')
        .select('*')

    if (data) {
        return data
    }
    else {
        return []
    }
}

export async function createEntity(name: string): Promise<any> {
    return await supabase
        .from('Entities')
        .insert([{name: name}])
        .select();
}

export async function deleteEntity(id: number) {
    return await supabase 
        .from('Entities')
        .delete()
        .eq('id', id)
}


export async function renameEntity(id: number, newName: string) {
    return await supabase 
        .from('Entities')
        .update({name: newName})
        .eq('id', id)
}