import { test, expect } from '@playwright/test';

test.describe('Redes Sociais', () => {
  test('Header contém apenas as 4 redes sociais corretas', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se existem exatamente 4 links sociais no header
    const socialLinks = page.locator('header [data-e2e^="social-"]');
    await expect(socialLinks).toHaveCount(4);
    
    // Verificar cada rede social específica
    const facebookLink = page.locator('header [data-e2e="social-facebook"]');
    await expect(facebookLink).toBeVisible();
    await expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/r10piaui');
    await expect(facebookLink).toHaveAttribute('aria-label', 'Facebook do R10 Piauí');
    
    const instagramLink = page.locator('header [data-e2e="social-instagram"]');
    await expect(instagramLink).toBeVisible();
    await expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/r10piaui');
    await expect(instagramLink).toHaveAttribute('aria-label', 'Instagram do R10 Piauí');
    
    const youtubeLink = page.locator('header [data-e2e="social-youtube"]');
    await expect(youtubeLink).toBeVisible();
    await expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/@r10piaui');
    await expect(youtubeLink).toHaveAttribute('aria-label', 'Youtube do R10 Piauí');
    
    const tiktokLink = page.locator('header [data-e2e="social-tiktok"]');
    await expect(tiktokLink).toBeVisible();
    await expect(tiktokLink).toHaveAttribute('href', 'https://www.tiktok.com/@r10piaui');
    await expect(tiktokLink).toHaveAttribute('aria-label', 'Tiktok do R10 Piauí');
  });

  test('Footer contém as mesmas 4 redes sociais', async ({ page }) => {
    await page.goto('/');
    
    // Scroll até o footer
    await page.locator('footer').scrollIntoViewIfNeeded();
    
    // Verificar links sociais no footer
    const footerSocialLinks = page.locator('footer [data-e2e^="social-"]');
    await expect(footerSocialLinks).toHaveCount(4);
    
    // Verificar URLs corretas no footer
    await expect(page.locator('footer [data-e2e="social-facebook"]')).toHaveAttribute('href', 'https://www.facebook.com/r10piaui');
    await expect(page.locator('footer [data-e2e="social-instagram"]')).toHaveAttribute('href', 'https://www.instagram.com/r10piaui');
    await expect(page.locator('footer [data-e2e="social-youtube"]')).toHaveAttribute('href', 'https://www.youtube.com/@r10piaui');
    await expect(page.locator('footer [data-e2e="social-tiktok"]')).toHaveAttribute('href', 'https://www.tiktok.com/@r10piaui');
  });

  test('NÃO deve conter links para Twitter/X ou Threads', async ({ page }) => {
    await page.goto('/');
    
    // Verificar que não existem links para Twitter/X
    const twitterLinks = page.locator('a[href*="twitter.com"], a[href*="x.com"]');
    await expect(twitterLinks).toHaveCount(0);
    
    // Verificar que não existem links para Threads
    const threadsLinks = page.locator('a[href*="threads.net"]');
    await expect(threadsLinks).toHaveCount(0);
    
    // Verificar que não há data-e2e para twitter ou threads
    const twitterTestIds = page.locator('[data-e2e*="twitter"], [data-e2e*="x-"], [data-e2e*="threads"]');
    await expect(twitterTestIds).toHaveCount(0);
  });

  test('Links sociais abrem em nova aba', async ({ page }) => {
    await page.goto('/');
    
    // Verificar que todos os links sociais têm target="_blank"
    const socialLinks = page.locator('[data-e2e^="social-"]');
    const count = await socialLinks.count();
    
    for (let i = 0; i < count; i++) {
      const link = socialLinks.nth(i);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  test('Links sociais têm acessibilidade adequada', async ({ page }) => {
    await page.goto('/');
    
    // Verificar que todos os links sociais têm aria-label
    const socialLinks = page.locator('[data-e2e^="social-"]');
    const count = await socialLinks.count();
    
    for (let i = 0; i < count; i++) {
      const link = socialLinks.nth(i);
      const ariaLabel = await link.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toContain('R10 Piauí');
    }
  });

  test('URLs das redes sociais estão corretas e seguem padrão @r10piaui', async ({ page }) => {
    await page.goto('/');
    
    // Mapear as URLs esperadas
    const expectedUrls = {
      'social-facebook': 'https://www.facebook.com/r10piaui',
      'social-instagram': 'https://www.instagram.com/r10piaui', 
      'social-youtube': 'https://www.youtube.com/@r10piaui',
      'social-tiktok': 'https://www.tiktok.com/@r10piaui'
    };
    
    // Verificar cada URL no header
    for (const [testId, expectedUrl] of Object.entries(expectedUrls)) {
      const link = page.locator(`header [data-e2e="${testId}"]`);
      await expect(link).toHaveAttribute('href', expectedUrl);
    }
  });
}); 