import { Client, Databases, ID } from 'node-appwrite';
import { OpenAI } from 'openai';
import { getStaticFile, throwIfMissing } from './utils.js';

export default async ({ req, res, log, error }) => {
  throwIfMissing(process.env, ['OPENAI_API_KEY']);

  if (req.method === 'GET') {
    return res.send(getStaticFile('index.html'), 200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
  }

  else if (req.method === 'POST') {
    if(req.path === '/') {
      try {
        throwIfMissing(req.bodyJson, ['name']);
      } catch (err) {
        error(err.message);
        return res.json({ ok: false, error: err.message }, 400);
      }
    
      const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
    
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-4o',
          max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS ?? '512'),
          messages: [{ role: 'user', content: `Write a romantic Valentine\'s Day sonnet dedicated to ${req.bodyJson.name}` }],
        });
        const completion = response.choices[0].message?.content;
        log(completion);
        return res.json({ ok: true, completion }, 200);
      } catch (err) {
        error(err.message);
        return res.json({ ok: false, error: err.message }, 500);
      }
    }

    else if (req.path === '/message') {
      try {
        throwIfMissing(req.bodyJson, ['senderName', 'senderEmail', 'receiverName', 'receiverEmail', 'message']);
        
        const appwriteClient = new Client()
          .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
          .setKey(req.headers['x-appwrite-key']);

        const appwriteDatabases = new Databases(appwriteClient);

        const { senderName, senderEmail, receiverName, receiverEmail, message } = req.bodyJson;

        const savedMessage = await appwriteDatabases.createDocument(
          'messages',
          'emails',
          ID.unique(),
          {
            senderName,
            senderEmail,
            receiverName,
            receiverEmail,
            message
          }
        );

        return res.json({ ok: true, data: savedMessage });

      } catch (err) {
        error(err.message);
        return res.json({ ok: false, error: err.message }, 400);
      }
    }
  }
};
