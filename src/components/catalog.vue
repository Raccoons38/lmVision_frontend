<template>
  <div class="catalogContainer row">
    <div class="sideMenu col-sm-2">
      <div class="sideMenu-search">
        <img src="@/assets/img/search.svg" alt="" />
        <input
          type="text"
          placeholder="Поиск"
          @input="search($event.target.value)"
        />
      </div>
      <a href="/cart"><h3>Корзина</h3></a>
      <h3 class="sideMenu-title">Камеры</h3>
      <div
        class="sideMenu-link"
        id="forHome"
        :class="{ activeFilter: filter === 'ip' }"
        @click="filterProducts('ip')"
      >
        <img src="@/assets/img/ipCamera.svg" alt="" /> IP камеры
      </div>
      <div
        class="sideMenu-link"
        id="outside"
        :class="{ activeFilter: filter === 'fullcolor' }"
        @click="filterProducts('fullcolor')"
      >
        <img src="@/assets/img/camera.svg" alt="" />Full color камеры
      </div>
      <div
        class="sideMenu-link"
        id="complect"
        :class="{ activeFilter: filter === 'intercom' }"
        @click="filterProducts('intercom')"
      >
        <img src="@/assets/img/lucide-lab_intercom.png" alt="" />Видеодомофоны
      </div>
      <div
        class="sideMenu-link"
        id="wifiCameras"
        :class="{ activeFilter: filter === 'wifi' }"
        @click="filterProducts('wifi')"
      >
        <img src="@/assets/img/wifi_icon.png" alt="" /> WiFi камеры
      </div>

      <a href="/contacts"
        ><div class="sideMenu-link" id="contacts">
          <img src="@/assets/img/i.png" alt="" />Контакты
        </div></a
      >
    </div>
    
    <div class="catalog col-sm-10">
      <div class="topMenu d-sm-none">
        <div class="topMenu-filterContainer">
          <span class="topMenu-filter" :class="{ activeFilter: filter === 'ip' }" @click="filterProducts('ip')">IP</span>
          <span class="topMenu-filter" :class="{ activeFilter: filter === 'fullcolor' }" @click="filterProducts('fullcolor')">Full color</span>
          <span class="topMenu-filter" :class="{ activeFilter: filter === 'intercom' }" @click="filterProducts('intercom')">Видеодомофоны</span>
          <span class="topMenu-filter" :class="{ activeFilter: filter === 'wifi' }" @click="filterProducts('wifi')">WiFi</span>
          <a class="topMenu-cart" href="/cart"><img src="@/assets/img/cart.svg" alt=""></a>
        </div>
        <div class="sideMenu-search">
          <img src="@/assets/img/search.svg" alt="" />
          <input
            type="text"
            placeholder="Поиск"
            @input="search($event.target.value)"
          />
        </div>
        
        
      </div>
      <div class="catalog-grid">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          :itemsIds="itemsIds"
          @updateIds="updateIds"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "./productCard.vue";
