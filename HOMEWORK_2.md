HOMEWORK_2 (POSTMAN)
```javascript

The collection is in Ksendzov_hw_2.postman_collection.json

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
// 1. Вставить параметр salary из окружения в request
// 2. Вставить параметр age из окружения в age
// 3. Вставить параметр name из окружения в name
// 4. Отправить запрос.

http://162.55.220.72:5005/user_info_2

// 5. Статус код 200

pm.test('Status code is 200', function(){
    pm.response.to.have.status(200)
});

// 6. Спарсить response body в json

let jsonData = pm.response.json();

// console.log(jsonData);

// 7. Спарсить request

let jsonRequest = request.data;

// console.log(jsonRequest);

//8. Проверить, что json response имеет параметр start_qa_salary

pm.test('json response имеет параметр start_qa_salary', ()=>{
    pm.expect(jsonData).to.have.property('start_qa_salary');
});

// 9. Проверить, что json response имеет параметр qa_salary_after_6_months

pm.test('json response имеет параметр qa_salary_after_6_months', function(){
    pm.expect(jsonData).to.have.property('qa_salary_after_6_months')
});

// 10. Проверить, что json response имеет параметр qa_salary_after_12_months

pm.test('json response имеет параметр qa_salary_after_12_months', ()=>{
    pm.expect(jsonData).to.have.any.property('qa_salary_after_12_months')
});

// 11. Проверить, что json response имеет параметр qa_salary_after_1.5_year

pm.test('json response имеет параметр qa_salary_after_1.5_year', function(){
    pm.expect(jsonData).to.have.property('qa_salary_after_1.5_year')
});

// 12. Проверить, что json response имеет параметр qa_salary_after_3.5_years

pm.test('json response имеет параметр qa_salary_after_3.5_years', ()=>{
    pm.expect(jsonData).to.have.property('qa_salary_after_3.5_years')
});

// 13. Проверить, что json response имеет параметр person

pm.test('json response имеет параметр person',()=>{
    pm.expect(jsonData).to.have.property('person')
});

// 14. Проверить, что параметр start_qa_salary равен salary из request (salary забрать из request.)

pm.test('параметр start_qa_salary равен salary из request', function(){
    pm.expect(jsonData.start_qa_salary == request.data.salary).to.be.true
});

// 15. Проверить, что параметр qa_salary_after_6_months равен salary*2 из request (salary забрать из request.)

pm.test('параметр qa_salary_after_6_months равен salary*2 из request',()=>{
    pm.expect(jsonData.qa_salary_after_6_months).to.eql(request.data.salary*2)
});

// 16. Проверить, что параметр qa_salary_after_12_months равен salary*2.7 из request (salary забрать из request.)

pm.test('параметр qa_salary_after_12_months равен salary*2.7 из request', function(){
    pm.expect(jsonData.qa_salary_after_12_months === request.data.salary*2.7).to.be.true
});

// console.log(`jsonData.qa_salary_after_12_months = ${jsonData.qa_salary_after_12_months}`);
// console.log(`request.data.salary*2.7 = ${request.data.salary*2.7}`);

// 17. Проверить, что параметр qa_salary_after_1.5_year равен salary*3.3 из request (salary забрать из request.)

pm.test('параметр qa_salary_after_1.5_year равен salary*3.3 из request',()=>{
    pm.expect(jsonData['qa_salary_after_1.5_year']).to.eql(request.data.salary*3.3)
});

// 18. Проверить, что параметр qa_salary_after_3.5_years равен salary*3.8 из request (salary забрать из request.)

pm.test('параметр qa_salary_after_3.5_years равен salary*3.8 из request', function(){
    pm.expect(pm.response.json()['qa_salary_after_3.5_years'] === request.data.salary*3.8).to.be.ok
});

// 19. Проверить, что в параметре person, 1-й элемент из u_name равен salary из request (salary забрать из request.)

pm.test('в параметре person, 1-й элемент из u_name равен salary из request',()=>{
    pm.expect(String(jsonData['person']['u_name'][1])).to.eql(request.data['salary'])
});

// 20. Проверить, что что параметр u_age равен age из request (age забрать из request.)

pm.test('параметр u_age равен age из request', function(){
    pm.expect(jsonData.person.u_age).to.eql(+request.data.age)
});

// 21. Проверить, что параметр u_salary_5_years равен salary*4.2 из request (salary забрать из request.)
pm.test('параметр u_salary_5_years равен salary*4.2 из request',()=>{
    pm.expect(pm.response.json().person.u_salary_5_years === request.data.salary*4.2).to.be.true
});

// 22. ***Написать цикл который выведет в консоль по порядку элементы списка из параметра person

let person = pm.response.json().person;
for(let key in person) {
    if (Array.isArray(person[key])) {
        (person[key]).forEach(value => console.log(value));
    } else {
        console.log(`${key}: ${person[key]}`);
    }
}

```
