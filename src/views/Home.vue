<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <b-form inline>
        <b-input
          v-model="newItem"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="New Item"
          @keydown.enter.prevent="addShoppingItem"
        ></b-input>
        <b-button variant="primary" @click.prevent="addShoppingItem">
          Add
        </b-button>
      </b-form>
      <br />
    </div>

    <div class="row mt-4 justify-content-center">
      <b-col md="6" sm="12">
        <b-list-group class>
          <b-list-group-item v-for="(item, index) in listItems" :key="index">
            <b-row class="flex-row">
              <b-col class="d-flex justify-content-around align-items-center">
                {{ item.itemName }}
                <b-button
                  size="sm"
                  variant="danger"
                  @click="deleteShoppingItem(item.id)"
                >
                  Delete
                </b-button>
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </div>
  </div>
</template>

<script>
import { components } from "aws-amplify-vue";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { ShoppingListItem } from "../models";

export default {
  components: {
    ...components
  },
  data() {
    return {
      listItems: [],
      newItem: "",
      sub: ""
    };
  },
  mounted() {
    const that = this;
    this.sub = DataStore.observe(ShoppingListItem).subscribe(msg => {
      // console.log(msg.model, msg.opType, msg.element);
      console.dir(msg);
      if (msg.opType == "INSERT") {
        that.listItems.push(msg.element);
      } else if (msg.opType == "DELETE") {
        //Remove the item from our listItems array for dispay
        const id = msg.element.id;
        const index = that.listItems.map(x => x.id).indexOf(id);
        if (index >= 0) {
          that.listItems.splice(index, 1);
        }
      }
    });
  },
  destroyed() {
    this.sub.unsubscribe();
  },
  async created() {
    // Get all shopping list items to display on page load
    const items = await DataStore.query(ShoppingListItem, Predicates.ALL);
    items.forEach(item => {
      this.listItems.push(item);
    });
  },
  methods: {
    async addShoppingItem() {
      const item = new ShoppingListItem({
        itemName: this.newItem
      });
      DataStore.save(item);
      //clear textbox
      this.newItem = "";
    },
    async deleteShoppingItem(itemId) {
      const deleted = await DataStore.delete(ShoppingListItem, c => c.id("eq", itemId));
      console.dir(deleted);
    }
  }
};
</script>