import http from "@/http-common";

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
      filteredProducts: [],
      filter: "",
      cartItems: new Set(),
      itemsIds: new Set(),
    };
  },
  computed: {},
  methods: {
    getProducts() {
      http
        .get("/products")
        .then((response) => {
          this.products = response.data;
          this.filteredProducts.push(...this.products);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveItemsToLocalStorage() {
      var itemsForSave = [];
      this.products.forEach((product) => {
        if (this.itemsIds.has(this.hashCode(product.name))) {
          itemsForSave.push(product);
        }
      });
      localStorage.setItem("cartItems", JSON.stringify(itemsForSave));
    },
    loadItemsFromLocalStorage() {
      const savedItems = localStorage.getItem("cartItems");
      if (savedItems) {
        var items = JSON.parse(savedItems);
        this.cartItems = Array.isArray(items) ? new Set(items) : new Set();
        this.cartItems.forEach((item) => {
          this.itemsIds.add(this.hashCode(item.name));
        });
      }
    },
    updateIds(id) {
      var item = this.products.find((product) => product.name === id[1]);
      if (!item) {
        return;
      }
      if (id[0] === "+") {
        this.itemsIds.add(this.hashCode(id[1]));
        this.cartItems.add(item);
      } else {
        this.itemsIds.delete(this.hashCode(id[1]));
        this.cartItems.delete(item);
      }

      this.saveItemsToLocalStorage();
    },
    search(searchString) {
      if (this.filter !== "") {
        this.filteredProducts = this.products.filter((product) => {
          return product.typeName.toLowerCase() === this.filter.toLowerCase();
        });
      } else {
        this.filteredProducts = this.products;
      }
      this.filteredProducts = this.filteredProducts.filter((product) => {
        var lowerCaseName = product.name.toLowerCase();
        return lowerCaseName.includes(searchString.toLowerCase());
      });
    },
    filterProducts(filter) {
      if (this.filter === filter) {
        this.filteredProducts = this.products;
        this.filter = "";
        return;
      }
      this.filter = filter;
      this.filteredProducts = this.products.filter((product) => {
        return product.typeName.toLowerCase() === filter.toLowerCase();
      });
    },
    hashCode(s) {
      for (var i = 0, h = 0; i < s.length; i++)
        h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
      return h;
    },
  },
  mounted() {
    this.getProducts();
    this.loadItemsFromLocalStorage();
  },
};
</script>

<style lang="scss">
$pink: rgba(232, 107, 117, 1);
$mainText: rgba(33, 37, 41, 1);

.catalogContainer {
  max-width: 100%;
}

.topMenu{
  padding-top: 5px;
  padding-bottom: 10px;
  background-color: black;
  font-size: 20px;
  font-weight: 300;
  margin-top: 30px;
  width: 100vw;

  &-filterContainer {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 10px;
    align-items: baseline;
    margin-left: 10px;
    margin-bottom: 10px;
    position: relative;
    
  }
  &-filter {
    z-index: 100%;
    cursor: pointer;
    color: white;
    font-size: 11px;
    background-color: rgba(255, 255, 255, 0.3);
    padding-inline: 5px;
    padding-block: 2px;
    border-radius: 4px;
  }
  & .activeFilter {
    background-color: rgba(255, 255, 255, 0.5);
  }

  &-cart {
    position: absolute;
    right: 20px;
    top: -8px;
    img{
      width: 20px;
      height: 20px;
    }
  }
}

.sideMenu {
  background-color: $mainText;
  color: white;
  padding: 100px 20px 0 20px !important;

  &-search {
    background-color: rgba(196, 196, 196, 0.5);
    border-radius: 12px;
    padding: 10px;
    padding-left: 15px;
    display: flex;
    align-items: end;

    & img {
      margin-right: 20px;
      margin-bottom: 5px;
    }

    & input {
      width: 100%;
      background: transparent;
      border: none;
      font-size: 20px;
      font-weight: 300;
      color: white;

      &::placeholder {
        color: white;
      }

      &:focus {
        background: transparent;
        border: none;
        outline: none !important;
      }
    }
  }

  & a {
    text-decoration: none;
    color: white;
  }

  & h3 {
    margin-bottom: 39px;
    margin-top: 80px;

    &:first-child {
      margin-top: 10px;
    }
  }

  &-link {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    color: white;
    margin: 20px 0;
    cursor: pointer;

    & img {
      margin-right: 20px;
    }

    &:last-child {
      margin-top: 175px;
    }
  }

  & .activeFilter {
    background-color: rgba(255, 255, 255, 0.426);
    border-radius: 10px;
  }

  & img {
    width: 28px;
  }
}

@media (max-width: 768px) {
  .sideMenu {
    display: none;
    &-search {
    background-color: rgba(196, 196, 196, 0.5);
    border-radius: 12px;
    padding: 10px;
    padding-left: 15px;
    margin-inline: 10px;
    display: flex;
    align-items: flex-end;

    & img {
      margin-right: 20px;
      margin-bottom: 0;
      width: 15px;
      height: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    & input {
      width: 100%;
      background: transparent;
      border: none;
      font-size: 10px;
      font-weight: 300;
      color: white;

      &::placeholder {
        color: white;
      }

      &:focus {
        background: transparent;
        border: none;
        outline: none !important;
      }
    }
  }

}
}

.catalog {
  padding-top: 100px;

  &-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .catalog {
    padding-top: 50px;
    &-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
