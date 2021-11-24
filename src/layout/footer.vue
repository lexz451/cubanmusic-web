<template>
  <footer>
    <div class="footer-container">
      <section>
        <h3 class="footer-brand">|cubanmusic<em>.info</em>|</h3>
        <router-link to="/">El Proyecto</router-link>
        <router-link to="/">Patrocinadores</router-link>
      </section>
      <section>
        <h3 class="footer-title">Categorías</h3>
        <router-link to="/">Artistas</router-link>
        <router-link to="/">Grupos</router-link>
        <router-link to="/">Instituciones</router-link>
        <router-link to="/">Venues</router-link>
      </section>
      <section>
        <h3 class="footer-title">Políticas</h3>
        <router-link to="/">Términos y condiciones del servicio</router-link>
        <router-link to="/">Política de Cookies</router-link>
        <router-link to="/">Copyright</router-link>
      </section>
      <section>
        <h3 class="footer-title">Síguenos en</h3>
        <div class="footer-social">
          <a href="#" target="_blank"><i class="fab fa-facebook fa-2x"></i></a>
          <a href="#" target="_blank"><i class="fab fa-instagram fa-2x"></i></a>
          <a href="#" target="_blank"><i class="fab fa-twitter fa-2x"></i></a>
          <a href="#" target="_blank"><i class="fab fa-youtube fa-2x"></i></a>
        </div>
      </section>
    </div>
    <div class="footer-divider"></div>
    <div class="footer-copyright">
      <span>&copy; 2021 - cubanmusic.info</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'app-footer'
};
</script>

<style lang="scss" scoped>
footer {
  background-color: var(--dark);
}
.footer-divider {
  width: 80%;
  margin: auto;
  height: 2px;
  background-color: rgba(#eee, 0.2);
}
.footer-copyright {
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--light);
  border-radius: 1px;
  font-weight: 300;
  font-size: 14px;
}
.footer-container {
  color: var(--light);
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  padding-top: 2rem;
  padding-bottom: 2rem;
  .footer-brand {
    font-size: 22px;
    em {
      color: var(--primary);
    }
  }
  .footer-title {
    font-size: 20px;
  }
  .footer-social {
    display: flex;
    justify-content: space-between;
    svg {
      margin-right: 0.8rem;
    }
  }
  section {
    display: flex;
    flex-direction: column;
    a {
      margin-bottom: 0.5rem;
      color: var(--light);
      font-size: 14px;
      transition: color 0.05s;
      &:hover,
      &:focus {
        color: var(--primary);
      }
    }
  }
}
</style>
