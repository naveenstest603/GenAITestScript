// Page Object Model format
class OrangeHRMLoginPage {
  constructor(page) {
    this.page = page;
  }

  async gotoLoginPage() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  async enterUsername(username) {
    await this.page.fill('[placeholder="Username"]', username);
  }

  async enterPassword(password) {
    await this.page.fill('[placeholder="Password"]', password);
  }

  async clickLoginButton() {
    await this.page.click('button[type="submit"]');
  }
}


// Test script