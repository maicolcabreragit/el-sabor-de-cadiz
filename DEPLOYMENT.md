# 🚀 Despliegue en Vercel - El Sabor de Cádiz

## Opción 1: Despliegue desde GitHub (Recomendado)

### 1. Subir a GitHub
```bash
# Inicializar repositorio Git
git init
git add .
git commit -m "Initial commit: Página web El Sabor de Cádiz"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/tu-usuario/el-sabor-de-cadiz.git
git branch -M main
git push -u origin main
```

### 2. Conectar con Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "New Project"
4. Importa el repositorio `el-sabor-de-cadiz`
5. Vercel detectará automáticamente que es un sitio estático
6. Haz clic en "Deploy"

## Opción 2: Despliegue directo con Vercel CLI

### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

### 2. Iniciar sesión
```bash
vercel login
```

### 3. Desplegar
```bash
# Desde la carpeta del proyecto
vercel

# Para producción
vercel --prod
```

## Opción 3: Drag & Drop (Más Rápido)

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión
3. Arrastra la carpeta del proyecto directamente a la interfaz
4. Vercel desplegará automáticamente

## ⚙️ Configuración Post-Despliegue

### 1. Dominio Personalizado (Opcional)
- Ve a Project Settings > Domains
- Añade tu dominio personalizado
- Configura los registros DNS según las instrucciones

### 2. Variables de Entorno (Si necesitas)
- Ve a Project Settings > Environment Variables
- Añade variables como:
  - `GOOGLE_MAPS_API_KEY`
  - `WHATSAPP_NUMBER`
  - `EMAIL_CONTACT`

### 3. Analytics (Recomendado)
- Ve a Project Settings > Analytics
- Activa Vercel Analytics para métricas de rendimiento

## 📁 Estructura del Proyecto

```
el-sabor-de-cadiz/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
├── vercel.json         # Configuración Vercel
├── package.json        # Dependencias
├── .gitignore          # Archivos a ignorar
├── README.md           # Documentación
├── DEPLOYMENT.md       # Este archivo
└── images/             # Carpeta de imágenes (crear)
    └── portfolio/
        └── project1.webp
```

## 🔧 Antes del Despliegue

### 1. Crear carpeta de imágenes
```bash
mkdir -p images/portfolio
```

### 2. Añadir imágenes
- Coloca `project1.webp` en `images/portfolio/`
- Crea `og-image.jpg` (1200x630px) para Open Graph

### 3. Verificar configuración
- Revisa que todos los enlaces funcionen
- Verifica la información de contacto
- Prueba el formulario de reservas

## 🌐 URLs de Despliegue

Después del despliegue tendrás:
- **URL de producción**: `https://el-sabor-de-cadiz.vercel.app`
- **URL de preview**: `https://el-sabor-de-cadiz-git-main.vercel.app`

## 📊 Monitoreo

### Core Web Vitals
Vercel Analytics te mostrará:
- LCP (Largest Contentful Paint)
- FID (First Input Delay)  
- CLS (Cumulative Layout Shift)

### Métricas SEO
- Tiempo de carga
- Tamaño de página
- Optimización móvil

## 🔄 Actualizaciones Futuras

### Para actualizar el sitio:
```bash
# Hacer cambios en el código
git add .
git commit -m "Descripción del cambio"
git push origin main

# Vercel desplegará automáticamente
```

### Para cambios manuales:
1. Ve a tu proyecto en Vercel
2. Haz clic en "Redeploy"
3. O usa `vercel --prod` desde CLI

## 🚨 Solución de Problemas

### Error: "Build Failed"
- Verifica que `index.html` esté en la raíz
- Revisa la sintaxis de `vercel.json`

### Error: "404 Not Found"
- Verifica que las rutas en `vercel.json` sean correctas
- Asegúrate de que todos los archivos estén subidos

### Error: "Images not loading"
- Verifica las rutas de las imágenes
- Asegúrate de que la carpeta `images/` esté incluida

## 📞 Soporte

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

**¡Tu restaurante estará online en minutos!** 🍽️✨

