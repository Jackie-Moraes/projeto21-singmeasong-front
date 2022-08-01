beforeEach(() => {
    cy.resetDatabase()
    cy.seedDatabase()
})

describe("Create and Show recommendations", () => {
    it("should create new recommendation successfully", () => {
        cy.visit("/")

        cy.get("#name").type("Falamansa - Xote dos Milagres")
        cy.get("#link").type(
            "https://www.youtube.com/watch?v=chwyjJbcs1Y&ab_channel=Deck"
        )
        cy.get("button").click()
        cy.contains("Falamansa - Xote dos Milagres").should("be.visible")
    })

    it("should throw error when creating recommendation with same name", () => {
        cy.visit("/")

        cy.get("#name").type("Bananza (Belly Dancer)")
        cy.get("#link").type("https://www.youtube.com/watch?v=DdK8CALZeFE")
        cy.get("button").click()
        cy.on("window:alert", (str) => {
            expect(str).to.equal(`Error creating recommendation!`)
        })
    })

    it("should throw error when creating recommendation without info", () => {
        cy.visit("/")

        cy.get("button").click()
        cy.on("window:alert", (str) => {
            expect(str).to.equal(`Error creating recommendation!`)
        })
    })

    it("should show new AND old recommendation in top page", () => {
        cy.visit("/")

        cy.get("#name").type("Falamansa - Xote dos Milagres")
        cy.get("#link").type(
            "https://www.youtube.com/watch?v=chwyjJbcs1Y&ab_channel=Deck"
        )
        cy.get("button").click()

        cy.visit("/top")

        cy.contains("Falamansa - Xote dos Milagres").should("be.visible")
        cy.contains("Bananza (Belly Dancer)").should("be.visible")
    })

    it("should show a random recommendation in random page", () => {
        cy.visit("/")

        cy.get("#name").type("Falamansa - Xote dos Milagres")
        cy.get("#link").type(
            "https://www.youtube.com/watch?v=chwyjJbcs1Y&ab_channel=Deck"
        )

        cy.get("button").click()

        cy.visit("/random")
        cy.contains(/(Falamansa|Bananza)/g).should("be.visible")
    })
})

describe("score", () => {
    it("should increase score count", () => {
        cy.visit("/")

        cy.get("#upvote").click()
        cy.contains("-3").should("be.visible")
    })

    it("should decrease score count", () => {
        cy.visit("/")

        cy.get("#downvote").click()
        cy.contains("-5").should("be.visible")
    })

    it("should delete recommendation when score is above -5", () => {
        cy.visit("/")

        cy.get("#downvote").click()
        cy.get("#downvote").click()
        cy.contains("No recommendations yet! Create your own :)").should(
            "be.visible"
        )
    })
})
