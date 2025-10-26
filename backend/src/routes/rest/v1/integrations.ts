import { Router, Request, Response, NextFunction } from 'express';
import { supabase } from '../../../services/supabaseClient';
import { Integration } from '../../../types/db';

const router = Router();

// GET /rest/v1/integrations
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id } = req.query;
    let query = supabase.from('integrations').select('*').limit(100);
    if (user_id) query = query.eq('user_id', String(user_id));
    const { data, error } = await query;
    if (error) throw error;
    res.json(data ?? []);
  } catch (err) {
    next(err);
  }
});

// POST /rest/v1/integrations
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body as Partial<Integration>;
    if (!payload.provider) return res.status(400).json({ error: { message: 'provider is required' } });
    const { data, error } = await supabase.from('integrations').insert(payload).select();
    if (error) throw error;
    res.status(201).json(data?.[0] ?? null);
  } catch (err) {
    next(err);
  }
});

export default router;
