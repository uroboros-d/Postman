HOMEWORK_3 (POSTMAN_
```javascript

// 1. send the request with login and password

http://162.55.220.72:5005/login

// 2. define token variable in the environment

var jsonData = pm.response.json();
pm.environment.set("token", jsonData.token);
----------------------------------------------------------------------
// 0. send the request with login and password

http://162.55.220.72:5005/user_info

// 1. check status code: Code is 200

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 2. check json structure

var schema = {
    "type" : "object",
    "properties" : {
        "start_qa_salary" : {
            "type" : "integer"
        },
        "qa_salary_after_6_months" : {
            "type" : "number"  
        },
        "qa_salary_after_12_months" : {
            "type" : "number"  
        },
        "person" : {
            "type" : "object",
            "properties" : {
                "u_name" : {
                    "type" : "array",
                    "items" : [
                        {
                            "type" : "string"
                        },
                        {
                            "type" : "integer"
                        },
                        {
                            "type" : "number"
                        }
                    ]
                },
                "u_age" : {
                    "type" : "integer"
                },
                "u_salary_1.5_year" : {  // FAIL: AssertionError: expected data to satisfy schema but found following errors:
                                         // data.person should have required property 'u_salary_1.5_year'
                    "type" : "number"   
                }
            },
            "required" : ["u_name", "u_age", "u_salary_1.5_year"]
        }
    },
    "required" : ["start_qa_salary", "qa_salary_after_6_months", "qa_salary_after_12_months", "person"]
}
pm.test("Shema is valid", function(){
    pm.response.to.have.jsonSchema(schema);
});

// 3. check the correctness of calculation of response parameters

// 3.1 check the correctness of calculation of qa_salary_after_6_months parameter

var request_json = JSON.parse(pm.request.body.raw);
pm.test("Calculation of qa_salary_after_6_months parameter is correct: " + request_json.salary*2, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.qa_salary_after_6_months).to.eql(request_json.salary*2);
});

// 3.2 check the correctness of calculation of qa_salary_after_12_months parameter

var request_json = JSON.parse(pm.request.body.raw);
pm.test("Calculation of qa_salary_after_12_months parameter is correct: " + request_json.salary*2.9, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.qa_salary_after_12_months).to.eql(request_json.salary*2.9);
});

// 3.3 check the correctness of calculation of u_salary_1.5_year parameter

var request_json = JSON.parse(pm.request.body.raw);
pm.test("Calculation of u_salary_1.5_year parameter is correct: " + request_json.salary*4, function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.person["u_salary_1.5_year"]).to.eql(request_json.salary*4);
});

// FAIL: AssertionEror: expected undefined to deeply equal 4000

// 4. pass u_salary_1.5_year parameter value to the request get_test_user

var jsonData = pm.response.json();
pm.environment.set("u_salary_1.5_year", jsonData.person["u_salary_1.5_year"]);

// the value of the environment variable "u_salary_1.5_year" is NULL
