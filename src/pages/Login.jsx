import { supabase } from '../lib/supabaseClient'

const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert('Login failed: ' + error.message)
  } else {
    console.log('Logged in:', data)
    navigate('/dashboard')
  }
}
