# Propylon Assignment

Frontend Engineer Assessment
Objective
Implement a web application UI that allows users view information about bills information from
the following API:
https://api.oireachtas.ie/
The UI application should be built with the following tools:
 React
 Redux
 Material UI
 TypeScript
The code should be checked into an accessible source code management tool and provide clear
instructions for how to successfully run the solution in a development mode.
The code in the submission should reflect your ideal of what professional software development
entails. This may include things like ensuring formatting is consistent, adding appropriate
commentary and documentation, and defining application structure.
Requirements
Functional
 Create a table component for listing bill information.
 Bill information should be paginated and show the following columns:
 Bill number
 Bill type
 Bill status
 Sponsor
 Allow a user to filter bills by Bill type field.
 Clicking on a bill row should show a modal window, with a tabbed component with two
tabs that when clicked on display the following:
 English – English language title
 Gaeilge – Irish language title
 Implement a favourite legislation functionality, whereby the user can click on an icon and
“favourite a bill”. This click should change the UI and persist the change to state, but the
call back to the server can be mocked. Opening a console log should show a message
indicating the request to favourite a bill was dispatched to the server. Clicking the
favourite button should “un-favourite” a bill.
 Display all favourited bills on a separate tab of the main bill table component.

Non-functional
 Demonstrate knowledge React and Redux and best practices using this toolset
 Demonstrate understanding of UI designs systems and basic styling of components.
 Demonstrate ability to unit test a UI system component.
 Demonstrate understanding of TypeScript and JavaScript fundamentals as well as the
usage of automated code consistency tooling.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
