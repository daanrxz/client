# DM Airlines - MERN
This MERN final project is about a program for airline crew scheduling


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Description
This is a management app for organizing  
## Functionality
Examples
- Dark and light theme



## Components
Pages:

* HomePage
* LoginPage
* SignupPage
* Crew Schedule

Components:
* NavBar
* LoginPage
* SignupPage
* Crew
* 
## Service
* Auth Service

        authService:

            .login(user)

            .signUp(user)

            .logout()

            .validate()

- **User Service**

     `userService` :   

        `.updateCurrentUser(id, userData)`
        `.getCurrentUser()`       
## Routes
### ReactRouter Routes (React App)
| Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/signup`                    | SignupPage           | anon only  `<AnonRoute>`   | Signup form, navigates to home page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                                |
| `/user`              | ProfilePage          | user only `<PrivateRoute>` | User and player profile for the current user.             |
| `/user/edit`         | EditProfilePage      | user only `<PrivateRoute>` | Edit user profile form.                                   |
| `/flight/add`           | CreateFlightPage | user only `<PrivateRoute>` | Create new flight form.                               |
| `/flight`               | FlightListPage   | user only `<PrivateRoute>` | Flight list.                                         |
| `/crew/` | CrewPage | user only `<PrivateRoute>` | Tournament details. Shows players list and other details. |
| `/tournament/players/:id`    | PlayerDetailsPage    | user only `<PrivateRoute>` | Single player details.                                    |
| `/rankings/:tournamentId`    | RankingsPage         | user only `<PrivateRoute>` | Tournament rankings list.                                 |



## Server | Backend

## Models

Crews Model
```
{
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birth: {type: Date},
    email: { type: String, required: true, unique: true },
    phone: { type: number },
    language: { type:String },
    Image: { type: String },
}
```
Aircraft Models
```
   model: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true
  },
  range: {
    type: Number,
    required: true
  },
  yearOfManufacture: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Maintenance', 'Retired']
  },
  lastMaintenanceDate: {
    type: Date
  }
```

Flight Model
```
flightNumber: {
    type: String,
    required: true,
    unique: true
  },
  departureAirport: {
    type: String,
    required: true
  },
  arrivalAirport: {
    type: String,
    required: true
  },
  departureTime: {
    type: Date,
    required: true
  },
  arrivalTime: {
    type: Date,
    required: true
  },
  aircraft: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aircraft',
    required: true
  },
  crew: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crew'
  }],
  airline: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Scheduled', 'Delayed', 'Cancelled', 'Completed']
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
```





## Packages

```
git init

```
## Stack used

**Front-end:** React

**Back-end:** Node, Express, Mongo


## Links

[Client repository Link]()

[Server repository Link]()

[Deployed App Link]()

Slides

[Presentation](https://choosealicense.com/licenses/mit/)
## Authors
Daniel Rodrigues 

Mariana Carvalho
