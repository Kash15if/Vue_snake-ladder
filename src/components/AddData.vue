<template>

<div>
  <div><button @click="dataToDb">add data</button></div>
</div> 
</template>

<script>

import db from "./firebaseinit";

export default {
  name: 'AddData',
  data(){
    return{
      
    }
  },
  methods: {

    async dataToDb(){
      
      var x = await require("./data.json");
      
      const data = {

        red: 1,
        green: 1,
        activeRed: true,
        "name": x
      };

      // Add a new document in collection "cities" with ID 'LA'
      const res = await db.collection('ludo').doc('data1').set(data);
    }


  }


}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

button {
  background-color: white; 
  color: black; 
  border: 2px solid #4CAF50;
}

button:hover {
  background-color: #4CAF50;
  color: white;
}

</style>
