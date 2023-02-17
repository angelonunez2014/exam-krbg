# Angular Technical Test
We've designed a small remote technical test, that is open ended. You should be able to make choices and assumptions without guidance. We're interested in seeing how you think and architect out the code. You should not spend more than 3 hours on this so think strategically about what you want to show.

Clone this repo and send us a link to your work. We will review ASAP and decide whether to invite in for interview.

###  Spec:
We want to test your ability to write clean modular angular code that talks to a RESTful API endpoints.
* Build a todo list single page application.
* Add/Edit/Delete todo items
* Mark todo item as done
* Ability to filter items in the todo list

We have set up for you a project and a mock local server.              

GET  from http://localhost:3000/tasks ← list all todo items                 
GET /1 ← view detail of a specific todo item, where id = 1                  
POST ← creates a new todo item (as long as it has an available id)                 
PATCH /1 ← edits the todo item with id = 1             
DELETE /1 ← deletes the todo item, with id = 1               

              
###  We would like to see the following:

* Modular Angular code 
* Dependency injection 

###  Nice to have:                 

* It would be nice if you can demonstrate how to write modular SCSS code


Additional notes:            
The frontend is in Angular 15. We used json-server to mock backend. 
Any extra feature you can add will be appreciated.                
Whatever you do send please do it to the best of your abilities, please be proud of what you send. Quality > Quantity.
Setup of the project should be easy and detailed.


### Quick start
#### clone the repo
Go to your developer folder
Clone this project repository to your local machine

#### change into the repo directory
`cd KarabagAngularTechTest`

#### install
`npm install`

#### serve
`npm run server`                   
`npm run start`

#### Running unit tests
`npm run test`
