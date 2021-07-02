<template>
  <div>

    <div id="demo" class="flex-container" >
        <div v-for="(val, index) in allval" :key="index">
            <div class="arrow" v-if="val.isSnakeOrLadder">
              <span class="upArr" v-if="val.plusminus > 0">&#8593;<b> {{val.plusminus}}</b></span>
              <span class="downArr" v-if="val.plusminus < 0">&#x2193;<b> {{val.plusminus}}</b></span>
            </div>
            <b v-if="!val.isSnakeOrLadder"> {{index + 1}} </b> 
            <div class="circle circle1" v-if="val.red"></div>
            <div class="circle circle2" v-if="val.green"></div>
        </div>
        
    </div>

    <div class="dice">

        <span id="num"></span>

        <button @click="getNum('green')" class="play1" :disabled="activeRed">1</button>
        <button @click="getNum('red')" class="play2" :disabled="!activeRed">2</button>
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
      allval: [],
      red: 1,
      green: 1,
      activeRed: true
    }
  },
  created(){

    db.collection("ludo").doc("data1")
    .onSnapshot((doc) => {

        var dataAll = doc.data();

        this.allval = dataAll.name;
        this.red = dataAll.red;
        this.green = dataAll.green;
        this.activeRed = dataAll.activeRed;
        
    });

  },
  methods: {
      async getNum(col){
          
          var docRef = await db.collection("ludo").doc("data1");

          var dataAll = await docRef.get().then((doc) => {
              return doc.data();
          });

          let diceVal  = Math.abs(Math.ceil(Math.random() * 10 - 5)) +1;

        
          let playerVal = dataAll[col];

              if(playerVal = 1){
            if(diceVal == 6 || diceVal == 1){
                console.log("at1");
            }
            else{
                
                this.activeRed != this.activeRed;
            }
        }
        else if((diceVal + playerVal) == 100){
           // alert str winner, new game ok;

            
            this.activeRed = true;
            this.red = 1;
            this.green = 1;

        }
    else if(diceVal + playerVal > 100){
        
            this.activeRed = !this.activeRed;
    }
    else{
  

        //travel function() with setInterval
        
        this.allval[playerVal-1][col] = false;

        playerVal += diceVal;
        this.allval[playerVal-1][col] = true;
        
        
        if(this.activeRed){
          //console.log(playerVal);
          this.red = playerVal;
        }
        else{
            this.green = playerVal;
        }
        
        this.activeRed = !this.activeRed;
      
      }

     await db.collection("ludo").doc("data1")
    .set({

        name: this.allval,
        green: this.green,
        red: this.red,
        activeRed: this.activeRed
        
    }); 
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
  color: rgb(127, 250, 178);
}

.downArr{
  color:  rgb(250, 98, 98);
}
</style>
