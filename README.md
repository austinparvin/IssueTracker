# Ladybug

Ladybug is a multi-user, issue tracking web application.
It's a single page application built with ASP.NET Core and a Postgres db for the back end and React for the front end.

# Objectives

- Build an application with CRUD funcitonality
- To integrate with Auth0 to allow for social profile login
- Design and develop the user interface and experience for both desktop and mobile
- Use function components and React Hooks 

# Includes: 

- [C#](https://reactjs.org/docs/getting-started.html)
- [ASP.NET](https://reactjs.org/docs/getting-started.html)
- [EF CORE](https://reactjs.org/docs/getting-started.html)
- [REACT](https://reactjs.org/docs/getting-started.html)
- [AUTH0](https://reactjs.org/docs/getting-started.html)
 
## Live Site

[LIVE SITE](https://sdg-issue-tracker.herokuapp.com/)

![LADYBUG](http://g.recordit.co/Xsii4q0LuJ.gif)

## Featured Code

### Dynamic Action Item Input List via useState and onChange listener

```JSX
const trackActionItemsToAdd = (index, newDescription) => {
    let newDescriptionsToAdd = [
      ...descriptionsToAdd.slice(0, index),
      newDescription,
      ...descriptionsToAdd.slice(index + 1),
    ].filter(description => description.length > 0)
    const allFilled = newDescriptionsToAdd.every(
      description => description.length > 0
    )
    console.log({ newDescriptionsToAdd, allFilled })

    if (allFilled) {
      newDescriptionsToAdd = newDescriptionsToAdd.concat([''])
    }
    setDescriptionsToAdd(newDescriptionsToAdd)
  }
 ```
 
 ## ERD Diagram
 
 ![LADYBUG ERD DIAGRAM](https://i.imgur.com/TUOwzzz.png)
