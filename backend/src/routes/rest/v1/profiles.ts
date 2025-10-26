import { Router, Request, Response, NextFunction } from 'express';
import { supabase } from '../../../services/supabaseClient';
import { Profile } from '../../../types/db';

const router = Router();

// GET /rest/v1/profiles - list or fetch by ?id=
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.query;
    if (id) {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', String(id)).single();
      if (error) throw error;
      return res.json(data as Profile);
    }
    const { data, error } = await supabase.from('profiles').select('*').limit(100);
    if (error) throw error;
    res.json(data ?? []);
  } catch (err) {
    next(err);
  }
});

// PATCH /rest/v1/profiles/:id
router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const { data, error } = await supabase.from('profiles').update(updates).eq('id', id).select().single();
    if (error) throw error;
    res.json(data as Profile);
  } catch (err) {
    next(err);
  }
});

export default router;
