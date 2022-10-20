app.component("review-list", {
  props: {
    reviews: {
      required: true,
      type: Array,
    },
  },
  template:
    /*html*/
    `
    <div class="review-container">
      <h3>Review:</h3>
      <ul>
        <li v-for="(review,index) in reviews" :key="index">
          {{ review.name }} gave this  {{ review.rating }}  stars
          <br/>
          "{{ review.review }}"
        </li>
      </ul>
    </div> 
     `,
});
