app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img
              :src="image"
              :alt="alternative"
              :class="{'out-of-stock-img' : !inStock}"
            />
          </div>
          <div class="product-info">
            <h1>{{title}}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping {{shipping}}</p>
            <ul>
              <li v-for="detail in details">{{detail}}</li>
            </ul>
            <div
              v-for="(variant,index) in variants"
              v-bind:key="variant.id"
              v-on:mouseover="updateVariant(index)"
              class="color-circle"
              v-bind:style="{backgroundColor:variant.color}"
            ></div>
            <button
              class="button"
              @click="addToCart"
              v-bind:class="{disabledButton : !inStock}"
              v-bind:disabled="!inStock"
            >
              Add to Cart
            </button>
            <button class="button" v-on:click="removeFromCart">
              Remove from Cart
            </button>
          </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
      </div>`,

  data() {
    return {
      brand: "Vue Mastery",
      product: "Socks",
      selectedIndex: 0,
      alternative: "Image of blue sock",
      inventory: 5,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2224,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2225,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 0,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedIndex].id);
    },
    updateVariant(index) {
      this.selectedIndex = index;
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.variants[this.selectedIndex].id);
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },

  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedIndex].image;
    },
    inStock() {
      return this.variants[this.selectedIndex].quantity;
    },
    shipping() {
      if (this.premium) {
        return "free";
      }
      return 2.99;
    },
  },
});
