<template>
  <div class="container order">
    <h1>Оформление заказа</h1>
    <h3>Ваш заказ:</h3>
    <ol>
      <li v-for="item in this.items" :key="item.id">
        {{ item.name }} &nbsp;{{ item.quantity }}шт.&nbsp;
        <img src="@/assets/img/delete.svg" alt="" />
      </li>
    </ol>
    <div class="form-right">
      <Form
            ref="form"
            :validation-schema="schema"
            @submit="submit"
            :initial-values="formData"
          >
      <div class="form-right-forms">
        <form action="">
          <div class="form-right-forms-left">
            <custom-input
                  placeholder="Имя"
                  name="name"
                  class="name"
                  type="text"
                />
                <custom-input
                  placeholder="Номер телефона"
                  name="number"
                  class="number"
                  type="text"
                  maxlength="12"
                />
          </div>
          <div class="form-right-forms-right">
            <custom-input
                  placeholder="E-mail"
                  name="email"
                  class="email"
                  type="text"
                />
                <custom-input
                  placeholder="Адрес"
                  name="address"
                  class="addres"
                  type="text"
                />
          </div>
          <textarea
              type="text"
              class="message"
              placeholder="Ваше сообщение"
              v-model="message"
            ></textarea>
        </form>
      </div>
      <div class="form-right-personalData">
              <input
                type="checkbox"
                :class="personalDataInvalid ? 'personalDataInvalid' : ''"
                @click="changePersonalData"
              />
              Я согласен с обработкой персональных данных
            </div>
      <button class="pinkButton" type="submit">Отправить</button>
      </Form>
    </div>
  </div>
</template>

<script>
import http from "@/http-common";
import { useToast } from "vue-toastification";
import CustomInput from "@/components/customInput.vue";
import { Form } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    customInput: CustomInput,
    Form: Form,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      items: [],
      schema: yup.object().shape({
        name: yup.string().required("это поле обязательно"),
        email: yup
          .string()
          .email("проверьте корректность адреса")
          .required("это поле обязательно"),
      }),
      formData: {
        name: "",
        email: "",
        address: "",
        phone: "",
      },
      message: "",
      personalDataInvalid: false,
      personalDataHandlingAgreement: false,
    };
  },
  computed: {},
  methods: {
    changePersonalData(event) {
      this.personalDataInvalid = false;
      this.personalDataHandlingAgreement = !this.personalDataHandlingAgreement;
    },
    submit(values) {
      console.log(this.items);
      if (!this.personalDataHandlingAgreement) {
        this.personalDataInvalid = true;
        return;
      }

      this.formData = { ...values };
      http.post("/send_order", {
        data: {
          name: this.formData.name,
          message: this.message,
          phone: this.formData.phone,
          address: this.formData.address,
          email: this.formData.email,
          items: this.items
        },
      });
      this.toast.success("Мы получили ваш заказ!", {
        timeout: 2000,
      });
      this.personalDataInvalid = false;
    },
    loadItemsFromLocalStorage() {
      const savedItems = localStorage.getItem("cartItems");
      console.log(savedItems);
      if (savedItems) {
        this.items = JSON.parse(savedItems);
      }
    },
  },
  mounted() {
    this.loadItemsFromLocalStorage();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.order {
  padding: 100px 0;

  & h1 {
    font-size: 40px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  & h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  li {
    color: rgba(147, 146, 146, 1);
    font-weight: 300;
    margin-bottom: 15px;
    text-decoration: underline;

    &:last-child {
      margin-bottom: 30px;
    }
  }

  & input {
    font-size: 18px;

    &:last-child {
      margin-right: 0;
    }

    &::placeholder {
      font-size: 18px;
    }
  }

  & textarea {
    margin-right: 0;
  }
}

@media (max-width: 768px) {
  .order {
    padding: 100px 0px 100px 10px;

    & * {
      font-size: 14px;
    }

    & textarea {
      width: 95%;
    }

    & input,
    textarea {
      &::placeholder {
        font-size: 14px;
      }
    }

    & h1 {
      font-size: 28px;
    }
  }
}
</style>
