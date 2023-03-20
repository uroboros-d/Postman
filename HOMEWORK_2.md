HOMEWORK_2 (POSTMAN)
```javascript

// 1. send the request

http://162.55.220.72:5005/first

// 2. check status code: Code is 200

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 3. check that the response body contains the correct string

var correct_string = "This is the first responce from server!ss";
pm.test("Response body contains the correct string: " + correct_string, function () {
    pm.expect(pm.response.text()).to.include(correct_string);
});

-----------------------------------------------------------------------------------------
// 1. send the request

http://162.55.220.72:5005/user_info_3

// 2. check status code: Code is 200

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 4. check that response name matches request name (enter name manually)

pm.test("Response name matches request name Gary", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.name).to.eql("Gary");
});

// 5. check that response age matches request age (enter age manually)

pm.test("Response age matches request age 44", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.age).to.eql("44");
});

// 6. check that response salary matches request salary (enter salary manually)

pm.test("Response salary matches request salary 1000", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.salary).to.eql(1000);
});

// 8. check that response name matches request name (get name from request)

pm.test("Response name matches request name " + request.data.name, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.name).to.eql(request.data.name);
});

// 9. check that response age matches request age (get age from request)

pm.test("Response age matches request age " + request.data.age, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.age).to.eql(request.data.age);
});

// 10. check that response salary matches request salary (get salary from request)

pm.test("Response salary matches request salary " + request.data.salary, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.salary).to.eql(+request.data.salary);
});

// 11. output family from response to console

console.log("family: ", pm.response.json().family);

// 12. check that u_salary_1_5_year from response equals 4 * salary from request

pm.test("u_salary_1_5_year from response equals 4 * salary from request " + 4 * request.data.salary, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.family.u_salary_1_5_year).to.eql(+4 * request.data.salary);
});
-------------------------------------------------------------------------------------------------
// 1. send the request

http://162.55.220.72:5005/object_info_3

// 2. check status code: Code is 200

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 4. get object with Params from url of request

var req_params = pm.request.url.query.toObject();           // another way: console.log(pm.request.url.query.get('name'));

// 5. check that response name matches request name (get name from request)

pm.test("Response name matches request name " + req_params.name, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.name).to.eql(req_params.name);
});

// 6. check that response age matches request age (get age from request)

pm.test("Response age matches request age " + req_params.age, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.age).to.eql(req_params.age);
});

// 7. check that response salary matches request salary (get salary from request)

pm.test("Response salary matches request salary " + req_params.salary, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.salary).to.eql(+req_params.salary);
});

// 8. output family from response to console

console.log("family: ", pm.response.json().family);

// 9. check that dog from response has parameter name

pm.test("Dog from response has parameter name", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.family.pets.dog).to.have.property("name");
});

// 10. check that dog from response has parameter age

pm.test("Dog from response has parameter age", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.family.pets.dog).to.have.property("age");
});

// 11. check that the value of parameter name is Luky

pm.test("Value of parameter name is Luky", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.family.pets.dog.name).to.eql("Luky");
});

// 12. check that value of parameter age is 4

pm.test("Value of parameter age is 4", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.family.pets.dog.age).to.eql(4);
});
---------------------------------------------------------------------
// 1. send the request

http://162.55.220.72:5005/object_info_4

// 2. check status code: Code is 200

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 4. get an object with Params from request URL

var req_params = pm.request.url.query.toObject();   //another way: console.log(pm.request.url.query.get('name'));

// 5. check that response name matches request name (get name from request)

pm.test("Response name matches request name " + req_params.name, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.name).to.eql(req_params.name);
});

// 6. check that response age matches request age (get age from request)

pm.test("Response age matches request age = " + req_params.age, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.age).to.eql(+req_params.age);
});

// 7. output salary from request to console

console.log("Salary from request is ", +req_params.salary);

// 8. output salary from response to console

console.log("Salary from response is ", pm.response.json().salary);

// 9. output the 0th element of the salary array

console.log("0th element of salary array is ", pm.response.json().salary[0]);

// 10. output 1th element of salary array

console.log("1th element of salary array is ", pm.response.json().salary[1]);

// 11. output 2nd element of salary array

console.log("2nd element of salary array is ", pm.response.json().salary[2]);

// 12. check that 0th element of response salary matches request salary

pm.test("0th element of response salary equals request salary = " + req_params.salary, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.salary[0]).to.eql(+req_params.salary);
});

// 13. check that 1th element of response salary equales 2 * request salary

pm.test("1th element of response salary equals 2 * request salary = " + req_params.salary * 2, function () {
    var jsonData = pm.response.json();
    pm.expect(+jsonData.salary[1]).to.eql(req_params.salary * 2);
});

// 14. check that 2th element of response salary equales 3 * request salary

pm.test("2th element of response salary equals 3 * request salary = " + req_params.salary * 3, function () {
    var jsonData = pm.response.json();
    pm.expect(+jsonData.salary[2]).to.eql(req_params.salary * 3);
});

// 15. create a name variable in the environment

pm.environment.set("name");

// 16. create a age variable in the environment

pm.environment.set("age");

// 17. create a salary variable in the environment

pm.environment.set("salary");

// 18. pass the value of the variable name to the environment

pm.environment.set("name", req_params.name);

// 19. pass the value of the variable age to the environment

pm.environment.set("age", req_params.age);

// 20. pass the value of the variable salary to the environment

pm.environment.set("salary", req_params.salary);

// 21. write a loop that outcomes the elements of the salary array in order to the console

var jsonData = pm.response.json();
for (var i = 0; i < jsonData.salary.length; i++ ) {
    console.log(jsonData.salary[i]);
}
---------------------------------------------------------------------------------
// 4. send the request

http://162.55.220.72:5005/user_info_2

// 5. check status code: Code is 200

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 8. chech that response has a start_qa_salary parameter

pm.test("Response json has a parameter " + "start_qa_salary", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("start_qa_salary");
});

// 9. chech that response has a qa_salary_after_6_months parameter

pm.test("Response json has a parameter " + "qa_salary_after_6_months", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("qa_salary_after_6_months");
});

// 10. chech that response has a qa_salary_after_12_months parameter

pm.test("Response json has a parameter " + "qa_salary_after_12_months", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("qa_salary_after_12_months");
});

// 11. chech that response has a qa_salary_after_1.5_year parameter

pm.test("Response json has a parameter " + "qa_salary_after_1.5_year", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("qa_salary_after_1.5_year");
});

// 12. chech that response has a qa_salary_after_3.5_years parameter

pm.test("Response json has a parameter " + "qa_salary_after_3.5_years", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("qa_salary_after_3.5_years");
});

// 13. chech that response has a person parameter

pm.test("Response json has a parameter " + "person", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("person");
});

// 14. check that start_qa_salary from response equales request salary

pm.test("start_qa_salary from response equales request salary = " + request.data.salary, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.start_qa_salary).to.eql(+request.data.salary);
});

// 15. check that qa_salary_after_6_months from response equales request salary * 2

pm.test("qa_salary_after_6_months from response equales request salary * 2 = " + 2 * request.data.salary, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.qa_salary_after_6_months).to.eql(2 * request.data.salary);
});

// 16. check that qa_salary_after_12_months from response equales request salary * 2.7

pm.test("qa_salary_after_12_months from response equales request salary * 2.7 = " + 2.7 * request.data.salary, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.qa_salary_after_12_months).to.eql(2.7 * request.data.salary);
});

// 17. check that qa_salary_after_1.5_year from response equales request salary * 3.3

pm.test("qa_salary_after_1.5_year from response equales request salary * 3.3 = " + 3.3 * request.data.salary, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData["qa_salary_after_1.5_year"]).to.eql(3.3 * request.data.salary);
});

// 18. check that qa_salary_after_3.5_years from response equales request salary * 3.8

pm.test("qa_salary_after_3.5_years from response equales request salary * 3.8 = " + 3.8 * request.data.salary, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData["qa_salary_after_3.5_years"]).to.eql(3.8 * request.data.salary);
});

// 19. check that the 1th element of u_name from response equales salary from request

pm.test("the 1th element of u_name from response equales salary from request = " + request.data.salary, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.person.u_name[1]).to.eql(+request.data.salary);
});

// 20. check that u_age from response equales age from request

pm.test("u_age from response equales age from request = " + request.data.age, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.person.u_age).to.eql(+request.data.age);
});

// 21. check that u_salary_5_years from response equales salary * 4.2 from request

pm.test("u_salary_5_years from response equales age from request = " + 4.2 * request.data.salary, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.person.u_salary_5_years).to.eql(4.2 * request.data.salary);
});

// 22. write a loop that outcomes the elements of the person list in order to the console

var jsonData = pm.response.json();
for (var property in jsonData.person) {
    console.log("jsonData.person." + property + " = ", jsonData.person[property]);
}

// 22a. write to the console a loop that outcomes the elements of the person list including nested ones
var jsonDataPerson = pm.response.json().person;
for (var property in jsonDataPerson) {
    console.log("jsonDataPerson " + property + " = ", jsonDataPerson[property]);
    if (typeof (jsonDataPerson[property]) == "object") {    
        for (var item in jsonDataPerson[property]) {
            console.log('inner_item = ', jsonDataPerson[property][item]);
        }
    }    
}

```
