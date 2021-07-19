# Avodash

Avodash is a dashboard to visualize and explore the price of avocados. [Demo](https://avodash.azurewebsites.net/)

## Features
Avodash includes interactive features that will help you slice and narrow down the data that you want to analyse. Try one of the following:
* Select one of the chart legends to add a filter 
* Exclude a region by clicking on the minus filter button in the "Top 10 Regions by Volume" card
* Select a different date range to filter data
* Select a filter from the search box

## Project Structure
The Avodash source code is contained in a single ASP.NET project. Specific functionality is included at:

* **React** - The React specific code is contained in the `ClientApp` folder.
* **API Controllers** - API controllers are contained in the `Controllers` folder

## Getting Started
Avodash is build using
* [ASP.NET 5](https://dotnet.microsoft.com/download/dotnet/5.0)
* [React](https://reactjs.org/)

### Prerequisites
You will be required to install
* .NET SDK [Install Instructions](https://docs.microsoft.com/en-us/dotnet/core/install/linux) 
* NPM [Getting Started](https://docs.npmjs.com/getting-started)

### Running The App
The app can easilty be started using the .NET CLI.
```
dotnet run
```

It might be required to install development SSL certificates using
```
dotnet dev-certs https --trust
```

It might also be neccessary to install NPM dependencies
```
cd ./ClientApp 
npm install
```


