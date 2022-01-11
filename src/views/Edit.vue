<template>
  <div class="home">


      <div class="popup-content">
        <h2>Edit Recipe</h2>

        <form @submit.prevent="editSaveRecipe">
          <div class="group">
            <label>Title</label>
            <input type="text" v-model="editRecipe.title">
          </div>
          <div class="group">
            <label>Description</label>
            <textarea v-model="editRecipe.description"></textarea>
          </div>
          <div class="group">
            <label>Ingredients</label>
            <div class="ingredient" v-for="(ing, i) in editRecipe.ingredients" :key="i">
              <input type="text"  v-model="editRecipe.ingredients[i]" />
              <button class="delete" type="button" @click="deleteIngredient(i)">Delete</button>
            </div>
            <button type="button" @click="addNewIngredient">Add Ingredient</button>
          </div>
          <div class="group">
            <label>Method</label>
            <div class="method" v-for="(ing, i) in editRecipe.method" :key="i">
              <textarea v-model="editRecipe.method[i]"></textarea>
              <button class="delete" type="button" @click="deleteStep(i)">Delete</button>
            </div>
            <button type="button" @click="addNewStep">Add Step</button>
          </div>

          <button type="submit">Save</button>
          <button type="button" @click="cancel">Cancel</button>
          <!--<router-link :to="`/`">
            <button>Cancel</button>
          </router-link>-->

        </form>

      </div>


  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Edit",
  data (){
    return {
      editRecipe : {
        title : '',
        description : '',
        ingredients : [],
        method : [],
      }
    }
  },
  methods : {
    addNewIngredient() {
      this.editRecipe.ingredients.push('')
    },
     addNewStep(){
       this.editRecipe.method.push('')
    },
    editSaveRecipe() {
      //console.log(this.editRecipe)
      this.$store.commit('UPDATE_RECIPE', this.editRecipe)
      this.$router.push({name : 'Home'})
    },
    deleteIngredient(index){
      let ing = this.editRecipe.ingredients[index]
      this.editRecipe.ingredients.splice(index,1)

    },
    deleteStep(index){
      let ing = this.editRecipe.method[index]
      this.editRecipe.method.splice(index,1)
    },
    cancel(){
      this.$router.push('/')
    }
  },

  created() {
    const recipe = this.$store.state.recipes.find(recipe => recipe.slug == this.$route.params.slug)
    const clone = JSON.parse(JSON.stringify(recipe));
    this.editRecipe = clone
  },


}
</script>

<style>
.home {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
h1 {
  font-size: 3rem;
  margin-bottom: 32px;
}
.recipes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.recipes .card {
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem;
  background-color: #081c33;
}
.recipes .card h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.recipes .card p {
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.popup-content {
  background-color: #081c33;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 768px;

}
.popup-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.popup-content .group {
  margin-bottom: 1rem;
}
.popup-content .group label {
  display: block;
  margin-bottom: 0.5rem;
}
.popup-content .group input,
.popup-content .group textarea {
  display: flex;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}
.popup-content .group textarea {
  height: 50px;
  resize: none;
}
.popup-content button[type="submit"] {
  margin-right: 1rem;
}
.popup-content .group .delete {
  background-color: red;
  display: flex;
  margin-bottom: 1rem;
}
.ingredient {
  display: flex;
}
.ingredient .delete {
  margin-left: 5px;
}
.method {
  display: flex;
}
.method .delete {
  margin-left: 5px;
}

</style>
