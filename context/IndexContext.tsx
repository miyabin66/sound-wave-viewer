import {createContext, ReactNode} from 'react';

const defaultValue = {}

const IndexContext = createContext(defaultValue)

const SetValue = () => {
  return {}
}

const IndexContextProvider = ({ children }: { children: ReactNode }) => {
  return <IndexContext.Provider value={SetValue()}>{children}</IndexContext.Provider>;
};

export { IndexContext, IndexContextProvider };