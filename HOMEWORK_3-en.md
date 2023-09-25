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
 
 // 1.check status code: Code is 200
 
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 2. check json structure

var schema = {
    "type": "object",
  "properties": {
    "age": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "salary": {
      "type": "array",
      "items": [
        {
          "type": "number"
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
  "required": ["age", "name", "salary"]
}
pm.test("Scheme is valid", function(){
    pm.response.to.have.jsonSchema(schema);
});

// 3. check the correctness of calculation of response parameters

// 3.1 check the correctness of calculation of salary[0] parameter

var request_json = request.data;
pm.test("Calculation of salary[0] parameter is correct: " + request_json.salary*1, function () {
    var jsonData = pm.response.json();
    pm.expect(+jsonData.salary[0]).to.eql(request_json.salary*1);
});

// 3.2 check the correctness of calculation of salary[1] parameter
// \"" is used to emphasize, that response values are String

var request_json = request.data;
pm.test("Calculation of salary[1] parameter is correct: \"" + request_json.salary*2 + "\"", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.salary[1]).to.eql(String(request_json.salary*2));
});

// 3.3 check the correctness of calculation of salary[2] parameter
// \"" is used to emphasize, that response values are String

var request_json = request.data;
pm.test("Calculation of salary[2] parameter is correct: \"" + request_json.salary*3 + "\"", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.salary[2]).to.eql(String(request_json.salary*3));
});

// 4. check if salary[2] > salary[1] & salary[2] > salary[0]

pm.test("the 2nd element of salary array is greater than the 0th and 1st elements", function () {
    var jsonData = pm.response.json();
    pm.expect(+jsonData.salary[2]).to.be.above(+jsonData.salary[0]);
    pm.expect(+jsonData.salary[2]).to.be.above(+jsonData.salary[1]);
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
