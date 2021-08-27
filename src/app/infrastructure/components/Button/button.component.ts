import { Component, EventEmitter, Input, Output } from "@angular/core";

type ButtonType = 'outlined' | 'text' | 'rounded' | undefined;
type ButtonSize = 'small' | 'large' | undefined;
type ButtonIconPosition = 'right' | 'left';
type ButtonIcon = string | undefined;

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.css'],
})
export class ButtonComponent {
  private templateClass = 'p-button';
  private templateFull = 'button--full';
  @Input() title = 'Button';
  @Input() type: ButtonType;
  @Input() size: ButtonSize;
  @Input() full: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon: ButtonIcon = '';
  @Input() iconPos: ButtonIconPosition = 'left';
  @Output() click: EventEmitter<void> = new EventEmitter<void>();

  public getStyleClass(): string {
    if (!this.type || !this.size) {
      return '';
    }
    return `${this.getButtonSize()} ${this.getButtonType()}`
  }

  public getButtonIcon(): string {
    if (!this.icon) return '';
    return this.icon;
  }

  public getButtonIconPosition(): string {
    if (!this.icon) return '';
    return this.iconPos;
  }

  public onClickHandler(): void {
    this.click.emit();
  }

  public getButtonFull(): string {
    if (!this.full) return '';
    return this.templateFull;
  }

  private getButtonType(): string {
    if (!this.type) return this.templateClass;
    return this.templateClass + '-' + this.type;
  }

  private getButtonSize(): string {
    if (!this.size) return this.templateClass;
    return this.templateClass + '-' + this.getNameSize();
  }

  private getNameSize(): string {
    if (this.size === 'small') return 'sm';
    return 'lg';
  }
}
