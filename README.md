# About the Project

This app allows you to build and solve mazes.
Besides manual solving, you can also solve them algorithmically.
You can also create your own algorithms for solving.

# Algorithm Implementation Guide

1. Create a class that extends the `AlgorithmBase` class
2. Implement a constructor that takes the variables `board`, `setBoard`, `focusPoint`, `setFocusPoint`, `stats` and `setStats` and calls `super` with these variables
3. Assign `this.name` a string with the name of your algorithm and initialize any attributes that you might want to use
4. Implement the methods `reset()` and `step()`
5. `reset()` gets called whenever the algorithm is reset so make sure to reset any attributes that you use
6. `step()` is called for each individual step
   1. `this.board: Array<Array<Number>>` contains the maze content with the following values:
      1. `0`: Wall
      2. `1`: Path
      3. `2`: Entrance
      4. `3`: Exit
      5. `4`: Traveled Path
   2. `this.focusPoint: {row: Number, column: Number}` You can use the focus point if you wish. To end the maze, set the focus point to the position of the exit
   3. `this.stats: {boardValueChanges: Number, boardChecks: Number}` Iterate the stats whenever you check the board or change its value
7. Open `_AlgorithmLinks.js` and add your algorithm to the array of returned algorithms

# Installing and Running the App

## Install

To install the project locally for development or testing run `npm install`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
