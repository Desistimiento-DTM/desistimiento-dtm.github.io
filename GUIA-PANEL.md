# Guía: activar el panel de administración

Al terminar tendrás:

- El sitio publicado en Netlify (gratis).
- Un panel en **tusitio.com/admin** para cambiar textos, imágenes, servicios, testimonios,
  artículos del blog, datos de contacto y textos legales, sin tocar código.

Se hace **una sola vez** y toma unos 20–30 minutos.

---

## Paso 1. Crear la cuenta de GitHub

GitHub es donde queda guardado el sitio. Cada cambio que hagas en el panel se guarda ahí.

1. Entra a **github.com** y crea una cuenta gratuita.

## Paso 2. Subir el proyecto a GitHub

1. En GitHub, pulsa **+** (arriba a la derecha) → **New repository**.
2. Nombre: `desistimiento-web`. Puedes marcarlo como **Private**. Pulsa **Create repository**.
3. En la página que aparece, pulsa el enlace **uploading an existing file**.
4. Descomprime `desistimiento-web.zip` en tu computador, abre la carpeta `desistimiento-web`,
   selecciona **todo su contenido** (no la carpeta, lo que hay dentro) y arrástralo a la página.
5. Espera a que terminen de cargar los archivos y pulsa **Commit changes**.

## Paso 3. Indicar el repositorio al panel

1. En GitHub, dentro de tu repositorio, abre `public` → `admin` → `config.yml`.
2. Pulsa el lápiz (**Edit this file**).
3. En la línea `repo:` cambia `USUARIO-GITHUB/NOMBRE-REPOSITORIO` por tu usuario y el nombre
   del repositorio. Ejemplo: `repo: salo123/desistimiento-web`
4. Pulsa **Commit changes**.

## Paso 4. Publicar el sitio en Netlify

1. Entra a **netlify.com** y crea una cuenta con la opción **Sign up with GitHub**.
2. Pulsa **Add new site** (o **Add new project**) → **Import an existing project** → **GitHub**.
3. Autoriza el acceso y elige el repositorio `desistimiento-web`.
4. Netlify detecta la configuración sola. Pulsa **Deploy**.
5. En 1–2 minutos tendrás una dirección del tipo `nombre-aleatorio.netlify.app`.
   Puedes cambiarla en **Site configuration → Change site name**.

## Paso 5. Activar el inicio de sesión del panel

El panel usa tu cuenta de GitHub para saber que eres tú.

**En GitHub:**
1. Foto de perfil → **Settings** → **Developer settings** (al final del menú izquierdo) →
   **OAuth Apps** → **New OAuth App**.
2. Completa:
   - **Application name:** Panel sitio web
   - **Homepage URL:** la dirección de tu sitio en Netlify, ej. `https://misitio.netlify.app`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
3. Pulsa **Register application**.
4. Copia el **Client ID**. Luego pulsa **Generate a new client secret** y copia el secreto
   (solo se muestra una vez).

**En Netlify:**
1. Entra a tu sitio → **Site configuration** → **Access & security** (en algunas cuentas aparece
   como **Access control**) → **OAuth**.
2. En **Authentication providers** pulsa **Install provider** → **GitHub**.
3. Pega el **Client ID** y el **Client secret** y pulsa **Install**.

## Paso 6. Entrar al panel

1. Abre `https://tu-sitio.netlify.app/admin/`
2. Pulsa **Iniciar sesión con GitHub** y autoriza.
3. ¡Listo! Ya ves el panel.

---

## Cómo hacer cambios

1. Entra a `/admin/` y elige una sección en la izquierda:
   - **Ajustes generales:** nombre, logo, WhatsApp, correo, ciudad, datos para Google.
   - **Página de inicio:** cada sección de la página principal, en orden (1 a 9).
   - **Artículos del blog:** crear, editar o despublicar artículos.
   - **Textos legales:** privacidad, tratamiento de datos, términos.
2. Edita los campos. Para imágenes, pulsa **Elige una imagen** → **Subir** y escoge el archivo.
3. Pulsa **Publicar** → **Publicar ahora**.
4. Netlify actualiza el sitio en **1–2 minutos**. Recarga la página para ver el cambio.

### Recomendaciones para imágenes

- Fotos en JPG o WebP, de 1600 px de ancho como máximo y menos de 400 KB
  (puedes reducirlas gratis en **squoosh.app**).
- Escribe siempre la **descripción de la imagen**: ayuda en Google y a personas con lectores de pantalla.

### Si algo sale mal

Cada cambio queda guardado en GitHub con su historial. Si una publicación deja algo mal,
se puede volver a la versión anterior desde Netlify (**Deploys** → elegir una publicación anterior →
**Publish deploy**).

---

## Dominio propio (cuando lo tengas)

En Netlify: **Domain management** → **Add a domain** y sigue las instrucciones.
Luego actualiza el campo **Dominio del sitio** en **Ajustes generales** del panel y,
en GitHub → OAuth App, la **Homepage URL**.

## Para desarrolladores: probar el panel en el computador

```bash
npm install
npx decap-server      # en una terminal
npm run dev           # en otra terminal
```

Abre `http://localhost:5173/admin/index.html`. Los cambios se guardan directamente en los
archivos de `src/content/`.
