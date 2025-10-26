import 'dotenv/config';
import { supabase } from '../src/services/supabaseClient';

async function main() {
  console.log('Starting seed...');

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('Warning: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set in environment. The seed may fail.');
  }

  try {
    // 1) Insert a plan (user_id left null to avoid auth FK requirement)
    const planPayload = {
      title: 'Sample Study Plan',
      description: 'A seeded sample plan to try the API',
      start_time: new Date().toISOString(),
      end_time: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
      user_id: null,
    };

    const { data: planData, error: planError } = await supabase
      .from('plans')
      .insert([planPayload])
      .select('*');

    if (planError) throw planError;
    const plan = planData?.[0];
    console.log('Inserted plan:', plan?.id);

    // 2) Insert an integration
    const integrationPayload = {
      provider: 'google',
      access_token: 'seed-access-token-123',
      refresh_token: 'seed-refresh-token-abc',
      token_expiry: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      user_id: null,
    };

    const { data: integrationsData, error: integrationsError } = await supabase
      .from('integrations')
      .insert([integrationPayload])
      .select('*');

    if (integrationsError) throw integrationsError;
    console.log('Inserted integration id:', integrationsData?.[0]?.id);

    // 3) Insert an AI command
    const aiCommandPayload = {
      raw_text: 'Generate a 5-point study checklist for Linear Algebra',
      parsed_action: 'generate_checklist',
      parsed_content: { topic: 'Linear Algebra', points: 5 },
      user_id: null,
    };

    const { data: aiCommandsData, error: aiCommandsError } = await supabase
      .from('ai_commands')
      .insert([aiCommandPayload])
      .select('*');

    if (aiCommandsError) throw aiCommandsError;
    console.log('Inserted ai_command id:', aiCommandsData?.[0]?.id);

    // 4) Insert an AI history item tied to the plan we created
    const aiHistoryPayload = {
      query: 'What should I cover next in my study plan?',
      response: 'Focus on practice problems from chapters 2 and 3.',
      related_plan_id: plan?.id ?? null,
      user_id: null,
    };

    const { data: aiHistoryData, error: aiHistoryError } = await supabase
      .from('ai_history')
      .insert([aiHistoryPayload])
      .select('*');

    if (aiHistoryError) throw aiHistoryError;
    console.log('Inserted ai_history id:', aiHistoryData?.[0]?.id);

    console.log('\nSeeding complete.');
    console.log('Plan id for testing:', plan?.id);
    console.log('Integration id for testing:', integrationsData?.[0]?.id);
    console.log('AI command id for testing:', aiCommandsData?.[0]?.id);
    console.log('AI history id for testing:', aiHistoryData?.[0]?.id);

    console.log('\nNotes:');
    console.log('- `profiles` table is linked to `auth.users` and requires a real Supabase Auth user id to insert; it was not seeded here.');
    console.log('- If your Supabase instance enforces Row Level Security (RLS), run this script using the service role key (set SUPABASE_SERVICE_ROLE_KEY in your env).');

  } catch (err) {
    console.error('Seeding failed:', err);
    process.exitCode = 1;
  }
}

main();
