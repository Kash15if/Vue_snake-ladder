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

        <span id="num">{{!activeRed? "red" : "green"}} : {{dice}}</span>

        <button @click="getNum('green')" class="play1" :class="activeRed ? 'disableBtn': ''" :disabled="activeRed">1</button>
        <button @click="getNum('red')" class="play2" :class="activeRed ? '': 'disableBtn'" :disabled="!activeRed">2</button>
        
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
      dice: 0,
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
        this.dice = dataAll.dice;
        
    });

  },
  methods: {
      async getNum(col){
          
          var docRef = await db.collection("ludo").doc("data1");

          var dataAll = await docRef.get().then((doc) => {
              return doc.data();
          });

          let diceVal  = Math.ceil(Math.random() * 6) +1;

          this.dice = diceVal

        var playerVal = dataAll[col]
        
          if((diceVal + playerVal) == 100){
           // alert str winner, new game ok;

            
            this.activeRed = true;
            this.red = 1;
            this.green = 1;
            return
        }
    else if(diceVal + playerVal > 100){
        
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
        
      
      }

     await db.collection("ludo").doc("data1")
    .set({

        name: this.allval,
        green: this.green,
        red: this.red,
        dice: this.dice,
        activeRed: this.activeRed
        
    }); 

    
        function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }


    if(this.allval[playerVal-1].isSnakeOrLadder){
        
        
        await timeout(2000);
          this.allval[playerVal-1][col] = false;

          playerVal += this.allval[playerVal-1].plusminus
          
          this.allval[playerVal-1][col] = true; 

          if(this.activeRed){
          //console.log(playerVal);
          this.red = playerVal;
          }
          else{
            this.green = playerVal;
          }  

    }

    await db.collection("ludo").doc("data1").set({

        name: this.allval,
        green: this.green,
        red: this.red,
        dice: this.dice,
        activeRed: !this.activeRed
        
    }); 
  }
}

}
</script>

<style>


.dice{
    position: relative;
    margin-top: 10px;
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
    background-color: #B0FF00;
}

.circle1{
    right: 5px;
    background-color: #FF0040;
}

.upArr{
  color: #B0FF00;
}

.downArr{
  color:  #FF0040;
}

.disableBtn{
  background:#fff;
  pointer-events: none;
}

#num{
    font-size: 30px;
    font-weight: 900;
    background-color: black;
    color: white;
    padding:10px 20px;
}
</style>
