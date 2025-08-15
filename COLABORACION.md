# 🤝 Guía de Colaboración Multi-PC

## � Repositorio Oficial del Grupo
**https://github.com/t4ifi/Evaluaci-n-Interfaces-de-Usuario-con-Vue**

## 📋 Preparación del Proyecto

### TODOS LOS INTEGRANTES (PCs 1, 2, 3, 4, 5):
```bash
# Clonar el repositorio oficial
git clone https://github.com/t4ifi/Evaluaci-n-Interfaces-de-Usuario-con-Vue.git
cd Evaluaci-n-Interfaces-de-Usuario-con-Vue

# Instalar dependencias
npm install

# Configurar identidad personal (DIFERENTE en cada PC)
git config user.name "Tu Nombre Completo"
git config user.email "tu.email@gmail.com"
```

### IMPORTANTE - Identidades para cada PC:
```bash
# PC 1: git config user.name "Lazaro Coronel" && git config user.email "lazaro.coronel@gmail.com"
# PC 2: git config user.name "Andres Nuñez" && git config user.email "andres.nunez@gmail.com"  
# PC 3: git config user.name "Florencia Passo" && git config user.email "florencia.passo@gmail.com"
# PC 4: git config user.name "Alison Silvera" && git config user.email "alison.silvera@gmail.com"
# PC 5: git config user.name "Adrian Martinez" && git config user.email "adrian.martinez@gmail.com"
```

## 🎯 Pasos Rápidos para Cada Integrante

### 1. Configuración inicial (una sola vez):
```bash
# Clonar repositorio oficial
git clone https://github.com/t4ifi/Evaluaci-n-Interfaces-de-Usuario-con-Vue.git
cd Evaluaci-n-Interfaces-de-Usuario-con-Vue

# Instalar dependencias
npm install

# Configurar tu identidad (usar tu nombre real y email)
git config user.name "Tu Nombre Real"
git config user.email "tu.email@gmail.com"
```

### 2. Crear tu rama de trabajo:
```bash
# Crear rama personal (usar tu nombre real)
git checkout -b feature/tu-nombre-tarea

# Ejemplos:
# git checkout -b feature/lazaro-dashboard
# git checkout -b feature/andres-setup
# git checkout -b feature/florencia-pages
# git checkout -b feature/alison-profile
# git checkout -b feature/adrian-auth
```

### 3. Trabajar y subir cambios:
```bash
# Hacer tus cambios en los archivos...

# Guardar cambios
git add .
git commit -m "feat: descripción de tu trabajo"
git push origin feature/tu-nombre-tarea
```

### 4. El coordinador hará el merge final a main

## 👥 Asignación de Trabajo (5 Integrantes)

### PC 1 - Lazaro Coronel:
- Dashboard principal
- Gestión de estado (Pinia)

```bash
git config user.name "Lazaro Coronel"
git config user.email "lazaro.coronel@gmail.com"
git checkout -b feature/lazaro-dashboard
# Trabajar en dashboard...
git add .
git commit -m "feat: implementación de dashboard principal y store"
git push origin feature/lazaro-dashboard
```

### PC 2 - Andres Nuñez:
- Setup inicial del proyecto
- Configuración base y rutas

```bash
git config user.name "Andres Nuñez"
git config user.email "andres.nunez@gmail.com"
git checkout -b feature/andres-setup
# Trabajar en configuración...
git add .
git commit -m "feat: configuración inicial del proyecto Vue.js"
git push origin feature/andres-setup
```

### PC 3 - Florencia Passo:
- Página de inicio
- Sistema de mensajería

```bash
git config user.name "Florencia Passo"
git config user.email "florencia.passo@gmail.com"
git checkout -b feature/florencia-pages
# Trabajar en páginas...
git add .
git commit -m "feat: páginas principales y sistema de mensajería"
git push origin feature/florencia-pages
```

### PC 4 - Alison Silvera:
- Vista de usuario
- Perfil y configuración

```bash
git config user.name "Alison Silvera"
git config user.email "alison.silvera@gmail.com"
git checkout -b feature/alison-profile
# Trabajar en perfil...
git add .
git commit -m "feat: vista de usuario y gestión de perfil"
git push origin feature/alison-profile
```

### PC 5 - Adrian Martinez:
- Sistema de autenticación
- Login y Registro

```bash
git config user.name "Adrian Martinez"
git config user.email "adrian.martinez@gmail.com"
git checkout -b feature/adrian-auth
# Trabajar en autenticación...
git add .
git commit -m "feat: sistema de autenticación con login y registro"
git push origin feature/adrian-auth
```

## 🔄 Proceso de Merge (PC 1 - Coordinador)

```bash
# Cambiar a rama principal
git checkout main

# Mergear cada rama de los 5 integrantes
git merge feature/lazaro-dashboard
git merge feature/andres-setup
git merge feature/florencia-pages
git merge feature/alison-profile
git merge feature/adrian-auth

# Subir todo
git push origin main

# Subir todas las ramas al repositorio oficial
git push origin feature/lazaro-dashboard feature/andres-setup feature/florencia-pages feature/alison-profile feature/adrian-auth
```

## 🌐 Repositorio GitHub
Todos los cambios se suben a: **https://github.com/t4ifi/Evaluaci-n-Interfaces-de-Usuario-con-Vue**

## 📁 Archivos que cada PC debe modificar

### PC 1 - Lazaro (Dashboard):
- `src/views/PrincipalView.vue`
- `src/stores/app.js`

### PC 2 - Andres (Setup):
- `package.json`
- `src/main.js`
- `src/router/index.js`
- `src/App.vue`

### PC 3 - Florencia (Páginas):
- `src/views/HomeView.vue`
- `src/views/UsuarioMensajesView.vue`

### PC 4 - Alison (Perfil):
- `src/views/UsuarioView.vue`

### PC 5 - Adrian (Auth):
- `src/views/LoginView.vue`
- `src/views/RegistroView.vue`

### PC 5 (Perfil):
- `src/views/UsuarioView.vue`

## ⚠️ Importante

1. **Cada PC debe configurar su propia identidad git**
2. **No trabajar en la rama main directamente**
3. **Hacer pull antes de empezar a trabajar**
4. **Comunicarse antes de hacer cambios en archivos compartidos**
5. **El PC coordinador se encarga del merge final**

## 🚀 Comandos útiles

```bash
# Ver estado actual
git status

# Ver ramas
git branch -a

# Cambiar de rama
git checkout nombre-rama

# Actualizar desde remoto
git pull origin main

# Ver historial
git log --oneline --graph
```
