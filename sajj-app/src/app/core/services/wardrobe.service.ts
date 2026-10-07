import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ClothingItem, ClothingCategory } from '../models/clothing-item.model';

@Injectable({
  providedIn: 'root'
})
export class WardrobeService {
  private readonly STORAGE_KEY = 'sajj_wardrobe';
  private readonly MIGRATION_KEY = 'sajj_wardrobe_sample_cleared';
  private items: ClothingItem[] = [];
  private isBrowser: boolean;

  // Sample item names to detect and remove (one-time cleanup)
  private readonly SAMPLE_ITEM_NAMES = [
    'Ivory Knit Top',
    'Brown Wide-Leg Trousers',
    'Rose Slip Dress',
    'Camel Trench Coat',
    'White Sneakers',
    'Gold Hoop Earrings',
    'Black Shoulder Bag',
    'Cream Cardigan'
  ];

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Restore and clean up sample data if needed
    if (this.isBrowser) {
      this.restoreFromStorage();
      this.removeSampleDataOneTime();
    }
  }

  /**
   * One-time removal of hardcoded sample data
   * This only runs once and won't affect user-added items in the future
   */
  private removeSampleDataOneTime(): void {
    try {
      const migrationDone = sessionStorage.getItem(this.MIGRATION_KEY);
      
      if (migrationDone !== 'true') {
        // Remove any items that match the sample data names
        const originalLength = this.items.length;
        this.items = this.items.filter(
          item => !this.SAMPLE_ITEM_NAMES.includes(item.name)
        );
        
        if (this.items.length < originalLength) {
          console.log(`Removed ${originalLength - this.items.length} sample items from wardrobe`);
          this.saveToStorage();
        }
        
        // Mark migration as complete so it never runs again
        sessionStorage.setItem(this.MIGRATION_KEY, 'true');
      }
    } catch (error) {
      console.warn('Failed to remove sample data:', error);
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
   * Generate a unique ID for clothing items
   */
  private generateId(): string {
    return `item_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
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
