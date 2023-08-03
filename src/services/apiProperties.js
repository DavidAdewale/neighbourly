import supabase from './supabase';

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
