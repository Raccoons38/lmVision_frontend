<template>
  <div class="container">
    <div class="form row">
      <div class="form-left col-sm-3 col-12">
        <div class="form-left-hours">
          <h2>Часы работы</h2>
          <p>
            Пн-Сб - 9:00 до 18:00 <br />
            Вс - выходной
          </p>
        </div>
        <div class="form-left-contacts">
          <h2>Наши контакты</h2>
          <p>
            Тел: +7 (902)-510-87-30 <br />
            60-87-30 <br />
            <br />
            Email: lm-video@mail.ru
          </p>
        </div>
      </div>
      <div class="form-padding col-sm-2 col-0"></div>
      <div class="form-right col-sm-7 col-12">
        <h2>Напишите нам</h2>
        <div class="form-right-forms">
          <Form
            ref="form"
            :validation-schema="schema"
            @submit="submit"
            :initial-values="formData"
          >
            <div class="form-container">
              <div class="form-column">
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
              <div class="form-column">
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
            </div>
            <textarea
              type="text"
              class="message"
              placeholder="Ваше сообщение"
              v-model="message"
            ></textarea>

            <button class="pinkButton" type="submit">Отправить</button>
            <div class="form-right-personalData">
              <input
                type="checkbox"
                :class="personalDataInvalid ? 'personalDataInvalid' : ''"
                @click="changePersonalData"
              />
              Я согласен с обработкой персональных данных
            </div>
          </Form>
        </div>
      </div>
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
      if (!this.personalDataHandlingAgreement) {
        this.personalDataInvalid = true;
        return;
      }

      this.formData = { ...values };
      http.post("/send_mail", {
        data: {
          name: this.formData.name,
          message: this.message,
          phone: this.formData.phone,
          address: this.formData.address,
          email: this.formData.email,
        },
      });
      this.toast.success("Мы получили ваше обращение!", {
        timeout: 2000,
      });
      this.personalDataInvalid = false;
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
.personalDataInvalid {
  -webkit-box-shadow: 0px 0px 0px 2px rgba(255, 0, 0, 1);
  -moz-box-shadow: 0px 0px 0px 2px rgba(255, 0, 0, 1);
  box-shadow: 0px 0px 0px 2px rgba(255, 0, 0, 1);
}

.form-right-personalData {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  input {
    width: auto !important;
    margin-right: 10px;
  }
}
.form-container {
  display: flex;
  flex-direction: row;
}
.form-column {
  display: flex;
  flex-direction: column;
  width: auto;
  gap: 15px;
}
.form {
  font-family: $unbounded-v;
  padding: 73px 0 40px 0;

  &-left {
    & h2 {
      margin-bottom: 40px;
    }
    & p {
      margin-bottom: 64px;
    }
  }

  &-right {
    h2 {
      margin-bottom: 40px;
    }
    &-forms {
      & input[type="text"],
      textarea {
        width: 90%;
        margin-bottom: 5px;
        margin-right: 5%;
        padding: 10px;
        border: 1px solid rgba(244, 244, 244, 1);

        &::placeholder {
          font-size: 18px;
          color: rgba(166, 166, 171, 1);
        }

        &:last-child {
          margin-right: 0;
        }
      }

      & .message {
        width: 95%;
        height: 210px;
        resize: none;
        margin-top: 15px;
      }
    }
  }
}

@media (max-width: 768px) {
  .form {
    &-right {
      &-forms {
        & input,
        textarea {
          &::placeholder {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
