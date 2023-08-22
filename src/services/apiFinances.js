import supabase from './supabase';

export async function getFinances({ id, categoryStatus, sort }) {
  let query = supabase
    .from('propertyFinancials')
    .select()
    .eq('property_id', id);

  //filter
  if (categoryStatus)
    query = query.eq(categoryStatus.field, categoryStatus.value);

  // SORT;
  if (sort)
    query = query.order(sort.field, {
      ascending: sort.direction === 'asc',
    });

  const { data: finances, error } = await query;

  if (error) throw new Error('Could not fetch data');

  return finances;
}

export async function updateFinance(data, id) {
  const { error } = await supabase
    .from('propertyFinancials')
    .update(data)
    .eq('id', id);

  if (error) console.log(error.message);
}

export async function uploadFinance(data) {
  const { error } = await supabase.from('propertyFinancials').insert(data);
  if (error) throw new Error(error.message);
}

export async function deleteRecord(id) {
  const { error } = await supabase
    .from('propertyFinancials')
    .delete()
    .eq('id', id);
  if (error) console.log(error.message);
}
