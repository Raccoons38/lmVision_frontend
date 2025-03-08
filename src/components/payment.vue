<template>
  <div class="head">
    <div class="container">
      <div class="head-title">
        <h1>Доставка и Оплата<span class="pink point">.</span></h1>
      </div>
      <div class="head-text row">
        <p class="col-sm-10 col-12">
          Быстрая и удобная доставка с гибкими вариантами оплаты
        </p>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="delivery" style="margin-bottom: 100px">
      <div class="delivery-title">
        <h2 :class="isScrolled(0, 0)">Доставка<span class="pink">.</span></h2>
      </div>
      <div class="delivery-text row">
        <p class="delivery-text col-sm-10 col-12" :class="isScrolled(100, 100)">
          Мы предлагаем быструю и удобную доставку наших товаров, обеспечивая их
          надежную перевозку и транспортировку. Выбирайте для себя наиболее
          подходящий способ доставки.
        </p>
      </div>
      <div class="delivery-variants row">
        <div class="delivery-variants-left col-sm-4">
          <img
            src="../assets/img/courier.png"
            alt="courier"
            class="courier"
            :class="isScrolled(200, 200)"
          />
          <img
            src="../assets/img/truck.png"
            alt="truck"
            class="truck"
            :class="isScrolled(200, 200)"
          />
          <img
            src="../assets/img/pickup.png"
            alt="pickup"
            class="pickup"
            :class="isScrolled(200, 200)"
          />
        </div>
        <div class="delivery-variants-right col-sm-8 col-12">
          <h2 :class="isScrolled(200, 300)">
            Варианты доставки<span class="pink"></span>
          </h2>
          <div class="delivery-variants-right-list">
            <p :class="isScrolled(200, 400)">
              <span class="pink">1</span> Курьерская доставка –
              <span class="light"
                >для жителей крупных городов доступна услуга курьерской
                доставки, при которой вы получите ваш заказ непосредственно на
                дом или в офис.</span
              >
            </p>
            <p :class="isScrolled(200, 700)">
              <span class="pink">2</span> Доставка через транспортные компании –
              <span class="light"
                >для доставки в регионы мы сотрудничаем с надежными
                транспортными компаниями, которые обеспечивают безопасную и
                своевременную перевозку оборудования.</span
              >
            </p>
            <p :class="isScrolled(200, 1000)">
              <span class="pink">3</span> Самовывоз –
              <span class="light"
                >вы можете самостоятельно забрать ваш заказ с нашего склада,
                предварительно согласовав время.</span
              >
            </p>
          </div>
        </div>
      </div>
      <div class="delivery-questions row">
        <div class="delivery-questions-left col-sm-8 col-12">
          <h2>
            Остались вопросы по доставке<span
              class="pink question"
              :class="isScrolled(800, 1200)"
              >?</span
            >
          </h2>
          <p>
            Если у вас остались вопросы по поводу доставки и транспортировки
            товара в ваш регион - напишите нам или оставьте свои контакты, и мы
            с вами свяжемся!
          </p>
          <!-- <router-link :to="'/contacts'" class="delivery-questions-left-link">
            Написать нам&nbsp;<i class="fa-solid fa-arrow-right arrow animated"></i>
          </router-link> -->
          <a :href="'/contacts'" class="delivery-questions-left-link">
            Написать нам&nbsp;<i
              class="fa-solid fa-arrow-right arrow animated"
            ></i
          ></a>
        </div>
        <div class="delivery-questions-right col-sm-4">
          <img src="@/assets/img/delivery.png" alt="delivery" />
        </div>
      </div>
    </div>
    <div class="payment row">
      <div class="payment-block col-sm-9 col-12">
        <h2>Оплата<span class="pink">.</span></h2>
        <div :class="isScrolled(1200, 1700)">
          <p>
            Для вашего удобства, оплата заказов в LM Video производится вне
            сайта. Вы можете оплатить ваш заказ посредством банковского перевода
            при создании заявки.
          </p>
          <br /><br />
          <p>
            Также возможен вариант оплаты напрямую при самовывозе или при
            выполнении услуг на вашем объекте. Такой подход позволяет нам
            обеспечить максимальную безопасность и прозрачность каждой
            транзакции, а также предоставить вам гибкость в выборе наиболее
            удобного способа оплаты
          </p>
          <br /><br />
          <p>
            Если у вас остались вопросы, пожалуста,
            <span class="pink"><a :href="'/contacts'"> напишите нам!</a></span>
          </p>
        </div>
      </div>
      <img
        src="@/assets/img/payment.png"
        alt="payment"
        :class="isScrolled(1300, 0)"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollY: 0,
      scrolls: new Set(),
    };
  },
  computed: {},
  methods: {
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
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

$pink: rgba(232, 107, 117, 1);
$mainText: rgba(66, 70, 73, 1);

.head {
  &-title {
    font-size: 100px;
    width: 60%;
  }
  &-text {
    font-size: 30px;
  }
}

.delivery {
  &-title {
    margin-bottom: 45px;

    & h2 {
      font-size: 40px;

      opacity: 0;
      transform: translateY(-100px);
      transition: all 1s ease-in-out;

      &.animated {
        opacity: 1;
        transform: none;
      }
    }
  }
  &-text {
    margin-bottom: 20px;
    & p {
      font-size: 18px !important;

      opacity: 0;
      transform: translateY(-100px);
      transition: all 1s ease-in-out;
      transition-delay: 0.3s;

      &.animated {
        opacity: 1;
        transform: none;
      }
    }
  }

  &-variants {
    &-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 75px;

      & img {
        width: 150px;

        opacity: 0;
        transform: translateX(-100px);
        transition: all 1s ease-in-out;
        transition-delay: 1s;

        &.animated {
          opacity: 1;
          transform: none;
        }
      }

      & .courier {
        margin-top: 40px;
        margin-left: -70px;
      }
      & .truck {
        margin-top: -20px;
        margin-left: 150px;

        transition-delay: 1.5s;
      }
      & .pickup {
        margin-top: -50px;
        margin-left: -50px;

        transition-delay: 2s;
      }
    }
    &-right {
      & h2 {
        font-size: 32px;
        font-weight: 500 !important;
        margin-bottom: 20px;

        opacity: 0;
        transform: translateY(-100px);
        transition: all 1s ease-in-out;
        transition-delay: 0.5s;

        &.animated {
          opacity: 1;
          transform: none;
        }
      }
      &-list {
        & p {
          font-size: 18px !important;
          font-weight: 500 !important;

          opacity: 0;
          transform: translateX(100px);
          transition: all 1s ease-in-out;
          transition-delay: 1.5s;

          & .light {
            font-weight: 300;
          }

          &.animated {
            opacity: 1;
            transform: none;
          }

          &:first-child {
            transition-delay: 1s;
          }

          &:last-child {
            transition-delay: 2s;
          }

          & .pink {
            font-size: 32px;
          }
        }
      }
    }
  }

  &-questions {
    margin-bottom: 100px;
    &-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      & h2 {
        max-width: 90%;

        & .question {
          display: inline-block;
          transition: all 1s;
          transform: rotate(180deg) translateX(10px) translateY(-30px);

          &.animated {
            transform: none;
          }
        }
      }
      &-link {
        display: inline;
        width: 220px;
        color: $mainText;
        font-size: 20px;
        font-weight: 500;
        text-decoration: none;
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
    }

    &-right {
      & img {
        width: 433px;
      }
    }
  }
}

