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

// 2. Статус код 200

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 3. Спарсить response body в json

let jsonData = pm.response.json();

// console.log(jsonData);

// 4. Спарсить request.

let jsonRequest = pm.request.url.query.toObject();

// console.log(jsonRequest);

// 5. Проверить, что name в ответе равно name в request (name забрать из request.)

pm.test('name в ответе равно name в request', ()=>{
    pm.expect(pm.response.json().name).to.eql(pm.request.url.query.get('name'));
});

// console.log(`response: ${pm.response.json().name}`);
// console.log(`request: ${pm.request.url.query.get('name')}`);

// 6. Проверить, что age в ответе равно age из request (age забрать из request.)

pm.test('age в ответе равно age из request', function(){
    pm.expect(pm.response.json().age).to.eql(+pm.request.url.query.toObject().age);
});

pm.test('age в ответе равно age из request', ()=>{
    pm.expect((pm.response.json().age) == (pm.request.url.query.get('age'))).to.be.true;
});

// 7. Вывести в консоль параметр salary из request.

console.log(`request salary: ${pm.request.url.query.get('salary')} ${typeof(pm.request.url.query.get('salary'))}`);

// 8. Вывести в консоль параметр salary из response.

console.log(`response salary: ${pm.response.json()['salary']}`);
console.log(pm.response.json().salary);

// 9. Вывести в консоль 0-й элемент параметра salary из response

console.log(`0-й элемент параметра salary из response: ${pm.response.json()['salary'][0]}`);

// 10. Вывести в консоль 1-й элемент параметра salary из response
console.log(`1-й элемент параметра salary из response: ${pm.response.json().salary[1]}`);

// 11. Вывести в консоль 2-й элемент параметра salary из response

console.log(`2-й элемент параметра salary из response: ${pm.response.json().salary[2]}`);

// 12. Проверить, что 0-й элемент параметра salary равен salary из request (salary забрать из request.)

pm.test('0-й элемент параметра salary из response равен salary из request', function(){
    pm.expect(pm.response.json()['salary'][0]).to.eql(+pm.request.url.query.toObject().salary);
});

// console.log(`0-й элемент параметра salary из response: ${pm.response.json().salary[0]} ${typeof(pm.response.json().salary[0])}`);
// console.log(`salary из request: ${pm.request.url.query.get('salary')} ${typeof(pm.request.url.query.get('salary'))}`);

// 13. Проверить, что 1-й элемент параметра salary равен salary*2 из request (salary забрать из request.)

pm.test('1-й элемент параметра salary из response равен salary*2 из request', ()=>{
    pm.expect((pm.response.json().salary[1]) == (pm.request.url.query.get('salary')*2)).to.be.true;
});

// console.log(`1-й элемент параметра salary из response: ${pm.response.json().salary[1]} ${typeof(pm.response.json().salary[1])}`);
// console.log(`salary из request: ${pm.request.url.query.get('salary')} ${typeof(pm.request.url.query.get('salary'))}`);
// console.log(`salary из request: ${pm.request.url.query.get('salary')} ${typeof(pm.request.url.query.get('salary')*2)}`);

// 14. Проверить, что 2-й элемент параметра salary из response равен salary*3 из request (salary забрать из request)

pm.test('2-й элемент параметра salary из response равен salary*3 из request', function(){
    pm.expect((pm.response.json()['salary'][2]) == (pm.request.url.query.toObject().salary)*3).to.be.ok;
});

// 15. Создать в окружении переменную name

pm.environment.set('name');

// 16. Создать в окружении переменную age

pm.environment.set('age');

// 17. Создать в окружении переменную salary

pm.environment.set('salary');

// 18. Передать в окружение переменную name

pm.environment.set('name', pm.response.json().name);

// 19. Передать в окружение переменную age

pm.environment.set('age', pm.response.json().age);

// 20. Передать в окружение переменную salary

pm.environment.set('salary', pm.request.url.query.get('salary'));

// 21. Написать цикл который выведет в консоль по порядку элементы списка из параметра salary

for(var i=0; i<jsonData.salary.length;i++){
    console.log(`элемент salary[${i}]: ${jsonData.salary[i]}`);
}

// for(var InCount in jsonData.salary){
//     console.log(`элемент salary[${InCount}]: ${jsonData.salary[InCount]}`); //выводит ключи
// }
// for in не следует использовать для array, где важен порядок индексов. Нет гарантии, что for...in будет возвращать индексы в конкретном порядке: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/for...in

let ofCount = 0;
for(var element of jsonData.salary){
    console.log(`элемент salary[${ofCount}]: ${element}`);
    ofCount++;
}

let forEachCount = 0;
jsonData.salary.forEach((element) => {
    console.log(`элемент salary[${forEachCount}]: ${element}`);
    forEachCount++;
});
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
