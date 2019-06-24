<template>
  <div class="c-site">
    <div class="c-quad">
      <img class="c-quad__img" src="/img/houses/phoenix.png" alt="">
    </div>
    <div class="c-quad">
      <img class="c-quad__img" src="/img/houses/griffin.png" alt="">
    </div>
    <div class="c-quad">
      <img class="c-quad__img" src="/img/houses/pegasus.png" alt="">
    </div>
    <div class="c-quad">
      <img class="c-quad__img" src="/img/houses/lion.png" alt="">
    </div>
    <transition name="u-trans-pop">
      <div v-if="showHouse" class="o-center-stage o-center-stage--bg c-house">
        <img class="c-house__img" :src="`/img/houses/${selectedHouse.image}`" alt="">
        <img class="c-house__bloom" :src="`/img/houses/bloom/${selectedHouse.image}`" alt="">
          <img class="c-house__sparkle" :src="`/img/houses/bloom/sparkle/${selectedHouse.image}`" alt="">
        <p class="c-house__title">{{ selectedHouse.name }}</p>
      </div>
    </transition>
    <transition name="u-trans-pop">
      <div v-if="!showHouse" class="o-center-stage c-spinner">
        <img src="img/spinner.png" alt="" :style="{ transform: `rotate(${this.spinnerAngle}deg)`}">
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      spinnerAngle: 0,
      spinnerSpeed: 8,
      isSpinning: false,
      isStopping: false,
      showHouse: false,
      beginStopAngle: 0,
      stopAngle: 0,
      stopAngleDiff: 0,
      minFrames: 0,
      houses: [
        {
          name: 'Griffin',
          id: 'griffin',
          image: 'griffin.png',
        },
        {
          name: 'Lion',
          id: 'lion',
          image: 'lion.png',
        },
        {
          name: 'Pegasus',
          id: 'pegasus',
          image: 'pegasus.png',
        },
        {
          name: 'Phoenix',
          id: 'phoenix',
          image: 'phoenix.png',
        },
      ],
      selectedHouse: {},
    };
  },
  methods: {
    spin() {
      let angle = this.spinnerAngle + this.spinnerSpeed;
      if (angle > 360) {
        angle -= 360;
      }
      this.spinnerAngle = angle;

      if (this.isSpinning) {
        window.requestAnimationFrame(this.spin);
      } else if (this.isStopping) {
        window.requestAnimationFrame(this.slowSpin);
      }
    },
    startSpin() {
      this.showHouse = false;
      this.isSpinning = true;
      window.requestAnimationFrame(this.spin);
    },
    easeOut(t) {
      return t * (2 - t);
    },
    endSpin() {
      console.log(this.selectedHouse.name);

      const that = this;
      setTimeout(() => {
        that.showHouse =  true;
      }, 250);
    },
    slowSpin() {
      // TODO: Currently have an ease out that is based on distance
      // Need to update to take into account max spin speed to make it silky smooth
      // Current plan is to calculate linear acceleration & then up/down shift so that
      // we can hopefully get the final degree value to be pretty close to the actual one
      const diff = this.spinnerAngle - this.beginStopAngle;
      const t = diff / this.stopAngleDiff;

      if (t >= 1) {
        this.isStopping = false;
        this.endSpin();
      } else {
        this.spinnerAngle = this.beginStopAngle + (this.stopAngleDiff * this.easeOut(t));
        window.requestAnimationFrame(this.slowSpin);
      }
    },
    beginEndSpin(int) {
      this.isSpinning = false;
      this.isStopping = true;

      this.beginStopAngle = this.spinnerAngle;
      const quad = int < 4 ? int : Math.round(Math.random() * 3);
      this.selectedHouse = this.houses[quad];
      this.stopAngle = (Math.random() * 90) + (quad * 90);

      let angleDiff = this.stopAngle - this.beginStopAngle;
      if (angleDiff < 0) {
        angleDiff += 360;
      }
      this.stopAngleDiff = angleDiff;
      this.minFrames = Math.ceil(this.stopAngleDiff / this.spinnerSpeed);
    },
    handleKeydown(event) {
      if (this.isSpinning) {
        switch (event.keyCode) {
          case 32:
            this.beginEndSpin(4);
            break;
          case 49:
            this.beginEndSpin(0);
            break;
          case 50:
            this.beginEndSpin(1);
            break;
          case 51:
            this.beginEndSpin(2);
            break;
          case 52:
            this.beginEndSpin(3);
            break;
          default:
            // TODO: Remove this;
            console.log(event.keyCode);
        }
      } else if (!this.isStopping) {
        this.startSpin();
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
};
</script>
