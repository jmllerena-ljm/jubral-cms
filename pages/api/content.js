
import fs from 'fs'; import path from 'path'
export default function handler(req,res){
  if(req.method!=='GET') return res.status(405).end('Method Not Allowed')
  const p = path.join(process.cwd(),'content','site.json')
  try{ res.setHeader('Cache-Control','no-store'); res.status(200).json(JSON.parse(fs.readFileSync(p,'utf-8'))) }
  catch(e){ res.status(500).json({error:e.message}) }
}
