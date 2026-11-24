import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BottomNavComponent } from '../../../../shared/components/bottom-nav/bottom-nav.component';
import { ProfileDropdownComponent } from '../../../../shared/components/profile-dropdown/profile-dropdown.component';
import { WardrobeService } from '../../../../core/services/wardrobe.service';
import { ClothingItem, ClothingCategory, Season, Occasion } from '../../../../core/models/clothing-item.model';

@Component({
  selector: 'app-wardrobe-page',
  standalone: true,
  imports: [CommonModule, FormsModule, BottomNavComponent, ProfileDropdownComponent],
  templateUrl: './wardrobe-page.component.html',
  styleUrls: ['./wardrobe-page.component.scss']
})
export class WardrobePageComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  
  private wardrobeService = inject(WardrobeService);

  items: ClothingItem[] = [];
  filteredItems: ClothingItem[] = [];
  selectedCategory: ClothingCategory | 'all' = 'all';
  selectedItem: ClothingItem | null = null;
  
  // Search states
  searchExpanded = false;
  searchQuery = '';
  isSearchActive = false;

  // Modal states
  showAddModal = false;
  showDetailModal = false;
  showDeleteConfirm = false;
  isEditMode = false;
  currentStep = 1; // 1 = Upload, 2 = Analyzing, 3 = Review
  
  // Available options
  allSeasons: Season[] = ['Spring', 'Summer', 'Autumn', 'Winter'];
  allOccasions: Occasion[] = ['Everyday', 'Casual', 'Work', 'Formal', 'Party', 'Festive'];
  newStyleTag = '';

  // Form data
  newItem: Partial<ClothingItem> = {
    name: '',
    category: 'tops',
    imageUrl: '',
    color: '',
    seasons: [],
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
    let filtered = this.items;
    
    // Apply category filter
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === this.selectedCategory);
    }
    
    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        (item.color && item.color.toLowerCase().includes(query))
      );
    }
    
    this.filteredItems = filtered;
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
    this.currentStep = 1;
    this.resetForm();
    this.showAddModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeAddModal() {
    this.showAddModal = false;
    this.currentStep = 1;
    this.resetForm();
    document.body.style.overflow = '';
  }

  resetForm() {
    this.newItem = {
      name: '',
      category: 'tops',
      imageUrl: '',
      color: '',
      seasons: [],
      occasions: [],
      styleTags: []
    };
    this.newStyleTag = '';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.processFile(file);
    }
  }

  processFile(file: File) {
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size should be less than 10MB');
      return;
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPG, PNG, or WebP image');
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

  // Drag and drop handlers
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.processFile(file);
    }
  }

  removeImage() {
    this.newItem.imageUrl = '';
  }

  goToReview() {
    if (this.newItem.imageUrl) {
      this.currentStep = 2; // Go to analyzing state
      this.simulateAIAnalysis();
    }
  }

  simulateAIAnalysis() {
    // Simulate AI analysis with a delay
    setTimeout(() => {
      // Mock AI-generated data
      this.newItem.name = 'Ivory knit top';
      this.newItem.color = 'Ivory';
      this.newItem.seasons = ['Autumn', 'Winter'];
      this.newItem.occasions = ['Everyday', 'Casual'];
      this.newItem.styleTags = ['Soft', 'Minimal', 'Textured'];
      
      // Move to review step
      this.currentStep = 3;
    }, 2500); // 2.5 seconds for analysis
  }

  goBackToUpload() {
    this.currentStep = 1;
  }

  // Season toggle
  toggleSeason(season: Season) {
    if (!this.newItem.seasons) {
      this.newItem.seasons = [];
    }
    const index = this.newItem.seasons.indexOf(season);
    if (index > -1) {
      this.newItem.seasons.splice(index, 1);
    } else {
      this.newItem.seasons.push(season);
    }
  }

  isSeasonSelected(season: Season): boolean {
    return this.newItem.seasons?.includes(season) || false;
  }

  // Occasion toggle
  toggleOccasion(occasion: Occasion) {
    if (!this.newItem.occasions) {
      this.newItem.occasions = [];
    }
    const index = this.newItem.occasions.indexOf(occasion);
    if (index > -1) {
      this.newItem.occasions.splice(index, 1);
    } else {
      this.newItem.occasions.push(occasion);
    }
  }

  isOccasionSelected(occasion: Occasion): boolean {
    return this.newItem.occasions?.includes(occasion) || false;
  }

  // Style tags
  addStyleTag() {
    if (this.newStyleTag.trim() && this.newItem.styleTags) {
      if (!this.newItem.styleTags.includes(this.newStyleTag.trim())) {
        this.newItem.styleTags.push(this.newStyleTag.trim());
      }
      this.newStyleTag = '';
    }
  }

  removeStyleTag(tag: string) {
    if (this.newItem.styleTags) {
      const index = this.newItem.styleTags.indexOf(tag);
      if (index > -1) {
        this.newItem.styleTags.splice(index, 1);
      }
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
      this.currentStep = 3; // Go directly to review when editing
      this.newItem = {
        name: this.selectedItem.name,
        category: this.selectedItem.category,
        imageUrl: this.selectedItem.imageUrl,
        color: this.selectedItem.color,
        seasons: this.selectedItem.seasons || [],
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

  // Search methods
  onSearchButtonClick() {
    if (!this.searchExpanded) {
      // Open the search field
      this.searchExpanded = true;
      setTimeout(() => {
        this.searchInput?.nativeElement.focus();
      }, 100);
    } else if (this.searchQuery.trim()) {
      // Perform search if there's a query
      this.performSearch();
    }
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      this.isSearchActive = true;
      this.filterItems();
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.isSearchActive = false;
    this.searchExpanded = false;
    this.filterItems();
  }
}
