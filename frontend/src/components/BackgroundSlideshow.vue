<!-- Ripped from https://tympanus.net/codrops/2012/01/02/fullscreen-background-image-slideshow-with-css3/ and
     https://forum.vuejs.org/t/full-screen-background-component/15790
-->

<template>
  <div>
    <ul class="cb-slideshow">
       <li v-for="(image, index) in images">
         <span :style="backgroundClass(image, index)"></span>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'background-slideshow',
  // TODO: Don't hard code these images
  data: function() {
    return {
      images: [{
        // Airplane
        path: 'https://c.pxhere.com/photos/32/b6/airplane_aircraft_flying_transportation_travel_fly_air_flight-1361190.jpg!d'
      }, {
        // Skyline
        path: 'http://www.telegraph.co.uk/content/dam/Travel/Tours/New%20York1-xlarge.jpg'
      }, {
        // Fine dining
        path: 'http://static4.businessinsider.com/image/536d34b6ecad045b143e69bc/15-etiquette-rules-for-dining-at-fancy-restaurants.jpg'
      }, {
        // Hipster coffee shop
        path: 'http://www.marvelbuilding.com/wp-content/uploads/2010/10/Despresso-Cafe-Interior.jpg'
              // This image is nice but makes the text hard to read
              //'http://cdn.trottermag.com/hero/portland/ristretto-roasters-20150312141909.jpg'
      }, {
        // Festival
        path: 'http://a57.foxnews.com/images.foxnews.com/content/fox-news/us/2017/08/21/hours-for-nycs-caribbean-festival-shifted-to-fight-violence/_jcr_content/par/featured-media/media-0.img.png/0/0/1503341875907.png?ve=1'
      }, {
        // Outdoors
        path: 'https://media.timeout.com/images/102749525/image.jpg'
      }]
    }
  },
  methods: {
    backgroundClass(image, index) {
      // determine place of image in array
      if (index > 0) {
        let styles = {
          'animation-delay': index * this.images.length + 's',
          'background-image': `url(${image.path})`,
        }
        return styles;
      }
      return {
        'background-image': `url(${image.path})`,
      }
    },
  },
};
</script>

<style scope>
ul {
  list-style: none;
}

.cb-slideshow,
.cb-slideshow:after {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 0;
}

.cb-slideshow:after {
  content: '';
  /* Photo effects: stippling and vignette */
  background: transparent url(https://tympanus.net/Tutorials/CSS3FullscreenSlideshow/images/pattern.png) repeat top left;
  box-shadow: 0 0 200px rgba(0,0,0,0.7) inset;
}

.cb-slideshow li span {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  color: transparent;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: none;
  opacity: 0;
  z-index: 0;
  animation: imageAnimation 36s linear infinite 0s;
}

@keyframes imageAnimation { 
  0% {
      opacity: 0;
      animation-timing-function: ease-in;
  }
  8% {
      opacity: 1;
      transform: scale(1.05);
      animation-timing-function: ease-out;
  }
  17% {
      opacity: 1;
      transform: scale(1.1);
  }
  25% {
      opacity: 0;
      transform: scale(1.1);
  }
  100% { opacity: 0 }
}

@media screen and (max-width: 1140px) {
  .cb-slideshow li div h3 {
    font-size: 100px;
  }
}

@media screen and (max-width: 600px) {
  .cb-slideshow li div h3 {
    font-size: 80px
  }
}
</style>
