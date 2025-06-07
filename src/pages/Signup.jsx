import { supabase } from '../lib/supabaseClient'

const handleSignup = async () => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    alert('Signup failed: ' + error.message)
  } else {
    console.log('Signup success:', data)
    navigate('/dashboard')
  }
}
