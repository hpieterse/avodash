# Avodash

Avodash is a dashboard to visualize and explore the price of avocados.

[Online Demo](https://avodash.azurewebsites.net/)

*(The site is hosted on a free Azure web service, therefore it might take a few minutes to start up)*

## Features
Avodash includes interactive features that will help you slice and narrow down the data that you want to analyse. Try one of the following:
* Select one of the chart legends to add a filter 
* Exclude a region by clicking on the minus filter button in the "Top 10 Regions by Volume" card
* Select a different date range to filter data
* Select a filter from the search box

Any changes to the selected filters will update the website route in query parameters. This means you can bookmark or share any filter and date range selection.

## Getting Started
Avodash is build using
* [ASP.NET](https://dotnet.microsoft.com/apps/aspnet)
* [React](https://reactjs.org/)

### Prerequisites
You will be required to install
* .NET SDK - [Install Instructions](https://docs.microsoft.com/en-us/dotnet/core/install/linux) 
* NPM - [Getting Started](https://docs.npmjs.com/getting-started)

### Running The App
The app can easily be started using the .NET CLI. 
```
dotnet run
```
When the ASP<span>.</span>NET web project is run in development mode, a React development service is automatically started.

It might be required to install development SSL certificates using
```
dotnet dev-certs https --trust
```

It might also be necessary to install NPM dependencies
```
cd ./ClientApp 
npm install
```
## Project Structure
Source code is contained in a single ASP.NET project. Areas of interest include:

* **`ClientApp`** - The React project.
* **`Controllers`** - The API controllers.
* **`ClientApp/src`** - The TypeScript React files.

## Credits

Dataset from Kaggle https://www.kaggle.com/smokingkrils/avacado-price-prediction