HOMEWORK_2 (POSTMAN)
```javascript

// 1. send the request

http://162.55.220.72:5005/first

// 2. Статус код 200

pm.test('Статус код 200', function() {
    pm.response.to.have.status(200);
});

//3. Проверить, что в body приходит правильный string
pm.test('В body приходит правильный string', function () {
    pm.response.to.have.body('This is the first responce from server!ss');
});

-----------------------------------------------------------------------------------------
// 1. send the request

http://162.55.220.72:5005/user_info_3

// 2. Статус код 200

pm.test('Статус код 200', function(){
    pm.response.to.have.status(200);
});

pm.test('Successful POST request', ()=>{
    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202]);
});

// 3. Спарсить response body в json

let jsonData = pm.response.json();

// console.log(jsonData);

// 4. Проверить, что name в ответе равно name в request (name вбить руками)

pm.test('name в ответе равно name в request', ()=> {
    let jsonData = pm.response.json();
    pm.expect(jsonData.name).to.eql('Yarik');
});

// 5. Проверить, что age в ответе равно age в request (age вбить руками.)

pm.test('age в ответе равно age в request', function() {
    pm.expect(+jsonData.age).to.eql(7);
});

// 6. Проверить, что salary в ответе равно salary в request (salary вбить руками.)

pm.test('salary в ответе равно salary в request', ()=>{
    pm.expect(jsonData.salary).to.deep.eql(1000);
});

// 7. Спарсить request

let requestData = request.data;

// console.log(requestData);

// 8. Проверить, что name в ответе равно name в request (name забрать из request.)

pm.test('name в ответе равно name в request', function(){
    pm.expect(pm.response.json().name).to.equal(request.data.name);
});

// console.log(`response.name: ${pm.response.json().name} ${typeof(pm.response.json().name)}`);
// console.log(`request.name: ${request.data.name} ${typeof(request.data.name)}`);

// 9. Проверить, что age в ответе равно age в request (age забрать из request.)

pm.test('age в ответе равно age в request', ()=>{
    pm.expect(pm.response.json().age === request.data.age).to.be.ok;
});

// console.log(`response.age: ${pm.response.json().age} ${typeof(pm.response.json().age)}`);
// console.log(`request.age: ${request.data.age} ${typeof(request.data.age)}`);

// 10. Проверить, что salary в ответе равно salary в request (salary забрать из request.)

pm.test('salary в ответе равно salary в request', ()=>{
    pm.expect(pm.response.json().salary == request.data.salary).to.be.true;
});

// другие варианты с явным приведением типов

 pm.test('salary в ответе равно salary в request', ()=>{
     pm.expect(String(pm.response.json().salary)).to.eql(request.data.salary);
 });

 pm.test('salary в ответе равно salary в request', ()=>{
     pm.expect(pm.response.json().salary).to.eql(Number(request.data.salary));
 });

// console.log(`request.salary: ${request.data.salary} ${typeof(request.data.salary)}`);
// console.log(`response.salary: ${pm.response.json().salary} ${typeof(pm.response.json().salary)}`)

// 11. Вывести в консоль параметр family из response.

console.log(pm.response.json()['family']);

// 12. Проверить что u_salary_1_5_year в ответе равно salary*4 (salary забрать из request)

pm.test('u_salary_1_5_year в ответе равно salary*4', function(){
    pm.expect(pm.response.json()['family']['u_salary_1_5_year']).to.eql(request.data.salary*4)
})
-------------------------------------------------------------------------------------------------
// 1. send the request

http://162.55.220.72:5005/object_info_3

// 2. Статус код 200

pm.test('Status code is 200', function(){
    pm.response.to.have.status(200);
});

// 3. Спарсить response body в json

let jsonData = pm.response.json();

// console.log(jsonData);

// 4. Спарсить request

let requestURL = pm.request.url.query.toObject();

// console.log(requestURL);
// console.log(pm.request.url.query);
// console.log(pm.request.url.query[0]);

// 5. Проверить, что name в ответе равно name в request (name забрать из request.)

pm.test('name в ответе равно name в request', function(){
    pm.expect(pm.response.json().name).to.eql(pm.request.url.query.toObject().name);
});

// console.log(pm.response.json().name);
// console.log(pm.request.url.query.toObject().name);

// 6. Проверить, что age в ответе равно age в request (age забрать из request.)

pm.test('age в ответе равно age в request', ()=>{
    pm.expect(pm.response.json()['age']).to.eql(pm.request.url.query.get('age'));
});

// console.log(pm.response.json()['age'], typeof(pm.response.json()['age']));
// console.log(pm.request.url.query.get('age'), typeof(pm.request.url.query.get('age')));

// 7. Проверить, что salary в ответе равно salary в request (salary забрать из request.)

pm.test('salary в ответе равно salary в request', function(){
    pm.expect(pm.response.json().salary == pm.request.url.query.toObject().salary).to.be.true;
});

// console.log(pm.request.url.query.toObject().salary, typeof(pm.request.url.query.toObject().salary));
// console.log(pm.response.json().salary, typeof(pm.response.json().salary) );

// 8. Вывести в консоль параметр family из response

console.log(pm.response.json()['family']);

// 9. Проверить, что у параметра dog есть параметры name.

pm.test('у параметра dog есть параметры name', ()=>{
    pm.expect(pm.response.json().family.pets.dog).to.have.property('name');
    pm.expect(pm.response.json().family.pets.dog.name).to.not.be.empty;
});

// 10. Проверить, что у параметра dog есть параметры age.

pm.test('у параметра dog есть параметры age', function(){
    pm.expect(pm.response.json().family.pets.dog).to.have.any.keys('age');
});

// 11. Проверить, что параметр name имеет значение Luky

pm.test('параметр name имеет значение Luky', function(){
    pm.expect(pm.response.json().family.pets.dog).to.have.property('name', 'Luky');
});

pm.test('параметр name имеет значение Luky', ()=>{
    pm.expect(pm.response.json().family.pets.dog.name).to.eql('Luky');
});

pm.test('параметр name имеет значение Luky', function(){
    pm.expect(pm.response.json().family.pets.dog.name === 'Luky').to.be.true;
});

const assert = require('assert');   //импорт библиотеки Node.js 
pm.test('параметр name имеет значение Luky', ()=>{
    assert.equal(pm.response.json().family.pets.dog.name, 'Luky');
});

// 12. Проверить, что параметр age имеет значение 4.
pm.test('параметр age имеет значение 4', function(){
    pm.expect(pm.response.json()['family']['pets']['dog']['age']).to.eql(4);
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

// 21. another options

// var jsonData = pm.response.json();
// for(item of jsonData.salary) {
//     console.log(item);
// }

// var jsonData = pm.response.json();
// for(item in jsonData.salary) {
//     console.log(jsonData.salary[item]);
// }

// var jsonData = pm.response.json();
// jsonData.salary.forEach(element => console.log(element));
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
        for (var item of jsonDataPerson[property]) {
            console.log('inner_item = ', item);
        }
    }    
}

```
