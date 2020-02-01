# Quotator

Quotator shows a random quote and allows users to save this quote for later use. The quote is fetched from a [public API](https://api.quotable.io/random) that returns a random quote from a pool of ~1500 quotes. Saving the quote will store the quote in the local storage of the device.

The application can be accessed at [https://quotator.now.sh](https://quotator.now.sh/).

- [Getting Started](#getting-started)
  - [Installing](#installing)
- [Running the tests](#running-the-tests)
- [Deployment](#deployment)
- [Client](#client)
  - [Application](#application)
  - [QA](#QA)

## Getting Started

### Prerequisites

- Node 12.x

### Installing

```
npm install
```

## Running the tests

```
ng test
```

## Deployment

```
ng serve
```

## Client

### Application

- The client application is built with [Angular 8](https://angular.io/).

- The client follows the guidelines of the [Angular style guide](https://angular.io/guide/styleguide).

- The application consists of a single page. Routing is not included.

- Quotator's architecture is push-based. Data flows 1-way only. Services push data towards components through the use of long-lived observable streams. In return component data flows towards services via events. Some key benefits of this architecture include:

  - Utilization of OnPush change detection. Thus reducing the amount of unnecessary change detection cycles.
  - State Immutability. Due to the nature of observable streams state cannot be mutated from within a component.
  - Easier separation of concerns. Components are forced to delegate user interactions to a non-component layer (services).

  You can read more about this [here](https://medium.com/@thomasburlesonIA/push-based-architectures-with-rxjs-81b327d7c32d) and [here](https://angular-academy.com/angular-architecture-best-practices/).

  Some of these resources support the idea of building a Facade as an extra API layer between services and components. This was not implemented for Quatotor as it would be overkill for such a small application with limited complexity.

- Types are added where they are needed, utilizing the type coercion system of TypeScript. The exception to this rule is methods and functions. These always have typed parameters and a return type.

- The file structure follows the guidelines from the previously mentioned angular style guide. All feature files and their corresponding NgModule are located in their own folder. Subfolders have been created for folders that contain more than seven files.

### QA

- The client application is hosted on [Zeit](https://zeit.co/) [Now](https://github.com/zeit/now). Commits to the master branch trigger a deployment that will validate (lint & test), build and deploy the client.
- There are two git hooks. The first hook formats files before each commit. The second hook validates the application before each push.
- Unit tests have been included to test the business logic within the components and services. The test setup is based on the first two chapters of [The Art of Unit Testing, Third Edition](https://www.manning.com/books/the-art-of-unit-testing-third-edition).
- Components are tested in isolation of the Angular Framework. This avoids testing third party Angular code and ensures we test "one thing". Read more about this [here](https://medium.com/@marko.bjelac/unit-testing-angular-testbed-considered-harmful-7e2bb8f32586).
- Due to time pressure, end-to-end tests have not been included.
