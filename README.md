
# Jubral — One (Next.js + CMS con GitHub)

Sitio estilo "jubral-one" con colores de marca y un admin en `/admin` que permite:
- Descargar `site.json`
- **Guardar directamente en GitHub** (requiere variables de entorno).

## Variables de entorno (Vercel o `.env.local`)
- `GITHUB_TOKEN`  → PAT con permiso **Contents: Read & write**
- `GITHUB_OWNER`  → dueño del repo (usuario/org), p.ej. `jmllerena-ljm`
- `GITHUB_REPO`   → nombre del repo
- `GITHUB_BRANCH` → rama, p.ej. `main`
- `CONTENT_PATH`  → ruta del archivo a versionar: `content/site.json`
- `CMS_WRITE_TOKEN` → token que debes ingresar en `/admin` para autorizar el guardado
- (opcionales) `COMMITTER_NAME`, `COMMITTER_EMAIL`

## Desarrollo
```bash
npm install
npm run dev
```

## Producción
```bash
npm run build
npm start
```

## Flujo en /admin
1. Carga el contenido actual (local o desde GitHub si no existe local).
2. Edita el JSON.
3. Ingresa el **CMS write token** (debe coincidir con la env).
4. Presiona **Save to GitHub**: hace `PUT` al `CONTENT_PATH` en tu repo y rama.
