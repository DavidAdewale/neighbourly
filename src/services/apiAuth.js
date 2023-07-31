import supabase, { supabaseUrl } from './supabase';

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        avatar_url: '',
        avatar: '',
        email,
        full_name: fullName,
        name: fullName,
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

export async function updateUserData({ password, fullName, avatar }) {
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { full_name: fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  const fileName = `avatar=${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);
  console.log(updatedUser);
  return updatedUser;
}
