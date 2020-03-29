import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { SharedMaterialModule } from '../Shared/shared-material.module';
import { SharedModule } from '../Shared/shared.module';
import { MoviesListComponent } from './movies-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormControl } from '@angular/forms';

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
    expect(component.showAdvancedPanel).toBeFalsy();
    expect(component.searchForm).toBeDefined();
    expect(component.searchForm instanceof FormGroup).toBeTruthy();
    expect(component.searchForm.controls.s).toBeDefined();
    expect(component.searchForm.controls.s instanceof FormControl).toBeTruthy();
    expect(component.searchForm.controls.type).toBeDefined();
    expect(component.searchForm.controls.type instanceof FormControl).toBeTruthy();
    expect(component.searchForm.controls.y).toBeDefined();
    expect(component.searchForm.controls.y instanceof FormControl).toBeTruthy();
  });

  test('createYearsFilter function should fill the years property with years', () => {
      jest.spyOn(MoviesListComponent.prototype, 'createYearsFilter');
      fixture = TestBed.createComponent(MoviesListComponent);
      component = fixture.componentInstance;
      expect(MoviesListComponent.prototype.createYearsFilter).toHaveBeenCalled();
    
      let currentYear = new Date().getFullYear();
      expect(component.years.length).toEqual(currentYear - 1900 + 1);
      expect(component.years.some(elem => typeof elem != "number")).toBeFalsy();
  })

  test('ngOnInit should update movies property when input is empty', () => {
  //   let el = fixture.nativeElement.querySelector('input');
  //   component.searchForm.controls.s.setValue('movie');
  //   el.value = 'movie'
  // el.dispatchEvent(new Event('input'));
  // component.submitParams()
  // fixture.detectChanges();
  // // fixture.whenStable().then(() => {
  //   expect(component.movies.length).toBe(0);
  // // })
  })

  test('getMovies function should make an API call according to the search query', async () => {
    // expect.assertions(1);
    let el = fixture.nativeElement.querySelector('input');
    component.searchForm.controls.s.setValue('movie');
    el.value = 'movie'
  el.dispatchEvent(new Event('input'));
    await component.getMovies({s: 'movie'});
    console.log(el.value)
    expect(component.movies.length).toBe(0)
  
  })
});
