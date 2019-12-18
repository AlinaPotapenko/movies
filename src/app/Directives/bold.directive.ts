import { Directive, TemplateRef, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[while]'
})
export class BoldDirective {
 

  constructor(private _templateRef: TemplateRef<any>, private _viewContainer: ViewContainerRef) { 
  }

  // @Input() set while(condition: boolean) {
  //   if (condition) {
  //     this._viewContainer.createEmbeddedView(this._templateRef);
  //   } else {
  //     this._viewContainer.clear();
  //   }
  // }
 
}
