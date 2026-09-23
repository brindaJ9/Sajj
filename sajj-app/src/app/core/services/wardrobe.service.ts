import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ClothingItem, ClothingCategory } from '../models/clothing-item.model';

@Injectable({
  providedIn: 'root'
})
export class WardrobeService {
  private readonly STORAGE_KEY = 'sajj_wardrobe';
  private items: ClothingItem[] = [];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Restore wardrobe from sessionStorage on service initialization
    if (this.isBrowser) {
      this.restoreFromStorage();
      
      // If no items exist, seed with sample data for demo
      if (this.items.length === 0) {
        this.seedSampleData();
      }
    }
  }

  /**
   * Restore wardrobe items from sessionStorage
   */
  private restoreFromStorage(): void {
    try {
      const stored = sessionStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.items = Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.warn('Failed to restore wardrobe from sessionStorage:', error);
      // Clear invalid data
      this.clearStoredData();
      this.items = [];
    }
  }

  /**
   * Save wardrobe items to sessionStorage
   */
  private saveToStorage(): void {
    if (!this.isBrowser) {
      return;
    }
    
    try {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
    } catch (error) {
      console.error('Failed to save wardrobe to sessionStorage:', error);
    }
  }

  /**
   * Clear stored data from sessionStorage
   */
  private clearStoredData(): void {
    if (!this.isBrowser) {
      return;
    }
    
    try {
      sessionStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear wardrobe from sessionStorage:', error);
    }
  }

  /**
   * Seed sample data for development/demo
   */
  private seedSampleData(): void {
    const sampleItems: ClothingItem[] = [
      {
        id: this.generateId(),
        name: 'Ivory Knit Top',
        category: 'tops',
        imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=600&fit=crop',
        color: 'Ivory',
        occasions: ['casual', 'office'],
        styleTags: ['minimal', 'romantic'],
        wearCount: 12,
        createdAt: new Date().toISOString()
      },
      {
        id: this.generateId(),
        name: 'Brown Wide-Leg Trousers',
        category: 'bottoms',
        imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=600&fit=crop',
        color: 'Brown',
        occasions: ['office', 'casual'],
        styleTags: ['chic', 'classic'],
        wearCount: 8,
        createdAt: new Date().toISOString()
      },
      {
        id: this.generateId(),
        name: 'Rose Slip Dress',
        category: 'dresses',
        imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop',
        color: 'Rose',
        occasions: ['dates', 'parties'],
        styleTags: ['romantic', 'feminine'],
        wearCount: 5,
        createdAt: new Date().toISOString()
      },
      {
        id: this.generateId(),
        name: 'Camel Trench Coat',
        category: 'outerwear',
        imageUrl: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&h=600&fit=crop',
        color: 'Camel',
        occasions: ['office', 'travel'],
        styleTags: ['classic', 'timeless'],
        wearCount: 6,
        createdAt: new Date().toISOString()
      },
      {
        id: this.generateId(),
        name: 'White Sneakers',
        category: 'shoes',
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop',
        color: 'White',
        occasions: ['casual', 'travel'],
        styleTags: ['sporty', 'minimal'],
        wearCount: 15,
        createdAt: new Date().toISOString()
      },
      {
        id: this.generateId(),
        name: 'Gold Hoop Earrings',
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=600&fit=crop',
        color: 'Gold',
        occasions: ['parties', 'dates'],
        styleTags: ['elegant', 'minimal'],
        wearCount: 10,
        createdAt: new Date().toISOString()
      },
      {
        id: this.generateId(),
        name: 'Black Shoulder Bag',
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=600&fit=crop',
        color: 'Black',
        occasions: ['office', 'casual'],
        styleTags: ['classic', 'minimal'],
        wearCount: 20,
        createdAt: new Date().toISOString()
      },
      {
        id: this.generateId(),
        name: 'Cream Cardigan',
        category: 'tops',
        imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop',
        color: 'Cream',
        occasions: ['casual', 'office'],
        styleTags: ['cozy', 'romantic'],
        wearCount: 7,
        createdAt: new Date().toISOString()
      }
    ];

    this.items = sampleItems;
    this.saveToStorage();
  }

  /**
   * Generate a unique ID for clothing items
   */
  private generateId(): string {
    return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get all wardrobe items
   */
  getItems(): ClothingItem[] {
    return [...this.items];
  }

  /**
   * Get items by category
   */
  getItemsByCategory(category: ClothingCategory): ClothingItem[] {
    return this.items.filter(item => item.category === category);
  }

  /**
   * Get a single item by ID
   */
  getItemById(id: string): ClothingItem | undefined {
    return this.items.find(item => item.id === id);
  }

  /**
   * Add a new item to the wardrobe
   */
  addItem(item: Omit<ClothingItem, 'id' | 'wearCount' | 'createdAt'>): ClothingItem {
    const newItem: ClothingItem = {
      ...item,
      id: this.generateId(),
      wearCount: 0,
      createdAt: new Date().toISOString()
    };

    this.items.unshift(newItem); // Add to beginning
    this.saveToStorage();
    return newItem;
  }

  /**
   * Update an existing item
   */
  updateItem(id: string, updates: Partial<ClothingItem>): boolean {
    const index = this.items.findIndex(item => item.id === id);
    
    if (index === -1) {
      return false;
    }

    this.items[index] = {
      ...this.items[index],
      ...updates,
      id: this.items[index].id, // Preserve ID
      createdAt: this.items[index].createdAt // Preserve creation date
    };

    this.saveToStorage();
    return true;
  }

  /**
   * Delete an item from the wardrobe
   */
  deleteItem(id: string): boolean {
    const initialLength = this.items.length;
    this.items = this.items.filter(item => item.id !== id);
    
    if (this.items.length < initialLength) {
      this.saveToStorage();
      return true;
    }
    
    return false;
  }

  /**
   * Increment wear count and update last worn date
   */
  incrementWearCount(id: string): boolean {
    const item = this.items.find(item => item.id === id);
    
    if (!item) {
      return false;
    }

    item.wearCount += 1;
    item.lastWorn = new Date().toISOString();
    
    this.saveToStorage();
    return true;
  }

  /**
   * Get total number of items
   */
  getTotalCount(): number {
    return this.items.length;
  }

  /**
   * Clear all items (for testing or reset)
   */
  clearWardrobe(): void {
    this.items = [];
    this.clearStoredData();
  }
}
