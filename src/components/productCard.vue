<template>
  <div class="productCard">
    <img :src="getImageUrl(product.imgURL)" alt="product image" />
    <h3>{{ product.name }}</h3>
    <div class="productCard-description">
      <span>{{ product.price }} руб.</span>
      <button v-if="!isInCart()" @click="addItem()">В корзину</button>
      <button v-if="isInCart()" @click="removeItem()" class="delete-button">
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemsIds: {
      type: Set,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    isInCart() {
      return this.itemsIds.has(this.hashCode(this.product.name));
    },
    removeItem() {
      this.product.quantity = 1;
      this.itemsIds.delete(this.hashCode(this.product.name));
      this.$emit("updateIds", ["-", this.product.name]);
    },
    addItem() {
      this.itemsIds.add(this.hashCode(this.product.name));
      this.$emit("updateIds", ["+", this.product.name]);
    },
    hashCode(s) {
      for (var i = 0, h = 0; i < s.length; i++)
        h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
      return h;
    },
    getImageUrl(imageName) {
      return require(`@/assets/img/products/${imageName}`);
    },
  },
};
</script>

<style lang="scss">
.productCard {
  width: 292px;
  height: 332px;
  border-radius: 4px;

  & h3 {
    text-align: left;
    font-size: 18px;
  }

  &-description {
    display: flex;
    align-items: center;
    justify-content: start;

    & span {
      margin-right: 10px;
    }

    & button {
      color: black;
      border: none;
      background: none;
      text-decoration: underline;
    }

    & .quantity-controls {
      display: flex;
      align-items: center;

      .quantity-button {
        background-color: #ddd;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        text-decoration: none;

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
  }

  & img {
    width: 292px;
    height: 195px;
    object-fit: contain;

    border-radius: 4px;
  }
}

@media (max-width: 768px) {
  .productCard {
    width: 150px;
    height: 220px;
    font-size: 10px;

    & h3 {
      font-size: 10px;
    }
    & img {
      width: 133px;
    }
  }
}
</style>
