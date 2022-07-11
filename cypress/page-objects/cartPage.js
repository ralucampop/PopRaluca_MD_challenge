class cartPage {

    //selectors declaration
    get shopingCartLink() { return cy.get('.shopping_cart_link'); }
    get itemCartTotalNumber() { return cy.get('.shopping_cart_badge'); }
    get cartItemsList() { return cy.get('.cart_item'); }
    get addedItemsList() { return cy.get('.inventory_item_name'); }
    get removeBackpackBtn() { return cy.get('[data-test="remove-sauce-labs-backpack"]'); }
    get removeOnesieBtn() { return cy.get('[data-test="remove-sauce-labs-onesie"]'); }

    get addCartBtnByProductName() { return (productName) => cy.xpath(`//*[@class="inventory_item_name" and text()=\'${productName}\']/ancestor::div[@class="inventory_item_description"]//button`); }

    landingPageUrl = 'inventory';
    sauceLabBackpack = 'Sauce Labs Backpack';
    sauceLabOnesie = 'Sauce Labs Onesie';

    //method to add a product by name in cart
    // addProductToCartByName(productName) {
    //     cy.contains(productName).click()
    //     cy.contains('Add to cart').click()
    // }

    addProductToCart(productName) {
        this.addCartBtnByProductName(productName).click();
        this.checkRemoveButtonVisible(productName);
    }

    checkRemoveButtonVisible(productName) {
        this.addCartBtnByProductName(productName).should('have.text', 'Remove');
    }

    navigateToShoppingCart() {
        this.shopingCartLink.click();
    }

}

export default new cartPage()