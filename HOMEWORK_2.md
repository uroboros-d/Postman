HOMEWORK_2 (POSTMAN)


// 1. send the request

http://162.55.220.72:5005/first

// 2. check status code: Code is 200
```java
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
```
// 3. check that the response body contains the correct string
```javascript
var correct_string = "This is the first responce from server!ss";
pm.test("Response body contains the correct string: " + correct_string, function () {
    pm.expect(pm.response.text()).to.include(correct_string);
});
```
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

