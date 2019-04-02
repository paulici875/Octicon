
start app with VisualStudio 2017

base route is http://localhost:57628

1. to be able to use this api you should run the scripts from "OcticonDb script" file 
	- this will create you the same db structure used by api

2. if you want to get some mock data, run in browser http://localhost:57628/test
	- if you have data in your local db, api should work

3. if you need to find some route and details about it, look in OcticonApi project -> Controlles folder
	- each method will treat one request; if you are not sure wich one you need, look in description 
(there you'll find some short summary, what kind of input is required and what is returned)
	- above each method you will see a Route attribute which will tell you how to form the request url
	
	- Example: in UserController you'll find something like this: [Post("/[controller]/login")]
		this means that it responds to a POST requests at http://localhost:57628/user/login
