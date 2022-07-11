import loginPage from "../../page-objects/loginPage"
import cartPage from "../../page-objects/cartPage"

describe('Login', () => {

    beforeEach('Login with standard user on Sauce Demo', () => {
        loginPage.navigateToBaseUrl();
        loginPage.login(loginPage.standarUsername, loginPage.generalPassword);
        cy.url().should('contain', cartPage.landingPageUrl);
    })

    it('Add two products to cart', () => {
        cartPage.addProductToCart(cartPage.sauceLabBackpack);
        cartPage.addProductToCart(cartPage.sauceLabOnesie);
        cartPage.navigateToShoppingCart();
        cartPage.itemCartTotalNumber.should('have.text', '2');
        cartPage.cartItemsList.should('have.length', 2);
        cartPage.addedItemsList.should('contain.text', cartPage.sauceLabBackpack);
        cartPage.addedItemsList.should('contain.text', cartPage.sauceLabOnesie);
    })

    it('Remove products one by one', () => {
        cartPage.addProductToCart(cartPage.sauceLabBackpack);
        cartPage.addProductToCart(cartPage.sauceLabOnesie);
        cartPage.navigateToShoppingCart();
        cartPage.removeBackpackBtn.click();
        cartPage.addedItemsList.should('not.contain.text', cartPage.sauceLabBackpack);
        cartPage.removeOnesieBtn.click();
        cartPage.addedItemsList.should('not.exist');
        cartPage.cartItemsList.should('have.length', 0);
    })

    it('Try to remove an already removed product', () => {
        cartPage.addProductToCart(cartPage.sauceLabBackpack);
        cartPage.addProductToCart(cartPage.sauceLabOnesie);
        cartPage.navigateToShoppingCart();
        cartPage.removeBackpackBtn.click();
        cartPage.addedItemsList.should('not.contain.text', cartPage.sauceLabBackpack);
        cartPage.removeBackpackBtn.click();
    })

})
