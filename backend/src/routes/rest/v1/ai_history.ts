import { Router, Request, Response, NextFunction } from 'express';
import { supabase } from '../../../services/supabaseClient';
import { AIHistory } from '../../../types/db';

const router = Router();

// GET /rest/v1/ai_history
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id } = req.query;
    let query = supabase.from('ai_history').select('*').order('created_at', { ascending: false }).limit(200);
    if (user_id) query = query.eq('user_id', String(user_id));
    const { data, error } = await query;
    if (error) throw error;
    res.json(data ?? []);
  } catch (err) {
    next(err);
  }
});

// POST /rest/v1/ai_history
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body as Partial<AIHistory>;
    if (!payload.query) return res.status(400).json({ error: { message: 'query is required' } });
    const { data, error } = await supabase.from('ai_history').insert(payload).select();
    if (error) throw error;
    res.status(201).json(data?.[0] ?? null);
  } catch (err) {
    next(err);
  }
});

export default router;
