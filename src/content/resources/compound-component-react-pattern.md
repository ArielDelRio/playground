---
title: "Mastering the Compound Component Pattern in React"
description: "Learn to create flexible, reusable, and maintainable components in React using the Compound Component Pattern by breaking down components into sub-components and leveraging the Context API."
author: arieldrio
date: 2024-06-22
tags: ["react", "pattern", "compound-component"]
---
# Understanding the Compound Component Pattern in React

In the world of React development, creating reusable and flexible components is essential for building scalable applications. One of the patterns that help achieve this is the Compound Component Pattern. This pattern allows you to design components that can be composed together, giving developers more control over the structure and behavior of their UI elements. In this blog post, we'll explore what the Compound Component Pattern is, why it's useful, and how you can implement it in your React projects.


<iframe src="https://replit.com/@ArielDelRio/react-pattern-compound-component?embed=true" width="100%" height="500"></iframe>



## What is the Compound Component Pattern?

The Compound Component Pattern is a design pattern in React that allows you to create a set of components that work together to provide a richer, more flexible interface. Instead of creating a single monolithic component, you create multiple smaller components that can be composed together. This approach enables users of your component to have more control over its behavior and appearance.

## Why Use the Compound Component Pattern?

- **Flexibility**: It allows you to build components that can be easily extended and customized without modifying the original component.
- **Reusability**: Smaller, focused components can be reused across different parts of your application.
- **Separation of Concerns**: It helps in separating the logic and presentation, making your components easier to manage and maintain.
- **Improved Readability**: By breaking down complex components into smaller pieces, your code becomes more readable and understandable.

## Example: HomeFeedScreen and PostCard Components

To illustrate the Compound Component Pattern, let's start with a simple example using a `HomeFeedScreen` component that displays a `PostCard` component.

### HomeFeedScreen Component

```jsx
import "./App.css";
import { PostCard } from "./components/PostCard";

export default function HomeFeedScreen() {
  return (
    <>
      <PostCard
        post={{
          id: 1,
          title: "Hello, World!",
          content: "This is the first post on our new blog.",
          user: {
            id: 1,
            name: "John Doe",
          },
        }}
      />
    </>
  );
}
```

### PostCard Component

```jsx
type Post = {
  id: number;
  title: string;
  content: string;
  user: {
    id: number;
    name: string;
  };
};

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  return (
    <div className="flex w-[300px] flex-col gap-2 rounded-lg bg-gray-800 p-4 shadow-md">
      <h2 className="text-xl font-semibold text-white">{post.title}</h2>
      <p className="text-gray-300">{post.content}</p>
      <p className="text-sm text-gray-500">By {post.user.name}</p>

      <div className="flex flex-row gap-2 mt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
          Read More
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
          Comments
        </button>
      </div>
    </div>
  );
};
```

## Reusing the PostCard Component

To make the PostCard component reusable across different sections of the application such as the profile, saved screen, etc., one solution is to add props that specify the context in which the PostCard is being used:

```jsx
type Post = {
  id: number;
  title: string;
  content: string;
  user: {
    id: number;
    name: string;
  };
};

interface Props {
  isOnProfile?: boolean;
  isOnSavedScreen?: boolean;
  isOnHomeFeedScreen?: boolean;
  post: Post;
}

export const PostCard = ({ isOnProfile, isOnSavedScreen, isOnHomeFeedScreen, post }: Props) => {
  return (
    <div className="flex w-[300px] flex-col gap-2 rounded-lg bg-gray-800 p-4 shadow-md">
      <h2 className="text-xl font-semibold text-white">{post.title}</h2>
      <p className="text-gray-300">{post.content}</p>
      {!isOnProfile && (
        <p className="text-sm text-gray-500">By {post.user.name}</p>
      )}
      <div className="flex flex-row gap-2 mt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
          Read More
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
          Comments
        </button>
      </div>
    </div>
  );
};
```

However, as you start adding more conditions and props to handle different contexts, the component can become complicated, making it harder to maintain and less readable. Managing all these combinations within a single component can lead to a less flexible design and reduce the benefits of using the Compound Component Pattern.

In the next section, we'll explore a more elegant solution using the Compound Component Pattern to maintain the flexibility and readability of our components.

## Solution with compound component pattern

