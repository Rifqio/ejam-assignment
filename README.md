## Deployment

To run the project, run the API first by navigating to folder api

```bash
  cd api
```

Start the server in development mode

```bash
  npm run start:dev
```

Now navigate back to client folder

```bash
  cd ..
```

```bash
  cd client
```

Start the server in development mode as well

```bash
  npm run dev
```

## API Reference

#### Get All Superheroes

```http
  GET /api/v1/superhero
```

| Query       | Type       | Description                                                                                                                              |
| :---------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `page`    | `string` | **Optional**. Default is 1                                                                                                         |
| `take`    | `string` | **Optional**. How many data to fetch. Default is 5 Max is 20                                                                       |
| `orderBy` | `string` | **Optional**. Default is `humilityScore`. Available values are `id`, `name`, `humilityScore`, `createdAt`, `updatedAt` |
| `order`   | `string` | **Optional**. Default is `DESC`. Available values are `ASC`, `DESC`                                                          |

#### Create Superhero

```http
  POST /api/v1/superhero
```

| Payload           | Type              | Description                                         |
| :---------------- | :---------------- | :-------------------------------------------------- |
| `name`          | `string`        | **Required**. Name of your superhero          |
| `humilityScore` | `number`        | **Required**. The humility score Max 10 Min 1 |
| `powers`        | `Array<string>` | **Required**. Your superpowers                |

## Appendix

To be honest I will get really enthusiastic about collaborating with teammates to exchange ideas and work together to improve or expand this task, especially when following best practices. My principle is to write code that is not only functional but also clean, readable, and maintainable code that makes you smile when you revisit it. This will help the project in the future to be more maintainable even when the team members come and go.

My passion is contributing to projects that are not only production-ready but also have an impact on end users. Let's say a simple cashier application that tracks restaurant expenses and profits, this would significantly improve how business can operate. Being part of such a project is what I seek and what I value for.

## If I had more time

I would like to improve on error handling and logging. Because creating a good and readable error handling will improve the developer and end user experience. It will be easier to trace when bugs occur or when certain data is missing. Beside that I also love to expand my making it production grade ready where it can be deployed to any server and easy to maintain. In this project I intent not to use too many library such as react hook form, lodash because i want to make it simple by using built in tools that are already available
