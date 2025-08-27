import { describe, test, expect } from 'vitest';
import {
  loadPage,
  checkFileExists,
  urls,
  externalLinks,
  preparePath,
} from './test-utils';
import type { TestPage } from './test-utils';

// Helper function to run individual test assertions
const testDetailPageStructure = (
  page: TestPage,
  pageName: string,
  expectedImageFile: string
) => {
  // Test page heading
  const testPageHeading = () => {
    const headings = page.locator('h1');
    const headingTexts = headings.map((h) => h.text?.trim());
    expect(headingTexts).toContain(pageName);
  };

  // Test CSS connections
  const testCssConnections = () => {
    const cssLinks = page.locator('link[rel="stylesheet"]');

    expect(cssLinks.length).toBeGreaterThanOrEqual(2);

    const layoutCssPath = cssLinks[0]?.getAttribute('href') || '';
    expect(layoutCssPath.includes('layout.css')).toBe(true);
    expect(checkFileExists(layoutCssPath)).toBe(true);

    const detailCssPath = cssLinks[1]?.getAttribute('href') || '';

    expect(detailCssPath.includes('/secondary/image-details.css')).toBe(true);
    expect(checkFileExists(detailCssPath)).toBe(true);
  };

  // Test JavaScript connection
  const testJsConnection = () => {
    const scriptTags = page.locator('script[defer]');
    expect(scriptTags.length).toBeGreaterThan(0);

    const scriptPath = scriptTags[0]?.getAttribute('src') || '';
    expect(scriptPath.includes('scripts.js')).toBe(true);
    expect(checkFileExists(scriptPath)).toBe(true);
  };

  // Test main image
  const testMainImage = () => {
    const images = page.locator('img');
    expect(images.length).toBeGreaterThan(0);
    const imageSrc = images[0]?.getAttribute('src') || '';
    expect(imageSrc.includes(expectedImageFile)).toBe(true);
  };

  // Test image details container
  const testImageDetailsContainer = () => {
    const imageDetailsContainer = page.locator('.image-details');
    expect(imageDetailsContainer.length).toBeGreaterThan(0);
  };

  // Test back to home link
  const testBackToHomeLink = () => {
    const allLinks = page.locator('a');
    const backHomeLink = allLinks.find((link) =>
      link.text?.trim()?.includes('Back to Home Page')
    );
    expect(backHomeLink).toBeTruthy();

    const backHref = preparePath(backHomeLink?.getAttribute('href'));
    console.log(backHref);
    expect(backHref === urls.mainPageUrl).toBe(true);
  };

  // Test main navigation links
  const testMainNavigationLinks = () => {
    const navLinks = page.locator('nav a');

    const natureLink = navLinks.find((link) => link.text?.trim() === 'Nature');
    const natureHref = preparePath(natureLink?.getAttribute('href'));
    expect([urls.naturePageUrl, urls.naturePageUrlPagesRel]).toContain(
      natureHref
    );

    const spaceLink = navLinks.find((link) => link.text?.trim() === 'Space');
    const spaceHref = preparePath(spaceLink?.getAttribute('href'));
    expect([urls.spacePageUrl, urls.spacePageUrlPagesRel]).toContain(spaceHref);

    const plantsLink = navLinks.find((link) => link.text?.trim() === 'Plants');
    const plantsHref = preparePath(plantsLink?.getAttribute('href'));
    expect([urls.plantsPageUrl, urls.plantsPageUrlPagesRel]).toContain(
      plantsHref
    );

    const modernDesignLink = navLinks.find(
      (link) => link.text?.trim() === 'Modern Design'
    );
    const modernDesignHref = preparePath(
      modernDesignLink?.getAttribute('href')
    );
    expect([
      urls.modernDesignPageUrl,
      urls.modernDesignPageUrlPagesRel,
    ]).toContain(modernDesignHref);
  };

  return {
    testPageHeading,
    testCssConnections,
    testJsConnection,
    testMainImage,
    testImageDetailsContainer,
    testBackToHomeLink,
    testMainNavigationLinks,
  };
};

