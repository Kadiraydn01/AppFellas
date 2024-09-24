# Flight Finder App

In this project, Node.js was used as the backend language, MongoDB was used as the database, and React was used as the frontend. It allows users to log in, select the city and date they want to go, make reservations and control these reservations.

## Environment Variables

To run this project you will need to add the following environment variables to your .env file

`SCHIPHOL_APP_ID`

`MONGODB_URI`

`SCHIPHOL_APP_ID`

`NODE_ENV = development`

## Install

```bash
  git clone <repo-url>
  cd my-project
```

## Starting to Frontend

```bash
  cd frontend
  npm i
```

```bash
  npm start
```

## Buildind to Frontend

```bash
  npm run build
```

## Starting to Backend Server

```bash
  npm i
  npm run server
```

## Buildind to Backend Server

```bash
  npm run build
```

## API Use

#### GET Request for reservations

```http
  GET /api/reservations/my-reservations
```

| Parameter | Type     | Explanation   |
| :-------- | :------- | :------------ |
| `token`   | `string` | **Necessary** |

#### POST Request for reservations

```http
  POST /api/reservations/reserve
```

| Parameter      | Type     | Explanation   |
| :------------- | :------- | :------------ |
| `fullName`     | `string` | **Necessary** |
| `email`        | `string` | **Necessary** |
| `phone number` | `string` | **Necessary** |

## Screenshots

### Homepage Before Search Flights

![image](https://github.com/Kadiraydn01/AppFellas/blob/main/HomePage.png?raw=true)

### Homepage After Search Flights

![image](https://r.resimlink.com/sM9LOPj0-V6.png)

### Flight Detail Part

![image](https://r.resimlink.com/FU2wbsj7kY.png)
### Reservation Page

![image](https://r.resimlink.com/2eEJd_Yb7Uig.png)

### Reservation Detail Part

![image](https://r.resimlink.com/3nSXjA1xs.png)
##### Logout And Access for Reservation Page

![image](https://r.resimlink.com/Lc7AdfvDwjS.png)
#### Login Page

![image](https://r.resimlink.com/txXz82wyH.png)
