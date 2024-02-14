import { OpenAI } from 'openai';
import { getStaticFile, throwIfMissing } from './utils.js';

export default async ({ req, res, log, error }) => {
  throwIfMissing(process.env, ['OPENAI_API_KEY']);

  if (req.method === 'GET') {
    return res.send(getStaticFile('index.html'), 200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
  }

  try {
    throwIfMissing(req.body, ['name']);
  } catch (err) {
    error(err.message);
    return res.json({ ok: false, error: err.message }, 400);
  }

  const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS ?? '512'),
      messages: [{ role: 'user', content: `Write a romantic Valentine\'s Day sonnet dedicated to ${req.body.name}` }],
    });
    const completion = response.choices[0].message?.content;
    log(completion);
    return res.json({ ok: true, completion }, 200);
  } catch (err) {
    error(err.message);
    return res.json({ ok: false, error: err.message }, 500);
  }
};
