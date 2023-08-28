<template>
<div class="p-4">
  <h1 class="text-4xl font-semibold text-center py-8">Our Expert Team</h1>

  <div class="flex flex-wrap  -mx-2">
    <div v-for="employee in employees" :key="employee.id" class="w-1/4 px-2 mb-4">
      <div class="border p-5 bg-green-100">
        <img :src="employee.employee_profile_image" alt="Profile Image" class="max-w-xs h-auto mx-auto mb-2" />
        <div class="text-lg font-semibold text-center">{{ employee.employee_name }}</div>
        <div class="text-gray-600 text-center">{{ employee.employee_salary }}$</div>
        <div class="text-gray-600 text-center">{{ employee.employee_age }}yrs</div>
        <div class="mt-2 text-center">
          <button @click="editEmployee(employee)" class="bg-blue-400 text-white px-4 py-2 rounded-md mr-2">Edit</button>
          <button @click="deleteEmployee(employee.id)" class="bg-red-800 text-white px-4 py-2 rounded-md">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <form @submit.prevent="addEmployee" class="mt-4 text-center">
    <input v-model="newEmployeeName" placeholder="Employee Name" class="border p-2" />
    <input v-model="newEmployeeAge" placeholder="Employee Age" class="border p-2 mt-2" />
    <button type="submit" class="bg-green-700 text-white px-4 py-2 rounded-md mt-2">Add Employee</button>
  </form>
</div>


</template>

<script>
export default {
  computed: {
    employees() {
      return this.$store.getters.getEmployees;
    },
  },
  data() {
    return {
      newEmployeeName: '',
      newEmployeeAge: '',
    };
  },
  methods: {
    async addEmployee() {
      if (!this.newEmployeeName.trim()) return;
      const employeeData = {id:Date.now(), name: this.newEmployeeName, age: +this.newEmployeeAge, salary: 330000, profile_image:'' }
      console.log (employeeData)
      await this.$store.dispatch('createEmployee', employeeData);
      this.newEmployeeName = ''
      this.newEmployeeAge = '';
    },
    // editEmployee(employee) {
    //   // Implement editing logic
    // },
    async deleteEmployee(employeeId) {
      await this.$store.dispatch('deleteEmployee', employeeId);
    },
  },
  created() {
    this.$store.dispatch('fetchEmployees');
  },
};
</script>
