My name is Cole Snyder. This project has been created to make a todo list and keep it updated. I have a user story and State tree that describe its functionality and also describe how to interact with it. You can open the website in several different ways. I have linked the website through GitHub. The website is "https://csnyder2004.github.io/Project03/". I also ran it and debugged it by going into the code and using the terminal to access it. The navigation of the actual website has three different pages. The nav bar has links to each page and the local storage saves the information across the pages. This is done through github gh-pages. The technologies used include html, css, json, js, jsx, and other various react and redux technologies. I would like to add in more options, interactive background, and personalized menus in the future.

## User Stories

1. As a user, I can add a new task so that I can track what I need to do.

   - **Given** I am on `todos`
   - **When** I type text into the input and press “Add”
   - **Then** a new todo appears in the list with `done = false`.

2. As a user, I can mark a task as done, so I can see what’s done.

   - **Given** a todo is in the list
   - **When** I check its checkbox
   - **Then** the todo shows a line-through it and its `done` state is saved.

3. As a user, I can delete a task so my list stays clean.

   - **Given** a todo is in the list
   - **When** I click “Delete”
   - **Then** the todo is removed from the list.

4. As a user, I can filter tasks (All, Completed, Incomplete) so I can focus.

   - **Given** I have some completed and some incomplete todos
   - **When** I click “Completed”
   - **Then** only completed todos are shown (and similarly for “Incomplete”).

5. As a user, my todos persist between visits so I don’t lose my list.

   - **Given** I’ve added or updated todos
   - **When** I refresh or reopen the app
   - **Then** the list appears exactly as I left it (stored in `localStorage`).

6. As a user, I can navigate between Todos and Contact pages using the navbar.

   - **Given** the top navigation is visible
   - **When** I click “Contact”
   - **Then** I see a controlled contact form at `contact`.

7. As a user, I can fill out the Contact form with my info.
   - **Given** I am on `contact`
   - **When** I type in First, Last, Email, and Comments
   - **Then** the form state updates immediately.

## State Tree

The state tree shows what data our Task Management (To-Do) app manages at any moment.

```js
{
  todos: [
    {
      id: Number,        // unique ID created with Date.now()
      text: String,      // task description entered by the user
      done: Boolean      // completion flag (true if checked)
    }
  ],
  filter: "all" | "completed" | "incomplete",  // which tasks are shown
  contactForm: {        // state for the controlled Contact form
    first: String,
    last: String,
    email: String,
    comments: String
  }
}
```

## Wireframes

See Attached

## Component List

These React components make up the Task Management To Do application that I made.

### Containers

> These things hold state or logic and pass data down.

1. **App** — Root component; provides navigation and route layout.
2. **Todos** — Manages `todos`, `filter`, and local Storage..
3. **Contact** — Manages first, last, email, and comments fields for the form.

### Presentational Components

> Stateless or nearly stateless components that display UI.

1. **TodoItem** — (planned) Renders a single todo item with checkbox and delete button.
2. **TodoList** — (planned) Maps through todos and displays a list of `TodoItem`s.
3. **FilterButtons** — (planned) Renders All / Completed / Incomplete filters.
4. **Navbar** — Displays top navigation links between `todos` and `contact`.
5. **FormField** — (planned) wrapper for input and label pairs in the contact form.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

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
