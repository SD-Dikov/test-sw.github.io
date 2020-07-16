<template lang="html">
  <div class="fifteen">
    <h1 class="fifteen__title">Fiftee<span>n</span></h1>
  <div class="fifteen__info">
    <div class="time-block">
      <p>Time {{ minutes }}:{{ seconds }}</p>
    </div>
      <div class="move-counter">
      <p>Steps {{ moveCount }}</p>
    </div>
  </div>
      <transition-group class="game-field" name="game-field" tag="div">
        <div
          class="game-field__cell"
          v-for="(number, index) in shuffleNumbers"
          :key="number"
          @click="moveCell(shuffleNumbers, index)"
        >
          {{ number }}
        </div>
    </transition-group>
    <button
      class="fifteen__btn"
      @click="startNewGame(numbers)"
    >
      Start new game
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, " "],
      shuffleNumbers: [],
      moveCount: 0,
      minutes: '00',
      seconds: '00'
    }
  },
  methods: {
    getShuffleNumbers(arr) {
      let sortedArr = arr.slice().sort(() => Math.random() - 0.5);
      while (this.setSolvable(sortedArr)) {
        sortedArr.slice().sort(() => Math.random() - 0.5);
      }
      this.shuffleNumbers = sortedArr;
    },
    moveCell(arr, item) {
      if (arr[item + 1] === " ") {
        arr[item] = arr.splice((item + 1), 1, arr[item])[0];
        this.moveCount++
      } else if (arr[item - 1] === " ") {
        arr[item] = arr.splice((item - 1), 1, arr[item])[0];
        this.moveCount++
      }  else if (arr[item + 4] === " ") {
        arr[item] = arr.splice((item + 4), 1, arr[item])[0];
        this.moveCount++
      }  else if (arr[item - 4] === " ") {
        arr[item] = arr.splice((item - 4), 1, arr[item])[0];
        this.moveCount++
      }
      if (arr.join('') == this.numbers.join('')) {
        alert('YOU WIN!');
      }
      return arr
    },
    setSolvable(arr) {
      let coefficient
      for (let i = 1; i < arr.length - 1; i++) {
        for (let j = i - 1; j >= 0; j--) {
          if (arr[j] > arr[i]) {
            coefficient++;
          }
        }
      }
      return (coefficient % 2 === 0);
    },
    setTime() {
      const base = 60;
      this.seconds++;
      if (this.seconds < 10) {
        this.seconds = '0' + this.seconds;
      }
      if (this.seconds > (base - 1)) {
        this.seconds = '00';
        this.minutes++;
        if (this.minutes < 10) {
          this.minutes = '0' + this.minutes;
        }
      }
      if (this.minutes > (base - 1)) {
        this.minutes = '00';
      }
    },
    startNewGame(arr) {
      this.moveCount = 0;
      this.seconds = '00';
      this.minutes = '00';
      this.getShuffleNumbers(arr);
    }
  },
  mounted() {
    this.getShuffleNumbers(this.numbers);
  },
  created() {
    setInterval(this.setTime, 1000);
  }
}
</script>

<style lang="scss">

@font-face {
  font-family: 'Roboto';
  src: url(http://fonts.gstatic.com/s/roboto/v18/KFOkCnqEu92Fr1Mu51xMIzIFKw.woff2) format('woff2');
}

.fifteen {
  box-sizing: border-box;
  background-color: #E5E5E5;
  font-family: 'Roboto', sans-serif;
  color: #000000;
  width: 420px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;

    @media screen and (max-width: 450px) {
      width: 300px;
      padding: 5;
    }

  &__title {
    font-size: 60px;
    text-align: center;
    letter-spacing: 0.385em;
    text-decoration-line: underline;
    text-transform: uppercase;
    color: #F56568;
    margin-bottom: 20px;

    span {
      letter-spacing: normal;
    }

    @media screen and (max-width: 450px) {
      font-size: 42px;
      margin-bottom: 10px;
    }
  }

  &__info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 28px;
    text-align: center;
    margin-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;

      p {
        margin: 0;
      }

      @media screen and (max-width: 450px) {
        font-size: 20px;
        margin-bottom: 10px;
        padding: 0;
      }
  }

  &__btn {
    text-decoration: none;
    display: inline-block;
    width: 400px;
    height: 100px;
    background: #EBEBEB;
    border: 3px solid #FFFFFF;
    border-radius: 25px;
    font-size: 28px;
    text-align: center;
    text-transform: uppercase;
    color: #F56568;
      &:hover,
      &:focus {
        outline: 0;
        background-color: #EDF0F6;
      }

      &:active {
        opacity: 0.7;
        padding: inherit;
      }

      @media screen and (max-width: 450px) {
        width: 280px;
        height: 60px;
        border-radius: 20px;
        font-size: 20px;
        margin-bottom: 10px;
      }
  }
}

.game-field {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;

  @media screen and (max-width: 450px){
    margin-bottom: 10px;
  }

  &__cell {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #EBEBEB;
    width: 100px;
    height: 100px;
    border: 3px solid #FFFFFF;
    border-radius: 20px;
    font-size: 46px;
    color: #7088BA;
    &:hover,
    &:focus {
      cursor: pointer;
      background-color: #EDF0F6;
    }
    @media screen and (max-width: 450px) {
      width: 70px;
      height: 70px;
      border-radius: 15px;
      font-size: 36px;
    }
  }

  &-move {
    transition: transform 0.7s;
  }
}

.time-block,
.move-counter {
  width: 80px;

  @media screen and (max-width: 450px) {
    width: auto;
  }
}
</style>
