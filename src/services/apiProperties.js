import supabase from './supabase';

export async function getProperties(id) {
  const { data, error } = await supabase
    .from('properties')
    .select()
    .eq('user_id', id);

  if (error) throw new Error('Could not fetch data');

  const properties = data.map((property) => {
    return {
      ...property,
      propertyDetails: JSON.parse(property.propertyDetails) || null,
      propertyImage: JSON.parse(property.propertyImage),
    };
  });

  return properties;
}
