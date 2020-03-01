# redux-dispatch-hooks

Developer friendly dispatch hooks. Brings `mapDispatchToProps` like experience.

## Installation

```
npm i -S redux-dispatch-hooks
```

## Setup

If you're using `react-redux`, you can just wrap your app with `react-redux` `Provider` and it will work. Otherwise you can use `Provider` from this lib:

```
import React from 'react';
import { Provider } from 'redux-dispatch-hooks';
import { createStore } from 'redux';
import { RootComponent } from './your-root-component-path'

const store = createStore(...);

export const App = () => (
  <Provider store={store}>
    <RootComponent>
  </Provider>
);

```

## Usage

```
import React from "react";
import { useDispatchMap } = from "redux-dispatch-hooks";
import * as actions from "./actions";

const Comment = ({
  onRemove,
  onShare,
}) => {
  return (
    <div>
      SOME COMMENT
      <div onClick={onRemove}>REMOVE</div>
      <div onClick={onShare}>SHARE</div>
    </div>
  )
};

const CommentContainer = () => {
  const dispatchMap = useDispatchMap({
    onRemove
    onShare
  });
  return (
    <Comment
      {...dispatchMap}
    />
  );
}
```