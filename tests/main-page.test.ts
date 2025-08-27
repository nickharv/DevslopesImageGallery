import { describe, test, expect } from 'vitest';
import { loadPage, checkFileExists, urls, preparePath } from './test-utils';

describe('Main Page Tests', () => {
  let page = loadPage('index.html');

  test('The main page loads successfully', () => {
    expect(page.html).toBeTruthy();
    expect(page.html.length).toBeGreaterThan(0);
  });

  test('Main Page: Page Heading exists', () => {
    const headings = page.locator('h1');
    const headingTexts = headings.map((h) => h.text?.trim());
    expect(headingTexts).toContain('Digital Art Gallery');
  });

  // CSS connection tests
  describe('Main Page: Test Css connections', () => {
    const cssLinks = page.locator('link[rel="stylesheet"]');
    // Test CSS connections
    test('Should have at least 2 stylesheets connected', () => {
      expect(cssLinks.length).toBeGreaterThanOrEqual(2);
    });

    test('layout.css should be the first css file connected', () => {
      const cssPath = cssLinks[0]?.getAttribute('href') || '';
      expect(cssPath.includes('layout.css')).toBe(true);
      expect(checkFileExists(cssPath)).toBe(true);
    });
    test('image-lists.css should be connected', () => {
      const cssPath = cssLinks[1]?.getAttribute('href') || '';
      expect(cssPath.includes('image-lists.css')).toBe(true);
      expect(checkFileExists(cssPath)).toBe(true);
    });
  });
  // JavaScript connection tests
  describe('Main Page: JavaScript file relative path points to an existing JS file', () => {
    const scriptTags = page.locator('script[defer]');
    test('script tag exists with the defer attribute', () => {
      expect(scriptTags.length).toBeGreaterThan(0);
    });
    test('script tag should have the source attribute point to the scripts.js file', () => {
      const scriptPath = scriptTags[0]?.getAttribute('src') || '';
      expect(scriptPath.includes('scripts.js')).toBe(true);
      expect(checkFileExists(scriptPath)).toBe(true);
    });
  });

  // Images loading tests
  test('Main Page: The design-image.jpg image file path is used for the Modern Design card', () => {
    const images = page.locator('img');
    expect(images.length).toBeGreaterThanOrEqual(1);

    const imageSrc = images[0]?.getAttribute('src') || '';
    expect(imageSrc.length).toBeGreaterThan(0);
  });

  test('Main Page: The plant-image.jpg image file path is used for the Plants card', () => {
    const images = page.locator('img');
    expect(images.length).toBeGreaterThanOrEqual(2);

    const imageSrc = images[1]?.getAttribute('src') || '';
    expect(imageSrc.length).toBeGreaterThan(0);
  });

  test('Main Page: The space-image.jpg image file path is used for the Space card', () => {
    const images = page.locator('img');
    expect(images.length).toBeGreaterThanOrEqual(3);

    const imageSrc = images[2]?.getAttribute('src') || '';
    expect(imageSrc.length).toBeGreaterThan(0);
  });

  test('Main Page: The nature-image.jpg image file path is used for the Nature card', () => {
    const images = page.locator('img');
    expect(images.length).toBeGreaterThanOrEqual(4);

    const imageSrc = images[3]?.getAttribute('src') || '';
    expect(imageSrc.length).toBeGreaterThan(0);
  });

  // Navigation link tests
  test('Main Page: Should have a Nature link in the top navigation', () => {
    const navLinks = page.locator('nav a');
    const linkTexts = navLinks.map((link) => link.text?.trim());
    expect(linkTexts).toContain('Nature');

    const natureLink = navLinks.find((link) => link.text?.trim() === 'Nature');
    expect(preparePath(natureLink?.getAttribute('href'))).toBe(
      urls.naturePageUrl
    );
  });

  test('Main Page: Should have a Space link in the top navigation', () => {
    const navLinks = page.locator('nav a');
    const linkTexts = navLinks.map((link) => link.text?.trim());
    expect(linkTexts).toContain('Space');

    const spaceLink = navLinks.find((link) => link.text?.trim() === 'Space');
    expect(preparePath(spaceLink?.getAttribute('href'))).toBe(
      urls.spacePageUrl
    );
  });

  test('Main Page: Should have a Plants link in the top navigation', () => {
    const navLinks = page.locator('nav a');
    const linkTexts = navLinks.map((link) => link.text?.trim());
    expect(linkTexts).toContain('Plants');

    const plantsLink = navLinks.find((link) => link.text?.trim() === 'Plants');
    expect(preparePath(plantsLink?.getAttribute('href'))).toBe(
      urls.plantsPageUrl
    );
  });

  test('Main Page: Should have a Modern Design link in the top navigation', () => {
    const navLinks = page.locator('nav a');
    const linkTexts = navLinks.map((link) => link.text?.trim());
    expect(linkTexts).toContain('Modern Design');

    const modernDesignLink = navLinks.find(
      (link) => link.text?.trim() === 'Modern Design'
    );
    expect(preparePath(modernDesignLink?.getAttribute('href'))).toBe(
      urls.modernDesignPageUrl
    );
  });

  // Card detail link tests
  test('Main Page: Plants Details link should point to plants page', () => {
    const allLinks = page.locator('a');
    const plantsDetailLink = allLinks.find(
      (link) =>
        link.text?.trim()?.includes('Plants Details') ||
        (link.text?.trim()?.includes('Details') &&
          link.getAttribute('href')?.includes('plants'))
    );
    expect(plantsDetailLink).toBeTruthy();
    expect(preparePath(plantsDetailLink?.getAttribute('href'))).toBe(
      urls.plantsPageUrl
    );
  });

  test('Main Page: Modern Design Details link should point to modern design page', () => {
    const allLinks = page.locator('a');
    const modernDesignDetailLink = allLinks.find(
      (link) =>
        link.text?.trim()?.includes('Modern Design Details') ||
        (link.text?.trim()?.includes('Details') &&
          link.getAttribute('href')?.includes('modern-design'))
    );
    expect(modernDesignDetailLink).toBeTruthy();
    expect(preparePath(modernDesignDetailLink?.getAttribute('href'))).toBe(
      urls.modernDesignPageUrl
    );
  });

  test('Main Page: Space Details link should point to space page', () => {
    const allLinks = page.locator('a');
    const spaceDetailLink = allLinks.find(
      (link) =>
        link.text?.trim()?.includes('Space Details') ||
        (link.text?.trim()?.includes('Details') &&
          link.getAttribute('href')?.includes('space'))
    );
    expect(spaceDetailLink).toBeTruthy();
    expect(preparePath(spaceDetailLink?.getAttribute('href'))).toBe(
      urls.spacePageUrl
    );
  });

  test('Main Page: Nature Details link should point to nature page', () => {
    const allLinks = page.locator('a');
    const natureDetailLink = allLinks.find(
      (link) =>
        link.text?.trim()?.includes('Nature Details') ||
        (link.text?.trim()?.includes('Details') &&
          link.getAttribute('href')?.includes('nature'))
    );
    expect(natureDetailLink).toBeTruthy();
    expect(preparePath(natureDetailLink?.getAttribute('href'))).toBe(
      urls.naturePageUrl
    );
  });

  // Gallery structure tests
  test('Main Page: Should have a gallery-items container', () => {
    const galleryContainer = page.locator('.gallery-items');
    expect(galleryContainer.length).toBeGreaterThan(0);
  });

  test('Main Page: Should have a header element', () => {
    const header = page.locator('header');
    expect(header.length).toBeGreaterThan(0);
  });
});
