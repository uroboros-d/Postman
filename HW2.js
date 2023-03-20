//1) http://162.55.220.72:5005/first

var responseString = pm.response.text();            //gets response text
var responseCode = pm.response.code;                //gets response status code

pm.test("Status code is 200", function () { 
    pm.response.to.have.status(200);                //assert if the status code is 200
});

pm.test("Response has certain string", function() {
    pm.response.to.have.body(responseString);       //asserts if the request has certain string
})

console.log("Request string is", responseString);   //outputs the response string into console
console.log("Status code is", responseCode);        //outputs the response status code 

//2) http://162.55.220.72:5005/user_info_3

var jsonData = pm.response.json();                                                      //gets the response body as a JSON

var responseSalary = jsonData.salary;                                                   //gets the value of the salary key from response

var requestName = pm.request.body.formdata.get("name");                                 //gets the value of the name key from request form data body  
var requestAge = pm.request.body.formdata.get("age");                                   //gets the value of the age key from request form data body
var requestSalary = +pm.request.body.formdata.get("salary");                            //gets the value of the salary key from request form data body

pm.test("Status code is 200", function () { 
    pm.response.to.have.status(200);                                                    //assert if the status code is 200
});

pm.test("Request name is equal to response name", function () {                             
    pm.expect(jsonData.name).to.eql(requestName);                                       //assert if the name from request is equal to name from response
});

pm.test("Request age is equal to response age", function () {
    pm.expect(jsonData.age).to.eql(requestAge);                                         //assert if the age from request is equal to age from response
});

pm.test("Request salary is equal to response salary", function () {
    pm.expect(jsonData.salary).to.eql(requestSalary);                                   //assert if the salary from request is equal to salary from response
});

pm.test("Response salary throug 1,5 years is equal to request salary*4", function () {
    pm.expect(jsonData.family.u_salary_1_5_year).to.eql(requestSalary*4);               //assert if the salary*4 from request is equal to lasary though 1,5 years from response
});
    
console.log(jsonData.family);                                                           //outputs the response into console

//3) http://162.55.220.72:5005/object_info_3

var jsonData = pm.response.json();                                                      //gets the response body as a JSON

var requestUrl = pm.request.url.query;                                                  //gets the request querry params

var reqName = requestUrl.get("name");                                                   //gets the request name value
var reqAge = requestUrl.get("age");                                                     //gets the request age value
var reqSalary = requestUrl.get("salary");                                               //gets the request salary value

pm.test("Status code is 200", function () { 
    pm.response.to.have.status(200);                                                    //assert if the status code is 200
});

pm.test("Request name is equal to response name", function () {                             
    pm.expect(jsonData.name).to.eql(jsonData.name);                                       //assert if the name from request is equal to name from response
});

pm.test("Request age is equal to response age", function () {
    pm.expect(jsonData.age).to.eql(jsonData.age);                                         //assert if the age from request is equal to age from response
});

pm.test("Request salary is equal to response salary", function () {
    pm.expect(jsonData.salary).to.eql(jsonData.salary);                                   //assert if the salary from request is equal to salary from response
});

pm.test("Dog has name and age keys", function () {
    pm.expect(jsonData.family.pets.dog).to.have.all.key("name", "age");                   //assert if the dog from response has name and age property
});

pm.test("Dog's name is Lucky", function () {
    pm.expect(jsonData.family.pets.dog.name).to.eql("Luky")                               //assert if the dog from response has the name "Luky"
});
    
pm.test("Dog's age is 4", function () {
    pm.expect(jsonData.family.pets.dog.age).to.eql(4)                                     //assert if the dog from response has the age "4"
});

console.log(jsonData.family);                                                             //outputs the response into console

//4) http://162.55.220.72:5005/object_info_4

var resp = pm.response.json();                                                          //gets the response body as a JSON

var req = pm.request.url.query;                                                         //gets the request querry params

var reqName = req.get("name");                                                          //gets the request querry param's name value
var reqAge = +req.get("age");                                                           //gets the request querry param's age value
var reqSalary = +req.get("salary")                                                      //gets the request querry param's salary value

pm.test("Status code is 200", function () { 
    pm.response.to.have.status(200);                                                    //assert if the status code is 200
});

pm.test("Request name is equal to response name", function () {
    pm.expect(resp.name).to.eql(reqName);                                               //assert if the name from the request is equal to name from the response
});

pm.test("Request age is equal to response age", function () {
    pm.expect(resp.age).to.eql(reqAge);                                                 //assert if the age from the request is equal to the age from the response
});

console.log("Salary from request is " + reqSalary);                                     //outputs the salary from the request into console
console.log("Salaries from response are " + resp.salary);                               //outputs the salary from the response into console

console.log("First value from request salary key is ", resp.salary[0])                  //outputs the first salary element from the response list into console
console.log("First value from request salary key is ", resp.salary[1])                  //outputs the second salary element from the response list into console
console.log("First value from request salary key is ", resp.salary[2])                  //outputs the third salary element from the response list into console

pm.test("Check if the salary from request is equal to first element from salary response", function () {
    pm.expect(reqSalary).to.eql(+resp.salary[0]);                                       //assert if the salary from the request is equal to the first element from the salary response
});reqSalary