@media (max-width: 768px) {
  .delivery {
    &-variants {
      margin-bottom: 50px;
      &-left {
        display: none;
      }
    }
    &-questions {
      &-left {
        h2 {
          margin-bottom: 50px;
        }
        p {
          margin-bottom: 50px;
        }
      }
      &-right {
        display: none;
      }
    }
  }
}

.payment {
  position: relative;
  padding-bottom: 100px;
  &-block {
    & h2 {
      margin-bottom: 36px;
    }

    & div {
      &.animated {
        & p {
          opacity: 1;
          transform: none;
        }
      }
      & p {
        opacity: 0;
        transform: translateY(-100px);
        transition: all 1s ease-in-out;
        transition-delay: 1s;

        & span a {
          color: $pink;
        }

        &:first-child {
          transition-delay: 0.5s;
        }
        &:last-child {
          transition-delay: 1.5s;
        }
      }
    }
  }
  & img {
    width: 347px;
    position: absolute;
    right: 0;
    bottom: 0;

    opacity: 0;
    transform: translateX(100px);
    transition: all 1s ease-in-out;
    &.animated {
      opacity: 1;
      transform: none;
    }
  }
}

@media (max-width: 768px) {
  .payment {
    & img {
      display: none;
    }
  }
}

@media (max-width: 768px) {
  h2 {
    font-size: 24px !important;
  }
}
</style>
