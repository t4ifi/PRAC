<template>
  <div class="home-container">
    <div class="welcome-card">
      <h1 class="welcome-title">¡Bienvenido a NullDevs!</h1>
      <p class="welcome-subtitle">Tu plataforma de comunicación favorita</p>
      
      <div class="welcome-actions">
        <router-link to="/login" class="btn btn-primary">
          Iniciar Sesión
        </router-link>
        <router-link to="/registro" class="btn btn-secondary">
          Registrarse
        </router-link>
      </div>
      
      <div class="welcome-features">
        <div class="feature">
          <h3>Conecta</h3>
          <p>Mantente en contacto con tus amigos y colegas</p>
        </div>
        <div class="feature">
          <h3>Comunica</h3>
          <p>Envía mensajes de forma fácil y rápida</p>
        </div>
        <div class="feature">
          <h3>Comparte</h3>
          <p>Intercambia ideas y experiencias</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No necesitamos lógica adicional para esta vista
</script>

<style scoped>
.home-container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  margin: 0;
  position: relative;
}

.home-container::before {
  display: none;
}

.welcome-card {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 700px;
  width: 100%;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.8);
  margin: 0 auto;
}

.welcome-title {
  font-size: 3.2rem;
  color: #1f2937;
  margin-bottom: 1.5rem;
  font-weight: 900;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  line-height: 1.2;
}

.welcome-subtitle {
  font-size: 1.4rem;
  color: #4b5563;
  margin-bottom: 2.5rem;
  font-weight: 600;
  font-family: Arial, sans-serif;
  line-height: 1.4;
}

.welcome-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 28px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 800;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  font-family: Arial, sans-serif;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 3px solid #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-weight: 800;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.welcome-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature {
  text-align: center;
  padding: 1.5rem 1rem;
  border-radius: 15px;
  background: rgba(102, 126, 234, 0.05);
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
}

.feature:hover {
  transform: translateY(-3px);
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.2);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
}

.feature h3 {
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 800;
  font-family: Arial, sans-serif;
}

.feature p {
  color: #4b5563;
  font-size: 1rem;
  line-height: 1.4;
  margin: 0;
  font-weight: 600;
  font-family: Arial, sans-serif;
}

@media (max-width: 1200px) {
  .home-container {
    padding: 1.5rem;
  }
  
  .welcome-card {
    padding: 2.5rem;
  }
}

@media (max-width: 768px) {
  .welcome-card {
    padding: 2rem 1.5rem;
    margin: 1rem;
    max-width: 90%;
  }
  
  .welcome-title {
    font-size: 2.2rem;
  }
  
  .welcome-subtitle {
    font-size: 1.1rem;
  }
  
  .welcome-actions {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .btn {
    width: 100%;
    max-width: 280px;
  }
  
  .welcome-features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature {
    padding: 1.5rem;
  }
  
  .home-container {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .welcome-card {
    padding: 1.5rem 1rem;
    margin: 0.5rem;
  }
  
  .welcome-title {
    font-size: 1.8rem;
  }
  
  .welcome-subtitle {
    font-size: 1rem;
  }
  
  .home-container {
    padding: 0.5rem;
  }
  
  .welcome-features {
    gap: 1rem;
  }
}
</style>
