// spec: specs/testimonials-test-plan.md#11-submit-testimonial-with-all-required-fields
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Form Submission and Validation', () => {
  test('Submit Valid Testimonial', async ({ page }) => {
    // 1. Navigate to the testimonials app
    await page.goto('https://qe-at-cgi-fi.github.io/testimonials/');
    await expect(page.getByRole('heading', { name: 'Testimonials for Vibe Coding Course' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'What did you build with vibe' })).toBeVisible();

    // 2. Click on the 5-star rating
    await page.getByText('★').first().click();

    // 3. Enter text in the testimonial field
    await page.getByRole('textbox', { name: 'What did you build with vibe' }).fill('This course helped me build amazing projects with vibe coding');
    await expect(page.getByRole('textbox', { name: 'What did you build with vibe' })).toHaveValue('This course helped me build amazing projects with vibe coding');

    // 4. Click the Submit Testimonial button
    await page.getByRole('button', { name: 'Submit Testimonial' }).click();

    // 5. Verify the testimonial is added to the list
    await expect(page.getByRole('textbox', { name: 'What did you build with vibe' })).toHaveValue('');
    await expect(page.getByText('This course helped me build amazing projects with vibe coding')).toBeVisible();
  });
});
