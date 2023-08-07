import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://wbpnxdfjceyxeopmzsgy.supabase.co';
export const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndicG54ZGZqY2V5eGVvcG16c2d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1MzIzMDksImV4cCI6MjAwNTEwODMwOX0.Bb8g-hvq8HP43BaMd1lBJLHr4shR6SrPRPIqQX8OTtc';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
