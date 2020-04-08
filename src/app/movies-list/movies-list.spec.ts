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
      expect(component.years.some(elem => typeof elem != "object")).toBeFalsy();
  })

  test('ngOnInit should clean movies property when input is cleaned by user', () => {
    component.searchForm.controls.s.setValue('movie');
    component.movies = [{ Title: 'Cool movie', Year: '2019', imdbID: '123', Type: 'movie', Poster: 'N/A'}];
    fixture.detectChanges()
    component.searchForm.controls.s.setValue('');
    fixture.detectChanges();
    expect(component.movies.length).toBe(0);
  });

   test('submitParams function should be invoked by click upon search button and return if searchForm is invalid', () => {
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
      component.searchForm.controls.type.setValue({value: 'movie'});
      component.searchForm.controls.y.setValue({value: 1998});
      component.submitParams(2);
      expect(component.getMovies).toHaveBeenCalledTimes(1);
      expect(component.getMovies).toHaveBeenCalledWith({s: 'movie', type: 'movie', y: 1998, page: 2})
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
  
  test('toggleAdvancedPanel function should be invoked by click upon advanced button', () => {
    jest.spyOn(component, 'toggleAdvancedPanel');
    let startAdvancedPanelState = component.showAdvancedPanel;
    let button = fixture.debugElement.nativeElement.querySelector('.advanced');
    button.click();
    fixture.whenStable().then(() => {
     expect(component.toggleAdvancedPanel).toHaveBeenCalledTimes(1);
     expect(component.showAdvancedPanel).toBe(!startAdvancedPanelState);
   });
  });

  test('validateInput function should update isInvalid property when user searches with empty input', 
      () => {
      jest.useFakeTimers();
      jest.spyOn(component, 'validateInput');
      let button = fixture.debugElement.nativeElement.querySelector('.search');
      let input = fixture.debugElement.nativeElement.querySelector('.inputField');

      expect(input.classList.contains('isInvalid')).toBeFalsy();
      expect(component.isInvalid).toBeFalsy();
      button.click();
      fixture.detectChanges();
      expect(input.classList.contains('isInvalid')).toBeTruthy();
      expect(component.isInvalid).toBeTruthy()
      jest.advanceTimersByTime(3000);
      fixture.detectChanges();
      expect(component.isInvalid).toBeFalsy()
      expect(input.classList.contains('isInvalid')).toBeFalsy();
   })

  })


