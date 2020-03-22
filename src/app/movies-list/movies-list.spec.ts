import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { SharedMaterialModule } from '../Shared/shared-material.module';
import { SharedModule } from '../Shared/shared.module';
import { MoviesListComponent } from './movies-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesListComponent ],
      imports: [ 
        BrowserAnimationsModule,
        SharedMaterialModule,
        SharedModule,
        RouterTestingModule.withRoutes([]),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should create properties', () => {
    expect(component.showSpinner).toBeFalsy();
  });

  
});
