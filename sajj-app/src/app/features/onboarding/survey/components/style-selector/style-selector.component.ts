import { Component, signal, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { STYLE_OPTIONS, StyleOption } from '../../data/style-options.data';

@Component({
  selector: 'app-style-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './style-selector.component.html',
  styleUrls: ['./style-selector.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: '0',
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: '1',
        overflow: 'visible'
      })),
      transition('collapsed <=> expanded', [
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class StyleSelectorComponent {
  // Data
  readonly styleOptions = STYLE_OPTIONS;

  // Signals
  selectedStyle = signal<string | null>(null);
  selectedTraits = signal<Set<string>>(new Set());

  // Computed
  selectedStyleOption = computed(() => {
    const styleId = this.selectedStyle();
    return styleId ? this.styleOptions.find(s => s.id === styleId) || null : null;
  });

  expandState = computed(() => 
    this.selectedStyle() ? 'expanded' : 'collapsed'
  );

  // Outputs
  selectionChange = output<{
    style: string;
    traits: string[];
  }>();

  // Methods
  selectStyle(styleId: string): void {
    if (this.selectedStyle() === styleId) {
      return;
    }
    
    this.selectedStyle.set(styleId);
    this.selectedTraits.set(new Set());
    this.emitSelection();
  }

  toggleTrait(traitId: string): void {
    const traits = new Set(this.selectedTraits());
    
    if (traits.has(traitId)) {
      traits.delete(traitId);
    } else {
      traits.add(traitId);
    }
    
    this.selectedTraits.set(traits);
    this.emitSelection();
  }

  isTraitSelected(traitId: string): boolean {
    return this.selectedTraits().has(traitId);
  }

  private emitSelection(): void {
    const style = this.selectedStyle();
    if (!style) return;

    this.selectionChange.emit({
      style,
      traits: Array.from(this.selectedTraits())
    });
  }
}
