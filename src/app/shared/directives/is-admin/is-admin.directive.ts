import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../../../core/user/services/user.service';

@Directive({
  selector: '[appIsAdmin]'
})
export class IsAdminDirective implements OnInit {

  private _isVisible = false;

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _templateRef: TemplateRef<any>,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    if (this._userService.isAdmin()) {
      if (!this._isVisible) {
        this._isVisible = true;
        this._viewContainerRef.createEmbeddedView(this._templateRef);
      }
    } else {
      this._isVisible = false;
      this._viewContainerRef.clear();
    }
  }
}