First, to achieve the goal of creating a more flexible and reusable component, we can identify and separate the `PostCard` component into different sub-components such as the title, content, username section, and button section. By dividing our component in this way, we gain more flexibility to customize our `PostCard` component. This allows us to display some of these sub-components individually and also customize these sub-components.


Note that each of these sub-components needs access to the `post` prop. Therefore, instead of passing the `post` prop to each of our sub-components, we can use the Context API, allowing all sub-components to have access to the `post` prop and the information they need.

## Creating the PostCardContext

```jsx
import { createContext } from "react";

type PostCardContext = {
  post: Post;
};

const PostCardContext = createContext<PostCardContext | undefined>(undefined);

const usePostCardContext = () => {
  const context = useContext(PostCardContext);
  if (!context) {
    throw new Error("usePostCardContext must be used within a PostCard");
  }
  return context;
};

```

## Adding the Provider to the PostCard Component

```jsx
export const PostCard = ({ post }: Props) => {
  return (
    <PostCardContext.Provider value={{ post }}>
      <div className="flex w-[300px] flex-col gap-2 rounded-lg bg-gray-800 p-4 shadow-md">
        <h2 className="text-xl font-semibold text-white">{post.title}</h2>
        <p className="text-gray-300">{post.content}</p>
        <p className="text-sm text-gray-500">By {post.user.name}</p>

        <div className="flex flex-row gap-2 mt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
            Read More
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
            Comments
          </button>
        </div>
      </div>
    </PostCardContext.Provider>
  );
};
```

## Breaking Down the PostCard Component

To make our `PostCard` component more flexible, we can create the following sub-components:

- `PostCard.Title`
- `PostCard.Content`
- `PostCard.User`
- `PostCard.Buttons`

```jsx
PostCard.Title = function PostCardTitle() {
  const { post } = usePostCardContext();
  return <h2 className="text-xl font-semibold text-white">{post.title}</h2>;
};

PostCard.Content = function PostCardContent() {
  const { post } = usePostCardContext();
  return <p className="text-gray-300">{post.content}</p>;
};

PostCard.User = function PostCardUser() {
  const { post } = usePostCardContext();
  return <p className="text-sm text-gray-500">By {post.user.name}</p>;
};

PostCard.Buttons = function PostCardButtons() {
  return (
    <div className="flex flex-row gap-2 mt-4">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
        Read More
      </button>
      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
        Comments
      </button>
    </div>
  );
};
```

Once we have our sub-components with access to the `PostCardContext`, we need to update our `PostCard` component to accept any of these sub-components as children, allowing the parent component that renders the `PostCard` to define which sub-components it wants to render and how to render them.

We update the `PostCard` component to accept children:

```jsx 
interface Props extends PropsWithChildren {
  post: Post;
}

export const PostCard = ({ post, children }: Props) => {
  return (
    <PostCardContext.Provider value={{ post }}>
      <div className="flex w-[300px] flex-col gap-2 rounded-lg bg-gray-800 p-4 shadow-md">
        {children}
      </div>
    </PostCardContext.Provider>
  );
};
```


With this update, the `PostCard` component can now be customized more flexibly by the parent component. Here's an example of how you can use it:

```jsx
import { PostCard } from "./components/PostCard";

export default function HomeFeedScreen() {
  return (
    <>
      <PostCard
        post={{
          id: 1,
          title: "Hello, World!",
          content: "This is the first post pon our new blog.",
          user: {
            id: 1,
            name: "John Doe",
          },
        }}
      >
        <PostCard.Title />
        <PostCard.Content />
        <PostCard.User />
        <PostCard.Buttons />
      </PostCard>
    </>
  );
}
```

This approach provides greater flexibility and control over how the PostCard is rendered and customized in different contexts.

## Conclusion

The Compound Component Pattern in React is a powerful design approach that enhances the flexibility, reusability, and maintainability of your components. By breaking down a complex component like `PostCard` into smaller, focused sub-components such as `Title`, `Content`, `User`, and `Buttons`, and utilizing the Context API to share props, you enable a more modular and customizable design. This pattern allows parent components to selectively render and customize these sub-components, providing a scalable and readable codebase. Implementing the Compound Component Pattern not only simplifies the management of UI elements but also promotes best practices in component-based architecture.
