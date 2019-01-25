<template>
  <div class="c-site">
    <div v-for="(house, index) in houses" :key="index" class="c-quad">
      <p>{{ house.name }}</p>
    </div>
    <div class="c-spinner">
      <img src="img/icons/apple-touch-icon-180x180.png" alt="" :style="{ transform: `rotate(${this.spinnerAngle}deg)`}">
    </div>
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
      beginStopAngle: 0,
      stopAngle: 0,
      stopAngleDiff: 0,
      minFrames: 0,
      houses: [
        {
          name: 'Griffin',
        },
        {
          name: 'Lion',
        },
        {
          name: 'Pegasus',
        },
        {
          name: 'Phoenix',
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
      this.isSpinning = true;
      window.requestAnimationFrame(this.spin);
    },
    easeOut(t) {
      return t * (2 - t);
    },
    endSpin() {
      console.log(this.selectedHouse.name);
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
