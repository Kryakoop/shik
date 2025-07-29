import {test, expect} from '@playwright/test';

test('Select city on the main page', async ({page}) => {
    await page.goto('https://shikstore.ru/', {timeout: 90000});

    const citySelector = page.locator('.menu-top__city .city-name');
    
    await citySelector.click();

    await page.locator('#city-search')
        .fill('Красноярск');

    const firstSearchResult = page.locator('.autocomplete-suggestion').first();
    
    await firstSearchResult.waitFor({timeout: 90000});
    
    await firstSearchResult.click();

    await expect(citySelector).toHaveText('Красноярск', {timeout: 90000});
});