<template>
  <div class="container">
    <div class="table-responsive col-md-10 bg-custom">
      <h2 class="text-info">
        Account
        <router-link
          :to="{name: 'AccountCreate'}"
          class="btn btn-primary"
        >
          New
        </router-link>
      </h2>
      <table class="table table-hover table-striped text-info">
        <thead>
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>&nbsp;</th>
            <th>Action</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="account in accounts"
            :key="account._id"
          >
            <td>{{ account.Name }}</td>
            <td>{{ account.Industry }}</td>
            <td>
              <router-link
                :to="{name: 'OpportunityList', params: { Name: account.Name }}"
                class="btn btn-info"
              >
                List
              </router-link>
            </td>
            <td>
              <router-link
                :to="{name: 'AccountEdit', params: { id: account._id }}"
                class="btn btn-success"
              >
                Edit
              </router-link>
            </td>
            <td>
              <button
                class="btn btn-warning"
                @click.prevent="deleteAccount(account._id)"
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
export default {
  data() {
    return {
      accounts: []
    };
  },
  created() {
    let uri = '/accounts';
    if (process.env.NODE_ENV !== 'production') {
      uri = 'http://localhost:4000/accounts';
    }
    this.axios.get(uri).then(response => {
      this.accounts = response.data;
    });
  },
  methods: {
    deleteAccount(id) {
      let uri = `/accounts/delete/${id}`;
      if (process.env.NODE_ENV !== 'production') {
        uri = `http://localhost:4000/accounts/delete/${id}`;
      }
      this.axios.delete(uri)
        .then(() => {
          this.accounts.splice(this.accounts.indexOf(id), 1);
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
