import supabase from '../services/supabase';
import dummyProperties from './propertiesData';

async function deleteProperties() {
  const { error } = await supabase.from('properties').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function createProperties(id) {
  const properties = dummyProperties.map((property) => {
    return {
      ...property,
      propertyImage: JSON.stringify(property.propertyImage),
      propertyDetails: JSON.stringify(property.propertyDetails) || null,
      user_id: id,
    };
  });

  const { data, error } = await supabase.from('properties').insert(properties);
  if (error) console.log(error.message);
  console.log(data);
  //   return data;
}

async function handleCreateProperties(id) {
  await deleteProperties();
  await createProperties(id);
}

export { handleCreateProperties, deleteProperties };
