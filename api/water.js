import { createClient } from '@supabase/supabase-js';
const supabase = createClient(supabaseUrl, supabaseKey);  // Data stored in database
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const { data, error } = await supabase
  .from('water_intake')           // Which table to query
  .select('*')                     // Get all columns
  .order('date', { ascending: false }); // Sort newest first

if (error) {
  return res.status(500).json({
    success: false,
    error: error.message
  });
}

return res.status(200).json({
  success: true,
  records: data,  // From database
  total: data.length
});

const { data, error } = await supabase
  .from('water_intake')
  .insert([                    // Insert new row
    {
      count,
      date,
      timestamp: new Date().toISOString()
    }
  ])
  .select()                    // Return the inserted record
  .single();                   // Expect only one record back

if (error) {
  return res.status(500).json({
    success: false,
    error: error.message
  });
}

return res.status(201).json({
  success: true,
  message: 'Water intake record added successfully',
  record: data
});

const { error } = await supabase
  .from('water_intake')
  .delete()
  .eq('id', id);  // Where id equals the provided id

if (error) {
  return res.status(500).json({
    success: false,
    error: error.message
  });
}

