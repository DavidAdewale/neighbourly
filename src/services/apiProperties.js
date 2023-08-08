import supabase, { supabaseKey, supabaseUrl } from './supabase';

export async function getProperties({
  id,
  occupancyStatus,
  propertyType,
  sortBy,
}) {
  let query = supabase.from('properties').select().eq('user_id', id);

  //FILTER
  if (occupancyStatus)
    query = query.eq(occupancyStatus.field, occupancyStatus.value);

  if (propertyType) query = query.eq(propertyType.field, propertyType.value);

  // SORT;
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });

  const { data, error } = await query;

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

async function uploadImages(imgs, id) {
  const imageArray = await Promise.all(
    imgs.map(async (img) => {
      const fileName = `img=${id}-${Math.random()}`;
      const { error: storageError } = await supabase.storage
        .from('property-images')
        .upload(fileName, img);

      if (storageError) {
        console.log(storageError.message);
        throw new Error(storageError.message);
      }
      return `${supabaseUrl}/storage/v1/object/public/property-images/${fileName}`;
    })
  );

  return await Promise.all(imageArray);
}

export async function uploadProperty(property) {
  const { propertyImage, user_id } = property;

  const imageArray = await uploadImages(propertyImage, user_id);
  const propertyToUpload = {
    ...property,
    propertyImage: JSON.stringify(imageArray),
    actualRentalIncome:
      property.paymentStatus === 'paid' ? property.expectedRentalIncome : null,
  };
  console.log(propertyToUpload);

  const { error } = await supabase.from('properties').insert(propertyToUpload);
  if (error) console.log(error.message);
  // return propertyToUpload;
}

export async function updateProperty(rowName, rowToUpdate, id) {
  const { data, error } = await supabase
    .from('properties')
    .update({ [rowName]: rowToUpdate })
    .eq('id', id)
    .select();

  if (error) console.log(error.message);

  return data;
}
