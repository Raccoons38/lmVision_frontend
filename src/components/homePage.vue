<template>
  <div class="container">
    <div class="mainBlock row">
      <div class="mainBlock-text col-md-6 col-12">
        <h1>
          <span class="pink">LM</span> Video<span class="pink point">.</span>
        </h1>
        <div class="row">
          <p class="col-sm-8">
            Технологии, которые работают на Вас и Вашу безопасность.
          </p>
        </div>
        <!-- <router-link :to="'/catalog'" class="pinkButton">Выбрать камеру</router-link> -->
        <a :href="'/catalog'" class="pinkButton"> В каталог →</a>
      </div>
      <div class="col-md-6 titleImage">
        <img src="@/assets/img/title_hero_image.png" alt="home page" />
      </div>
    </div>
  </div>
  <div class="container">
    <div class="reputation">
      <h2>Наша репутация</h2>
      <div :class="isScrolled(300, 800)" class="reputation-body row">
        <div class="reputation-body-border col-12 col-sm-4">
          <div class="reputation-body-block">
            <div class="reputation-body-block-logo">
              <img src="@/assets/img/support.svg" alt="services" />
            </div>
            <div class="reputation-body-block-title">Лучшие сервисы</div>
            <div class="reputation-body-block-text">
              Мы предоставляем лучшие устройства и компоненты.
            </div>
          </div>
        </div>
        <div class="reputation-body-border col-12 col-sm-4">
          <div class="reputation-body-block">
            <div class="reputation-body-block-logo">
              <img src="@/assets/img/support.svg" alt="support" />
            </div>
            <div class="reputation-body-block-title">Лучшая поддержка</div>
            <div class="reputation-body-block-text">
              Мы всегда готовы оказать вам помощь, просто напишите нам.
            </div>
          </div>
        </div>
        <div class="reputation-body-border col-12 col-sm-4">
          <div class="reputation-body-block">
            <div class="reputation-body-block-logo">
              <img src="@/assets/img/projects.svg" alt="support" />
            </div>
            <div class="reputation-body-block-title">Лучшие проекты</div>
            <div class="reputation-body-block-text">
              Наши проекты созданы для комфорта наших клиентов.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="choose">
      <h2>Подберите то, что нужно<span class="pink">.</span></h2>
      <p class="col-md-12 lead" style="font-size: 24px">
        Мы работаем как с частными клиентами, обеспечивая установку камер для
        личного пользования, так и с юридическими лицами, реализующими крупные
        системы видеонаблюдения для объектов различного типа
      </p>
      <div :class="isScrolled(950, null)" class="choose-cameras row gx-3">
        <div class="choose-cameras-frame col-3">
          <img src="@/assets/img/home.png" alt="home" />
        </div>
        <div class="choose-cameras-frame col-3 rounded">
          <img
            src="@/assets/img/outdoor_cameras.png"
            class="rounded"
            alt="outside"
          />
        </div>
        <div class="choose-cameras-frame col-3">
          <img src="@/assets/img/ofice.png" alt="ofice" />
        </div>
        <div class="choose-cameras-frame col-3">
          <img
            src="@/assets/img/facility_cameras.png"
            class="rounded"
            alt="manufacture"
          />
        </div>
      </div>
      <div class="choose-slider">
        <div class="choose-slider-container">
          <img src="@/assets/img/home.png" alt="home" class="slide" />
          <img
            src="@/assets/img/outdoor_cameras.png"
            alt="outside"
            class="slide"
          />
          <img src="@/assets/img/ofice.png" alt="ofice" class="slide" />
          <img
            src="@/assets/img/facility_cameras.png"
            alt="manufacture"
            class="slide"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="catalog">
      <div class="catalog-head">
        <h2>Каталог<span class="pink">.</span></h2>
        <ul class="catalog-head-list">
          <li
            v-for="filter in filters"
            :key="filter.name"
            :class="{ active: currentFilter === filter.name }"
            class="catalog-head-list-item"
            @click="filterProducts(filter.name)"
          >
            <a>{{ filter["text"] }}</a>
          </li>
        </ul>
      </div>
      <div class="catalog-slider">
        <swiper
          :slidesPerView="1"
          :spaceBetween="30"
          :pagination="pagination"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide
            v-for="(page, pageIndex) in paginatedProducts"
            :key="pageIndex"
          >
            <div class="catalog-slider-grid row px-3 py-3">
              <div
                class="catalog-slider-grid-item col-12 col-md-4 mb-4"
                v-for="(catalogItem, index) in page"
                :key="index"
              >
                <img
                  :src="getImageUrl(catalogItem.imgURL)"
                  :alt="catalogItem.name"
                />
                <h3 class="catalog-slider-item-name">{{ catalogItem.name }}</h3>
                <p class="catalog-slider-item-description">
                  {{ catalogItem["description"] }}
                </p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <swiper
          :slidesPerView="1"
          :spaceBetween="30"
          :pagination="pagination"
          :modules="modules"
          class="mobileSlider"
        >
          <swiper-slide
            v-for="(catalogItem, index) in filteredProducts.slice(0, 3)"
            :key="index"
          >
            <div class="catalog-slider-grid-item">
              <img
                :src="getImageUrl(catalogItem.imgURL)"
                :alt="catalogItem.name"
              />
              <h3 class="catalog-slider-item-name">{{ catalogItem.name }}</h3>
              <p class="catalog-slider-item-description">
                {{ catalogItem["description"] }}
              </p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
  <div class="about">
    <div class="container">
      <div class="about-content">
        <img
          src="@/assets/img/about_us.png"
          alt="we"
          class="about-content-image"
        />
        <div class="about-content-text">
          <h2 :class="isScrolled(1500, 3000)">
            Кто мы<span class="pink">?</span>
          </h2>
          <p>
            Наша профессиональная команда разрабатывает индивидуальные проекты
            любого масштаба, обеспечивая надежность и инновации, стремясь
            создать безопасное и технологически продвинутое будущее.
            <br />
          </p>
          <!-- <router-link :to="'/about'" class="about-content-text-link">
            Читать далее &nbsp;<i
              :class="isScrolled(1900, 3900)"
              class="fa-solid fa-arrow-right arrow"
            ></i>
          </router-link> -->
          <a :href="'/about'" class="about-content-text-link">
            Читать далее &nbsp;<i
              :class="isScrolled(1900, 3900)"
              class="fa-solid fa-arrow-right arrow"
            ></i
          ></a>

          <!-- <router-link
            :class="isScrolled(1900, 3900)"
            :to="'/portfolio'"
            class="about-content-text-button"
          >
            портфолио
          </router-link> -->
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="experience row">
      <div
        :class="isScrolled(2500, 4700)"
        class="experience-left col-sm-8 col-12"
      >
        <div class="experience-left-card clients">
          <span class="experience-left-card-num">50</span>
          <br />
          <div class="experience-left-card-text">
            <span class="experience-left-card-text-line"></span>
            <span class="experience-left-card-text-word">Клиентов</span>
          </div>
          <img src="@/assets/img/clients.png" alt="clients" />
        </div>
        <div class="experience-left-card projects">
          <span class="experience-left-card-num">50+</span>
          <br />
          <div class="experience-left-card-text">
            <span class="experience-left-card-text-line"></span>
            <span class="experience-left-card-text-word"
              >Проектов<br />
              выполнено</span
            >
          </div>
          <img src="@/assets/img/projects.png" alt="projects" />
        </div>
        <div class="experience-left-card awards">
          <span class="experience-left-card-num">37</span>
          <br />
          <div class="experience-left-card-text">
            <span class="experience-left-card-text-line"></span>
            <span class="experience-left-card-text-word"
              >Клиентов осталось у нас</span
            >
          </div>
          <img src="@/assets/img/awards.png" alt="awards" />
        </div>
        <div class="experience-left-card years">
          <span class="experience-left-card-num">18</span>
          <br />
          <div class="experience-left-card-text">
            <span class="experience-left-card-text-line"></span>
            <span class="experience-left-card-text-word">Лет на рынке</span>
          </div>
          <img src="@/assets/img/years.png" alt="years" />
        </div>
      </div>
      <div class="experience-right col-sm-4 col-12">
        <h1>
          Более
          <span :class="isScrolled(2500, 4300)" class="experience-right-pink"
            >10 лет</span
          >
          работы
        </h1>
        <p>Опыт, проверенный временем и доверием наших клиентов.</p>
        <!-- <router-link :to="'/contacts'" class="pinkButton">Оставить заявку</router-link> -->
        <a :href="'/contacts'" class="pinkButton"> Оставить заявку →</a>
      </div>
    </div>
  </div>
  <div class="seeOnline d-none">
    <div class="container">
      <div class="seeOnline-row row">
        <div class="seeOnline-row-leftMobile col-sm-3 col-12">
          <h2>
            Проверьте, как камера работает онлайн<span class="pink">˙</span>
          </h2>
          <div class="content">
            <img src="@/assets/img/see.png" alt="product" />
            <div class="seeOnline-row-leftMobile-product">
              <h3>Название камеры</h3>
              <p>технические данные и другая нужная инфа</p>
            </div>
          </div>
        </div>
        <div class="seeOnline-row-left col-sm-3 col-12">
          <h2>
            Проверьте, как камера работает онлайн<span class="pink">˙</span>
          </h2>
          <div class="seeOnline-row-left-product">
            <h3>Название камеры</h3>
            <p>технические данные и другая нужная инфа</p>
          </div>
        </div>
        <div class="padding col-sm-2 col-0"></div>
        <div class="seeOnline-row-right col-sm-7 col-12">
          <div class="seeOnline-row-right-example">Пример работы</div>
          <div class="seeOnline-row-right-linkToVideo">
            Смотреть <i class="fa-solid fa-play"></i>
          </div>
        </div>
        <div class="seeOnline-navigation">
          <div class="seeOnline-navigation-arrow">
            <i class="fa-solid fa-angle-left"></i>
          </div>
          <div class="seeOnline-navigation-arrow">
            <i class="fa-solid fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <customForm></customForm>
