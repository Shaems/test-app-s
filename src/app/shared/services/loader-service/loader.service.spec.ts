import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import { LoadingController } from '@ionic/angular';

describe('LoaderService', () => {
  let service: LoaderService;
  let loadingControllerSpy: jasmine.SpyObj<LoadingController>;

  beforeEach(() => {

    loadingControllerSpy = jasmine.createSpyObj('LoadingController', ['create', 'dismiss']);
    
    TestBed.configureTestingModule({
      providers: [
        { provide: LoadingController, useValue:  {
          create: jasmine.createSpy().and.returnValue(Promise.resolve({
            present: jasmine.createSpy().and.returnValue(Promise.resolve())
          })),
          dismiss: jasmine.createSpy().and.returnValue(Promise.resolve())
        }}
      ]
    });
    service = TestBed.inject(LoaderService);
  });

  it('should call', () => {
    expect(service).toBeTruthy();
  });

  describe('show loading', () => {

    it('when call showLoading', async () => {
      await service.showLoading();

      expect(service.loadingController.create).toHaveBeenCalledWith({
        spinner: 'circles',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
    })
  })

  describe('not show loading', () => {

    it('when call dimissLoading', async () => {
      await service.dimissLoading();

      expect(service.loadingController.dismiss).toHaveBeenCalled();
    })
  })
});
