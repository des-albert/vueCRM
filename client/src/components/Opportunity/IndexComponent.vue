<template>
  <div class="container">
    <div class="table-responsive col-md-10 bg-custom">
      <h2 class="text-info">
        Opportunities
        <router-link
          :to="{name: 'OpportunityCreate'}"
          class="btn btn-primary"
        >
          New
        </router-link>
      </h2>
      <table class="table table-hover table-striped text-info">
        <thead>
          <tr>
            <th>Name</th>
            <th>Account</th>
            <th>Ship Date</th>
            <th>Stage</th>
            <th>&nbsp;</th>
            <th>Action</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="opportunity in opportunities"
            :key="opportunity._id"
          >
            <td>{{ opportunity.Name }}</td>
            <td>{{ opportunity.Account }}</td>
            <td>{{ opportunity.ShipDate | moment }} </td>
            <td>{{ opportunity.Stage }}</td>
            <td>
              <router-link
                :to="{name: 'QuoteList', params: { Name: opportunity.Name }}"
                class="btn btn-info"
              >
                List
              </router-link>
            </td>
            <td>
              <router-link
                :to="{name: 'OpportunityEdit', params: { id: opportunity._id }}"
                class="btn btn-success"
              >
                Edit
              </router-link>
            </td>
            <td>
              <button
                class="btn btn-warning"
                @click.prevent="deleteOpportunity(opportunity._id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  filters: {
    moment: (date) => {
      return moment(date).format('MMM-DD-YYYY');
    }
  },
  data() {
    return {
      opportunities: []
    };
  },
  created() {
    let uri = '/opportunities';
    if (process.env.NODE_ENV !== 'production') {
      uri = 'http://localhost:4000/opportunities';
    }
    this.axios.get(uri).then(response => {
      this.opportunities = response.data;
    });
  },
  methods: {
    deleteOpportunity(id) {
      let uri = `/opportunities/delete/${id}`;
      if (process.env.NODE_ENV !== 'production') {
        uri = `http://localhost:4000/opportunities/delete/${id}`;
      }
      this.axios.delete(uri)
        .then(() => {
          this.opportunities.splice(this.opportunities.indexOf(id), 1);
        });
    }
  }

};
</script>

<style scoped>
  .table-striped>tbody>tr:nth-child(odd)>td,
  .table-striped>tbody>tr:nth-child(odd)>th {
    background-color: lavender;
  }

  .table-striped>tbody>tr:nth-child(even)>td,
  .table-striped>tbody>tr:nth-child(even)>th {
    background-color: mistyrose;
  }

  .table-striped>tbody>tr:hover>td,
  .table-striped>tbody>tr:hover>th {
    background-color: darksalmon;
  }
</style>
