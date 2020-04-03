import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { SharedMaterialModule } from '../Shared/shared-material.module';
import { SharedModule } from '../Shared/shared.module';
import { MoviesListComponent } from './movies-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../Shared/services/data.service';
import { of } from 'rxjs/internal/observable/of';


describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let dataService;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesListComponent ],
      imports: [ 
        BrowserAnimationsModule,
        SharedMaterialModule,
        SharedModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      providers: [DataService]
    })
    .compileComponents();
  }));

  beforeEach(inject([DataService], s => {
    dataService = s; 
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  test('should create component', () => {
    expect(component).toBeTruthy();
  });

  test('should create properties', () => {
    expect(component.showSpinner).toBeFalsy();
    expect(component.showAdvancedPanel).toBeFalsy();
  });

  test('should create FormGroup with controls', () =>{
    expect(component.searchForm).toBeDefined();
    expect(component.searchForm instanceof FormGroup).toBeTruthy();
    expect(component.searchForm.controls.s).toBeDefined();
    expect(component.searchForm.controls.s instanceof FormControl).toBeTruthy();
    expect(component.searchForm.controls.type).toBeDefined();
    expect(component.searchForm.controls.type instanceof FormControl).toBeTruthy();
    expect(component.searchForm.controls.y).toBeDefined();
    expect(component.searchForm.controls.y instanceof FormControl).toBeTruthy();
  })

  test('createYearsFilter function should fill the years property with years', () => {
      jest.spyOn(MoviesListComponent.prototype, 'createYearsFilter');
      fixture = TestBed.createComponent(MoviesListComponent);
      component = fixture.componentInstance;
      expect(MoviesListComponent.prototype.createYearsFilter).toHaveBeenCalledTimes(1);
    
      let currentYear = new Date().getFullYear();
      expect(component.years.length).toEqual(currentYear - 1900 + 1);
      expect(component.years.some(elem => typeof elem != "number")).toBeFalsy();
  })

   test('submitParams function should be invoked by search button and return if searchForm is invalid', () => {
     jest.spyOn(component, 'submitParams');
     jest.spyOn(component, 'getMovies');
     let button = fixture.debugElement.nativeElement.querySelector('.search');
     button.click();
     fixture.whenStable().then(() => {
      expect(component.submitParams).toHaveBeenCalledTimes(1);
      expect(component.getMovies).not.toHaveBeenCalled();
    });
   })

   test('submitParams function should create params object and pass it to getMovies function', () => {
      jest.spyOn(component, 'getMovies')  
      component.searchForm.controls.s.setValue('movie');
      component.searchForm.controls.type.setValue('movie')
      component.submitParams(2);
      expect(component.getMovies).toHaveBeenCalledTimes(1);
      expect(component.getMovies).toHaveBeenCalledWith({s: 'movie', type: 'movie', page: 2})
   })

  test('getMovies function makes API call and get movies list according to the search query',
   fakeAsync(() => {
    let movies = { 
        Search: [{ Title: 'Cool movie', Year: '2019', imdbID: '123', Type: 'movie', Poster: 'N/A'}],
        totalResults: '20',
        Response: 'true' 
      };
      
    jest.spyOn(dataService, 'getMovies').mockReturnValue(of(movies));

    component.getMovies({s: 'movie'});

    expect(dataService.getMovies).toHaveBeenCalledTimes(1);
    expect(dataService.getMovies).toHaveBeenCalledWith({s: 'movie'});
    expect(component.movies).toEqual(movies.Search);
    expect(component.totalResults).toBe('20');
    expect(component.showSpinner).toBeFalsy();
  }));
  
});
