HOMEWORK_3 (POSTMAN)
```javascript

The collection is in Ksendzov_hw_3.postman_collection.json


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

// 1) Статус код 200

pm.test('Status code is 200', function(){
    pm.response.to.have.status(200)
});

// 2) Проверка структуры json в ответе

const schema =
{
  "type": "object",
  "properties": {
    "age": {
      "type": "number"
    },
    "daily_food": {
      "type": "number"
    },
    "daily_sleep": {
      "type": "number"
    },
    "name": {
      "type": "string"
    }
  },
  "required": [
    "age",
    "daily_food",
    "daily_sleep",
    "name"
  ]
}

var jsonData = pm.response.json();

pm.test('tv4: Schema is valid', function () {
    pm.expect(tv4.validate(jsonData, schema)).to.be.true;
});

console.log(tv4.error);

pm.test('Ajv: Schema is valid', function() {
  pm.response.to.have.jsonSchema(schema);
});

// 3) В ответе указаны коэффициенты умножения weight, напишите тесты по проверке правильности результата перемножения на коэффициент.

let request_weight = request.data.weight;

//console.log(request.data.weight);

pm.test('умножение на коэффициенты верное',()=>{
    pm.expect(jsonData.daily_food).to.eql(request_weight*0.012);
    pm.expect(jsonData.daily_sleep).to.eql(request_weight*2.5);
});
-----------------------------------------------------------------------------------------------------------
http://162.55.220.72:5005/get_test_user

// 1) Статус код 200

pm.test('Status code is 200', ()=>{
    pm.response.to.have.status(200)
});

// 2) Проверка структуры json в ответе.

const schema =
{
  "type": "object",
  "properties": {
    "age": {
      "type": "string"
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

var jsonData = pm.response.json();

pm.test('tv4: Schema is valid', function () {
    pm.expect(tv4.validate(jsonData, schema)).to.be.true;
});

console.log(tv4.error);

pm.test('Ajv: Schema is valid', function() {
  pm.response.to.have.jsonSchema(schema);
});

// 3) Проверить что занчение поля name = значению переменной name из окружения

pm.test('занчение поля name = значению переменной name из окружения',()=>{
    pm.expect(jsonData.name).to.eql(pm.environment.get('name'));
});

pm.test('занчение поля name = значению переменной name из окружения',()=>{
    pm.expect(jsonData.name).to.eql(pm.variables.get('name'));
});

// 4) Проверить что занчение поля age в ответе соответсвует отправленному в запросе значению поля age

pm.test('занчение поля age в ответе соответсвует отправленному в запросе значению поля age', function(){
    pm.expect(jsonData.age).to.eql(request.data.age)
});

-----------------------------------------------------------------------------------------------------------
http://54.157.99.22:80/currency

// 1) Можете взять любой объект из присланного списка, используйте js random


function getRandomInt (max) {
    return Math.floor(Math.random()*(max+1));   //получить случайное число от 0 до max
}
// Math.floor(x)возвращает значение x, округленное до ближайшего целого числа
// Math.random()возвращает случайное число от 0 (включительно) до 1 (исключая)

var jsonData = pm.response.json();

var randomObj = jsonData[getRandomInt(jsonData.length)];

// console.log(randomObj);

// 2. В объекте возьмите Cur_ID и передать через окружение в следующий запрос
pm.environment.set("Cur_ID", randomObj.Cur_ID);

-----------------------------------------------------------------------------------------------------------
http://54.157.99.22:80/curr_byn

// 1. check status code: Code is 200
pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
})

// 2. check json structure
var schema =  {
    "type" : "object",
    "properties" : {
        "Cur_Abbreviation" : { "type" : "string"},
        "Cur_ID" : { "type" : "integer"},
        "Cur_Name" : { "type" : "string"},
        "Cur_OfficialRate" : { "type" : "number"},
        "Cur_Scale" : { "type" : "integer"},
        "Date" : { "type" : "string"}
    },
    "required" : ["Cur_Abbreviation", "Cur_ID", "Cur_Name", "Cur_OfficialRate", "Cur_Scale", "Date"]
}

pm.test("Schema is valid", function(){
    pm.response.to.have.jsonSchema(schema);
});



// ***
1) получить список валют
2) итерировать список валют
3) в каждой итерации отправлять запрос на сервер для получения курса каждой валюты
4) если возвращается 500 код, переходим к следующей итреации
5) если получаем 200 код, проверяем response json на наличие поля "Cur_OfficialRate"
6) если поле есть, пишем в консоль инфу про фалюту в виде response
{
    "Cur_Abbreviation": str
    "Cur_ID": int,
    "Cur_Name": str,
    "Cur_OfficialRate": float,
    "Cur_Scale": int,
    "Date": str
}
7) переходим к следующей итерации

for (currency of jsonData) {
    var postRequest = {
        url : "http://54.157.99.22:80/curr_byn",
        method : "POST",
        body : {
            mode : "formdata",
            formdata : [
                {
                    key : "auth_token", value : pm.environment.get("token")
                },
                {
                    key : "curr_code", value : currency.Cur_ID
                }
            ]
        }
    };
    pm.sendRequest(postRequest, (error, response) => {
        if (error) {
            console.log("error: ", error); // это выведет в консоль сообщ об ошибке и else не отрабатывается
        } else {
            if (response.json().hasOwnProperty('Cur_OfficialRate')) {
                console.log(response.json());
            } else {
                console.log("the object doesn't have Cur_OfficialRate property: ", response.json());
            }
        }
    });
}

```
