# Soviet Socks Stockpile Software V1.0!

# About:
This project (which I have done as part of a Cyber4s full stack developer course) implements a working SQL database which allows for CRUD commands to be run on it, all wrapped up in a neat package running on your browser!

# To Run:

```npm ci``` in server and webapp.

```npm start``` in server and webapp.

The app should open automatically in your browser, running on localhost port 4000.

# Usage Instructions:

-To view a given table it must be selected at the top, there are 3 tables: Officers, Socks and Location History

-The commands will be processed based on the mode you select (Create, Read, Update, Delete)

-Different values that you wish to input into the command line should be separated by a double space. For example if we want to read all socks that are size XL and have a quantity of 9 it would be written so:
```size=XL  quantity=9```.

This is done to ensure that you can include values which have spaces in them like names of officers and location names

-Create syntax: the input should contain one value for each field on the table in the order they appear on the table. For example if we want to create an officer we could enter this into the command line: ```id=x  name=y  email=z  phone=1234```.

-Read syntax: the input should contain any values you want to search for, if you input several you will get results that match all conditions. Here we can look at the example from the value separation explanation.

-Update: the input should include two statements - the first is the value you set and the second is the value by which the system will find what you want to change. For example if we want to change the sock whose model is Berye Blue into size L we would do it so: ```size=L  model=Berye Blue```.

-Delete: the input should include the statements that whatever entries contain them you wish to delete. For example to delete all socks of size XL we would need to simply execute: ```size=XL```.

Enjoy!
