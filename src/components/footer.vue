<template>
  <footer>
    <div
      class="d-flex justify-content-between align-items-center"
      :class="{
        container: this.currentPath() != '/catalog',
        addPadding: this.currentPath() === '/catalog',
      }"
    >
      <div style="width: 100%">
        <div class="lists">
          <ul>
            <p>Страницы<span class="pink">.</span></p>
            <li><a href="/about">О нас</a></li>
            <li><a href="/catalog">Каталог</a></li>
            <li><a href="/payment">Доставка|Оплата</a></li>
            <li><a href="/contacts">Контакты</a></li>
          </ul>
          <ul>
            <p>Соцсети<span class="pink">.</span></p>
            <li><a href="tg://user?id=848007290">Telegram</a></li>
            <li><a href="https://wa.link/mkt2kk">Whatsapp</a></li>
          </ul>
          <ul>
            <p>Информация<span class="pink">.</span></p>
            <li>
              <a href="https://02.rkn.gov.ru/directions/p4172/p18331/"
                >Политика обработки данных</a
              >
            </li>
          </ul>
        </div>
        <div class="copyright">
          <p>Made by Raccoon IT Group &copy;</p>
          <!-- <p>Desined by Roman P</p> -->
          <div class="designed">Desined by Roman P</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    currentPath() {
      const path = this.$route.path;
      this.currentPage = path;

      return path;
    },
    navigate(page) {
      this.$router.push("/" + page);
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
footer {
  font-family: $unbounded-v;
  background-color: #212529;
  color: #ffffff;
  font-size: 21px;
  padding: 100px 0 40px 0;
  width: 100%;

  .addPadding {
    padding: 0 100px;
  }
}
.lists {
  display: flex;
  margin-bottom: 5%;
  line-height: 25px;
}
.lists ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-right: 30px;
  margin-bottom: 20px;
  gap: 8px;

  & p {
    color: #ffffff !important;
    font-size: 21px;
  }

  &:last-child {
    margin-left: 40px;
  }
}
.lists li {
  font-size: 18px;
  margin-bottom: 4px;
  font-weight: 200;
}
li a {
  text-decoration: none;
  color: #ffffff;
}
.copyright {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 300;

  & p {
    color: #ffffff !important;
  }

  & .designed {
    color: rgb(255, 255, 255, 0.3);
  }
}

@media (max-width: 768px) {
  footer {
    padding: 20px 0 10px 0;

    .addPadding {
      padding: 20px;
    }

    & .lists {
      flex-direction: column;
      margin-bottom: 50px;
      & ul {
        &:last-child {
          margin-left: 0;
        }
        & li {
          font-size: 14px;
        }
      }
    }

    & .copyright {
      flex-direction: column;
      align-items: center;

      & .designed {
        text-align: center;
      }
    }
  }
}
</style>
