const React = () => {};

// some referenced @pandora modules import `react`
// but it never activates from tests and can be mocked
// @ts-ignore
React.createContext = React;
export default React;
export { React as useContext, React as useMemo };
