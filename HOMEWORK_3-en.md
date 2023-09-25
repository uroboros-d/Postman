HOMEWORK_3 (POSTMAN)
```javascript

// 1. отправить запрос с логином и паролем

http://162.55.220.72:5005/login

// 2) Приходящий токен необходимо передать во все остальные запросы

pm.environment.set('token', pm.response.json().token);
----------------------------------------------------------------------

http://162.55.220.72:5005/user_info

// 1) Статус код 200

pm.test('Статус код 200', function(){
    pm.response.to.have.status(200)
});

// 2) Проверка структуры json в ответе

const schema = 
{
  "type": "object",
  "properties": {
    "person": {
      "type": "object",
      "properties": {
        "u_age": {
          "type": "integer"
        },
        "u_name": {
          "type": "array",
          "items": [
            {
              "type": "string"
            },
            {
              "type": "integer"
            },
            {
              "type": "integer"
            }
          ]
        },
        "u_salary_1_5_year": {
          "type": "integer"
        }
      },
      "required": [
        "u_age",
        "u_name",
        "u_salary_1_5_year"
      ]
    },
    "qa_salary_after_12_months": {
      "type": "number"
    },
    "qa_salary_after_6_months": {
      "type": "integer"
    },
    "start_qa_salary": {
      "type": "integer"
    }
  },
  "required": [
    "person",
    "qa_salary_after_12_months",
    "qa_salary_after_6_months",
    "start_qa_salary"
  ]
}

pm.test('Ajv: Schema is valid', function() {
  pm.response.to.have.jsonSchema(schema);
});



let jsonData = pm.response.json();

pm.test('tv4: Schema is valid', function() {
    pm.expect(tv4.validate(jsonData, schema)).to.be.true;
});

console.log(tv4.error);

// 3) В ответе указаны коэффициенты умножения salary, напишите тесты по проверке правильности результата перемножения на коэффициент

request_salary = JSON.parse(pm.request.body.raw).salary;
pm.test('умножение на коэффициенты верное', function(){
    pm.expect(jsonData.start_qa_salary).to.eql(request_salary*1);
    pm.expect(jsonData.qa_salary_after_6_months).to.eql(request_salary*2);
    pm.expect(jsonData.qa_salary_after_12_months).to.eql(request_salary*2.9);
    pm.expect(jsonData.person.u_salary_1_5_year).to.eql(request_salary*4);
});

// 4) Достать значение из поля 'u_salary_1.5_year' и передать в поле salary запроса http://162.55.220.72:5005/get_test_user

pm.environment.set('u_salary_1.5_year', jsonData.person.u_salary_1_5_year);
------------------------------------------------------------------------------------------------
 http://162.55.220.72:5005/new_data
 
 // 1) Статус код 200

pm.test('Status code is 200',()=>{
    pm.response.to.have.status(200)
});

// 2) Проверка структуры json в ответе

const schema = 
{
  "type": "object",
  "properties": {
    "age": {
      "type": "integer"
    },
    "name": {
      "type": "string"
    },
    "salary": {
      "type": "array",
      "items": [
        {
          "type": "integer"
        },
        {
          "type": "string"
        },
        {
          "type": "string"
        }
      ]
    }
  },
  "required": [
    "age",
    "name",
    "salary"
  ]
}

pm.test('tv4: Schema is valid', function() {
  pm.expect(tv4.validate(pm.response.json(), schema)).to.be.true;
  });

  console.log(tv4.error);

  pm.test('Ajv: Schema is valid', function() {
  pm.response.to.have.jsonSchema(schema);
});

// 3) В ответе указаны коэффициенты умножения salary, напишите тесты по проверке правильности результата перемножения на коэффициент

let jsonData = pm.response.json();
let request_salary = request.data.salary;
pm.test('умножение на коэффициенты верное',()=>{
    pm.expect(jsonData['salary'][0] == request_salary).to.be.true;
    pm.expect(jsonData['salary'][1] === String(request_salary*2)).to.be.true;
    pm.expect(Number(jsonData['salary'][2])).to.eql(request_salary*3);
});

// 4) проверить, что 2-й элемент массива salary больше 1-го и 0-го

pm.test('2-й элемент массива salary больше 1-го и 0-го', function(){
    pm.expect(+jsonData.salary[2]).to.be.above(+jsonData.salary[1]).and.to.be.above(+jsonData.salary[0]);
});

pm.test('2-й элемент массива salary больше 1-го и 0-го', function(){
    pm.expect(+jsonData.salary[2] > +jsonData.salary[1] && +jsonData.salary[2] > +jsonData.salary[0]).to.be.true;
});
------------------------------------------------------------------------------------------------
http://162.55.220.72:5005/test_pet_info

// 1. check status code: Code is 200

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 2. check json structure

var schema = {
    "type" : "object",
    "properties" : {
        "name" :
        {
            "type" : "string"
        },
        "age" :
        {
            "type" : "number"
        },
        "daily_food" :
        {
            "type" : "number"
        },
        "daily_sleep" :
        {
            "type" : "number"
        }
    },
    "required" : ["name", "age", "daily_food", "daily_sleep"]
}
pm.test("Schema is valid", function(){
    pm.response.to.have.jsonSchema(schema);
});

// 3. check the correctness of calculation of response parameters

// 3.1 check the correctness of calculation of daily_food parameter

pm.test("Calculation of daily_food parameter is correct: " + 0.012 * request.data.weight, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.daily_food).to.eql(0.012 * request.data.weight);
});

// 3.2 check the correctness of calculation of daily_sleep parameter

pm.test("Calculation of daily_sleep parameter is correct: " + 2.5 * request.data.weight, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.daily_sleep).to.eql(2.5 * request.data.weight);
});
-----------------------------------------------------------------------------------------------------------
http://162.55.220.72:5005/get_test_user

// 1. check status code: Code is 200

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 2. check json structure

var schema = {
    "type": "object",
  "properties": {
    "age": {
      "type": "integer" // AssertionError: expected data to satisfy schema but found following errors: data.age should be integer
    },
    "family": {
      "type": "object",
      "properties": {
        "children": {
          "type": "array",
          "items": [
            {
              "type": "array",
              "items": [
                {
                  "type": "string"
                },
                {
                  "type": "integer"
                }
              ]
            },
            {
              "type": "array",
              "items": [
                {
                  "type": "string"
                },
                {
                  "type": "integer"
                }
              ]
            }
          ]
        },
        "u_salary_1_5_year": {
          "type": "integer"
        }
      },
      "required": [
        "children",
        "u_salary_1_5_year"
      ]
    },
    "name": {
      "type": "string"
    },
    "salary": {
      "type": "integer"
    }
  },
  "required": [
    "age",
    "family",
    "name",
    "salary"
  ]
}
pm.test("Schema is valid", function(){
    pm.response.to.have.jsonSchema(schema);
});

// 3. check that response salary matches request salary from environment

pm.test("response salary matches request salary from environment: " + request.data.salary, function () {
    var jsonData = pm.response.json();
    pm.expect(pm.environment.get("u_salary_1_5_year")).to.eql(jsonData.salary);
});

// 4. check that response age matches request age from environment

pm.test("response age matches request age: " + request.data.age, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.age).to.eql(request.data.age);
});



```
