import { parse } from 'node-html-parser';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface TestPage {
  html: string;
  document: any;
  getByRole: (role: string, options?: { name?: string }) => any[];
  locator: (selector: string) => any[];
  url: string;
}

export const preparePath = (path: string): string => {
  if (path.startsWith('../')) {
    return preparePath(path.substring(3));
  } else if (path.startsWith('./')) {
    return preparePath(path.substring(2));
  } else if (path.startsWith('.') || path.startsWith('/')) {
    return preparePath(path.substring(1));
  } else {
    return path;
  }
};

export const loadPage = (filePath: string): TestPage => {
  const fullPath = join(process.cwd(), filePath);

  if (!existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }

  const html = readFileSync(fullPath, 'utf-8');
  const document = parse(html);

  return {
    html,
    document,
    url: filePath,
    getByRole: (role: string, options?: { name?: string }) => {
      const elements = document.querySelectorAll(role);
      if (options?.name) {
        return elements.filter((el: any) => {
          const text = el.text?.trim() || el.getAttribute('alt') || '';
          return text.includes(options.name);
        });
      }
      return elements;
    },
    locator: (selector: string) => {
      return document.querySelectorAll(selector);
    },
  };
};

export const checkFileExists = (filePath: string): boolean => {
  const fullPath = join(process.cwd(), preparePath(filePath));
  return existsSync(fullPath);
};

export const getAttributeFromElements = (
  elements: any[],
  attribute: string
): string[] => {
  return elements.map((el) => el.getAttribute(attribute)).filter(Boolean);
};

export const getTextFromElements = (elements: any[]): string[] => {
  return elements.map((el) => el.text?.trim()).filter(Boolean);
};

// URL constants
export const urls = {
  mainPageUrl: 'index.html',
  mainPageUrlLong: 'index.html',
  plantsPageUrl: 'pages/plants.html',
  modernDesignPageUrl: 'pages/modern-design.html',
  spacePageUrl: 'pages/space.html',
  naturePageUrl: 'pages/nature.html',
  plantsPageUrlPagesRel: 'plants.html',
  modernDesignPageUrlPagesRel: 'modern-design.html',
  spacePageUrlPagesRel: 'space.html',
  naturePageUrlPagesRel: 'nature.html',
};

// External link constants
export const externalLinks = {
  moreModernDesignLink: 'https://unsplash.com/s/photos/modern-design',
  morePlantsLink: 'https://unsplash.com/s/photos/plants',
  moreSpaceLink: 'https://unsplash.com/s/photos/space',
  moreNatureLink: 'https://unsplash.com/s/photos/nature',
};
