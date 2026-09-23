import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BottomNavComponent } from '../../../../shared/components/bottom-nav/bottom-nav.component';
import { ProfileDropdownComponent } from '../../../../shared/components/profile-dropdown/profile-dropdown.component';
import { WardrobeService } from '../../../../core/services/wardrobe.service';
import { ClothingItem, ClothingCategory } from '../../../../core/models/clothing-item.model';

@Component({
  selector: 'app-wardrobe-page',
  standalone: true,
  imports: [CommonModule, FormsModule, BottomNavComponent, ProfileDropdownComponent],
  templateUrl: './wardrobe-page.component.html',
  styleUrls: ['./wardrobe-page.component.scss']
})
export class WardrobePageComponent implements OnInit {
  private wardrobeService = inject(WardrobeService);

  items: ClothingItem[] = [];
  filteredItems: ClothingItem[] = [];
  selectedCategory: ClothingCategory | 'all' = 'all';
  selectedItem: ClothingItem | null = null;
  
  // Modal states
  showAddModal = false;
  showDetailModal = false;
  showDeleteConfirm = false;
  isEditMode = false;

  // Form data
  newItem: Partial<ClothingItem> = {
    name: '',
    category: 'tops',
    imageUrl: '',
    color: '',
    occasions: [],
    styleTags: []
  };

  categories: Array<{ id: ClothingCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'accessories', label: 'Accessories' }
  ];

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.items = this.wardrobeService.getItems();
    this.filterItems();
  }

  filterItems() {
    if (this.selectedCategory === 'all') {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.wardrobeService.getItemsByCategory(this.selectedCategory);
    }
  }

  selectCategory(category: ClothingCategory | 'all') {
    this.selectedCategory = category;
    this.filterItems();
  }

  getTotalCount(): number {
    return this.wardrobeService.getTotalCount();
  }

  getCategoryLabel(category: ClothingCategory): string {
    const cat = this.categories.find(c => c.id === category);
    return cat?.label || category;
  }

  // Add Item Modal
  openAddModal() {
    this.isEditMode = false;
    this.resetForm();
    this.showAddModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeAddModal() {
    this.showAddModal = false;
    this.resetForm();
    document.body.style.overflow = '';
  }

  resetForm() {
    this.newItem = {
      name: '',
      category: 'tops',
      imageUrl: '',
      color: '',
      occasions: [],
      styleTags: []
    };
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Check file size (limit to 1MB for sessionStorage)
      if (file.size > 1024 * 1024) {
        alert('Image size should be less than 1MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.newItem.imageUrl = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  addItem() {
    if (!this.newItem.name || !this.newItem.category) {
      alert('Please provide at least a name and category');
      return;
    }

    if (this.isEditMode && this.selectedItem) {
      // Update existing item
      this.wardrobeService.updateItem(this.selectedItem.id, this.newItem);
    } else {
      // Add new item
      this.wardrobeService.addItem(this.newItem as Omit<ClothingItem, 'id' | 'wearCount' | 'createdAt'>);
    }

    this.loadItems();
    this.closeAddModal();
  }

  // Item Detail Modal
  openItemDetail(item: ClothingItem) {
    this.selectedItem = item;
    this.showDetailModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedItem = null;
    document.body.style.overflow = '';
  }

  markAsWorn() {
    if (this.selectedItem) {
      this.wardrobeService.incrementWearCount(this.selectedItem.id);
      this.loadItems();
      // Refresh the selected item
      this.selectedItem = this.wardrobeService.getItemById(this.selectedItem.id) || null;
    }
  }

  editItem() {
    if (this.selectedItem) {
      this.isEditMode = true;
      this.newItem = {
        name: this.selectedItem.name,
        category: this.selectedItem.category,
        imageUrl: this.selectedItem.imageUrl,
        color: this.selectedItem.color,
        occasions: this.selectedItem.occasions || [],
        styleTags: this.selectedItem.styleTags || []
      };
      this.closeDetailModal();
      this.showAddModal = true;
      document.body.style.overflow = 'hidden';
    }
  }

  // Delete
  confirmDelete() {
    this.showDeleteConfirm = true;
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
  }

  deleteItem() {
    if (this.selectedItem) {
      this.wardrobeService.deleteItem(this.selectedItem.id);
      this.loadItems();
      this.showDeleteConfirm = false;
      this.closeDetailModal();
    }
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}
