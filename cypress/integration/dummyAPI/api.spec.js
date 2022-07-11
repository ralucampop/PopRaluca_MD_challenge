/// <reference types="cypress" />

describe('API tests Dummy RestAPI', () => {

    it('[GET] - Get list with all employees and count the ones over 30', () => {
        cy.request({
            url: 'https://dummy.restapiexample.com/api/v1/employees',
            method: 'GET',
            failOnStatusCode: false

        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.data[0]).to.have.keys("id", "employee_name", "employee_salary", "employee_age", "profile_image");
            const allEmployee = response.body.data;
            const employeeOver30 = [];
            allEmployee.forEach((employee) => {
                if (employee.employee_age > 30) {
                    return employeeOver30.push(employee.employee_name)
                }
            })
            cy.log('The number of employees over 30\'s are = ' + employeeOver30.length + ' and here are their\'s name: ' + employeeOver30);
        })


    })

    it('[POST] - Create 2 users over 30', () => {
        cy.request({
            url: 'https://dummy.restapiexample.com/api/v1/create',
            method: 'POST',
            body: [{
                "name": "Marry",
                "salary": "30434",
                "age": "45"
            },
            {
                "name": "John",
                "salary": "38504",
                "age": "50"
            }],
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.data[0].name).to.equal("Marry");
            expect(response.body.data[0].salary).to.equal("30434");
            expect(response.body.data[0].age).to.equal("45");
            expect(response.body.data[1].name).to.equal("John");
        })
    })

    it('[PUT] - Update employee details', () => {
        cy.request({
            url: 'https://dummy.restapiexample.com/api/v1/update/21',
            method: 'PUT',
            body: {
                "name": "Update",
                "salary": "12345",
                "age": "60"
            }

        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.data.name).to.equal("Update");
            expect(response.body.data.salary).to.equal("12345");
            expect(response.body.data.age).to.equal("60");
        })
    })

    it('[DELETE] - Delete an user', () => {
        cy.request({
            url: 'https://dummy.restapiexample.com/api/v1/delete/5443',
            method: 'DELETE',

        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('Successfully! Record has been deleted');
        })
    })
})