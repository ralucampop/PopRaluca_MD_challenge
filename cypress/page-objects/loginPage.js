class loginPage {

    //selectors declaration
    get usernameInput() { return cy.get('[data-test="username"]'); }
    get passwordInput() { return cy.get('[data-test="password"]'); }
    get loginButton() { return cy.get('[data-test="login-button"]'); }

    standarUsername = 'standard_user';
    generalPassword = 'secret_sauce';

    //method to acces homepage
    navigateToBaseUrl() {
        cy.visit('https://www.saucedemo.com/');
    }

    //login method
    login(username,password) {
        this.usernameInput.type(username);
        this.passwordInput.type(password);
        this.loginButton.click();
    }
}

export default new loginPage()