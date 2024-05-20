import CardVerticalSkeleton from "./card-vertical-skeleton.vue"

describe("<CardVerticalSkeleton />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(CardVerticalSkeleton)
  })
})
