import {test, expect} from '@playwright/test';

test('Switch languages', async ({page}) => {
    await test.step('Go to on RU a main page', async () => {
        await page.goto('https://shikstore.ru/', { timeout: 60000 });
        
        await expect(page).toHaveURL('https://shikstore.ru/');
    });

    await test.step('Select EN language', async () => {
        await page.locator('.lang-selector.w-dropdown-toggle')
            .click();
        
        await page.locator('a.menu-top__lang-link[href="/en"]')
            .click();
        
        await page.waitForURL('https://shikstore.ru/en', {timeout: 90000});
        
        await expect(page).toHaveURL('https://shikstore.ru/en');
    });

    await test.step('Select KZ language', async () => {
        await page.locator('.lang-selector.w-dropdown-toggle')
            .click();

        await page.locator('a.menu-top__lang-link[href="/kz"]')
            .click();

        await page.waitForURL('https://shikstore.kz/kz', {timeout: 90000});

        await expect(page).toHaveURL('https://shikstore.kz/kz');
        // await expect(page.url()).toContain('shikstore.kz/kz');
    });

    await test.step('Comeback RU language', async () => {
        await page.locator('.lang-selector.w-dropdown-toggle')
            .click();

        await page.locator('a.menu-top__lang-link[href="/ru"]')
            .click();
        
        await page.waitForURL('https://shikstore.ru/', {timeout: 90000});

        await expect(page).toHaveURL('https://shikstore.ru/');
    });
});