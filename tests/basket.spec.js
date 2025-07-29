import {test, expect} from '@playwright/test';

test.describe('Basket tests', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://shikstore.ru', {timeout: 90000});
    });

    test('Should add product to cart successfully', async ({page}) => {
        const cityModal = page.locator('.city-confirm.g-z-index-fixed-top.g-z-index-header');
        
        if (await cityModal.isVisible()) {
            await page.locator('.confirm-button.btn.float-left').click();
    
            await cityModal.waitFor({state: 'hidden'});
        }
    
        const basket = page.locator('.menu-icon__link.link-icon.v3.w-inline-block')
            .first();
    
        await basket.click();
    
        await expect(page.locator('.titile3.user-title')).toBeVisible({timeout: 90000});
    
        await page.locator('.header__logo').click();
    
        const cartItem = page.locator('button[data-action="product_cart_change_qty"]:not([disabled])')
            .first();
    
        const dataId = await cartItem.getAttribute('data-id');
    
        await cartItem.click();
    
        await page.waitForResponse((resp) =>
            resp.url().includes('product-change-quantity') && resp.status() === 200
        )
    
        await basket.click({timeout: 90000});
    
        await expect(page.locator(`.cart_item_${dataId}`)).toBeVisible({timeout: 90000});
    })

    test('Should clear product to cart successfully', async ({page}) => {
        const cartItem = page.locator('button[data-action="product_cart_change_qty"]:not([disabled])')
            .first();
        
        await expect(cartItem).toBeVisible();
    
        const dataId = await cartItem.getAttribute('data-id');
    
        await cartItem.click();
    
        await page.waitForResponse((resp) =>
            resp.url().includes('product-change-quantity') && resp.status() === 200
        )
    
        await page.locator('.menu-icon__link.link-icon.v3.w-inline-block')
            .first()
            .click();
    
        await expect(page.locator(`.cart_item_${dataId}`))
            .toBeVisible({timeout: 90000});
    
        page.locator('a[href = "javascript:void(0)"]')
            .click({delay: 90000});
    
        await expect(page.locator('container-fluid.pr-0 pl-0'))
            .not.toBeVisible({timeout: 90000});
    })
});