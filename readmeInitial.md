What I want:
Stripe and ext possible AI api
Possibly Perhaps HealthCare
Compare to existing packages (product Emma: suggest based on questionnaire)
Busy industry

Amish (StaffEase)
Restaurant and Live restaurant Checker
what the wait time would be like. Also, help create a pos system that is affordable for small businesses that would create more traffic footprint and customer satisfaction.
Understaffing issues,
Live Staff updating/Food Storage (manager user);
For that design want an ease of use. From POS manage Storage system.
Google tells you how busy but not if service could collapse (about to run out food)
Employee to workload ratio;

Tony Mai
Down for whatever

Jason Charney
PWA weather Radio app
Little different from module 6
want to use use new API NAtional Weather Service
kml files
Provides Radar layer over a map
We need to overlay over a map, using React Leaflet
Severe Weather Desktop notifications
Geolocation

Weather Based Restaurant Live Feed
Amalgamation of ideas Eating base upon weather, no cheeseburger in winter
Restaurant base on weather conditions
Pop up restaurants
We design a pop up restaurant based on weather and employment.
Choices are often made on impulse
We choose food based upon laziness
Gradually reducing responsibilities

Idea Output
One Store or Many Stores;
Donation Button? PreTipping, can you buy into better service?

One Store Management system that put out data about staff workload and busyness.
Make Basic Food Designs (IceCream)
Client to customers ratio
Next Gen Food Storage info

User demands based on weather?? Can AI do this? Make Fake data AI,feed data,

Customer can see staffing levels

Login for Store
Store Stripe login

Login for Customer
Or Output conditions to Twitter, social media feed, Mastodon

Many Store
Consumer Side, Pins are colored, visually accessible

Necessary Input
Staff Inputs
Sales Input
Customer Input, review any good?? out of scope

Weather correlations
Third party Chat AI
sentiment analysis?

Data Expecting to Store

    Users
        Managers ID
        First Name Manager
        Last Name
        business (shoot for 5)
            staff
            wait times
            reservations?? Open table API
            Reviews
            Historical Data??

        staff
        Waiting times

Make a good looking appealing application.

CLEAN NEW START
An app for a demo five restaurants
Business owner
Real time staffing workload by way off staff to volume ratio
Staff check in
occur with login full name Clockin button
Stores in DB, updates Active Employee count
Purchases/ Store Busyness
Determined by Active employee validation
Has Button
Method to determine workload
Employee Planned Schedule vs actual employee number with ratio to determine volume
(As a manager I expect 2 employees to service 50 people an hour)
Customers during timestamp
Each business One Shift, One Restaurant( populate with 5 replicas)
Customer Side
Reveals performance of restaurant (%of maximum i.e 50 per hour per 2 employees)
Maybe though visiting, metrics openly shown
(stretch) Open Text Area, Customer input reviews, on button push sentiment analysis, AI
(stretch) Sees it through social media post
Chat Bot, not trained on
Dirty would be send email to manager to post on his account, at end of shift or mid shift or when performance hits metric???
Twillio Send grid???

Stretch Category
API would be social media feed
How Busy is store, how overworked, yellow or orange or red or green based on switch case, that is based on metrics
Historical Data or something with weather
Feed to AI

Thoughts:
There exists some muddled understanding, we are not clear on our picture.

What needs to done;
Front End
CSS
REACT Designs (page Layout)

NavBar
1.StaffEase Logo and tagline purpose

2.Signup
a.Business or Employee
-business is main DB
-employee in signup, name your business, directed to clockin page

Signin
a.business or employee
-employee is clockin question
-busines is
Signout

Customer Comment
-first,last, rating (stars, comment)

Content Section
-For business would be
-customer comments
-see business analytics
-staff workload
-capacitynumbers
-for employee
-clockin, clockout button

Clicked

Login
Footer
Models, schemas
Graphql
TypeDefs
Utils
App.js
Index.js
JSON Levels
Responsize Web Design

Back End

    ()Server
    ()Config Connection,
    ENV
    ()Models
    Schema
      Graphql
        Resolvers
        TypeDefs
    Apollo Server
    ()Utils
        Auth
    Mongo DB
        Atlas
    ()Package JSON Levels

Objectives
Server Running
Apollo Server
Page Layout Design
Database Layout Design
Map out Data
Set up Git
Make Work chart
Project Page on GitHub

Bringing it all together
Common gitHub
Common Atlas
Common ENV
salt, secret

What Can we excel at?
Participant Strength
How is data fed
JSON OBJECT

Database

const user = new Schema(
{
username: {
type: String,
required: true,
unique: true,
},
email: {
type: String,
required: true,
unique: true,
match: [/.+@.+\..+/, 'Must use a valid email address'],
},
password: {
type: String,
required: true,
},
role:{
type:string
required:true,
unique:false,
}
},
// set this to use virtual below
{
toJSON: {
virtuals: true,
},
}
);

Business

const Business = new Schema(
{
businessName: {
type: String,
required: true,
unique: true,
},
description: {
type: String,
required: true,
unique: false,
},
location: {
type: String,
required: true,
},
contact:{
type:String,
required:true,
unique:true
}
currentCapcacity:{
type:INT,
required:true,
}
maxCapacity:{
type:INT,
required:true,
}
employees:[Employee]
},
customers:[Customer]
// set this to use virtual below
{
toJSON: {
virtuals: true,
},
}
);

const Employee = new Schema(
{
Users:[User],
clocked:{
type:boolean,
required:true
}
},
// set this to use virtual below
{
toJSON: {
virtuals: true,
},
}
);

const CustomerSchema = new Schema(
{
FirstName: {
type: String,
required: true,
unique: true,
},
LastName: {
type: String,
required: true,
unique: true,
},
rating: {
type: String,
required: true,
unique: false,
},
comment: {
type: String,
required: true,
unique: true,
},
},
// set this to use virtual below
{
toJSON: {
virtuals: true,
timestamp:true
},
}
);

Business:
business_id (unique identifier)
name
description
location
contact_details
current_customers
max_capacity (optional)
Staff:
staff_id (unique identifier)
first_name
last_name
role
email
password (hashed)
business_id (foreign key, referencing Business)
clockedin
total_hours_worked (stretch)
CustomerFeedback:
feedback_id (unique identifier)
business_id (foreign key, referencing Business)
customer_name
rating
comment
timestamp
Reservation (optional): (strecth)
reservation_id (unique identifier)
business_id (foreign key, referencing Business)
customer_name
contact_details
reservation_time
party_size
status (e.g., confirmed, pending, or canceled)
User (for authentication):
user_id (unique identifier)
email
password (hashed)
role (e.g., business owner, staff member, or customer)
associated_id (foreign key, referencing Business or Staff, depending on the role)

    /const Employee = new Schema(

{
FirstName: {
type: String,
required: true,
unique: true,
},
LastName: {
type: String,
required: true,
unique: true,
},
role: {
type: String,
required: true,
unique: false,
},
email: {
type: String,
required: true,
unique: true,
match: [/.+@.+\..+/, 'Must use a valid email address'],
},
password: {
type: String,
required: true,
},
clocked:{
type:boolean,
required:true
}
},
// set this to use virtual below
{
toJSON: {
virtuals: true,
},
}
);/
