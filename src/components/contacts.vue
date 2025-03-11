<template>
  <div class="head contacts">
    <div class="container">
      <div class="head-title">
        <h1>Наши контакты<span class="pink point">.</span></h1>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="questions row">
      <div class="questions-left col-sm-8 col-12">
        <h2>
          Мы всегда рады вашим вопросам и предложениям<span class="pink"
            >!</span
          >
        </h2>
        <p>
          Если у вас возникли какие-либо вопросы, требуется дополнительная
          информация или вы хотите обсудить сотрудничество, пожалуйста,
          свяжитесь с нами любым удобным для вас способом.
        </p>
      </div>
      <div class="questions-right col-sm-4">
        <img src="../assets/img/questions.png" alt="questions" />
      </div>
    </div>
  </div>
  <customForm></customForm>
  <div class="container d-none">
    <div class="place row">
      <div class="place-map col-sm-8 col-12">
        <iframe
          src="https://yandex.ru/map-widget/v1/-/CBucU6V~8B"
          frameborder="0"
        ></iframe>
      </div>
      <div class="place-building col-sm-4 col-12">
        <img src="../assets/img/building.png" alt="building" class="building" />
        <img
          src="../assets/img/buildingMobile.png"
          alt="building"
          class="buildingMobile"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Form from "./form.vue";
export default {
  components: {
    customForm: Form,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

$pink: rgba(232, 107, 117, 1);
$mainText: rgba(66, 70, 73, 1);

.head {
  &.contacts {
    & h1 {
      margin-bottom: 100px;
    }
  }
}

.questions {
  &-left {
    padding-top: 50px;
    & h2 {
      margin-bottom: 30px;
    }
  }
  &-right {
    & img {
      width: 350px;
    }
  }
}

@media (max-width: 768px) {
  .questions {
    &-left {
      padding-top: 0;
    }
    &-right {
      display: none;
    }
  }
}

.place {
  margin-bottom: 100px;
  &-map {
    & iframe {
      width: 100%;
      height: 100%;
    }
  }
  &-building {
    & .buildingMobile {
      display: none;
    }
  }
}

@media (max-width: 768px) {
  .place {
    &-map {
      & iframe {
        height: 230px;
      }
    }
    &-building {
      & .buildingMobile {
        display: block;
        width: 100%;
      }
      & .building {
        display: none;
      }
    }
  }
}
</style>
