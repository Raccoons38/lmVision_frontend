<template>
  <nav :class="navClasses">
    <div class="nav" :class="{ container: this.currentPath() != '/catalog' }">
      <a href="/" class="logo">
        <div class="image"><img src="@/assets/img/logo.png" /></div>
        <div class="name">
          <p class="lm">LM</p>
          <p class="vs">Video</p>
        </div>
      </a>
      <button class="burger-menu" @click="toggleMenu">
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
      </button>
      <ul class="nav-links" :class="{ open: isMenuOpen }">
        <li v-for="page in pages" :key="page['path']">
          <!-- <router-link :to="'/' + page['path']" class="link" @click="closeMenu">{{
            page["name"]
          }}</router-link> -->
          <!-- <a
            :href="'/' + page['path']"
            class="link"
            v-on:click.prevent="navigate(page['path'])"
            >{{ page["name"] }}</a
          > -->
          <a :href="'/' + page['path']" class="link">{{ page["name"] }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      pages: [
        { name: "Каталог", path: "catalog" },
        { name: "Доставка|Оплата", path: "payment" },
        { name: "Контакты", path: "contacts" },
      ],
      isScrolledUp: false,
      isScrolledDown: false,
      isTop: true,
      isMenuOpen: false,
    };
  },
  computed: {
    navClasses() {
      return {
        "nav-transparent": this.isScrolledUp,
        "nav-blur": this.isScrolledDown,
        "on-top": this.isTop,
      };
    },
  },
  methods: {
    navigate(page) {
      this.closeMenu();
      this.$router.push("/" + page);
    },
    handleScroll() {
      const currentScroll = window.scrollY;
      this.isTop = currentScroll === 0;
      if (!this.isTop) {
        this.isScrolledDown = currentScroll > this.lastScroll;
        this.isScrolledUp = currentScroll < this.lastScroll;
        if (this.isScrolledDown) {
          this.isMenuOpen = false;
        }
      }
      this.lastScroll = currentScroll;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    currentPath() {
      const path = this.$route.path;

      return path;
    },
  },
  mounted() {
    this.lastScroll = 0;
    window.addEventListener("scroll", this.handleScroll);
    this.currentPath();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
nav {
  font-family: $unbounded-v;
  z-index: 3;
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  transition: all 0.3s ease-in-out;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.nav-transparent {
  background: rgba(167, 167, 167, 0.216);
  backdrop-filter: blur(10px);
}
.nav-blur {
  top: -70px;
}
.on-top {
  background: rgba(255, 0, 0, 0);
  backdrop-filter: none;
}
.nav-links {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: black;
}
.nav-links li {
  display: inline-block;
  cursor: pointer;
  transition: text-decoration 0.3s; /* Добавляем переход для плавного эффекта */
}
.nav-links li::after {
  content: "";
  width: 0px;
  height: 1px;
  display: block;
  background: black;
  transition: 300ms;
}

.nav-links li:hover::after {
  width: 100%;
}
.nav-links li:last-child {
  background-color: rgba(17, 24, 39, 0.1);
  padding: 13px 40px;
  border-radius: 40px;
  margin-left: 15px;
  text-decoration: none;
  transition: background-color 0.5s;
}
.nav-links li:last-child::after {
  display: none;
}
.nav-links li:last-child:hover {
  background-color: rgba(17, 24, 39, 0);
}
ul {
  margin: 0;
}
.nav-links li {
  cursor: pointer;
  & .link {
    color: black;
  }
}
.nav-links li.active #link {
  font-weight: bold;
}
.logo {
  font-size: 1rem;
  line-height: 1.3rem;
  display: flex;
  text-decoration: none;
}
.logo .image {
  margin-right: 5px;
}

.name p {
  margin: 0;
  padding: 0;
  color: rgba(166, 166, 171, 1) !important;
}

.name .lm {
  font-weight: 400;
}

.name .vs {
  font-weight: 300;
}

.burger-menu {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.burger-menu span {
  width: 2rem;
  height: 0.25rem;
  background: black;
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
}

.burger-menu span.open:nth-child(1) {
  transform: rotate(45deg);
}
.burger-menu span.open:nth-child(2) {
  opacity: 0;
}
.burger-menu span.open:nth-child(3) {
  transform: rotate(-45deg);
}

.nav-links.open {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

@media (max-width: 768px) {
  .burger-menu {
    display: flex;
  }
  .nav-links {
    display: none;
    flex-direction: column;
  }
  .nav-links li {
    margin: 1rem 0;
  }
}
</style>
