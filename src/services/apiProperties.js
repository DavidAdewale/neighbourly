import Compressor from 'compressorjs';
import supabase, { supabaseUrl } from './supabase';

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

// export async function uploadImages(imgs, id) {
//   const compressedPromises = imgs.map(async (img) => {
//     const compressedResult = await new Promise((resolve, reject) => {
//       new Compressor(img, {
//         quality: 0.6,
//         success: resolve,
//         error: reject,
//       });
//     });

//     const fileName = `img=${id}-${Math.random()}`;
//     const { error: storageError } = await supabase.storage
//       .from('property-images')
//       .upload(fileName, compressedResult);

//     if (storageError) {
//       console.log(storageError.message);
//       throw new Error(storageError.message);
//     }

//     const imageUrl = `${supabaseUrl}/storage/v1/object/public/property-images/${fileName}`;
//     return imageUrl;
//   });

//   const compressedImages = await Promise.all(compressedPromises);
//   return compressedImages;
// }

export async function uploadImages(imgs, id) {
  const compressedImages = [];

  for (const img of imgs) {
    try {
      const compressedResult = await new Promise((resolve, reject) => {
        new Compressor(img, {
          quality: 0.6,
          success: resolve,
          error: reject,
        });
      });

      const fileName = `img=${id}-${Math.random()}`;
      const { error: storageError } = await supabase.storage
        .from('property-images')
        .upload(fileName, compressedResult);

      if (storageError) {
        console.log(storageError.message);
        throw new Error(storageError.message);
      }

      const imageUrl = `${supabaseUrl}/storage/v1/object/public/property-images/${fileName}`;
      compressedImages.push(imageUrl);
    } catch (error) {
      console.error('Error processing image:', error.message);
      throw error;
    }
  }

  return compressedImages;
}

export async function deleteImages(imgs) {
  imgs.forEach(async (img) => {
    const imgName = img.split('/').pop();
    const { error: deleteError } = await supabase.storage
      .from('property-images')
      .remove([imgName]);

    if (deleteError) {
      console.log('Error deleting image:', deleteError.message);
    }
  });
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
  // console.log(propertyToUpload);

  const { error } = await supabase.from('properties').insert(propertyToUpload);
  if (error) throw new Error(error.message);
  // return propertyToUpload;
}

export async function updateProperty(data, id) {
  const { error } = await supabase
    .from('properties')
    .update(data)
    .eq('id', id)
    .select();
  if (error) console.log(error.message);
}

export async function deleteProperty(id) {
  const { error } = await supabase.from('properties').delete().eq('id', id);
  if (error) console.log(error.message);
}
