import { Router, Request, Response, NextFunction } from 'express';
import { supabase } from '../../../services/supabaseClient';
import { Plan } from '../../../types/db';

const router = Router();

// GET /rest/v1/plans - optionally ?user_id=...
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id } = req.query;
  let query = supabase.from('plans').select('id,user_id,title,description,start_time,end_time,created_at,updated_at');
  if (user_id) query = query.eq('user_id', String(user_id));
  const { data, error } = await query.limit(200);
    if (error) throw error;
    res.json(data ?? []);
  } catch (err) {
    next(err);
  }
});

// POST /rest/v1/plans
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body as Partial<Plan>;
    if (!payload.title) return res.status(400).json({ error: { message: 'title is required' } });
    // insert with provided user_id if available
  const { data, error } = await supabase.from('plans').insert(payload).select();
    if (error) throw error;
    res.status(201).json(data?.[0] ?? null);
  } catch (err) {
    next(err);
  }
});

// PATCH /rest/v1/plans/:id
router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updated_at: new Date().toISOString() } as Partial<Plan>;
  const { data, error } = await supabase.from('plans').update(updates).eq('id', id).select().single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// DELETE /rest/v1/plans/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('plans').delete().eq('id', id);
    if (error) throw error;
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
