import supabase from './supabase';

export async function getFinances({ id, categoryStatus, sort, timeInterval }) {
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

  //Interval
  if (timeInterval && timeInterval !== 'all')
    query = query
      .gte('transactionDate', timeInterval.startDate)
      .lte('transactionDate', timeInterval.endDate);

  const { data: finances, error } = await query;

  if (error) throw new Error('Could not fetch data');

  return finances;
}

export async function getAllFinanceRecords(id) {
  const { data, error } = await supabase
    .from('propertyFinancials')
    .select()
    .eq('property_id', id);
  if (error) throw new Error('Could not fetch data');
  return data;
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
