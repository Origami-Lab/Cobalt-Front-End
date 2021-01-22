import {CoModalModule} from './co-modal.module';

describe('ModalModule', () => {
  let modalModule: CoModalModule;

  beforeEach(() => {
    modalModule = new CoModalModule();
  });

  it('should create an instance', () => {
    expect(modalModule).toBeTruthy();
  });
});
