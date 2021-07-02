<template>
  <div>

    <div id="demo" class="flex-container" >
        <div v-for="(val, index) in allval" :key="index">
            <div class="arrow" v-if="val.isSnakeOrLadder">
              <span class="upArr" v-if="val.plusminus > 0">&#8593;<b> {{val.plusminus}}</b></span>
              <span class="downArr" v-if="val.plusminus < 0">&#x2193;<b> {{val.plusminus}}</b></span>
            </div>
            <b v-if="!val.isSnakeOrLadder"> {{index + 1}} </b> 
            <div class="circle circle1" v-if="!val.red"></div>
            <div class="circle circle2" v-if="!val.green"></div>
        </div>
        
    </div>

    <div class="dice">

        <span id="num"></span>

        <button @click="getNum" class="play1">1</button>
        <button @click="getNum" class="play2">2</button>
    </div>

  
  </div>
   
</template>

<script>
import db from "./firebaseinit";

export default {
  name: 'Game',
  components: {

  },
  data(){
    return{
      allval: []
    }
  },
  created(){

    db.collection("ludo").doc("data1")
    .onSnapshot((doc) => {
        this.allval = doc.data().name;
        //console.log("Current data: ", doc.data());
    });

  },
  methods: {
      getNum(){
          console.log("abcd");
      }
  }
}
</script>

<style>


.dice{
    position: relative;
  }
        
.play1{
      position: fixed;
      bottom: 30px;
      right: 10px;
      background-color: #04AA6D; /* Green */
      border: none;
      color: white;
      padding: 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 40%;
      }

.play2{
      position: fixed;
      bottom: 30px;
      left: 10px;
      background-color: red; 
      border: none;
      color: white;
      padding: 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 40%;
      }


.flex-container {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
}

.flex-container > div {
  background-color: rgb(0, 93, 185);
  width: 8vw;
  height: 6vh;
  margin: 10px;
  text-align: center;
  font-size: 25px;
  color: #fff;
  position: relative;
}

.circle{
    position: absolute;
    bottom: 5px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    color: #fff;
    padding: 3px;
    font-size: 25px;
    font-weight: bolder;
}

.circle2{
    left: 5px;
    background-color: rgb(127, 250, 178);
}

.circle1{
    right: 5px;
    background-color: rgb(250, 98, 98);
}

.upArr{
  color: red;
}

.downArr{
  color:  #04AA6D;
}
</style>
