import { types } from '../../types';

describe('Prueba en los tipos', () => {
    
    test('debe contener los tipos válidos para los reducer', () => {
        
        const values = {
            login:       '[Auth] Login',
            logout:      '[Auth] Logout',
        
            showLoading: '[Loading] Show loading',
            hideLoading: '[Loading] Hide loading',
            
            noteLoad:    '[Note] Load notes',
            noteActive:  '[Note] Active note',
            noteAdd:     '[Note] New note',
            noteEdit:    '[Note] Update note',
            noteDelete:  '[Note] Delete note',
            noteFile:    '[Note] Upload file to note',
            noteClear:   '[Note] Clear logout notes'
        }

        expect(types).toEqual(values);

    })
    

});
