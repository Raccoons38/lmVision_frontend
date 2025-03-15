<template>
  <div class="cart container">
    <!-- Левая часть с прокручиваемым списком товаров -->
    <div class="cart-items">
      <div v-for="item in items" :key="item.id" class="cart-item">
        <img
          :src="getImageUrl(item.imgURL)"
          :alt="item.name"
          class="item-image"
        />
        <div class="item-details">
          <h3 class="item-name">{{ item.name }}</h3>
          <p class="item-description">{{ item.description }}</p>
          <div class="quantity-controls">
            <button
              @click="updateQuantity(item, item.quantity - 1)"
              class="quantity-button"
            >
              -
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button
              @click="updateQuantity(item, item.quantity + 1)"
              class="quantity-button"
            >
              +
            </button>
            <button @click="deleteItem(item)" class="delete-button">
              удалить
            </button>
          </div>
        </div>
        <div class="item-sum">
          <p class="item-price">Цена за единицу: {{ item.price }} руб.</p>
          <p class="item-total">Сумма: {{ itemTotal(item) }} руб.</p>
        </div>
      </div>
    </div>

    <!-- Правая часть с итогами -->
    <div class="cart-summary">
      <h2>Итого</h2>
      <p>Количество товаров: {{ totalItems }}</p>
      <p>Общая сумма: {{ totalPrice }} руб.</p>
      <button @click="checkout" class="pinkButton">Оформить заказ</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: []
    };
  },
  computed: {
    totalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice() {
      return this.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    updateQuantity(item, newQuantity) {
      if (newQuantity > 0) {
        item.quantity = newQuantity;
        const newItem = this.items.find((i) => i.id === item.id);

        if (newItem) {
          newItem.quantity = newQuantity;
          this.saveItemsToLocalStorage();
        }
      }
      if (newQuantity === 0) {
        this.deleteItem(item);
      }
    },
    deleteItem(item) {
      var index = this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1);

        this.saveItemsToLocalStorage();
      }
    },
    itemTotal(item) {
      return item.price * item.quantity;
    },
    checkout() {
      if (this.items.length > 0) {
        window.location.href = "/order";
      } else {
        alert("Корзина пустая!");
      }
    },
    getImageUrl(imageName) {
      if (imageName) {
        return require(`@/assets/img/products/${imageName}`);
      } else {
        return require(`@/assets/img/products/0_0.png`);
      }
    },
    saveItemsToLocalStorage() {
      localStorage.setItem("cartItems", JSON.stringify(this.items));
    },
    loadItemsFromLocalStorage() {
      const savedItems = localStorage.getItem("cartItems");
      this.items = JSON.parse(savedItems);
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].quantity = 1;
      }
    },
  },
  beforeCreate(){
  },
  mounted() {
    this.loadItemsFromLocalStorage();
  },

};
</script>

<style lang="scss">
.cart {
  display: flex;
  justify-content: space-between;
  padding-top: 100px;

  &-items {
    width: 70%;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    padding-right: 20px;
    border-right: 1px solid #ccc;
  }

  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .item-image {
    width: 200px;
    height: 200px;
    margin-right: 20px;
  }

  .item-details {
    flex: 1;
  }

  .item-name {
    font-size: 18px;
    margin-bottom: 5px;
  }

  .item-description {
    font-size: 14px;
    color: #777;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .quantity-button {
      background-color: #ddd;
      border: none;
      padding: 5px 10px;
      cursor: pointer;

      &:hover {
        background-color: #ccc;
      }
    }

    .delete-button {
      border: none;
      background: none;
      text-decoration: underline;
    }

    .quantity {
      margin: 0 10px;
    }
  }

  .item-price,
  .item-total {
    margin-top: 10px;
    font-size: 16px;
  }

  &-summary {
    width: 30%;
    padding-left: 20px;
  }
}

@media (max-width: 768px) {
  .cart {
    flex-direction: column;
    &-items {
      width: 100%;
      max-height: calc(100vh - 100px);
      overflow-y: auto;
      padding-right: 20px;
      border-right: 1px solid #ccc;
    }
    &-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 20px;
    }
    &-summary {
      width: 100%;
      padding-left: 20px;
      margin-bottom: 20px;
    } 
  }
}
</style>