/**
 * Jest loadershim based on Gatsby unit testing section (https://www.gatsbyjs.org/docs/unit-testing/)
 */
global.___loader = {
  enqueue: jest.fn(),
}