describe('Modern Design Page Tests', () => {
  let page = loadPage('pages/modern-design.html');

  test('Modern Design page loads successfully', () => {
    expect(page.html).toBeTruthy();
  });

  describe('Modern Design Page: Basic structure and connections', () => {
    const tests = testDetailPageStructure(
      page,
      'Modern Design',
      'design-image.jpg'
    );

    test('Check for page heading', () => {
      tests.testPageHeading();
    });

    test('Test CSS connections', () => {
      tests.testCssConnections();
    });

    test('Test JS connection', () => {
      tests.testJsConnection();
    });

    test('Test main Image', () => {
      tests.testMainImage();
    });

    test('Image Details container should exist', () => {
      tests.testImageDetailsContainer();
    });

    test('Test Home link button', () => {
      tests.testBackToHomeLink();
    });

    test('Main Navigation links work correctly', () => {
      tests.testMainNavigationLinks();
    });
  });

  describe('Modern Design Page: Bottom navigation links', () => {
    const allLinks = page.locator('a');

    test('Prev link should go to space page', () => {
      const prevLink = allLinks.find((link) =>
        link.text?.trim()?.includes('Prev: Space')
      );
      const prevHref = preparePath(prevLink?.getAttribute('href'));
      expect([urls.spacePageUrl, urls.spacePageUrlPagesRel]).toContain(
        prevHref
      );
    });

    test('Next link should go to plants page', () => {
      const nextLink = allLinks.find((link) =>
        link.text?.trim()?.includes('Next: Plants')
      );
      const nextHref = preparePath(nextLink?.getAttribute('href'));
      expect([urls.plantsPageUrl, urls.plantsPageUrlPagesRel]).toContain(
        nextHref
      );
    });

    test('More link should go to the expected modern Design unsplash page', () => {
      const moreLink = allLinks.find((link) =>
        link.text?.trim()?.includes('More Modern Design Images')
      );
      expect(preparePath(moreLink?.getAttribute('href'))).toBe(
        externalLinks.moreModernDesignLink
      );
    });
  });
});

describe('Plants Page Tests', () => {
  let page = loadPage('pages/plants.html');

  test('Plants page loads successfully', () => {
    expect(page.html).toBeTruthy();
  });

  describe('Plants Page: Basic structure and connections', () => {
    const tests = testDetailPageStructure(page, 'Plants', 'plant-image.jpg');

    test('Check for page heading', () => {
      tests.testPageHeading();
    });

    test('Test CSS connections', () => {
      tests.testCssConnections();
    });

    test('Test JS connection', () => {
      tests.testJsConnection();
    });

    test('Test main Image', () => {
      tests.testMainImage();
    });

    test('Image Details container should exist', () => {
      tests.testImageDetailsContainer();
    });

    test('Test Home link button', () => {
      tests.testBackToHomeLink();
    });

    test('Main Navigation links work correctly', () => {
      tests.testMainNavigationLinks();
    });
  });

  describe('Plants Page: Bottom navigation links', () => {
    const allLinks = page.locator('a');

    test('Prev link should go to modern design page', () => {
      const prevLink = allLinks.find((link) =>
        link.text?.trim()?.includes('Prev: Modern Design')
      );
      const prevHref = preparePath(prevLink?.getAttribute('href'));
      expect([
        urls.modernDesignPageUrl,
        urls.modernDesignPageUrlPagesRel,
      ]).toContain(prevHref);
    });

    test('Next link should go to nature page', () => {
      const nextLink = allLinks.find((link) =>
        link.text?.trim()?.includes('Next: Nature')
      );
      const nextHref = preparePath(nextLink?.getAttribute('href'));
      expect([urls.naturePageUrl, urls.naturePageUrlPagesRel]).toContain(
        nextHref
      );
    });

    test('More link should go to the expected Plants unsplash page', () => {
      const moreLink = allLinks.find((link) =>
        link.text?.trim()?.includes('More Plants Images')
      );
      expect(preparePath(moreLink?.getAttribute('href'))).toBe(
        externalLinks.morePlantsLink
      );
    });
  });
});

