
import fs from 'fs'
import path from 'path'

export default async function handler(req, res){
  const p = path.join(process.cwd(),'content','site.json')

  // helpers
  const GH_TOKEN = process.env.GITHUB_TOKEN || process.env.TOKEN
  const OWNER    = process.env.GITHUB_OWNER || process.env.OWNER
  const REPO     = process.env.GITHUB_REPO  || process.env.REPO
  const BRANCH   = process.env.GITHUB_BRANCH || process.env.BRANCH || 'main'
  const FILEPATH = process.env.CONTENT_PATH || 'content/site.json'

  async function readFromGitHub(){
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(FILEPATH)}?ref=${encodeURIComponent(BRANCH)}`
    const r = await fetch(url,{ headers:{
      'Accept':'application/vnd.github+json',
      ...(GH_TOKEN ? {'Authorization':`Bearer ${GH_TOKEN}`} : {})
    }})
    if(!r.ok) throw new Error(`GitHub GET ${r.status}`)
    const j = await r.json()
    return Buffer.from(j.content,'base64').toString('utf-8')
  }

  if(req.method==='GET'){
    // 1) try local
    try{
      const raw = fs.readFileSync(p,'utf-8')
      res.setHeader('Cache-Control','no-store')
      return res.status(200).json(JSON.parse(raw))
    }catch(e1){
      try{
        const raw = await readFromGitHub()
        res.setHeader('Cache-Control','no-store')
        return res.status(200).json(JSON.parse(raw))
      }catch(e2){
        return res.status(500).json({error:e2.message})
      }
    }
  }

  if(req.method==='POST'){
    // simple auth
    if(!process.env.CMS_WRITE_TOKEN || req.headers['x-cms-token'] !== process.env.CMS_WRITE_TOKEN){
      return res.status(401).json({error:'Unauthorized'})
    }
    try{
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const contentStr = body.content && (typeof body.content === 'string' ? body.content : JSON.stringify(body.content,null,2))
      const message = body.message || 'chore(cms): update content'
      if(!contentStr) return res.status(400).json({error:'Missing content'})

      // get current SHA (if exists)
      const metaUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(FILEPATH)}?ref=${encodeURIComponent(BRANCH)}`
      let sha = undefined
      try{
        const r0 = await fetch(metaUrl,{ headers:{'Authorization':`Bearer ${GH_TOKEN}`,'Accept':'application/vnd.github+json'} })
        if(r0.ok){ const j0 = await r0.json(); sha = j0.sha }
      }catch{}

      const put = await fetch(metaUrl, {
        method:'PUT',
        headers:{
          'Authorization':`Bearer ${GH_TOKEN}`,
          'Accept':'application/vnd.github+json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          message,
          content: Buffer.from(contentStr,'utf-8').toString('base64'),
          branch: BRANCH,
          ...(sha ? {sha} : {}),
          committer:{ name: process.env.COMMITTER_NAME || 'cms-bot', email: process.env.COMMITTER_EMAIL || 'cms-bot@example.com' }
        })
      })
      const data = await put.json()
      if(!put.ok) return res.status(put.status).json({error:data?.message || 'GitHub error', details:data})
      return res.status(200).json({ok:true, url:data?.content?.html_url || data?.commit?.html_url})
    }catch(e){
      return res.status(500).json({error:e.message})
    }
  }

  res.setHeader('Allow','GET, POST')
  return res.status(405).end('Method Not Allowed')
}
