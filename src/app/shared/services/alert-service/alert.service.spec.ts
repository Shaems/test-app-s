import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import { AlertController } from '@ionic/angular';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AlertController, useValue: {
          create: jasmine.createSpy().and.returnValue(Promise.resolve({
            present: jasmine.createSpy().and.returnValue(Promise.resolve())
          })),
        }}
      ]
    });
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show alert', () => {

    it('when call showLoading', async () => {
      await service.alert('Alert', 'Test');

      expect(service.alertController.create).toHaveBeenCalledWith({
        cssClass: 'alert-controller',
        header: 'Alert',
        message: 'Test',
        animated: true,
        buttons: ['OK']
      });
    })
  })

});
