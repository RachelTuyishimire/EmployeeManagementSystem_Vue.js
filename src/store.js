import { createStore } from 'vuex';

export default createStore({
  state: {
    employees: [],
  },
  mutations: {
    SET_EMPLOYEES(state, employeesData) {
      state.employees = employeesData;
    },
    ADD_EMPLOYEE(state, employee) {
      state.employees.push(employee);
    },
    UPDATE_EMPLOYEE(state, updatedEmployee) {
      const index = state.employees.findIndex((emp) => emp.id === updatedEmployee.id);
      if (index !== -1) {
        state.employees[index] = updatedEmployee;
      }
    },
    DELETE_EMPLOYEE(state, employeeId) {
      state.employees = state.employees.filter((emp) => emp.id !== employeeId);
    },
  },
  actions: {
    async fetchEmployees({ commit }) {
        try {
          const response = await fetch('https://dummy.restapiexample.com/api/v1/employees');
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not valid JSON.');
          }
      
          const data = await response.json();
          commit('SET_EMPLOYEES', data.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      },
      
    async createEmployee({ commit }, newEmployee) {
        console.log(newEmployee)
      try {
        const response = await fetch('https://dummy.restapiexample.com/api/v1/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEmployee),
        });
        const createdEmployee = await response.json();
        console.log(createdEmployee);
        commit('ADD_EMPLOYEE', createdEmployee.data);
      } catch (error) {
        console.error('Error creating employee:', error);
      }
    },
    async updateEmployee({ commit }, updatedEmployee) {
      try {
        const response = await fetch(`https://dummy.restapiexample.com/api/v1/update/${updatedEmployee.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEmployee),
        });
        const savedEmployee = await response.json();
        commit('UPDATE_EMPLOYEE', savedEmployee.data);
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    },
    async deleteEmployee({ commit }, employeeId) {
      try {
        await fetch(`https://dummy.restapiexample.com/api/v1/delete/${employeeId}`, {
          method: 'DELETE',
        });
        commit('DELETE_EMPLOYEE', employeeId);
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    },
  },
  getters: {
    getEmployees: (state) => state.employees,
  },
});
