import { PAGE_SIZE } from '../utilities/config';
import supabase from './supabase';

export async function getFinances({
  id,
  categoryStatus,
  sort,
  timeInterval,
  page,
  fetchAll,
}) {
  let query = supabase
    .from('propertyFinancials')
    .select('*', { count: 'exact' });

  //if id is an array
  if (Array.isArray(id)) query = query.in('property_id', id);

  //if id is a single number
  if (typeof id === 'number') query = query.eq('property_id', id);

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

  //page
  if (!fetchAll && page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data: finances, error, count } = await query;

  if (error) throw new Error('Could not fetch data');

  return { finances, count };
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