describe('Nature Page Tests', () => {
  let page = loadPage('pages/nature.html');

  test('Nature page loads successfully', () => {
    expect(page.html).toBeTruthy();
  });

  describe('Nature Page: Basic structure and connections', () => {
    const tests = testDetailPageStructure(page, 'Nature', 'nature-image.jpg');

    test('Check for page heading', () => {
      tests.testPageHeading();
    });

    test('Test CSS connections', () => {
      tests.testCssConnections();
    });

    test('Test JS connection', () => {
      tests.testJsConnection();
    });

    test('Test main Image', () => {
      tests.testMainImage();
    });

    test('Image Details container should exist', () => {
      tests.testImageDetailsContainer();
    });

    test('Test Home link button', () => {
      tests.testBackToHomeLink();
    });

    test('Main Navigation links work correctly', () => {
      tests.testMainNavigationLinks();
    });
  });

  describe('Nature Page: Bottom navigation links', () => {
    const allLinks = page.locator('a');

    test('Prev link should go to plants page', () => {
      const prevLink = allLinks.find((link) =>
        link.text?.trim()?.includes('Prev: Plants')
      );
      const prevHref = preparePath(prevLink?.getAttribute('href'));
      expect([urls.plantsPageUrl, urls.plantsPageUrlPagesRel]).toContain(
        prevHref
      );
    });

    test('Next link should go to space page', () => {
      const nextLink = allLinks.find((link) =>
        link.text?.trim()?.includes('Next: Space')
      );
      const nextHref = preparePath(nextLink?.getAttribute('href'));
      expect([urls.spacePageUrl, urls.spacePageUrlPagesRel]).toContain(
        nextHref
      );
    });

    test('More link should go to the expected nature unsplash page', () => {
      const moreLink = allLinks.find((link) =>
        link.text?.trim()?.includes('More Nature Images')
      );
      expect(preparePath(moreLink?.getAttribute('href'))).toBe(
        externalLinks.moreNatureLink
      );
    });
  });
});

describe('Space Page Tests', () => {
  let page = loadPage('pages/space.html');

  test('Space page loads successfully', () => {
    expect(page.html).toBeTruthy();
  });

  describe('Space Page: Basic structure and connections', () => {
    const tests = testDetailPageStructure(page, 'Space', 'space-image.jpg');

    test('Check for page heading', () => {
      tests.testPageHeading();
    });

    test('Test CSS connections', () => {
      tests.testCssConnections();
    });

    test('Test JS connection', () => {
      tests.testJsConnection();
    });

    test('Test main Image', () => {
      tests.testMainImage();
    });

    test('Image Details container should exist', () => {
      tests.testImageDetailsContainer();
    });

    test('Test Home link button', () => {
      tests.testBackToHomeLink();
    });

    test('Main Navigation links work correctly', () => {
      tests.testMainNavigationLinks();
    });
  });

  describe('Space Page: Bottom navigation links', () => {
    const allLinks = page.locator('a');

    test('Prev link should go to nature page', () => {
      const prevLink = allLinks.find((link) =>
        link.text?.trim()?.includes('Prev: Nature')
      );
      const prevHref = preparePath(prevLink?.getAttribute('href'));
      expect([urls.naturePageUrl, urls.naturePageUrlPagesRel]).toContain(
        prevHref
      );
    });

    test('Next link should go to modern design page', () => {
      const nextLink = allLinks.find((link) =>
        link.text?.trim()?.includes('Next: Modern Design')
      );
      const nextHref = preparePath(nextLink?.getAttribute('href'));
      expect([
        urls.modernDesignPageUrl,
        urls.modernDesignPageUrlPagesRel,
      ]).toContain(nextHref);
    });

    test('More link should go to the expected space unsplash page', () => {
      const moreLink = allLinks.find((link) =>
        link.text?.trim()?.includes('More Space Images')
      );
      expect(preparePath(moreLink?.getAttribute('href'))).toBe(
        externalLinks.moreSpaceLink
      );
    });
  });
});
