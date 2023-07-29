import supabase from './supabase';

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });
  if (error) throw new Error('Email or password incorrect');
  return data;
}

export async function signin({ email, password }) {
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error('Email or password incorrect');
  console.log(user);
  return user;
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // console.log(user);
  return user;
}

export async function loginWithGoogle() {
  const { data: user, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  if (error) throw new Error("Couldn't log you in");
  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Couldn't log you out");
}
