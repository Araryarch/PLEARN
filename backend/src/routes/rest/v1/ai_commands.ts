import { Router, Request, Response, NextFunction } from 'express';
import { supabase } from '../../../services/supabaseClient';
import { AICommand } from '../../../types/db';

const router = Router();

// GET /rest/v1/ai_commands
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await supabase.from('ai_commands').select('*').limit(200);
    if (error) throw error;
    res.json(data ?? []);
  } catch (err) {
    next(err);
  }
});

// POST /rest/v1/ai_commands
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body as Partial<AICommand>;
    if (!payload.raw_text) return res.status(400).json({ error: { message: 'raw_text is required' } });
    const { data, error } = await supabase.from('ai_commands').insert(payload).select();
    if (error) throw error;
    res.status(201).json(data?.[0] ?? null);
  } catch (err) {
    next(err);
  }
});

export default router;
