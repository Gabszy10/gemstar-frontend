import * as React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./configureStore";

const store = configureStore();
export const withStore = (ComposedComponent) => {
  class WithStore extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <ComposedComponent />
        </Provider>
      );
    }
  }
  WithStore.displayName = `WithStore(${
    ComposedComponent.displayName || ComposedComponent.name || "Unknown"
  })`;
  return WithStore;
};
