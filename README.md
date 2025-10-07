My name is Cole Snyder. This project has been created to make a todo list and keep it updated. I have a user story and State tree that describe its functionality and also describe how to interact with it. This is done through github gh-pages. The technologies used include html, css, json, js, jsx, and other various react and redux technologies. I would like to add in more options, interactive background, and personalized menus in the future.

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
