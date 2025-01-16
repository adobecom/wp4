// some referenced @pandora modules import `@pandora/fetch`
// but it never activates from tests and can be mocked
const fetch = () => {};

export { fetch };
