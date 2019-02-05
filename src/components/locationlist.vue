<template> 
  <div>
    <div class="container">
    <b-container fluid>
      <b-row>
        <b-col md="6" class="my-1">
          <b-form-group horizontal label="<b>Filter :</b>" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search" />
              <b-input-group-append>
                <b-btn :disabled="!filter" @click="filter = ''"><b>Clear</b></b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col md="6" class="my-1">
          <b-form-group horizontal label="<b> Per page : </b>" class="mb-0">
            <b-form-select :options="pageOptions" v-model="perPage" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-table show-empty
        stacked="md"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        @filtered="onFiltered"
      >
        <template slot="info" slot-scope="row">
          <b-button variant="info" size="sm" @click.stop="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Hide' : 'Show'}} Info
          </b-button>
        </template>
        <template slot="row-details" slot-scope="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-center"><b>Actor 1 :</b></b-col>
              <b-col sm="9">{{ row.item.actor_1 }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-center"><b>Actor 2 :</b></b-col>
              <b-col sm="9">{{ row.item.actor_2 }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-center"><b>Actor 3 :</b></b-col>
              <b-col sm="9">{{ row.item.actor_3 }}</b-col>
            </b-row>  
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-center"><b>Distributor :</b></b-col>
              <b-col sm="9">{{ row.item.distributor }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-center"><b>Locations :</b></b-col>
              <b-col sm="9">{{ row.item.locations }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-center"><b>Production company :</b></b-col>
              <b-col sm="9">{{ row.item.production_company }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-center"><b>Writer :</b></b-col>
              <b-col sm="9">{{ row.item.writer }}</b-col>
            </b-row>
          </b-card>
        </template>     
      </b-table>
      <b-row>
        <b-col md="6" class="my-1">
          <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
        </b-col>
      </b-row>
    </b-container>
  </div>
  <hr/>
  </div>
</template>


<script>
const items = []
export default {
  data ()  {
    return  {
      items: items,
      totalRows: items.length,
      fields: [{key: 'title' , sortable: true}  , { key: 'release_year' , sortable: true} , { key: 'director',  sortable: true} ,'info'],
      currentPage: 1,
      perPage: 20,
      pageOptions: [ 5 , 10 , 20 , 40 , 60 , 80 ],
      filter: null,
    }
  },
  methods: {  
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
  created() {
    this.$http.get('https://data.sfgov.org/resource/wwmu-gmzc.json').then(response =>{
      this.array = response.data;
      for ( var list = 0 ; list < this.array.length ; list++) {
        this.items.push(this.array[list])
      } 
    })
  }
}
</script>