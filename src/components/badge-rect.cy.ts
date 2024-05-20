import Badge from "./badge-rect.vue"

describe("<badge-rect />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Badge)
  })
})