pm.test("Check if the salary*2 from request is equal to second element from salary respons", function () {
    pm.expect(reqSalary*2).to.eql(+resp.salary[1]);                                     //assert if the salary*2 from the request is equal to the second element from the salary response
});

pm.test("Check if the salary*3 from request is equal to third element from salary respons", function () {
    pm.expect(reqSalary*3).to.eql(+resp.salary[2]);                                     //assert if the salary*3 from the request is equal to the third element from the salary response
});

pm.environment.set("name",reqName);                                                     //sets the request name param as the environmental varible name
pm.environment.set("age", reqAge);                                                      //sets the request age param as the environmental varible age
pm.environment.set("salary", reqSalary);                                                //sets the request salary param as the environmental varible salary

for (i=0; i<resp.salary.length; i++) {
    console.log("The " + [i+1] + " value from request salary key is "+resp.salary[i]);  //outputs all elements from the salary's response list into console
};

//5) http://162.55.220.72:5005/user_info_2

//pre-request script
var envName = pm.environment.get("name");       //gets the request name value
var envAge = pm.environment.get("age");         //gets the request age value
var envSalary = pm.environment.get("salary");   //gets the request salary value

//Tests
var jsonData = pm.response.json();                                                      //gets the response body as a JSON

var request = request.data;                                                             //gets the request data

var req_name = pm.request.body.formdata.get("name");                                    //gets the request name value
var req_age = +pm.request.body.formdata.get("age");                                     //gets the request age value
var req_salary = +pm.request.body.formdata.get("salary");                               //gets the request salary value


pm.test("Status code is 200", function () { 
    pm.response.to.have.status(200);                                                    //assert if the status code is 200
});

pm.test("Response has [start_qa_salary] property" , function () {
    pm.expect(jsonData).to.have.property("start_qa_salary");                            //assert if the response has [start_qa_salary] property
});

pm.test("Response has [qa_salary_after_6_months] property" , function () {
    pm.expect(jsonData).to.have.property("qa_salary_after_6_months");                   //assert if the response has [qa_salary_after_6_months] property
});

pm.test("Response has [qa_salary_after_12_months] property" , function () {
    pm.expect(jsonData).to.have.property("qa_salary_after_12_months");                  //assert if the response has [qa_salary_after_12_months] property
});

pm.test("Response has [qa_salary_after_1.5_year] property" , function () {
    pm.expect(jsonData).to.have.property("qa_salary_after_1.5_year");                   //assert if the response has [qa_salary_after_1.5_year] property
});

pm.test("Response has [qa_salary_after_3.5_years] property" , function () {
    pm.expect(jsonData).to.have.property("qa_salary_after_3.5_years");                  //assert if the response has [qa_salary_after_3.5_years] property] property
});

pm.test("Response has [person] property" , function () {
    pm.expect(jsonData).to.have.property("person");                                     //assert if the response has [person] property]
});

pm.test("Response [start_qa_salary] is equal to request salary", function () {
    pm.expect(req_salary).to.eql(jsonData.start_qa_salary);                             //assert if the salary from the request is equal to [start_qa_salary] from the response
});

pm.test("Response [qa_salary_after_6_months] is equal to request salary*2", function () {
    pm.expect(req_salary*2).to.eql(jsonData.qa_salary_after_6_months);                  //assert if the salary*2 from the request is equal to [qa_salary_after_6_months] from the response
});

pm.test("Response [qa_salary_after_12_months] is equal to request salary*2.7", function () {
    pm.expect(req_salary*2.7).to.eql(jsonData.qa_salary_after_12_months);               //assert if the salary*2.7 from the request is equal to [qa_salary_after_12_months] from the response
});

pm.test("Response [qa_salary_after_1.5_year] is equal to request salary*3.3", function () {
    pm.expect(req_salary*3.3).to.eql(jsonData["qa_salary_after_1.5_year"]);             //assert if the salary*3.3 from the request is equal to [qa_salary_after_1.5_year] from the response
});

pm.test("Response [qa_salary_after_3.5_years] is equal to request salary*3.8", function () {
    pm.expect(req_salary*3.8).to.eql(jsonData["qa_salary_after_3.5_years"]);            //assert if the salary*3.8 from the request is equal to [qa_salary_after_3.5_years] from the response
});

pm.test("Response first element from person[u_name] is equal to request salary", function () {
    pm.expect(req_salary).to.eql(jsonData.person.u_name[1]);                            //assert if the salary from the request is equal to first element from person[u_name] from the response
});

pm.test("Response [person.u_age] is equal to request age", function () {
    pm.expect(req_age).to.eql(jsonData.person.u_age);                                   //assert if the age from the request is equal to [person.u_age] from the response
});

pm.test("Response [u_salary_5_years] is equal to request salary*4.2", function () {
    pm.expect(req_salary*4.2).to.eql(jsonData.person.u_salary_5_years);                 //assert if the salary*4.2 from the request is equal to [person.u_salary_5_years] from the response
});

for (property in jsonData.person) {
    console.log(`${property}: ${jsonData.person[property]}`);                           //outputs all elements from the person's response list into console
}