</template>

<script>
import Form from "./form";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/grid";
import "swiper/css/pagination";

// import required modules
import { Grid, Pagination } from "swiper/modules";
import http from "@/http-common";

export default {
  components: {
    Swiper,
    SwiperSlide,
    customForm: Form,
  },
  data() {
    return {
      filters: [],
      catalog: [],
      filteredProducts: [],
      itemsPerPage: 6,
      currentPage: 1,
      currentFilter: "",
      scrollY: 0,
      scrolls: new Set(),
    };
  },
  setup() {
    return {
      pagination: {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
      modules: [Grid, Pagination],
    };
  },
  computed: {
    paginatedProducts() {
      const pages = [];
      for (
        let i = 0;
        i < this.filteredProducts.length;
        i += this.itemsPerPage
      ) {
        pages.push(this.filteredProducts.slice(i, i + this.itemsPerPage));
      }
      return pages;
    },
  },
  methods: {
    getProducts() {
      http
        .get("/products")
        .then((response) => {
          this.catalog = response.data;
          this.filteredProducts.push(...this.catalog);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filterProducts(filter) {
      this.currentFilter = filter;
      if (filter === "") {
        this.filteredProducts = this.catalog;
        return;
      }
      this.filteredProducts = this.catalog.filter((product) => {
        return product.typeName.toLowerCase() === filter.toLowerCase();
      });
    },
    handleScroll() {
      this.scrollY = window.scrollY;
    },
    isScrolled(desktop, mobile) {
      if (this.scrolls.has(desktop)) {
        return { animated: true };
      }

      var isAnimate =
        this.scrollY > (window.innerWidth >= 768 ? desktop : mobile);
      if (isAnimate) {
        this.scrolls.add(desktop);
      }
      return { animated: isAnimate };
    },
    getImageUrl(imageName) {
      return require(`@/assets/img/products/${imageName}`);
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    const catalog = document.createElement("a");
    // Назначаем ему текст
    catalog.textContent = "В каталог →";
    // Устанавливаем путь маршрута
    const routePath = "/catalog";
    // Назначаем ему href атрибут для SEO и удобства навигации
    catalog.href = routePath;
    catalog.className = "swiper-pagination-catalog";

    // Добавляем обработчик события клика
    catalog.addEventListener("click", (event) => {
      // Предотвращаем стандартное поведение ссылки
      event.preventDefault();
      // Используем метод Vue Router для перехода
      this.$router.push(routePath);
    });

    // Вставляем ссылку в DOM
    document.querySelectorAll(".swiper-pagination")[0].append(catalog);

    var mobileCatalog = catalog.cloneNode(true);

    document.querySelectorAll(".swiper-pagination")[1].append(mobileCatalog);

    this.getProducts();
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

$pink: rgba(232, 107, 117, 1);
$mainText: rgba(33, 37, 41, 1);
$secondary: rgba(56, 99, 165, 1);

* {
  color: $mainText;
}
.titleImage {
  height: 90%;
  img {
    height: 100%;
    border-radius: 25px;
  }
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  height: calc((100% - 30px) / 2) !important;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: 40px !important;
}

.pink {
  color: $pink;
}

.pinkButton {
  display: flex;
  justify-content: center;
  text-decoration: none;
  width: 264px;
  padding: 16px;
  border: 0;
  border-radius: 15px;
  background-color: $pink;
  font-size: 25px;
  color: white;
}

//main block

.background {
  position: absolute;
  top: -10%;
  left: 50%;
  width: 50%;
  height: 100%;
  z-index: -1;

  & img {
    width: 90%;
    height: auto;
    display: block;
  }
}

@media (max-width: 768px) {
  .background {
    display: none;
  }
}

.mainBlock {
  display: flex;
  margin-top: 90px !important;
  margin-bottom: 60px;
  font-family: $unbounded-v;
  height: 900px;

  &-text {
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding-bottom: 170px;
    color: $mainText;
    h1 {
      font-size: 96px;
      span {
        color: $pink;
      }
    }
    p {
      font-size: 30px;
    }
  }
  &-mobileImg {
    display: none;
  }
}

.point {
  display: inline-block;
  animation: jump 3s forwards;
}

@keyframes jump {
  0% {
    transform: translateY(-100px);
    animation-timing-function: ease-in;
  }
  20% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  30% {
    transform: translateY(-70px);
    animation-timing-function: ease-in;
  }
  40% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  50% {
    transform: translateY(-50px);
    animation-timing-function: ease-in;
  }
  60% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  70% {
    transform: translateY(-40px);
    animation-timing-function: ease-in;
  }
  80% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  85% {
    transform: translateY(-20px);
    animation-timing-function: ease-in;
  }
  90% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  95% {
    transform: translateY(-5px);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
}

@media (max-width: 768px) {
  .mainBlock {
    margin-bottom: 40px;
    padding-top: 250px;
    height: auto;

    &-text {
      padding-bottom: 40px;
    }
    &-mobileImg {
      display: block;
    }
  }
}

// reputation

.reputation {
  font-family: $unbounded-v;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &-body {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 79px;
    padding-top: 49px;

    &-border {
      opacity: 0;
      transform: translateY(-200px);
    }

    &-block {
      border: 2px dotted rgba(224, 227, 235, 1);
      border-radius: 4px;
      padding: 20px;

      & * {
        margin-bottom: 18px;
      }
      &-title {
        font-weight: 300;
        font-size: 20px;
        color: rgba(61, 68, 92, 1);
      }
      &-text {
        font-weight: 300;
        font-size: 16px;
        color: rgba(133, 142, 173, 1);
      }
    }
  }

  & .animated {
    .reputation-body-border {
      animation: slideRight 1s 1s forwards;
      &:first-child {
        animation: dropDown 1s forwards;
      }
      &:last-child {
        animation: slideRight 1s 2s forwards;
      }
    }
  }
}

@keyframes dropDown {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRight {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .reputation {
    &-body {
      padding-top: 80px;
      &-block {
        margin-bottom: 20px;
      }
    }
    & .animated {
      .reputation-body-border {
        animation: dropDown 1s 1s forwards;
        &:first-child {
          animation: dropDown 1s forwards;
        }
        &:last-child {
          animation: dropDown 1s 2s forwards;
        }
      }
    }
  }
}

//choose

.choose {
  font-family: $unbounded-v;
  margin-bottom: 30px;

  h2 {
    margin-bottom: 40px !important;
  }

  p {
    font-size: 18px;
    margin-bottom: 40px;
  }

  &-cameras {
    display: flex;
    justify-content: space-between;
    &-frame {
      height: 375px;
      opacity: 0;
      transform: translateY(-300px);
    }
  }

  & .animated {
    .choose-cameras-frame {
      &:first-child {
        animation: dropDownCameras 1s forwards;
      }
      &:nth-child(2) {
        animation: dropDownCameras 1s 0.5s forwards;
      }
      &:nth-child(3) {
        animation: dropDownCameras 1s 1s forwards;
      }
      &:last-child {
        animation: dropDownCameras 1s 1.5s forwards;
      }
    }
  }

  &-slider {
    display: none;
    width: 100%;
    overflow-x: auto;

    &-container {
      display: flex;
      white-space: nowrap;

      & .slide {
        margin-right: 15px;
        max-width: 90%;

        &:last-child {
          margin: 0;
        }
      }
    }
  }
}

@keyframes dropDownCameras {
  0% {
    opacity: 0;
    transform: translateY(-300px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .choose {
    margin-bottom: 128px;
    &-cameras {
      display: none !important;
    }
    &-slider {
      display: block;
    }
  }
}

// about

.about {
  background-color: rgba(244, 244, 244, 1);
  font-family: $unbounded-v;

  &-content {
    display: flex;
    margin-bottom: 20px;

    &-image {
      margin-top: -68px;
      margin-bottom: 68px;
      margin-right: 155px;
    }
    &-text {
      display: flex;
      flex-direction: column;
      padding-top: 10px;
      & h2 {
        font-size: 64px !important;
        margin-bottom: 40px;
      }

      & p {
        font-size: 18px;
        margin-bottom: 40px;
      }

      &-link {
        width: 175px;
        margin-bottom: 30px;
        text-decoration: none;
        color: $mainText;

        & .arrow {
          opacity: 0;
          transition: transform opacity 1s padding 0.3s;
          transform: translateX(200px);
        }

        & .animated {
          transition: all 1s;
          transform: translateX(0);
          opacity: 1;
        }

        &:hover {
          .arrow {
            padding-left: 10px;
          }
        }
      }

      &-button {
        width: 211px;
        text-align: center;
        text-decoration: none;
        background-color: $mainText;
        color: white;
        padding: 16px 40px;
        border: 1px solid;
        border-radius: 5px;

        transition: all 0.5s;
        &.animated {
          transition: all 1s;
          color: $mainText;
          background-color: rgba(244, 244, 244, 1);
        }

        &:hover {
          background-color: $mainText;
          color: white;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .about {
    background-color: white;
    &-content {
      flex-direction: column;

      &-text {
        &-button {
          &.animated {
            background-color: white;
          }
        }
      }

      &-image {
        margin: 0;
        margin-bottom: 70px;
      }
    }
  }
}

// experience

.experience {
  font-family: $unbounded-v;
  padding-top: 80px;
  margin-bottom: 20px;
  &-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 723px;
    font-family: $work-sans;
    &-card {
      width: 280px;
      height: 155px;
      position: relative;

      padding: 30px;
      box-sizing: content-box;
      box-shadow: 0px 12px 16px -4px rgba(17, 24, 39, 0.1);
      border-radius: 4px 0px 0px 0px;
      border: 1px 0px 0px 0px;
      background-color: white;

      &-num {
        font-size: 72px;
        font-weight: 600;
      }
      &-text {
        display: flex;
        &-word {
          font-size: 24px;
          font-weight: 300;
          color: rgba(102, 114, 153, 1);
        }
        &-line {
          display: block;
          width: 6px;
          margin-right: 12px;
          margin-left: 12px;
          background-color: $secondary;
        }
      }
      & img {
        position: absolute;
      }

      &:nth-child(odd) {
        display: none;
        opacity: 0;
        transform: translateX(200px);
      }
      &:nth-child(even) {
        display: none;
        opacity: 0;
        transform: translateX(-200px);
      }
    }

    & .clients {
      margin-left: 25%;
      z-index: 2;
      & img {
        top: -19px;
        right: -28px;
      }
    }
    & .projects {
      margin-right: 40%;
      margin-top: -10%;
      z-index: 1;
      padding-top: 10px;
      padding-bottom: 40px;
      & img {
        top: -49px;
        left: -33px;
      }
    }
    & .awards {
      margin-left: 10%;
      margin-top: -10%;
      z-index: 2;
      & img {
        top: -15px;
        right: -21px;
      }
    }
    & .years {
      margin-right: 30%;
      margin-top: -10%;
      z-index: 1;
      & img {
        bottom: -42px;
        right: -12px;
      }
    }
  }
  &-right {
    padding-top: 40px;
    & h1 {
      font-size: 48px;
      font-weight: 700;
      color: rgba(66, 70, 73, 1);
      margin-bottom: 34px;
    }
    &-pink {
      color: $pink;
      transition: all 1s;
      opacity: 0;
    }
    & p {
      font-size: 20px;
      color: rgba(82, 91, 122, 1);
      margin-bottom: 34px;
    }
    & .animated {
      opacity: 1;
      transition: all 1s;
    }
  }

  & .animated {
    .experience-left-card {
      display: block;
      &:first-child {
        animation: rightCard 1s forwards;
      }
      &:nth-child(2) {
        animation: leftCard 1s 0.5s forwards;
      }
      &:nth-child(3) {
        animation: rightCard 1s 1s forwards;
      }
      &:last-child {
        animation: leftCard 1s 1.5s forwards;
      }
    }
  }
}

@keyframes rightCard {
  0% {
    transform: translateX(200px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes leftCard {
  0% {
    transform: translateX(-200px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .experience {
    display: flex;
    flex-direction: column-reverse;
    &-right {
      margin-bottom: 70px;
    }
    &-left {
      padding: 0;
      margin-bottom: 70px;
      &-card {
        box-sizing: border-box;
        width: 100%;
        height: auto;
        padding: 0 0 10px 0 !important;
        margin: 0 0 26px 0 !important;
        &-num {
          margin-bottom: 0;
        }
        & img {
          display: none !important;
        }
      }
    }
  }
}

// catalog

.catalog {
  font-family: $unbounded-v;
  color: $mainText;
  margin-bottom: 70px;
  &-head {
    margin-bottom: 10px;
    & h2 {
      font-size: 48px !important;
      margin-bottom: 64px;
    }
    &-list {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0 !important;
      gap: 20px;
      width: 100%;
      overflow-x: scroll;

      &-item {
        padding: 16px 19px 16px 18px;
        border-radius: 40px;
        border: 1px solid $mainText;
        cursor: pointer;
        transition: all 0.5s ease-in-out;

        &:hover {
          border: 1px solid $pink;
          color: $pink;
        }

        &.active {
          background-color: $pink;
          border: 1px solid;
          color: white;
        }
      }
    }
  }
  &-slider {
    & .swiper {
      width: 100%;
      height: 100%;
      margin-left: auto;
      margin-right: auto;

      &-slide {
        justify-content: start;
      }
    }

    &-grid {
      &-item {
        width: 424px;
        height: 469px;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: start;
        border-radius: 4px;
        text-align: left;

        & img {
          width: 100%;
          height: auto;
        }
        & h3 {
          margin: 0;
          font-size: 18px;
        }
        & p {
          margin: 0;
          font-size: 18px;
        }
      }
    }
    & .mobileSlider {
      display: none;
    }
  }

  & .swiper-pagination {
    display: flex;
    justify-content: end;
    height: 25px;
    &-catalog {
      margin-top: 2px;
      margin-left: 5px;
      font-size: 22px;
      text-align: end;
      cursor: pointer;
      color: rgba(33, 37, 41, 0.25);
      text-decoration: none;
    }
    &-bullet {
      font-size: 24px;
      width: 20px;
      background: none;
    }
  }
}

@media (max-width: 768px) {
  .catalog {
    &-slider {
      & .mySwiper {
        display: none;
      }
      & .mobileSlider {
        display: block;
      }
      &-grid {
        &-item {
          height: 530px;
        }
      }
    }
  }
}

.seeOnline {
  background-color: $mainText;
  font-family: $unbounded-v;
  padding: 124px 0 0 0;
  &-row {
    &-left {
      & h2 {
        color: white;
        font-size: 48px;
        margin-bottom: 26px;
        & .pink {
          color: $pink;
        }
      }
      &-product {
        width: 480px;
        height: 321px;
        background-image: url("@/assets/img/see.png");
        border-radius: 8px;

        display: flex;
        flex-direction: column;
        justify-content: end;
        padding-left: 24px;

        & h3 {
          color: white;
          font-size: 20px;
          font-weight: 700;
        }
        & p {
          color: white;
          font-size: 14px;
          font-weight: 300;
        }
      }
    }
    &-right {
      background: url("@/assets/img/house.png") no-repeat;
      border-radius: 8px;
      position: relative;
      padding: 0 !important;
      &-example {
        position: absolute;
        background-color: white;
        padding: 6px 30px 10px 34px;
        border-radius: 8px 4px 100px 8px;
      }
      &-linkToVideo {
        position: absolute;
        right: 26px;
        bottom: 26px;
        color: white;
        font-size: 14px;
        cursor: pointer;
        & i {
          color: white;
          margin-left: 10px;
        }
        padding: 18px 25px;
        border-radius: 100px;
        border: 1px solid white;
      }
    }

    &-leftMobile {
      display: none;
    }
  }
  &-navigation {
    margin-bottom: 65px;
    padding-top: 40px;
    display: flex;
    & i {
      color: white;
    }
    &-arrow {
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.24);
      border-radius: 50px;
      margin-right: 8px;
      cursor: pointer;
    }
  }
}

@media (max-width: 768px) {
  .seeOnline {
    padding: 33px 0 0 0;
    &-row {
      &-left {
        display: none !important;
      }
      &-leftMobile {
        display: block;
        margin-bottom: 40px;
        & h2 {
          color: white;
          font-size: 20px !important;
          margin-bottom: 26px;
          & .pink {
            color: $pink;
          }
        }
        &-product {
          & h3 {
            color: white;
            font-size: 15px;
            font-weight: 700;
          }
          & p {
            color: white;
            font-size: 11px;
            font-weight: 300;
          }
        }
        & .content {
          display: flex;
          & img {
            width: 60%;
            border-radius: 8px;
            margin-right: 15px;
          }
        }
      }

      &-right {
        padding: 0 12px !important;
        background: none;
        display: block;
        & img {
          display: inline !important;
          width: 100%;
          border-radius: 8px;
        }

        &-example {
          top: 0;
        }
      }
    }
  }
}
</style>
