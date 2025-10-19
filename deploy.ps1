# Script de despliegue para El Sabor de Cádiz
# Ejecutar: .\deploy.ps1

Write-Host "🍽️ Desplegando El Sabor de Cádiz a Vercel..." -ForegroundColor Green

# Verificar si Vercel CLI está instalado
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI encontrado: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI no está instalado. Instalando..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error instalando Vercel CLI. Instálalo manualmente con: npm install -g vercel" -ForegroundColor Red
        exit 1
    }
}

# Crear carpeta de imágenes si no existe
if (!(Test-Path "images\portfolio")) {
    Write-Host "📁 Creando carpeta de imágenes..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path "images\portfolio" -Force
    Write-Host "⚠️  Recuerda añadir las imágenes en images\portfolio\" -ForegroundColor Yellow
}

# Verificar archivos necesarios
$requiredFiles = @("index.html", "styles.css", "script.js", "vercel.json", "package.json")
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file encontrado" -ForegroundColor Green
    } else {
        Write-Host "❌ $file no encontrado" -ForegroundColor Red
        exit 1
    }
}

# Iniciar sesión en Vercel (si no está logueado)
Write-Host "🔐 Verificando autenticación..." -ForegroundColor Yellow
try {
    vercel whoami | Out-Null
    Write-Host "✅ Ya estás autenticado en Vercel" -ForegroundColor Green
} catch {
    Write-Host "🔑 Iniciando sesión en Vercel..." -ForegroundColor Yellow
    vercel login
}

# Desplegar a Vercel
Write-Host "🚀 Desplegando a Vercel..." -ForegroundColor Yellow
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "🎉 ¡Despliegue exitoso!" -ForegroundColor Green
    Write-Host "🌐 Tu restaurante está online en Vercel" -ForegroundColor Cyan
    Write-Host "📱 Recuerda verificar en móvil y desktop" -ForegroundColor Yellow
    Write-Host "🔧 Añade las imágenes en images\portfolio\ para completar" -ForegroundColor Yellow
} else {
    Write-Host "❌ Error en el despliegue. Revisa los errores arriba." -ForegroundColor Red
}

Write-Host "`n📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Añadir imágenes en images\portfolio\" -ForegroundColor White
Write-Host "2. Verificar información de contacto" -ForegroundColor White
Write-Host "3. Probar formulario de reservas" -ForegroundColor White
Write-Host "4. Configurar dominio personalizado (opcional)" -ForegroundColor White
